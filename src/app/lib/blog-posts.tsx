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
    slug: "search-no-results",
    title: "What to Show When Search Finds Nothing",
    summary:
      "Zero results is usually one of four problems. How to tell which, what the empty page should show, and when an AI answer helps or hides the failure.",
    publishedAt: "2026-10-05",
    tags: ["Search", "UX", "Sitecore"],
    storyShare: getBlogStoryShareBySlug("search-no-results")?.storyShare,
    fullContent: `
A visitor on the Trailworks site types "stormbreaker jacket" into search. The jacket is called Stormbreak. The page says "No results found," and that's all it says. The visitor leaves, and nobody on the team ever hears about it.

Most teams design the results page carefully and leave the empty page as an afterthought. But it's where search quietly loses people.

**Zero results is usually one of four different problems**, and each one needs a different answer from the page.

## Why the page is empty

When I look at a list of searches that returned nothing, they almost always fall into one of these:

- **The words don't match.** A typo ("stormbreaker"), a different word for the same thing ("raincoat" when you call it a "waterproof jacket"), or a plural or spelling difference. The content exists. The search just didn't connect the two.
- **The filters are too strict.** There are results, but the visitor has narrowed things down until nothing is left. Waterproof jackets exist, just not in size XS and orange at the same time.
- **You really don't have it.** A discontinued tent, a brand you've never stocked, or a service you don't offer. Search is working correctly. The answer is "nothing."
- **It exists, but search can't see it.** The page or document is there, but it never made it into the search index (the list search looks through). Maybe it was left out by mistake, or its text was never pulled out of the file. That's a search bug, not a design problem, and it needs fixing at the source. My [CEC](/blog/sitecore-search-cec-explained) post shows how to check whether an item made it into the index, and the [document extractors](/blog/sitecore-search-document-extractors) post covers one common reason it didn't.

The first three are what the empty page has to handle. The fourth is one to log and fix, because no amount of good design helps when search can't see your content. In the meantime, the fallback layers still catch those visitors.

## What the page should show

I build the empty page in layers. Layer 1 always shows, even when layer 2 corrects the search. It just changes from "No results for" to "Showing results for." After that, the specific layers come first, because they fix the visitor's actual problem, and the general ones are the fallback. Not every site needs every layer.

None of these layers is a new idea. Usability researchers like [Baymard](https://baymard.com/blog/no-results-page) have recommended them for years, and still find that about half of the large online shops they test don't give people a good way to recover. What most teams miss is matching each layer to its cause, which is the section after them.

**1. Say what happened, and repeat their search.** "No results for 'stormbreaker jacket'." Showing their exact words lets people spot their own typo. Avoid wording like "Invalid search term," which sounds like the visitor did something wrong.

**2. Fix the words for them, or suggest a fix.** If you're confident it's a typo, show the corrected results straight away and say so: "Showing results for 'stormbreak jacket'. Search instead for 'stormbreaker jacket'." If you're less sure, offer it as a suggestion they can click.

![Trailworks search for "stormbreaker jacket," corrected to "stormbreak jacket," with a link to search the original words](/blog/no-results-typo.png)

**3. Show which filters are causing it.** If filters emptied the page, say which ones, and how many results each would bring back: "No results with Size XS and Color Orange. Remove Color to see 12 jackets." This turns a dead end into one click. My [filters and facets](/blog/sitecore-search-filters-facets) post covers how filters narrow results in the first place.

**4. Be honest, then offer a way forward.** If you don't have it, say so. Someone searching for a discontinued tent should see that it's no longer sold, plus the closest current option. A clear "we don't sell that anymore" beats a page that pretends nothing happened. For everything else, offer popular searches, top categories, or content related to what they typed. Keep it clearly separate from real results, with a heading like "Popular right now," so nobody thinks these are matches.

**5. Give people a human way out, where it matters.** On a help center or a support site, a link to contact someone is worth more than another list of articles. On a shop, it's usually less important than the layers above.

![A Trailworks empty page. The numbers match the layers: the search repeated (1), filters to remove with counts (3), a separate "Popular right now" block (4), and a way to reach a person (5)](/blog/no-results-filters.png)

## How the page knows which problem it is

Each specific layer needs something behind it:

- **The words don't match:** typos need spelling suggestions from your search tool. Many tools offer them, but check how good yours are before you show corrected results automatically. Different words, like "raincoat," need synonyms that someone adds, usually after spotting them in the zero-result report.
- **The filters are too strict:** the page can spot this on its own. When a filtered search comes back empty, run it again in the background without each filter and count what comes back. That's where "12 jackets" comes from.
- **You really don't have it:** one way is to keep old products in the index but hide them from normal results with a filter, like the availability filter in my filters post. Then the page can check the same way. Run the search again without that filter. If the old product turns up, say it's no longer sold and link its replacement. The other way is a list of discontinued products and what replaced them, kept up to date by someone.

When the page can't tell which problem it is, it falls back to layers 1, 4, and 5.

## Where AI answers fit

Many search pages now show an AI-generated answer above the results. On an empty page, that's tempting, because the page is never empty again. But an empty page you never see is a problem you never fix.

Some AI answer features match on meaning rather than exact words. Someone types "how do I stop my jacket leaking," keyword search finds nothing, and the AI still finds your re-waterproofing guide. That's great for the visitor. Underneath, it's still the first cause. The words didn't match.

It helps when:

- The search is a question and you have real content that answers it.
- The answer shows which of your pages it came from, so people can check it.

It hurts when:

- Nothing on your site covers it, so the AI fills the gap with general information, or worse, describes a product you don't sell.
- It hides a broken search. If the page always shows something, the zero-result searches you should be fixing disappear from view.

So I only show an AI answer when it can point to your own pages, label it clearly as AI-generated, and keep logging the search as a zero-result search even when the AI answers it. The answer is for the visitor. The log is for you. It shows how people describe the problem in their own words, so you can add "leaking" as a related word for "waterproofing," or use their wording in the guide.

If you're on Sitecore, my [search options](/blog/sitecore-search-options-explained) post shows which products offer short AI answers today, and which can match on meaning.

## What not to do

- Clear the search box, so they have to type it all again to fix one letter.
- Drop the search box from the empty page, so the only way to try again is to scroll up or go back.
- Send people to a category page without telling them their search found nothing. They'll think that's what they asked for, or that search is broken.

## Measure it, then shrink the list

The empty page catches people, but the real goal is fewer searches landing there, and that takes a regular look at the numbers. I check three things:

- **The zero-result rate:** what share of searches return nothing. Watch how it changes over time.
- **The top zero-result searches**, once a week or once a month. This is your to-do list.
- **What people do next:** search again, click a suggestion, or leave. If most people leave, the empty page isn't helping yet.

Each search on the list gets one of a few fixes: a synonym, a spelling correction, a new page, a redirect, or an honest "we don't sell that" message. My [five questions](/blog/sitecore-search-five-questions) post covers how search reports feed content decisions.

For a rough sense of scale, [Luigi's Box](https://www.luigisbox.com/blog/searches-without-results-data/) looked at 4,000 online stores and found that 6.3% of searches returned nothing, and about a third of people left the site straight after. Sports and outdoor stores averaged 4.4%. [Prefixbox's 2024 benchmark](https://www.prefixbox.com/blog/wp-content/uploads/2024/09/2024-Search-Benchmark-Report-and-Best-Practices-Holiday-Edition.pdf) landed in the same place, at about 6%. Both figures come from search companies' own customer data, so they describe shops that already take search seriously. A site with untuned search is likely higher, and help centers and content sites will look different again. If you're well above those numbers, start with the words that don't match.

## Trailworks: five empty searches

| What they searched | Why it was empty | What changed |
| --- | --- | --- |
| stormbreaker jacket | Typo | Shows results for "stormbreak jacket," with an option to search the original words |
| raincoat | Different word | A synonym maps it to waterproof jackets, so results appear |
| waterproof jacket, filtered to XS and orange | Filters too strict | Says which filters caused it and offers to remove Color for 12 results |
| ridgeline 2 tent | Discontinued product | Says it's no longer sold and links to current two-person tents |
| jacket care guide | The PDF exists but was never indexed | Logged as a search bug. The PDF gets indexed and now shows up |

None of those five needed new content. It's easy to read a zero-result report as a list of content gaps, and some of it will be. But in this list, every one was a matching problem, a page problem, or a setup problem, and those are much cheaper to fix than writing new pages.

## Who this is for

Anyone who builds or owns site search: designers, developers, content teams, and product owners. The Trailworks examples come from an online shop, but the four causes and the layers work for help centers, content sites, and intranets too. For how search results pages are put together in the first place, see [Planning Search UI](/blog/serp-ui-patterns).

Next time you test your search, type your best-selling product with one letter wrong. When [Baymard tried this](https://www.smashingmagazine.com/2014/08/the-current-state-of-e-commerce-search/) on the 50 top-grossing US online shops back in 2014, 18% gave no useful results. If your page just says "No results found," that's your first fix.
`,
  },
  {
    slug: "should-we-upgrade-now",
    title: "Should We Upgrade Now? First, Check What Is Really Broken.",
    summary:
      "Check what's really broken on your own site, then decide on gain, cost, support dates, and timing. A version-free guide to upgrade decisions.",
    publishedAt: "2026-10-01",
    tags: ["Upgrades", "Architecture", "Next.js", "Sitecore"],
    storyShare: getBlogStoryShareBySlug("should-we-upgrade-now")?.storyShare,
    fullContent: `
Trailworks is a headless Sitecore site. Sitecore holds the content, and a separate Next.js app shows it, connected through the Content SDK. The team is halfway through testing. A new major version of the Content SDK came out about seven months ago, but everyone has been heads-down and nobody looked closely. Then someone drops the release notes in the chat with "we should upgrade."

A day later, another team sends over an upgrade review from their own project. It makes four claims. The build fails on the new version. An old helper has to be replaced everywhere first. Search should go through Trailworks' own server. And editor preview breaks on some pages.

Now everyone is asking the same thing: **should we upgrade now?**

Most teams answer straight away and treat the review as fact. I'd rather split it into two steps:

1. **Check what's really broken.** Test each claim on your own site.
2. **Then decide.** Weigh the gain, the cost, how long your version is supported, and the timing.

If you're not the developer, you can still help with step 1 by asking one question: "Did we try this on our site, or is it from the review?"

I've left version numbers out on purpose. They'd be out of date in a few months, and the steps work without them.

## Step 1: Check what's really broken

Upgrade reviews tend to sound very sure of themselves. Once you check, most claims land in one of four groups:

- **Really broken.** It fails on your site too, with no easy way around it. It blocks the upgrade.
- **A changed default.** The new version behaves differently unless you tell it otherwise. It looks broken until you find the setting.
- **Recommended, not required.** The review says you have to, but the docs only say you should. Look for the word "deprecated," which means it still works but will be removed later.
- **Not about the upgrade.** It might be a good idea, but it would be just as true if you never upgraded.

To sort them, I run four checks:

\`\`\`flow
Split the review into separate claims
Reproduce each one on your own site
Check the release notes, docs, and known bugs
Try the alternative
\`\`\`

Reproduce with the same versions the review used, on a clean copy of the code. When you try the alternative, look for a setting, a fallback, or another way to do it. That's usually how you tell a changed default from something that's really broken.

Here's how the Trailworks team worked through each claim.

### Claim 1: "The build fails on the new version"

**A changed default.** The new Content SDK needs a newer Next.js, and newer Next.js builds sites with a tool called Turbopack instead of webpack. Both are bundlers, the tools that package up the site's code. Trailworks has a custom webpack step that prepares component files during the build, and Turbopack doesn't read webpack settings.

On a clean test copy, the build did fail, and Next.js even said why: there's a webpack setup but no Turbopack setup. But the Next.js docs say webpack is still supported. The team switched the build back to webpack, and the site worked.

So the upgrade isn't broken. The default changed, and Trailworks isn't ready for it yet. Moving that step to Turbopack becomes planned work. This is the group people miss most, because the upgrade really does look broken at first.

### Claim 2: "You must replace \`withSitecore\` everywhere first"

**Recommended, not required.** \`withSitecore\` is an older helper Trailworks components use to read page data from Sitecore. The upgrade guide marks it deprecated and recommends \`useSitecore\` instead. On the test copy, the components still render.

There's one small catch. A value it passes to components was renamed, so anything using the old name needs a one-line change. "Still works" doesn't mean "nothing changed," which is why you read the notes even for deprecated things. Replacing it goes into planned work, before the next major, which is when it might actually be removed.

### Claim 3: "Search should go through your own server"

**Not about the upgrade.** The review worries that a secret key is visible in the browser. The team checked. The browser never sees the permanent search key. It uses a short-lived access token from Trailworks' server, which is the setup the search vendor recommends. Search also works the same before and after the upgrade.

A server might still help with things like caching or adding your own search rules, but that's an architecture change with its own reasons and estimate. If a claim like this does point at a real security risk, like a permanent key sitting in the browser code, take it seriously. The risk is there whether you upgrade or not, so give it its own priority.

### Claim 4: "Editor preview breaks on personalized pages"

**Really broken.** Trailworks' content authors preview pages in the Sitecore editor every day, and many key pages use personalized components, which are parts of the page that change depending on the visitor. On the test copy, those components showed up blank in preview. There's no setting to change and nothing to switch back to. The vendor's public list of known bugs already has it, with a fix planned but no date.

The review got this one right. It blocks the upgrade until the fix ships, which puts part of the upgrade date in the vendor's hands. It's also why you check every claim, rather than writing off the whole review once the first one turns out to be overblown.

### Write it down

| Claim | Evidence | Result | Recommendation |
| --- | --- | --- | --- |
| Build fails | Fails on a clean copy. Building with webpack works. | A changed default | Not a blocker. Build with webpack first, move to Turbopack later |
| Replace \`withSitecore\` first | Deprecated, not removed. One renamed value needs a small fix. | Recommended, not required | Replace it in planned work, before the next major |
| Search through your own server | Browser uses a short-lived token. Search is unchanged by the upgrade. | Not about the upgrade | Discuss separately |
| Editor preview breaks | Reproduced. Known bug, fix planned with no date. | Really broken | Blocks the upgrade until the fix ships |

The claims also show that upgrades come in a chain. The Content SDK upgrade brings a newer Next.js and Node.js with it, and the newer Next.js brings a new default bundler. Claim 1 was really about the bundler, not the Content SDK. Write down which layer forces which, because "we have to take B because A needs it" is a different conversation from "B came out at the same time."

After step 1, the team knows one thing is really broken and the other three aren't blockers. That's not the picture the review painted, where all four sounded equally serious.

Real reviews are rarely this neat. Some claims sit between two groups, and some you can't reproduce either way. When that happens, treat it as the more serious group until you know more.

## Step 2: Decide whether now is the time

I ask four questions.

- **What do we gain?** A fix we need or a feature we'll use, not just "it's newer."
  - *Trailworks:* nothing the team needs right now.
- **What will it cost?** Code changes, retesting, and other layers it drags along.
  - *Trailworks:* three layers move at once, every page template needs retesting, and the webpack step has to move eventually.
- **How long is our version supported?**
  - *Trailworks:* this is the surprise (more below).
- **Is this a good time?**
  - *Trailworks:* no, the team is in the middle of testing.

If you can't name a real gain, don't upgrade yet, but put it in the plan. The support dates might give you a deadline anyway.

### Check the support lifecycle

Every major version has a support period, and vendors publish it. For the Content SDK on SitecoreAI, it's [KB1004260](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB1004260). Frameworks and runtimes have their own pages.

| Stage | What you still get | What it means for you |
| --- | --- | --- |
| Active | New features, bug fixes, package updates, and security fixes | Upgrade whenever there's a real gain. |
| Maintenance | Only critical fixes, package updates, and security patches | Plan the upgrade before support ends. |
| End of life | Nothing | You have to upgrade. |

The part people miss is that when the next major comes out, the version you're on moves into maintenance, and its end date is set from there. So look at the end date, not the release date. And link to the vendor page instead of copying the dates into your notes, because they change.

That's what caught Trailworks out. The new major quietly moved their version into maintenance while the team was heads-down. By the time anyone opened the vendor page, end of life was about three months after go-live. Nobody had looked, because nothing was broken.

### Pick the moment

Most of the upgrade pain I've seen came from bad timing more than from the upgrade itself.

| Project phase | What I do |
| --- | --- |
| Building | Best time. Upgrade early so testing covers it. |
| Testing | Freeze versions. Only take a security or blocker fix, then retest what it touches. |
| Just before go-live | Freeze. Nothing new unless it would stop the launch. |
| After go-live | Plan it as proper work with its own testing. |

Freezing doesn't mean never. It means the change waits until there's time to test it properly.

### Trailworks' answer

**Not during testing. But it starts now, and it has a hard date.**

On gain alone, this upgrade would have sat in the backlog for a year. Support changed that. Three layers have to move within about three months of go-live, and the upgrade can't ship until the preview bug is fixed. So "not now" doesn't mean "do nothing now":

- One developer prepares the upgrade on a separate copy of the code during testing. The freeze protects what's being tested. It doesn't stop you preparing what comes next.
- The team checks the vendor's bug report for the preview fix every week, and raises it with Sitecore support if it isn't out by go-live.
- The upgraded copy goes into proper testing the week after go-live, with the end-of-life date at the top of the plan.
- The webpack step and the \`withSitecore\` replacement go into the same plan. The search idea gets discussed separately.

The gain question said wait. The support dates said not for long. If the team had only looked at the gain, they'd have planned a relaxed upgrade "sometime after go-live" and found out about end of life too late.

## Who this is for

Tech leads, developers, and PMs on headless Sitecore sites, where the Content SDK, Next.js, and Node.js all release on their own schedules. The same steps work on other stacks too.

For the everyday side, like handling patches and minors, what to write down for each upgrade, and how to keep it reversible, see [Set Your Upgrade Rules Once](/blog/set-your-upgrade-rules-once).

So next time someone drops release notes in the chat with "we should upgrade," check what's really broken first. Then decide.
`,
  },
  {
    slug: "set-your-upgrade-rules-once",
    title: "Set Your Upgrade Rules Once",
    summary:
      "Patches, minors, and majors don't need the same process. A short set of default rules, a one-page upgrade note, and three habits that keep upgrades reversible.",
    publishedAt: "2026-10-01",
    tags: ["Upgrades", "Architecture", "Next.js", "Sitecore"],
    fullContent: `
If nobody agrees on upgrade rules, every new release starts the same debate. Someone posts the release notes, someone says "we should upgrade," and the team spends an hour deciding something it has decided before.

This is the companion to [Should We Upgrade Now?](/blog/should-we-upgrade-now). That post walks through one big decision. This one is the set of defaults I agree with the team once, so most releases don't need a decision at all. We review them once or twice a year.

## Patch, minor, major

In case the names are new: a **patch** is a small fix, a **minor** version adds features and shouldn't break anything (but check anyway), and a **major** version can break things.

Not every release needs the full process. For a patch, read the release notes and test the key flows. For a minor, do the same and look for anything newly deprecated. Save the full "check the claims, then decide" process for majors.

## The default rules

| Release type | What we do by default |
| --- | --- |
| Patch with a security fix | Take it soon and check the key flows. |
| Patch with bug fixes only | Take it at the next planned update. |
| Patch that fixes something blocking you | Take it as soon as it ships, and retest what it touches. |
| Minor, with features you need | Schedule it. |
| Minor, with nothing you need | Add it to the next planned update. |
| Major | Plan it like a small project, with scope, testing, and an undo plan. |
| Brand-new major | Wait for the first round of fixes, unless you need something in it. |
| A layer you depend on isn't ready | Wait, and write down what you're waiting for. |
| Your version moves into maintenance | Put the upgrade in the plan, with a date before end of life. |
| Your version reaches end of life | Upgrade. You don't have a choice anymore. |
| You're two majors behind | Make it the next upgrade in the plan. Expect two sets of changes, and take them one major at a time so problems are easier to trace. |

When the table says "the next planned update," it means a regular slot, like once a month or once a quarter, where you take whatever patches and minors are waiting. Without one, small updates quietly pile up into a big one.

Here's how that plays out on Trailworks. In [Should We Upgrade Now?](/blog/should-we-upgrade-now), an editor preview bug blocks their upgrade. When the vendor ships the fix, it's only a patch, but it unblocks the upgrade, so the team takes it the same week instead of waiting for the next planned update.

The maintenance and end-of-life rows depend on the vendor's support page. For the Content SDK on SitecoreAI, that's [KB1004260](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB1004260). Link to it rather than copying the dates, because they change.

## Keep it reversible

- Change one layer at a time, so if something breaks you know which change caused it.
- Measure things before you start, like build time, a few key pages, and the main user flows, so you can compare afterwards.
- Know how to undo it, including what you'd put back and how long that would take.

## The upgrade note

I write a one-page note for every major upgrade, with the same sections each time:

1. **What:** which layers, and from which version to which
2. **Why:** the real gain
3. **Support:** which lifecycle stage you're in, with a link to the vendor page
4. **Claims checked:** what you tested on your own site, and what you found
5. **Risk:** what could break, and how you'd notice
6. **Timing:** why now, or why later
7. **Undo plan:** how to undo it and how long it takes

Next time the same question comes up, the note answers it.

## Who this is for

Anyone who owns a site built on frameworks and SDKs that release on their own schedules. The examples come from headless Sitecore with the Content SDK and Next.js, but the rules work on any stack.
`,
  },
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

Use this post to **plan results page UI**. Use the Sitecore series to build it: [5 questions](/blog/sitecore-search-five-questions) through [widgets](/blog/sitecore-search-widgets-variations) cover what is searchable, how it gets in, and which experience owns the change. For the page visitors see when nothing matches, see [What to Show When Search Finds Nothing](/blog/search-no-results).
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

These reveal content gaps, or words search doesn't match yet. Fix them with new pages, redirects, or search synonyms before users hit a dead end. For what visitors should see in the meantime, see [What to Show When Search Finds Nothing](/blog/search-no-results).

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

Question 4 in the [five questions](/blog/sitecore-search-five-questions) post is how relevance is controlled. This post is the narrowing half. Entity shape is [entity modeling](/blog/sitecore-search-entity-modeling). Campaign pin, boost, bury, and blacklist are [widgets](/blog/sitecore-search-widgets-variations). When filters empty the page, [What to Show When Search Finds Nothing](/blog/search-no-results) covers telling visitors which filter to remove.

`,
  },
];

export function estimateReadingTime(content: string): number {
  const words = content
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
  return Math.max(1, Math.ceil(words / 238));
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function todayInSingapore(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
  }).format(new Date());
}

/** Future-dated posts stay hidden in production until their date (Singapore time). */
export function isScheduled(post: BlogPost): boolean {
  if (process.env.NODE_ENV === "development") return false;
  return post.publishedAt > todayInSingapore();
}

/** Turns markdown links to scheduled posts into plain text so they don't 404. */
export function unlinkScheduledPosts(content: string): string {
  const scheduled = BLOG_POSTS.filter(isScheduled).map((post) => post.slug);
  if (scheduled.length === 0) return content;
  return content.replace(
    /\[([^\]]+)\]\(\/blog\/([a-z0-9-]+)\)/g,
    (match, text: string, slug: string) =>
      scheduled.includes(slug) ? text : match
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS.filter((post) => !post.draft && !isScheduled(post)).sort(
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
