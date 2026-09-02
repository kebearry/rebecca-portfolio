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
| XM Cloud | Site crawl | Crawler |
| Commerce platform | Product catalog | API |
| SharePoint | Buying guide library | Document extraction |
| Zendesk | Help center | API |

A **crawler** reads pages from a website automatically. An **API** pulls structured data from another system on a schedule. **Document extraction** pulls text and metadata out of files like PDFs.

Once ingested, everything is stored in the **Search Index** and becomes searchable.

This is often the messy part. Crawling one website can be straightforward. Connecting multiple systems, handling security, and keeping everything up to date takes more planning and testing.

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
