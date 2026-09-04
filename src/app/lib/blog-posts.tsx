export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  fullContent: string;
  draft?: boolean;
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sitecore-search-document-extractors",
    title: "Sitecore Search Document Extractors: How Attributes Get Filled",
    summary:
      "Why a crawled URL can still be useless in Sitecore Search, and how Trailworks fills name and price with a document extractor.",
    publishedAt: "2026-09-04",
    tags: ["Sitecore Search", "Sitecore", "Discovery", "Architecture"],
    fullContent: `
# Sitecore Search Document Extractors: How Attributes Get Filled

A crawler can fetch a URL and the item can still be useless in search.

Search only knows what the **document extractor** stored. If that mapping missed the heading or the price field, the result has no **name**, or the Product Finder cannot sort.

That mapping is the difference between an indexed URL and a searchable item.

## What it is

A document extractor is a setting on a **web crawler** or an **API crawler**. It is not a third way to get content in.

A web crawler reads pages, and files like PDFs. An API crawler reads JSON. The extractor turns either one into attributes on the index document.

On a basic web crawler, the same mapping screen is called **Attribute Extraction**, not Document Extractors.

Each URL or file becomes one document. A long HTML page is still one result. A 10-page PDF is still one result.

[Five questions](/blog/sitecore-search-five-questions) is where Trailworks picks the crawler. This post is the mapping on that crawler.

## Create the attribute, then fill it

Create the attribute in **Administration → Domain settings**. Then the source has to fill it. Creating it does nothing on its own. That is TechAdmin work, and it is the step people skip.

After a crawl, open the item in **Content Collection**. You will see what was stored. The [CEC post](/blog/sitecore-search-cec-explained) is the map for that screen.

## When Trailworks search looks empty

Trailworks keeps **one entity per type**, same as the [entity modeling post](/blog/sitecore-search-entity-modeling). Articles, events, and products are not one blob with a type field.

A gear article should appear for **waterproof jacket**. Content Collection has the URL. **name** is blank. Boosting the widget will not invent a heading. The advanced web crawler fetched the page. The extractor never mapped the \`h1\`.

Stormbreak Waterproof Shell should sort by price in Product Finder. The product is in the index. **price** is empty. The API crawler fetched the catalog. The extractor never mapped the price field.

Same failure. Different shape.

| Source | Crawler | What must be filled |
| --- | --- | --- |
| XM Cloud articles | Advanced web crawler | Name from the heading, description from the meta tag |
| Commerce products | API crawler | Name, price, availability from JSON |

SharePoint guides and Zendesk help follow the same pattern. The rest of this post walks the two failures above.

## How you write the mapping

The extractor needs a way to point at a value on the page or in the JSON.

**XPath** is a path through HTML. Sitecore uses it on web crawlers when every article uses the same tags. You type the path next to the attribute. You do not write a function.

\`\`\`text
name: //h1
description: //meta[@name='description']/@content
\`\`\`

**JavaScript** is the same job with code. Sitecore runs it as **Cheerio**, which uses CSS-style selectors on the HTML: \`$('h1').text()\` means "get the heading text." Use it when you need a fallback, such as heading first, then the page title. This is not the same as asking the crawler to load the page in a browser. Cheerio only reads HTML the crawler already has.

**JSONPath** is a path through JSON. Sitecore uses it on API crawlers. \`$.price\` means the price field on that object.

Use XPath or JSONPath when the shape is stable. Use JavaScript when it is not.

## The article extractor

**XPath** is enough when every page has the same heading. Trailworks article templates are not that tidy, so this source uses JavaScript. Scope it to article URLs on the advanced web crawler.

On the advanced web crawler, you attach this function to the source **tag** for Article. That tag is how this source fills the Article entity. Events get a different extractor, not a different \`type\` value in this function.

\`$ = response.body\` is the page. Return an **array of objects**. The keys must match Domain settings. The starter set often uses \`name\`, not title.

\`\`\`javascript
function extract(request, response) {
    $ = response.body;

    return [{
        "name": $('h1').first().text() || $('title').text(),
        "description": $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || "",
        "url": $('meta[property="og:url"]').attr('content') || request.url,
        "type": "article",
        "image_url": $('meta[property="og:image"]').attr('content') || ""
    }];
}
\`\`\`

\`type\` and \`url\` are mandatory attributes for every domain. The \`"type": "article"\` value above is that required attribute, not a substitute for a separate Event entity. Without \`type\` and \`url\`, Search will not create the index document even if \`name\` is perfect.

\`$('h1').first()\` takes the first heading only. Without \`.first()\`, Cheerio can join every \`h1\` on the page into one string.

If \`name\` is empty in the validator, open View Source on the sample URL. If the heading is already in that HTML and the selector still misses it, fix the selector. If the heading is missing from the raw HTML, the page is filling in later in the browser. That case is covered under Validate, then crawl.

## The product extractor

Products are JSON. Use **JSONPath** on the API crawler. Do not paste Cheerio selectors against a catalog payload.

JSONPath is typed next to each attribute in CEC. It is not a \`function extract\`.

\`\`\`text
id: $.sku
name: $.name
description: $.description
price: $.price
availability: $.inStock
url: $.url
type: product
\`\`\`

\`$.inStock\` stores the raw boolean. If Product Finder needs strings such as \`in_stock\`, map that with the JavaScript extractor below.

\`type\` can be a fixed value on the attribute rule when every item in the source is a product.

If you need logic, such as turning \`true\` into \`in_stock\`, use a JavaScript extractor for the whole document and still return an array of objects. On an API crawler, \`response.body\` is the JSON payload, not HTML. Prefer JSONPath when the fields are already named.

\`\`\`javascript
function extract(request, response) {
    var product = response.body;

    return [{
        "id": product.sku,
        "name": product.name,
        "description": product.description || "",
        "price": product.price,
        "availability": product.inStock ? "in_stock" : "out_of_stock",
        "url": product.url,
        "type": "product"
    }];
}
\`\`\`

If the catalog wraps items in a list, the path starts at that list. One object is still one index document.

## When you need a second extractor

One extractor is enough when every URL, or every payload, looks the same.

The basic **web crawler** only has one Attribute Extraction block. A second document extractor needs an **advanced web crawler** or an **API crawler**.

Add a second extractor when the markup or the JSON is a different shape. Trailworks events on the same XM Cloud site, with a different heading, are a second extractor on \`/events/\`. SharePoint guides that mix HTML and PDFs are the same idea.

Do not add extractors because content came from two systems. That is two sources.

## Validate, then crawl

The **validator** tests your mapping against sample URLs. It does not create index documents.

Paste the article URL, and a product API endpoint the crawler would hit. One happy-path page is not enough. An error on an attribute means that mapping fails for that input. An empty **mandatory** attribute means Search will not index the item at all.

The validator only sees the first HTML the server sends. It does not run the page in a browser, so it never waits for React or other client-side JavaScript to fill in headings and body text. An XM Cloud article can look empty there even when a real crawl will find the content.

On an **advanced web crawler**, there is a crawl setting that loads pages like a browser so client-side JavaScript runs before extraction (in CEC this is usually **Render JavaScript**). That is separate from the Cheerio JavaScript you write in the extractor. If Render JavaScript is on, trust a small crawl and **Content Collection** more than the validator for JS-heavy pages.

## If the result looks empty

| What you see | What to check |
| --- | --- |
| The mapping looks wrong on a sample URL | Validator, then a small crawl if the page is JS-heavy |
| The item is missing | Sources, or a mandatory attribute the extractor never filled |
| The item is there, name or filters are blank | The document extractor. Open Content Collection |
| The attribute does not exist at all | Domain settings, then the extractor |

Republish the source after you change the mapping.

## Where this fits

Question 2 in the [five questions](/blog/sitecore-search-five-questions) post is how content gets into Search. This is the part of that question that decides whether the index is usable.

If the hard part is which attributes belong on which type, that is [entity modeling](/blog/sitecore-search-entity-modeling). If you need the console map, that is [CEC](/blog/sitecore-search-cec-explained).
`,
  },
  {
    slug: "sitecore-search-cec-explained",
    title: "Sitecore Search CEC Explained: The Workbench Behind Search",
    summary:
      "A map of the Sitecore Search Customer Engagement Console: where to go when search is wrong, what the left menu is for, and a practical starting path.",
    publishedAt: "2026-09-04",
    tags: ["Sitecore Search", "CEC", "Sitecore", "Discovery", "Architecture"],
    fullContent: `
# Sitecore Search CEC Explained: The Workbench Behind Search

Sitecore Search has two sides.

Developers wire up APIs, sources, and the site experience. Business teams need a place to configure search, tune results, and check performance without living in code.

That place is the **Customer Engagement Console**, or **CEC**. Most day-to-day search decisions happen here.

A few words come up immediately:

- A **widget** is the search or recommendation experience on the site
- A **page** in CEC holds those widgets, like a search results layout. It is not a CMS page
- A **rule** lives on a widget variation. It boosts, buries, or otherwise changes what that widget shows
- A **source** is how content gets into Search
- **Content Collection** is where you check what was indexed

That is enough to move around.

## The left menu

CEC is a left-hand menu of sections, not a row of tabs. Some sections have their own tabs once you open them.

![Sitecore Search CEC home screen: Site Performance](/blog/cec.png)

Site Performance is the home screen. From top to bottom, the menu is usually:

1. Site Performance
2. Pages
3. Widgets
4. Analytics
5. Global Resources
6. Content Collection
7. Sources
8. Developer Resources
9. Administration

Older docs sometimes call Content Collection **Catalog**.

Not every login sees the full menu. Roles are assigned in the Sitecore Cloud portal, and they change which icons appear.

Most business users can open Pages, Widgets, Analytics, Global Resources, and Content Collection. That is enough to boost results, add synonyms, and check whether content was indexed.

**Developer Resources** appears for the Developer role and above. That is where API keys, the API Explorer, and the event monitor live.

**Sources** and **Domain settings** are tighter. Working with sources and changing domain settings is a TechAdmin permission. If those sections are missing, the login is working as designed. You can still confirm a missing result in Content Collection. You will need someone with TechAdmin access to republish a crawler or enable an attribute.

The menu is more useful as a diagnostic map than as a product tour. Confirm the symptom first, then go to the place that can fix it:

| If this is wrong | Open this |
| --- | --- |
| A result is missing or stale | Content Collection, then Sources |
| Boost, bury, pin, or preview | Widgets |
| The wrong widgets appear together | Pages |
| "uni" vs "university" | Global Resources → Synonyms |
| Default ranking or facets | Global Resources → Global widget |
| Filters or result types still look wrong | Administration → Domain settings |
| "Is search working?" | Site Performance, then Analytics |
| API keys, events, or tracking | Developer Resources |

Example: a scholarship page should appear in search and does not. Look it up in Content Collection. If it is not there, the problem is ingestion: open Sources and check the last crawl. Boosting the widget will not help. If it is there, leave Sources and look at synonyms, ranking, or the widget instead. Open the item: you will see the attributes Search stored, which source it came from, and, if tracking is on, visitor affinity. That is enough to tell whether the problem is ingestion or relevance.

## Domain settings and unified discovery

**Domain settings decides what is possible.** That is where attributes are enabled for filtering, faceting, sorting, or ranking. The global widget and widget rules decide what is actually on. If a filter is missing, check Domain settings first, then the global widget, then the widget variation. That is the debug order.

Open **Administration → Domain settings → Attributes**. Most implementations start from the default Content entity and a starter set of attributes. Anything extra is a custom attribute you create there. Creating it does nothing until a source fills it: map title from an \`h1\`, description from a meta tag or the first paragraph of a PDF, then republish. That extraction step is TechAdmin work.

Search supports **unified content discovery** from the same place. Sources can bring articles, products, and help content into one platform. Attributes on the entity decide whether those items can be matched, filtered, sorted, ranked, or returned in the API.

A widget request is still per entity. One call returns one type. A unified experience is either one entity with a type field, so blogs and help share a result list, or one page with several widgets. The [entity modeling post](/blog/sitecore-search-entity-modeling) covers that choice. Domain settings is where it gets configured.

## A practical starting path

If you are new to CEC, do not try to learn every section at once. This path is how to learn the console, not how to debug a live issue. When something is already wrong, use the table above.

1. Check **Content Collection** and confirm your important content is indexed
2. If it is missing or stale, go to **Sources** before you touch widgets. Republishing a crawler needs TechAdmin access
3. Open **Widgets** and **Pages** and understand what experiences already exist
4. Review **Global Resources** for synonyms, then the global widget if defaults look off
5. If filters or ranking still look wrong, open **Administration → Domain settings**
6. Use **Site Performance** and **Analytics** once traffic is flowing

That order matches how search usually fails in real projects: missing content, unclear experiences, weak matching, then weak measurement.

If analytics look empty, or personalization is not learning, check events in **Developer Resources** before assuming the widgets are wrong.

## Do not start in CEC when

- The team has not agreed what content should be searchable
- Nobody owns how content gets into the index
- Success metrics are still undefined

Those decisions belong in planning first. CEC cannot fix an unclear search scope.

## Where this fits with the rest of Sitecore Search

If you are still deciding what to build, start with [Sitecore Search: 5 Questions to Answer Before You Build](/blog/sitecore-search-five-questions).

If the mapping from page or JSON into attributes is the hard part, continue with [Sitecore Search Document Extractors](/blog/sitecore-search-document-extractors).

If entity modeling is the hard part, continue with [How to Model Entities in Sitecore Search](/blog/sitecore-search-entity-modeling).

If you are choosing between Embedded Search, Sitecore Search, and SitecoreAI Search, read [Embedded Search, Sitecore Search, and SitecoreAI Search](/blog/sitecore-search-options-explained).
`,
  },
  {
    slug: "sitecore-search-options-explained",
    title: "Embedded Search, Sitecore Search, and SitecoreAI Search",
    summary:
      "Start with Embedded Search as the usual SitecoreAI baseline, then compare Sitecore Search and SitecoreAI Search with clear use cases and a feature matrix.",
    publishedAt: "2026-09-03",
    tags: [
      "Sitecore Search",
      "Embedded Search",
      "SitecoreAI Search",
      "Sitecore",
      "Architecture",
      "Discovery",
    ],
    fullContent: `
# Embedded Search, Sitecore Search, and SitecoreAI Search

Sitecore search naming confuses people for a simple reason: it sounds like there is one search product with new labels.

There is not.

I have seen teams mix these names up and plan for the wrong search path. As of September 2026, if you are already on a standard SitecoreAI content site, **Embedded Search is usually a given** for normal website and content search. The harder decision is usually Sitecore Search vs SitecoreAI Search.

## Start here: Embedded Search

**What it is:** Content site search inside SitecoreAI.

Embedded Search is designed for website and content search experiences within SitecoreAI environments, whereas SitecoreAI Search is the broader AI-driven search offering within the SitecoreAI platform.

**Why Sitecore built it:** So SitecoreAI customers can make site content searchable faster, without standing up the full standalone Sitecore Search product.

**Clear use case:**  
A company already runs its marketing site on SitecoreAI. Visitors need to find pages, articles, and help content quickly. Embedded Search is the expected content site search path there.

You may still need **Sitecore Search** on top of Embedded Search. Example: a SitecoreAI marketing site also needs to search a product catalog in another system, boost key pages today, and cover a legacy microsite that is not on SitecoreAI. Embedded Search covers the SitecoreAI site content. Sitecore Search covers the wider search platform needs.

## The bigger decision: Sitecore Search vs SitecoreAI Search

Once Embedded Search covers normal content site search, the remaining choice is usually about maturity and AI depth.

### Sitecore Search

**What it is:** The mature search product that runs on its own.

**Why it exists:** Teams need a full search platform with strong controls today.

**Clear use case:**  
A university needs global site search live in three months. Editors must boost important pages, match related words like "uni" and "university", and show a short AI answer above results. Choose Sitecore Search.

**Choose this when:** you need reliable search soon, with fewer gaps.

### SitecoreAI Search

**What it is:** The fuller AI search path inside SitecoreAI.

**Why it exists:** Sitecore is building toward AI-first discovery inside one SitecoreAI platform, including short AI answers and later AI search experiences. Some of that is still rolling out.

**Clear use case:**  
A team is rebuilding content discovery inside SitecoreAI over the next year. They want search that can grow into richer AI experiences, and they can wait while some features arrive. Choose SitecoreAI Search.

**Choose this when:** you want AI-led discovery inside SitecoreAI, beyond normal content site search.

## Sitecore Search vs SitecoreAI Search feature matrix

Statuses below are point-in-time positioning as of September 2026. Roadmaps move. Treat them as positioning interpretations, not confirmed roadmap commitments.

| Capability | Sitecore Search | SitecoreAI Search |
| --- | --- | --- |
| Bring website pages in through a sitemap | Now | Now |
| Bring content in through an API | Now | Next |
| Search content that already lives in SitecoreAI | Not planned | Now |
| Match related words, like "uni" and "university" | Now | To be confirmed |
| Let teams control which results rank higher or lower | Now | To be confirmed |
| Recommendations | Now | Next |
| Suggestions and results while someone types | Now | Next |
| Short AI answers on top of results | Now | Next |
| AI summaries of results | Not planned | Next |
| Search that understands meaning, not just exact words | Next | Future |
| Search that works like a conversation with follow-up questions | Later | Future |
| Search that can take multi-step actions for the user | Not planned | Future |

Timing key: **Now** = available today. **Next** = near-term roadmap. **Later** = after Next. **Future** = further out, less precise timing. **Not planned** = not on the roadmap for that product right now. **To be confirmed** = not decided or not publicly clear yet.

What some of these rows mean in practice:

- **Sitemap:** point search at \`yoursite.com/sitemap.xml\` so public pages get indexed
- **API intake:** push products, courses, or help articles from another system into search on a schedule
- **SitecoreAI-native content:** search pages and content that already live in SitecoreAI, without a separate crawl setup
- **Recommendations:** show "related articles" or "people also viewed" beside a result
- **Typeahead:** start typing \`schol\` and see scholarship suggestions before you hit enter
- **Short AI answers:** ask \`what scholarships are available?\` and get a short answer above the result list
- **AI summaries:** get a short summary of the top results, not just a list of links
- **Understands meaning:** search \`help paying for school\` and still find scholarship pages even if those exact words are not on the page
- **Works like a conversation:** ask \`undergraduate scholarships\`, then \`only for international students\`, and search keeps the context
- **Takes multi-step actions:** ask \`find a computer science course and show me how to apply\`, and search helps across both steps

As of September 2026, Sitecore Search is usually the more complete option for production-grade search controls. SitecoreAI Search is still catching up on several of those controls.

## Quick chooser

- Already on SitecoreAI and need normal content site search? **Embedded Search** is usually the baseline
- Need mature search controls live soon? **Sitecore Search**
- Building AI-led discovery inside SitecoreAI and can accept gaps? **SitecoreAI Search**
- Want richer AI later? Plan **SitecoreAI Search** after that baseline

If you are still early on search planning itself, start with [Sitecore Search: 5 Questions to Answer Before You Build](/blog/sitecore-search-five-questions).
`,
  },
  {
    slug: "sitecore-search-five-questions",
    title: "Sitecore Search: 5 Questions to Answer Before You Build",
    summary:
      "Five planning questions for Sitecore Search, with a multi-system example that covers how content gets into the index, relevance, and analytics.",
    publishedAt: "2026-09-02",
    tags: ["Sitecore Search", "Sitecore", "CMS", "Discovery", "Architecture"],
    fullContent: `
# Sitecore Search: 5 Questions to Answer Before You Build

"We need search."

You have probably heard this before. What people usually mean is simpler: users cannot find what they need, and the site feels harder to use than it should.

They are not asking for crawlers, APIs, or widgets. They want content to be easy to find.

I have seen teams spend months on widgets and indexing only to realize they never agreed on what content search should include or how success would be measured. The rebuild always takes longer than getting the basics right upfront.

Before building anything in Sitecore Search, it helps to answer five questions:

1. What content is searchable?
2. How does content get into search?
3. How do users search?
4. How is relevance controlled?
5. How is search success measured?

This is the first of two posts on planning Sitecore Search. Here, I walk through all five questions using a running example. The [follow-up post](/blog/sitecore-search-entity-modeling) goes deeper on entity modeling, which is usually where question 1 gets complicated.

## Example: Trailworks

Trailworks is a fictional outdoor brand trying to connect products, editorial content, buying guides, and help articles through one search experience. Their content lives across a commerce platform, XM Cloud, SharePoint, and Zendesk.

Here is how the five questions connect for Trailworks:

\`\`\`flow
Content across systems
Brought into the search index
Search experiences on the site
Relevance tuned
Results measured
\`\`\`

## 1. What Content Is Searchable?

Start with the content people are actually looking for:

- Products
- Articles
- Events
- Buying guides
- Help articles

Then map each type to the system it lives in today:

| Content type | System |
| --- | --- |
| Products | Commerce platform |
| Articles | XM Cloud |
| Events | XM Cloud |
| Buying guides | SharePoint |
| Help articles | Zendesk |

Articles and events both live in XM Cloud. One system can feed more than one content type.

Search needs to know what kind of thing each result is: a product, an article, an event. In Sitecore Search, each type is called an **entity**. Trailworks keeps it simple with one entity per type: Product, Article, Event, Buying Guide, Help Article.

Each entity also needs useful details attached to it. For a product, that might be title, category, collection, and availability. Those details are **attributes**, and they power filters, sorting, and relevance later.

Real projects are rarely this tidy. If you are working through entity boundaries on an existing system, [How to Model Entities in Sitecore Search](/blog/sitecore-search-entity-modeling) covers the common patterns and how to evaluate them.

At this point, you know what can be searched and what information search can work with.

## 2. How Does Content Get into Search?

Content does not appear in search automatically. It has to be brought into the index first.

A **system** is where content lives today. A **content source** in Sitecore Search is the configured connection to that system. Trailworks needs one per platform:

| System | Content source | How it gets in |
| --- | --- | --- |
| XM Cloud | Site crawl | Web crawler |
| Commerce platform | Product catalog | API crawler |
| SharePoint | Buying guide library | Web crawler |
| Zendesk | Help center | API crawler |

A **web crawler** reads pages, and files like PDFs, from a website. An **API crawler** pulls JSON from another system on a schedule.

A **document extractor** is not a third way in. It is a setting on either crawler: how title, description, and the other attributes are mapped from the page or the JSON. [Sitecore Search Document Extractors](/blog/sitecore-search-document-extractors) covers why that mapping decides whether the index is usable, and how to validate it before you crawl.

Once ingested, everything is stored in the **Search Index** and becomes searchable.

This is often the messy part. Crawling one website can be straightforward. Connecting multiple systems, handling security, and keeping everything up to date takes more planning and testing.

Locked content is still a crawler job. A private API uses an API crawler: allowlist the Sitecore Search crawler IPs if the lock is the network, or send the authorization header if the lock is auth. A private website uses an advanced web crawler: the same IP allowlist, or browser login if visitors sign in through a page. Trailworks products still come from the commerce API, even if that API is private.

For Trailworks, the friction shows up in refresh timing. Zendesk articles can change daily, but the commerce catalog syncs on a slower schedule. If search feels stale for products but current for support content, users lose trust quickly. The key decision is not just how each source gets into the index, but how often it needs to refresh and who owns fixing it when something breaks.

## 3. How Do Users Search?

Once content is indexed, think about how people will actually use search.

Trailworks wants three experiences:

- **Global Search**: everything in one place
- **Product Finder**: products only
- **Guides Library**: buying guides only

Each one exists because the search needs are different. Global Search has to balance products, articles, and support content. Product Finder needs filters like size and price that do not apply to articles. Guides Library can use a simpler layout focused on long-form advice.

Each experience is built from widgets like a search box, results list, filters, sorting, and pagination.

The flow is simple:

\`\`\`flow
User searches
Search request
Results come back
Widgets display them
\`\`\`

This is the part users notice most. If search feels slow, confusing, or hard to filter, they will assume the whole implementation is weak.

## 4. How Is Relevance Controlled?

Showing results is not the same as showing the right results.

Trailworks can tune relevance in several ways: through **attributes**, **facets and filters**, **boosting**, and **ranking rules**. A single search might use more than one. The example below shows only **ranking rules**, which change the overall order of results.

If someone searches for **waterproof jacket**, a default relevance model might surface buying guides before products. Trailworks cares most about product sales, so a ranking rule moves products higher:

**Before ranking rules:**

1. Rain Jacket Buying Guide
2. What to Look for in Waterproof Gear
3. Stormbreak Waterproof Shell
4. Spring Gear Launch Event

**After ranking rules:**

1. Stormbreak Waterproof Shell
2. Ridge Runner Rain Jacket
3. Rain Jacket Buying Guide
4. What to Look for in Waterproof Gear
5. Spring Gear Launch Event

The same search could be improved in other ways too. Trailworks might use **boosting** to favor in-stock jackets, or **facets and filters** so users can narrow by size and price. Both depend on **attributes** like availability, category, and price being stored on each result.

Here is how the pieces fit together:

- **Attributes** are the details stored on each result. Search uses them to understand what a result is and what can be filtered or boosted.
- **Facets and filters** are the controls users see to narrow results. A Product Finder might show size and price facets; a Guides Library might show topic instead.
- **Boosting** nudges certain results higher when they match, without changing the rules for everything else. Trailworks might boost in-stock products or items from the current season.
- **Ranking rules** set the default order across result types, like moving products above buying guides in the example above.

You rarely configure just one of these. They work together, and this is where search starts to feel useful or frustrating.

## 5. How Is Search Success Measured?

After launch, the real question is: did search actually help?

Analytics can show patterns like:

**Popular searches**

- waterproof jacket
- hiking boots
- camping gear
- gift guide

These point to content priorities. Trailworks might create seasonal landing pages or boost related products when terms like "gift guide" trend.

**Searches with no results**

- discontinued tent model
- old seasonal campaign

These reveal content gaps. Fix them with new pages, redirects, or search synonyms before users hit a dead end.

**Most clicked results**

- Rain Jacket Buying Guide
- Best Hiking Boots 2026
- Returns and Exchanges

These show what is working. Build more content like the top performers and check whether the right pages are getting clicked.

Search analytics is also one of the easiest ways to prove value after launch. It is worth planning for early, not leaving until later.

## The Full Picture

\`\`\`flow
Content Sources
Content brought into index
Entities + Attributes
Search Index
Search Experiences
Search widgets
Users
Analytics
\`\`\`

Search projects go wrong when teams jump straight to UI or indexing without agreeing on the basics.

Before anyone opens the Sitecore Search admin, run a working session with these five questions on a whiteboard. If the team can answer them clearly, you are much more likely to build something users trust and teams can improve over time.
`,
  },
  {
    slug: "sitecore-search-entity-modeling",
    title: "How to Model Entities in Sitecore Search",
    summary:
      "How to decide entity boundaries in Sitecore Search, with three common patterns, trade-offs, and a practical way to evaluate what you already have.",
    publishedAt: "2026-09-03",
    tags: ["Sitecore Search", "Sitecore", "Architecture", "Discovery"],
    fullContent: `
# How to Model Entities in Sitecore Search

Entities are one of the first things you configure in Sitecore Search, and one of the easiest to get wrong.

Search needs to know what kind of thing each result is: a product, an article, a help page. In Sitecore Search, each type is called an **entity**. An entity defines what details are stored on each result (the **attributes**), what filters users see, and how results are displayed. Get the boundaries wrong and everything downstream gets harder: how content gets into the index, widget setup, and ranking rules.

This is the second of two posts on planning Sitecore Search. The [first post](/blog/sitecore-search-five-questions) walks through five planning questions using Trailworks, a fictional outdoor brand. There, each content type maps to one entity. That is a clean starting point. Most real projects need more thought than that.

I usually start entity work by mapping systems and content types before opening the admin. This post covers the three patterns I see most often, what each one costs you, and how to evaluate which applies to your setup.

## The simple case

In the [Trailworks example](/blog/sitecore-search-five-questions), five content types across four systems each become one entity: Product, Article, Event, Buying Guide, Help Article. One to one, clean, easy to maintain.

That is a good default when content types have different fields, different search needs, and live in different systems. But it is a design choice, not a rule.

Do not split into separate entities just because content comes from different systems. If two types share the same filters, result layout, and ranking needs, one entity is often enough.

## When one to one is not enough

Real projects often use more than one of these patterns at the same time. Trailworks could later keep products and articles separate, split XM Cloud articles into Blog Post and News entities, and combine SharePoint guides with Zendesk help articles into one Support Content entity. The patterns are tools, not either/or choices.

### One system, multiple entities

*Example: XM Cloud indexes Blog Post, News, and Press Release as separate entities, even though editors think of them all as "articles."*

**What you gain:**
- Each type gets its own attributes, filters, and result layout. A press release can show a publish date; a blog post can show an author.
- You can build search experiences that target one type, like a News-only page.

**What it costs:**
- You need rules to route the right XM Cloud content to the right entity. More entities means more setup and more to maintain over time.

### Multiple systems, one entity

*Example: Buying guides in SharePoint and help articles in Zendesk both index as a single Support Content entity.*

**What you gain:**
- Users get one combined result list without needing to know where the answer came from.
- You share one result template and one set of ranking rules across both sources.

**What it costs:**
- Attributes have to work across systems. If SharePoint stores "topic" but Zendesk stores "category" for the same concept, you need to align them when content is brought into the index.

### One content type, multiple entities

*Example: Products split into Gear and Apparel entities.*

**What you gain:**
- Each entity gets its own filters. Gear might filter by weight and capacity; Apparel by size and fit.
- Search experiences can target just one entity, like a Gear-only Product Finder.

**What it costs:**
- The same product feed needs logic to route items into the correct entity. That adds complexity when content is brought into the index.

## How to evaluate your setup

If you are starting fresh, the Trailworks model is a fine place to begin. If you are auditing an existing system or migrating from another search tool, work through the steps below.

The steps use one Trailworks scenario, merging buying guides and help articles, to show how the questions build on each other:

\`\`\`flow
Map systems to content types
Compare to what users search for
Check fields and search experiences
Decide whether to combine or split
\`\`\`

**1. Map your systems to content types**

Start here if you are not sure what you are working with. Draw a simple chart: system on the left, content types on the right. For Trailworks, that looks like this:

\`\`\`flow-map
XM Cloud|Articles, Events
Commerce platform|Products
SharePoint|Buying guides
Zendesk|Help articles
\`\`\`

XM Cloud feeds two content types from one system. If those types need different fields or filters, you may need a separate entity for each.

**2. Compare that map to what users actually search for**

Your system map is technical. User searches are not.

On Trailworks, buying guides live in SharePoint and help articles live in Zendesk. Two systems, two entities. That looks right on paper.

But a user searching **how do I return this?** is not looking for a SharePoint page or a Zendesk article. They want an answer. That question could be satisfied by either a buying guide or a help article.

When the same question works across multiple content types, those types may belong in one entity, even across different systems. This is the **multiple systems, one entity** pattern in practice. For Trailworks, that could mean merging Buying Guide and Help Article into a single Support Content entity. The systems stay separate. Only the search model changes.

**3. Pull sample records and compare fields**

Step 2 tells you whether users treat two types as the same. This step checks whether your data can support that.

Trailworks wants to merge buying guides and help articles. Pull a sample from each:

| Field | Buying guide (SharePoint) | Help article (Zendesk) |
| --- | --- | --- |
| Title | Rain Jacket Buying Guide | Returns and Exchanges |
| Topic | Returns | Returns (labeled "category" in Zendesk) |
| Last updated | March 2026 | March 2026 |

The fields are similar enough. SharePoint calls it "topic" and Zendesk calls it "category," but they represent the same thing. You can align those when content is brought into the index. That is a signal to combine.

Compare that to a product and an article:

| Field | Product | Article |
| --- | --- | --- |
| Title | Stormbreak Waterproof Shell | What to Look for in Waterproof Gear |
| Price | $189 | Not applicable |
| Size options | S, M, L, XL | Not applicable |
| Author | Not applicable | Jamie Rivera |

Very different fields, different filters, different result layouts. That is a signal to keep them as separate entities.

**4. Compare search experience needs**

Shared fields tell you whether types *can* combine. Search experiences tell you whether they *should*.

Trailworks has two dedicated search pages beyond global search:

**Product Finder** (products only)
- Filters: size, price, collection, availability
- Result card: image, price, size options, "Add to cart"

**Guides Library** (buying guides only)
- Filters: topic (e.g. Jackets, Boots, Camping)
- Result card: title, summary, reading time. No price, no sizes.

These need different entities. A user filtering by size on a buying guide makes no sense. Merging products and guides into one entity would mean either hiding useful product filters or showing filters that do not apply to half the results.

The same logic applies within one content type. If Trailworks later splits products into Gear and Apparel, Gear might need weight and capacity filters while Apparel needs size and fit. Different search needs, different entities.

If two types used the same filters, sorting, and result layout, one entity would be simpler. Trailworks products and articles do not, so they stay separate.

**5. Look at what search does today**

Most useful when you are migrating or replacing an existing tool. See how results are grouped, filtered, and ranked now. That often reveals entity boundaries you should keep, merge, or split.

If Trailworks already separates help content from products in their current search, that boundary is worth questioning before rebuilding it. If users already get one combined support result list, that is a signal the merge in steps 2 through 4 may already match how people search.

Here is a quick reference:

| If this sounds like your project... | Consider... |
| --- | --- |
| One system feeds several content types with different fields (like articles and events in XM Cloud) | A separate entity per type |
| Users ask the same question across types in different systems (like returns in SharePoint and Zendesk) | One shared entity |
| One content type needs different filters or result cards (like Gear vs Apparel) | Split into separate entities |
| Each type has its own search needs and clear boundaries (like Trailworks today) | One entity per type |

## The takeaway

Entity modeling is a design decision, not something Sitecore Search decides for you. The boundaries you draw affect how content gets into the index, which attributes exist, and how search experiences behave.

Sketch your systems and content types on paper before you create a single entity in the admin. Map what users search for, check whether your fields and filters support combining or splitting, then configure. If you have not already, start with the [five questions framework](/blog/sitecore-search-five-questions) for the full planning picture.
`,
  },
];

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS.filter((post) => !post.draft).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function blogTagFilterHref(tag?: string): string {
  if (!tag) return "/";
  return `/?tag=${encodeURIComponent(tag)}`;
}
