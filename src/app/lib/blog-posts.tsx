import type { BlogPostStoryShare } from "./blog-story-share";
import { getBlogStoryShareBySlug } from "./blog-story-share";

export type { BlogPostStoryShare };

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  fullContent: string;
  draft?: boolean;
  /** Softer Instagram Story copy. Falls back to title/summary if omitted. */
  storyShare?: BlogPostStoryShare;
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "serp-ui-patterns",
    title: "Planning Search UI: Patterns from Giants and Peer Industries",
    summary:
      "Big engines teach results-page modules. Peer industries teach which recipe fits your site. A pattern pass for anyone planning search UI, with Trailworks examples.",
    publishedAt: "2026-09-21",
    tags: ["Search", "UX", "SERP", "Discovery", "Architecture"],
    storyShare: getBlogStoryShareBySlug("serp-ui-patterns")?.storyShare,
    fullContent: `
Planning search UI from Google alone is how teams ship one results template and wonder why a Product Finder feels like a blog. Big engines teach the **grammar** of a results page: modules, intent, answer-first layouts. Peer industries teach **fit**: which recipe belongs on a catalog, a guide library, or a help center.

I looked at both. Giants for how-to, brand, and shopping compositions. Peers for outdoor retailer, magazine, brand, and help-center search in the same industry as Trailworks ([five questions](/blog/sitecore-search-five-questions)). Peer figures reconstruct typical outdoor site-search patterns; each image is labeled with the site type.

The page is a **layout engine**. Intent picks the **recipe**. Below: four recipes with the matching peer lens, then patterns that cut across those recipes.

## Intent picks the recipe

The engine does not only rank documents. It picks which **blocks** belong on this query, then stacks them. Layout changes with intent more than with branding.

| Intent you type | Modules that tend to dominate |
| --- | --- |
| Informational (\`how to waterproof a jacket\`) | Answer / AI overview, People Also Ask-style follow-ups, videos, then links |
| Navigational (\`trailworks login\`, a brand name) | Sitelinks, fact panel, few distractions |
| Transactional (\`waterproof jacket buy\`) | Shopping cards, ads, reviews, tighter product result cards |
| Local (\`outdoor gear near me\`) | Map / local pack, business cards, then web results |

Trailworks in this series is mostly catalog, guides, and help, so the walkthrough focuses there. Local follows the same rule when you need it: a map or store pack, not another document list.

If your site search treats every query like "find documents," you are fighting that pattern. Design a small set of modules, then decide which combination each experience needs.

## Recipe 1: how-to wants an answer first

For many informational queries, the first thing on the page is not a link. It is an answer block: a short summary, an AI overview with citations, or an extracted snippet. Related questions sit under or beside that. They branch the session without a fresh search box visit. Videos and classic links come after.

![Google-style informational SERP for how to waterproof a jacket: AI Mode tab, People Also Ask, videos, and web results stacked as modules](/blog/serp-google-informational.png)

Bing and DuckDuckGo run the same job with different labels: answer or assist up top, then classic links. The pattern is shared. The labels are not.

Two UI implications:

1. **Zero-click is a feature of the page design**, not only an SEO complaint. The results page tries to finish the job on itself, so the user may never open a link.
2. **Citations and source links still matter.** The answer module usually points back to pages. Your result card is often supporting evidence, not the only destination.

**Same-industry peer for Guides Library.** Outdoor gear magazines and brand education hubs search how-to queries with topic chips, a short answer, then long-form articles. Steal that shape for Guides Library.

![Outdoor gear magazine site search for how to waterproof a jacket: topic chips, quick answer, then guide articles](/blog/peer-guides-library.png)

If you add generative answers to site search: answer on top, sources visible, related questions as the next move. On Trailworks, that belongs on **Guides Library** (and maybe a how-to hit inside global search), not as default Product Finder UI.

## Recipe 2: a brand wants a destination

A navigational query is not "teach me." It is "take me there." On the open web, giants often answer with **sitelinks** (shortcut links under the main result) plus a **fact panel** (Google calls this a knowledge panel) for a known brand. The list still exists. The panel answers "what is this thing?" without making you open a page.

![Google-style navigational SERP for Sitecore: organic result with sitelinks plus a knowledge panel on the right](/blog/serp-google-navigational.png)

Structured attributes are not only for facets (the clickable filters with counts on a catalog). They are how a known entity becomes a fact panel beside the list. Empty attributes mean empty panels, same lesson as in the [extractors](/blog/sitecore-search-document-extractors) post.

Giants teach fact panels for brands the engine already knows. On your own outdoor site, the same "go somewhere" job usually looks different: search for \`stores\` or \`account\` should hit a destination page, not a product grid.

**Same-industry peer for destinations.** On an outdoor retailer's website, \`stores\` opens store locator, hours, and pickup with a fact panel and a couple of related pages. Steal that for Trailworks login, orders, stores, and landing pages. Product cards stay in Recipe 3.

![Outdoor retailer site search for stores: destination page with sitelinks and a stores fact panel](/blog/peer-brand-destination.png)

## Recipe 3: shopping wants a catalog (and mixed search wants packs)

This recipe has two outdoor peers: **catalog search** for Product Finder, then **mixed header search** for global search.

Transactional intent brings product cards, filter pills, price, and ratings into the page itself. Images, videos, shopping, news, and local packs show up as **carousels or grids inside the page**, not as filters you must open first.

![Google Shopping-style layout for waterproof jacket: filter pills, product cards, and catalog chrome instead of a plain link list](/blog/serp-google-shopping.png)

Giants teach product cards inside the open-web results page. Outdoor peers teach the same job on a brand site: left-rail facets and in-stock honesty, not only a grid of cards.

Some result types need their own visual language. A video row with thumbnails, a product row with price and availability, a people row with contact details. Mixing them into one identical card style makes the page harder to scan.

**Same-industry peer for Product Finder.** Outdoor retailer catalogs search \`waterproof jacket\` with left-rail facets and product cards: size, price, in-stock, waterproof rating. That is the peer for Trailworks Product Finder, not a web link list.

![Outdoor retailer catalog search for waterproof jacket: size and price facets beside product cards](/blog/peer-outdoor-retail.png)

**Same-industry peer for global / header search.** Outdoor brand sites often mix products, guides, and help in one header box. Results come back as **typed packs** (grouped blocks by type: products, then guides, then help), not one card style. Steal that for Trailworks global search.

![Outdoor brand header search for waterproof: separate packs for products, guides, and help](/blog/peer-mixed-global.png)

The [entity modeling](/blog/sitecore-search-entity-modeling) choice and the [filters](/blog/sitecore-search-filters-facets) on each surface are how you keep those packs honest.

## Recipe 4: help wants a suggested answer, then a short list

Support queries are not catalog browse and not brand discovery. Outdoor brand help centers put a suggested article up top, then a tight list. Steal that for Trailworks support content.

![Outdoor brand help-center search for return raincoat: suggested article then tight help results](/blog/peer-support-help.png)

## Cross-cutting patterns

**Promos, pins, and boosts.** Giants label paid modules that still look like organic cards. Outdoor retailers do the same on product search: a campaign item keeps product-card layout, with a **Promoted** (or similar) label so it is not mistaken for natural rank. In Sitecore Search terms: a **pin** forces an item into a slot; a **boost** only lifts items that already match the query.

![Outdoor retailer product search with a labeled Promoted pin above organic waterproof jacket results](/blog/peer-promo-boost.png)

Same Peak Outfitters catalog surface as Recipe 3; the point here is the **Promoted** badge on the pin, not the grid itself. On Trailworks, the monsoon pin for Stormbreak on \`waterproof jacket\` and a Rain collection boost should read the same way on Product Finder: same card grammar, honest label ([widgets](/blog/sitecore-search-widgets-variations)).

**Refinement.** Informational surfaces lean on topic chips and related questions. Catalog surfaces lean on facets (size, price, and similar filters with counts). Same job (narrow or branch), different controls.

![Outdoor gear magazine search with topic chips and People also searched questions under the results](/blog/peer-refinement.png)

Same Trail Notes magazine surface as Recipe 1; notice the **People also searched** block under the list. On Trailworks: topic + related questions on Guides Library and global search; size and price facets on Product Finder. The [filters and facets](/blog/sitecore-search-filters-facets) post is the narrowing toolkit.

**Conversation.** Giants put follow-up chat in a second mode (AI Mode / Copilot-style), with citations and suggested next questions, while classic results stay one tab away.

![Google AI Mode-style conversation for how to waterproof a jacket: answer, follow-up, citations, and suggested next questions](/blog/peer-conversation.png)

On Trailworks, ship modular Product Finder and Guides Library first. Add follow-up chat only when you have citations, tracking, and a task one results page cannot finish.

## Trailworks map

Benchmark **outdoor websites** that already solve each job:

| Trailworks surface | Job | Outdoor peer website search | What the figure shows |
| --- | --- | --- | --- |
| Guides Library | Learn how-to | Gear magazine / education hub article search | Topic chips, quick answer, guides (Recipe 1) |
| Destinations | Go somewhere | Outdoor retailer site search for stores / account | Destination + sitelinks + fact panel (Recipe 2) |
| Product Finder | Buy gear | Outdoor retailer catalog search | Facets + product cards (Recipe 3) |
| Global / header | Mix types | Outdoor brand header search | Typed packs for product / guide / help (Recipe 3) |
| Help / support | Fix a problem | Outdoor brand help-center search | Suggested article, then a short list (Recipe 4) |

Promos, related questions, and conversation cut across those surfaces: label pins on Product Finder, related searches on Guides Library, chat only when a session task needs it.

## Where this fits

Use this post to **plan results page UI**. Use the Sitecore series to build it: [5 questions](/blog/sitecore-search-five-questions) through [widgets](/blog/sitecore-search-widgets-variations) cover what is searchable, how it gets in, and which experience owns the change.
`,
  },
  {
    slug: "website-performance-assessment",
    title: "When Everyone Says the Site Is Slow",
    summary:
      "A short performance pass for any site: compare a few pages, name the pattern, split tags from your own code, then assign owners.",
    publishedAt: "2026-09-22",
    tags: ["Performance", "Architecture", "Assessment"],
    storyShare: getBlogStoryShareBySlug("website-performance-assessment")
      ?.storyShare,
    fullContent: `
Someone drops a red Lighthouse screenshot in the chat. Marketing gets blamed for tags. The host or CMS gets blamed for "slow pages." Engineering gets asked if we should rewrite the front end. Nobody has opened three pages side by side yet.

The first job is not a bigger audit. It is answering one question: **is the slowness everywhere, or only on some pages?** Then name the pattern, split where the time goes, and say who moves next.

Before you dig into DevTools, glance at live signals if you have them (Search Console page experience, analytics, which page types get traffic). A red lab run on your laptop is a clue, not proof that customers are hurting. If you have no live access, call the pass **lab-only** and keep claims humble.

This works on any site. Stack details come later.

## Start from what people feel

Name the symptom before tools:

- Looks painted, then feels stuck
- Taps and clicks feel laggy
- Same slowness on every template you try
- Content late, or the page jumps while loading

Pick **3 to 5 URLs**:

| Count | What to pick | Why |
| --- | --- | --- |
| 2 to 3 | Same kind of page (product, article, listing, help) | Shared-slow template vs one weird URL |
| 1 | Home or another main entry | Same global chrome outside that template |
| Optional | A **control** page: thin content, no form / search / chat / video | Separates global cost from feature cost |
| Stop at 5 | Unless checkout or logged-in is the complaint | More URLs rarely change the first-pass story |

You do not need every CMS template. You need enough to answer: **everywhere, or only some?**

## Run the same browser pass on each URL

Use a **clean Chrome profile**. Extensions fake the script chart. Mobile first if that is where people are.

The panels below are **simplified**. Real DevTools is denser; the callouts are the point.

**1. Lighthouse**  
Score, blocking time (TBT), layout jump (CLS). Read the parts, not only the score. Red score with CLS at 0 usually means busy JavaScript, not a jumping layout.

![Lighthouse mobile report with a red Performance score of 32, high blocking time, and CLS at 0](/blog/perf-lighthouse.png)

**2. Script breakdown**  
Which files take the bytes. Same big blocks on every page usually means global cost: your site scripts next to the tag stack.

![Script breakdown treemap with a large site bundle beside tag manager, analytics, chat, and ads](/blog/perf-treemap.png)

**3. Performance recording**  
Where time goes. Long tasks after paint explain laggy taps.

**Takeaway:** lab LCP (throttled Lighthouse) can look awful while runtime LCP on a normal machine is already fine. Blocking time often stays high in both views. Chase that, not only the scary lab paint number.

![Performance timeline with a long red main-thread task after paint and an LCP marker](/blog/perf-performance.png)

**4. Network**  
What loaded, from where, how big. How long the first HTML took, tags on every page, oversized images.

![Network panel listing document, main-app.js, external scripts, and a hero image with sizes](/blog/perf-network.png)

Do not prescribe a rewrite until you match a pattern row.

## Name the pattern

| What you see | Likely story | What to do next |
| --- | --- | --- |
| All pages rhyme: same tags, same big site scripts, scores in the same band, little layout jumping | Shared global cost | Stop collecting URLs. Fix what loads on every page. |
| One URL is awful; siblings look fine | Page-specific (media, embed, redirect, bad query) | Dig into that URL only. |
| One template type is slow; others and home are fine | Template-level | Confirm with one more bad + one good, then fix that template. |
| Home fine / rest slow (or reverse) | Not only the global chrome | Compare what home loads vs the slow set. |
| Control page still busy | Global scripts and tags, not that feature | Do not start by rewriting the feature. |
| Page jumps while loading | Layout stability (fonts, ads, images without size) | Different fix list than "JS is busy." |
| Main content late; first HTML is slow in Network | Hosting / cache / first HTML | Measure server response before blaming tags. |
| Mobile bad; desktop fine (or reverse) | Device or audience mismatch | Optimize the surface people use. |
| No clear rhyme after 5 pages | Mixed causes or a special flow | Second pass on the money path (checkout / logged-in). |

Name the row out loud before anyone owns a fix.

### What shared cost often looks like

When several money pages all land in the same poor lab band:

- Layout is not jumping (CLS at 0)
- Throttled lab paint looks dramatic; on a normal machine main content already appeared
- The page still feels busy after it paints (blocking time / long script work)
- The same tags and the same site scripts show up everywhere
- A thin control page (no form, search, chat) is still expensive

That is not "this article is bad." It is not "buy a bigger server" on its own. It is global cost.

## Split where the time goes

Whatever the stack, time usually sits in four buckets. Mark which ones you actually saw:

| Cost centre | Evidence you look for | Typical fix shape |
| --- | --- | --- |
| **Tags and embeds** | Same tag manager, pixels, chat, A/B tools, embeds on every URL | Marketing / analytics trim or defer |
| **Your site's global code** | Same theme or app scripts on every URL | Ship less on every page; load heavy bits only where needed |
| **Media / layout** | Huge images, fonts, page jumping (CLS above 0) | Set image sizes, compress, fix fonts |
| **First HTML / host** | Slow first HTML, redirects, weak cache | Measure how long the server takes; platform owns if proven |

**Both** tags and your own global scripts often matter on the same site. Cleaning tags alone will not clear your own JS. Cleaning your shell alone leaves the tag stack.

Once the pattern is shared global cost, ask:

- What is injected on **every** page (layout, theme, base template, tag manager)?
- What ships because of a **wide import** (plugin pack, component map, "load everything" header)?
- What loads on **first paint** that could wait for a click (form, search UI, chat)?
- Is an experiment tool **hiding the page** or running when no test is live?

The answers differ by stack. The questions do not.

## Three words you will hear in the room

| Shorthand | Plain meaning | How to use it |
| --- | --- | --- |
| **LCP** | When the main content appears | Lab can look awful under throttling. Check a normal-machine recording too. |
| **TBT** | How long JavaScript blocks taps and clicks | High TBT with a painted page is the "feels stuck" story. |
| **CLS** | How much the page jumps while loading | **0** is ideal. Red score with CLS at 0 usually means busy JS. |

## Who owns the next move

| If you keep seeing… | Likely owner |
| --- | --- |
| Same big site scripts on every page | Engineering: ship less globally |
| Same trackers / long tag time | Marketing / analytics: tag and consent review |
| Experiment or hide-the-page scripts with no live test | Experimentation owner: scope or remove |
| Heavy widget on first paint | Engineering: load after the user asks (button, open, next step) |
| Huge media, missing dimensions | Engineering / content |
| Slow first HTML / bad redirects (measured) | Platform / hosting |

"Name the row first, then assign owners. If both tags and your own scripts show up, that is two workstreams, not one villain. Re-measure the same URLs before anyone quotes an exact time saving."

## What good enough looks like

1. **Symptom** in one sentence
2. **Pattern row** from the table
3. **Cost centres** in play (tags / your code / media / first HTML)
4. **Now vs later** backlog with owners
5. **Success:** same URLs, same settings; blocking time / scripting improved. Score is a side effect.

## Easy ways to get lost

- Testing one page and calling it the site
- Blaming hosting because Lighthouse is red
- Trusting a browser full of extensions
- Treating lab LCP as truth when runtime paint looks fine
- Cleaning only tags or only your own code when both show up
- Rewriting the framework before cutting unused global code
- Only testing desktop while visitors are on phones
- Ignoring live signals and treating one lab run as truth

## Cheat sheet

| Step | Do this | Stop when |
| --- | --- | --- |
| Live signals | Search Console, analytics, traffic (if you have access) | Lab claim matches live reality, or you labelled lab-only |
| Pick URLs | 3 to 5 pages | You can answer "everywhere or only some?" |
| Same browser pass | Lighthouse + scripts + Performance + Network | Every URL has the same four panels |
| Name the pattern | Match a row in the pattern table | One row is the working theory |
| Split cost centres | Tags vs your code vs media vs first HTML / host | You know which doors matter |
| Owners and backlog | Who moves next; now vs later | Short backlog with owners |
| Success check | Re-run the **same URLs** with the **same settings** | The named metric moved; score is secondary |

Symptoms first. Causes second. Fix list only after both.

## Where this fits

PMs, tech leads, and consultants stuck in a "the site is slow" blame meeting. Use it to get a shared next step before anyone rewrites anything.
`,
  },
  {
    slug: "sitecore-search-widgets-variations",
    title:
      "Sitecore Search Widgets and Variations: Where the Experience Actually Lives",
    summary:
      "When to change one Sitecore Search widget versus the global widget, with Trailworks Product Finder and a site-wide monsoon campaign.",
    publishedAt: "2026-09-09",
    tags: ["Sitecore Search", "CEC", "Sitecore", "Discovery", "Architecture"],
    fullContent: `
The search experience does not live in the index. It lives on a **widget**: the Sitecore Search setup behind an id called **rfk_id**. The site asks for that id. Marketers control what it returns.

This post is that layer: a widget's **Default variation**, optional **extra variations**, optional **rules**, and when to use the **global widget**. The [CEC map](/blog/sitecore-search-cec-explained) shows where Widgets and Global Resources sit in the console.

**Series:** [Options](/blog/sitecore-search-options-explained) → [5 questions](/blog/sitecore-search-five-questions) → [Entities](/blog/sitecore-search-entity-modeling) → [Extractors](/blog/sitecore-search-document-extractors) → [CEC](/blog/sitecore-search-cec-explained) → [Filters and facets](/blog/sitecore-search-filters-facets) → **Widgets**

## Trailworks: one widget, one campaign

Trailworks sells outdoor gear. For spring, marketing wants **waterproof jacket** on Product Finder to behave a certain way. Header search should stay normal.

Here is what already exists:

| Piece | What it is |
| --- | --- |
| Product Finder | One **Search Results** widget, \`rfk_id\` = \`tw_product_finder\`, entity = Product |
| Header search | A **Preview Search** widget; separate \`rfk_id\` |

The Product Finder page on the site already uses \`tw_product_finder\`. If it did not, changes in CEC would not show up for shoppers.

Until now, Product Finder's active variation had **no rules**. It still worked. Results came from the index and whatever was set on that widget.

For the campaign, marketing opens **Widgets → tw_product_finder → active variation** and adds **one rule**:

- **Context:** only when the keyphrase is waterproof jacket. Leave Context empty and this rule would run on **every** query on Product Finder, which is broader than the campaign.
- **Pin:** Stormbreak Waterproof Shell in **slot 1**. It stays first even if natural ranking would put something else there.
- **Boost:** items in the Rain collection. They rise when they already match the query. They are not forced into a slot.

Pin when a specific item must occupy a slot. Boost when a set of items should rise only if they already qualify. **Bury** and **blacklist** are the same rule toolbox for the opposite job: push last-season jackets down, or hide a discontinued SKU for this campaign.

They publish. Only Product Finder changes. Header search never got this rule, so shoppers typing in the header still see normal ranking.

Later they add a **second rule** on the same variation: Context = returning visitors, **Boost** the Trailblazer loyalty collection. Both rules show on the Rules tab with a **Rank**. Drag to reorder. When two rules conflict, the one with the lower rank number wins (rank 1 beats rank 2).

That is enough for a Product Finder-only campaign. You did not need a second concept yet.

## Trailworks: when every search surface should change

Two weeks later, a monsoon promo should lift Rain across **every** search box: Product Finder, header search, and anything else on the site.

You could open each widget and paste the same boost. That is brittle. Miss one \`rfk_id\` and that surface stays wrong until someone notices.

Sitecore Search has one shared widget for that job: the **global widget**, under **Global Resources → Global widget**. It is not a search box on the site. Shoppers never call its \`rfk_id\`. Every real widget (Product Finder, header search, and the rest) can inherit what you set there.

Trailworks opens the global widget, creates a **scheduled variation**, and adds one rule: **Boost** the Rain collection for the campaign window, then let it expire. They publish.

What shoppers get:

| Surface | What happens |
| --- | --- |
| Header search | Inherits the Rain boost from the global widget. No rule was added on the header widget itself. |
| Product Finder | Gets the Rain boost too, and still keeps the waterproof jacket pin on \`tw_product_finder\`. Rules on this widget win when they conflict with global defaults. |
| After the schedule ends | Global variation expires. Rain boost drops everywhere. Product Finder pin remains until someone removes that rule. |

So: change **one** widget when only that experience should move. Use the **global widget** when the same default or campaign should land on every surface without editing each \`rfk_id\`.

You can run Product Finder with nothing special on the global widget. Turning a facet on for one experience is [filters and facets](/blog/sitecore-search-filters-facets). Putting that same default on every surface is a global widget job.

## The stack

\`\`\`flow
Optional global widget defaults
Widget variation for this rfk_id
Optional rules on that variation
Site uses the rfk_id
\`\`\`

Search combines the active global widget variation (if you use one) with the active variation of the widget in the request. A widget is the experience behind an \`rfk_id\`. A variation always exists (Default, plus optional extras you can schedule or test). Rules on a variation are optional. The global widget is optional shared defaults until several surfaces need the same change.

## Where to put the change

| Need | Put it here |
| --- | --- |
| Availability facet on for every search surface | Global widget (default variation); enable the facet first per [filters and facets](/blog/sitecore-search-filters-facets) |
| Stormbreak #1 for waterproof jacket on Product Finder only | Rule on \`tw_product_finder\`, with Context |
| Different behavior for waterproof jacket vs returning visitors on Product Finder | Two rules on the same \`tw_product_finder\` variation; set Rank if they conflict |
| Two-week Rain promotion on every search box | Scheduled variation on the **global** widget |
| Same Rain promotion, Product Finder only | \`tw_product_finder\` variation, not global |
| Test-week Product Finder setup, then revert cleanly | Extra widget variation; leave Default alone |
| Last-season jackets down, or a discontinued SKU hidden, on Product Finder only | Bury or blacklist on that widget variation |
| Discontinued SKU gone everywhere | Rule on a global widget variation |

Same widget, different contexts → two rules and Rank. A whole setup you might throw away after a test week → extra variation; leave Default alone.

## Where this fits

This is the widget layer: which variation owns the change, whether a rule is needed, and when the global widget is worth using. Attributes must be filled by [extractors](/blog/sitecore-search-document-extractors) and allowed in Domain settings before a widget can filter or facet on them. That handoff is [filters and facets](/blog/sitecore-search-filters-facets). After that, the widget variation turns them on.
`,
  },
  {
    slug: "sitecore-search-document-extractors",
    title: "Sitecore Search Document Extractors: How Attributes Get Filled",
    summary:
      "Why a crawled URL can still be useless in Sitecore Search, and how Trailworks fills name and price with a document extractor.",
    publishedAt: "2026-09-04",
    tags: ["Sitecore Search", "Sitecore", "Discovery", "Architecture"],
    fullContent: `
A crawler can fetch a URL and the item can still be useless in search.

Search only knows what the **document extractor** stored. If that mapping missed the heading or the price field, the result has no **name**, or the Product Finder cannot sort.

That mapping is the difference between an indexed URL and a searchable item.

**Series:** [Options](/blog/sitecore-search-options-explained) → [5 questions](/blog/sitecore-search-five-questions) → [Entities](/blog/sitecore-search-entity-modeling) → **Extractors** → [CEC](/blog/sitecore-search-cec-explained) → [Filters and facets](/blog/sitecore-search-filters-facets) → [Widgets](/blog/sitecore-search-widgets-variations)

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

Question 2 in the [five questions](/blog/sitecore-search-five-questions) post is how content gets into Search. This is the part of that question that decides whether the index is usable. Once attributes are filled, [filters and facets](/blog/sitecore-search-filters-facets) decide what visitors can narrow by.
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
Sitecore Search has two sides.

Developers wire up APIs, sources, and the site experience. Business teams need a place to configure search, tune results, and check performance without living in code.

That place is the **Customer Engagement Console**, or **CEC**. Most day-to-day search decisions happen here.

**Series:** [Options](/blog/sitecore-search-options-explained) → [5 questions](/blog/sitecore-search-five-questions) → [Entities](/blog/sitecore-search-entity-modeling) → [Extractors](/blog/sitecore-search-document-extractors) → **CEC** → [Filters and facets](/blog/sitecore-search-filters-facets) → [Widgets](/blog/sitecore-search-widgets-variations)

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

**Domain settings decides what is possible.** That is where attributes are enabled for filtering, faceting, sorting, or ranking. The widget variation decides what is actually on for that experience. If a filter is missing, check Domain settings first, then the widget variation. That is the debug order.

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

This post is the console map. For filters vs facets (Domain settings vs what is on), continue with [Filters and facets](/blog/sitecore-search-filters-facets). For pin, boost, bury, and variations, continue with [Widgets and variations](/blog/sitecore-search-widgets-variations).
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
Sitecore search naming confuses people for a simple reason: it sounds like there is one search product with new labels.

There is not.

I have seen teams mix these names up and plan for the wrong search path. As of September 2026, if you are already on a standard SitecoreAI content site, **Embedded Search is usually a given** for normal website and content search. The harder decision is usually Sitecore Search vs SitecoreAI Search.

**Series:** **Options** → [5 questions](/blog/sitecore-search-five-questions) → [Entities](/blog/sitecore-search-entity-modeling) → [Extractors](/blog/sitecore-search-document-extractors) → [CEC](/blog/sitecore-search-cec-explained) → [Filters and facets](/blog/sitecore-search-filters-facets) → [Widgets](/blog/sitecore-search-widgets-variations)

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

If you have already chosen Sitecore Search, continue with [Sitecore Search: 5 Questions to Answer Before You Build](/blog/sitecore-search-five-questions).
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

This is the planning opener for the Sitecore Search series. Here, I walk through all five questions using a running example. Later posts go deeper where each question gets hard.

**Series:** [Options](/blog/sitecore-search-options-explained) → **5 questions** → [Entities](/blog/sitecore-search-entity-modeling) → [Extractors](/blog/sitecore-search-document-extractors) → [CEC](/blog/sitecore-search-cec-explained) → [Filters and facets](/blog/sitecore-search-filters-facets) → [Widgets](/blog/sitecore-search-widgets-variations)

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

The deep cuts live elsewhere in the series: [filters and facets](/blog/sitecore-search-filters-facets) for narrowing results, and [widgets and variations](/blog/sitecore-search-widgets-variations) for pin, boost, bury, and blacklist on a specific experience.

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
Entities are one of the first things you configure in Sitecore Search, and one of the easiest to get wrong.

Search needs to know what kind of thing each result is: a product, an article, a help page. In Sitecore Search, each type is called an **entity**. An entity defines what details are stored on each result (the **attributes**), what filters users see, and how results are displayed. Get the boundaries wrong and everything downstream gets harder: how content gets into the index, widget setup, and ranking rules.

This post goes deeper on question 1 from the [five questions](/blog/sitecore-search-five-questions) opener. There, each content type maps to one entity. That is a clean starting point. Most real projects need more thought than that.

**Series:** [Options](/blog/sitecore-search-options-explained) → [5 questions](/blog/sitecore-search-five-questions) → **Entities** → [Extractors](/blog/sitecore-search-document-extractors) → [CEC](/blog/sitecore-search-cec-explained) → [Filters and facets](/blog/sitecore-search-filters-facets) → [Widgets](/blog/sitecore-search-widgets-variations)

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

Sketch your systems and content types on paper before you create a single entity in the admin. Map what users search for, check whether your fields and filters support combining or splitting, then configure. Next up for attributes on those entities: [document extractors](/blog/sitecore-search-document-extractors), then [filters and facets](/blog/sitecore-search-filters-facets).
`,
  },
  {
    slug: "sitecore-search-filters-facets",
    title: "Sitecore Search Filters and Facets: What Narrows Results",
    summary:
      "How filters and facets narrow Sitecore Search results, starting from Trailworks Product Finder and a missing hard filter.",
    publishedAt: "2026-09-08",
    tags: ["Sitecore Search", "Sitecore", "Discovery", "Architecture", "Filters"],
    fullContent: `
Trailworks Product Finder should show jackets you can buy. Size chips should mean something. Buying guides should stay out of that list.

When that fails, teams usually blame ranking. The real gap is usually how results get **narrowed**: filters, facets, and hard filters.

**Series:** [Options](/blog/sitecore-search-options-explained) → [5 questions](/blog/sitecore-search-five-questions) → [Entities](/blog/sitecore-search-entity-modeling) → [Extractors](/blog/sitecore-search-document-extractors) → [CEC](/blog/sitecore-search-cec-explained) → **Filters and facets** → [Widgets](/blog/sitecore-search-widgets-variations)

## Trailworks: waterproof jacket on Product Finder

Shopper types **waterproof jacket** on Product Finder (\`tw_product_finder\`, entity = Product).

1. A **hard filter** keeps the pool to products (and, if you set it, not discontinued). Buying guides never enter the list.
2. Search returns matching jackets. **Facet** options are built from those results only: sizes that exist, price ranges that exist, collections that exist.
3. Shopper clicks size **M**. Results shrink. Other facets update with the new set.

Campaign pins and boosts can still run inside that set. They do not replace the hard filter. That layer is the [widgets](/blog/sitecore-search-widgets-variations) post.

Without the hard filter, the same query can surface a Rain Jacket Buying Guide. Size facets look empty or weird because guides have no size. Facet counts lie because the pool was never product-only.

Header search stays lighter: do not copy Product Finder's size and price facets onto every surface. Guides Library gets **topic**, not size. Put each control on the widget that needs it.

## Names for what you just saw

A **filter** limits which items Search returns.

A **facet** is the UI that shows categories from attribute values already on those items. Facet options are dynamic: they follow the query and whatever hard filters already applied. Empty attributes mean empty facets.

**Visible filters** are on the page. The visitor chooses size, price, collection.

**Hard filters** run with no click. Visitors cannot clear them. They run before ranking, before facet counts, and before anything the visitor picks. Examples: Product Finder stays on products; Guides Library stays on buying guides; a campaign page stays on the Rain collection.

Hard filter is not a **blacklist** rule. A hard filter says this pool never includes X. A blacklist says for this query or context, hide these items. Always-true constraints belong on the page or widget as a hard filter. Campaign exceptions belong in rules.

Same attribute can do both jobs. Trailworks uses **availability** as a facet shoppers click, and as a hard filter so discontinued SKUs never enter Product Finder.

## Where you turn it on

Two steps. Miss either one and the control never shows up.

1. **Administration → Domain settings**: enable the attribute for filtering or faceting. That makes it **possible**.
2. **This widget** (and page hard filters if the whole CEC page should be scoped): turn it **on**.

For Product Finder, turn size and price on \`tw_product_finder\`. Give Guides Library its own topic facet on its widget. Do not copy one surface's controls onto every other widget.

Creating the attribute does nothing until a [document extractor](/blog/sitecore-search-document-extractors) fills it. [CEC](/blog/sitecore-search-cec-explained) is the map for the screens.

\`\`\`flow
Attribute filled in Content Collection?
Enabled in Domain settings?
Turned on for this widget or page hard filter?
\`\`\`

## When it looks broken

| Symptom | Check |
| --- | --- |
| Facet missing in the UI | Domain settings, then this widget variation |
| Facet shows, options empty | Content Collection, then the extractor |
| Wrong types in the list, or weird facet counts | Page or widget hard filter |
| Discontinued items appear | Hard filter on availability |
| Facet list is huge or useless (SKU, free text) | Facet only on short, meaningful value lists; price as ranges |
| Three chips for one collection (\`Rain\` / \`rain\` / \`Rain Collection\`) | Source data or extractor normalization |

## Where this fits

Question 4 in the [five questions](/blog/sitecore-search-five-questions) post is how relevance is controlled. This post is the narrowing half. Entity shape is [entity modeling](/blog/sitecore-search-entity-modeling). Campaign pin, boost, bury, and blacklist are [widgets](/blog/sitecore-search-widgets-variations).

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
  // Include drafts so direct /blog/[slug] preview works while writing.
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export async function getAdjacentBlogPosts(slug: string): Promise<{
  previous: BlogPost | null;
  next: BlogPost | null;
}> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  // Posts are newest-first: previous = older, next = newer.
  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
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
