// lib/posts.ts
export const getPosts = async () => {
  // Hardcoded posts with a summary and full markdown content
  return [
    {
      id: -4,
      image: "https://cdn.dribbble.com/userupload/42943972/file/original-492d89eb211053e886a7354ad5d2e475.png?resize=1024x768&vertical=center",
      slug: "math-worksheet-generator",
      title: "Custom Math Worksheet Generator",
      type: "Full Stack Development, UI/UX Design",
      industry: "Educational, EdTech",
      role: "Full Stack Engineer, UI/UX Designer, Product Developer",
      tools: "React, JavaScript, Material UI, MongoDB, Vercel",
      summary: "A versatile educational platform that empowers teachers to create engaging math worksheets with customizable problems, difficulty levels, and interactive elements like hidden messages, making math practice both purposeful and enjoyable for students.",
      fullContent: `
# Custom Math Worksheet Generator

## Introduction
The Custom Math Worksheet Generator is a comprehensive tool designed to streamline the creation of engaging math practice materials. Teachers can quickly generate customized worksheets with various problem types, difficulty levels, and interactive elements like hidden messages, saving valuable preparation time while ensuring students remain motivated through purposeful practice.

## About My Contribution

### UI/UX Design
I led the user experience design process focusing on two distinct user journeys:

- **Teacher Experience:** Developed an intuitive worksheet creation interface where teachers can:
  - Customize problem types and difficulty levels
  - Generate problems in bulk with specific parameters
  - Add engaging elements like secret messages
  - Preview and adjust worksheets before finalizing
  - Save templates for future use

- **Student Experience:** Created a clean, focused layout that:
  - Presents problems clearly and systematically
  - Includes interactive elements that reward progress
  - Maintains engagement through achievement markers
  - Works seamlessly on both desktop and tablet devices

![Teacher Dashboard](https://i.imgur.com/Gk2MYA3.png)
![Student View](https://i.imgur.com/u06vLSQ.png)

### Frontend Development
- **React Components:** Built reusable components for problem generation, customization controls, and worksheet preview using React and Material UI
- **Interactive Features:** Implemented real-time preview functionality allowing teachers to visualize worksheet layouts and problem sets instantly
- **Responsive Design:** Ensured the application works seamlessly across desktop and tablet devices for both creation and solving modes

### Backend Development
- **API Development:** Created RESTful APIs using Node.js for worksheet management and data persistence
- **Database Design:** Designed MongoDB schema for storing worksheet templates and problem sets
- **Data Management:** Implemented CRUD operations for worksheet creation and retrieval

### Technical Architecture
- **Frontend:** React with Material UI for component styling
- **Backend:** Node.js REST API with Express
- **Database:** MongoDB for flexible document storage
- **Deployment:** Vercel hosting for the application

## Links
- [Live Site](your-live-site-url)
- [GitHub Repository](your-github-url)
`,
    },
    {
      id: -3,
      image: "https://cdn.dribbble.com/userupload/42945072/file/original-3e84521baf3006a706518eec8f82f615.png?resize=1024x768&vertical=center",
      slug: "custom-vinyl-player",
      title: "Custom Spotify Vinyl Player",
      type: "Full Stack Development, UI/UX Design",
      industry: "Music, Entertainment",
      role: "Full Stack Developer, UI/UX Designer, Founder, Product Manager",
      tools: "Next.js 14, TypeScript, Tailwind CSS, Spotify Web API, MongoDB, Vercel",
      summary: "A modern web application that transforms the Spotify listening experience into an immersive vinyl player interface, complete with realistic record spinning animations, playlist management, and social features like shared song notes.",
      fullContent: `
# Custom Spotify Vinyl Player

## Introduction
The Custom Spotify Vinyl Player reimagines the digital music streaming experience by combining modern technology with nostalgic vinyl aesthetics. This web application transforms Spotify playback into an immersive vinyl experience, featuring realistic record animations and social sharing capabilities that bring music lovers together.

## About My Contribution

### UI/UX Design
I led the design process focusing on creating an engaging and intuitive interface:

- **Vinyl Player Interface:**
  - Designed a realistic vinyl record player with dynamic spinning animation
  - Created seamless album artwork integration into the vinyl display
  - Implemented responsive playback controls that mirror physical turntable interactions
  - Developed an intuitive layout for playlist management and social features

- **Social Experience:**
  - Designed a shared notes system for collaborative music discovery
  - Created an emoji reaction system for quick song feedback
  - Integrated playlist management with a focus on community sharing
  - Built an intuitive interface for viewing and creating song comments

![Vinyl Player Interface](https://i.imgur.com/fsjOntu.png)

![Social Features](https://i.imgur.com/SlcdH2J.png)

### Frontend Development
- **Next.js Components:**
  - Built reusable components for the vinyl player interface
  - Implemented smooth animations for record spinning and playback controls
  - Created responsive layouts for cross-device compatibility
  - Developed real-time social interaction features

- **Spotify Integration:**
  - Implemented OAuth authentication for Spotify accounts
  - Created seamless playback controls using Spotify Web API
  - Built playlist management and track selection features
  - Integrated real-time track progress and metadata display

### Backend Development
- **API Development:**
  - Designed RESTful APIs for social features and user interactions
  - Implemented WebSocket connections for real-time updates
  - Created endpoints for playlist management and song notes
  - Built efficient data caching for improved performance

- **Database Design:**
  - Structured MongoDB schemas for user data and social interactions
  - Implemented efficient queries for real-time data retrieval
  - Created indexes for optimized search and filtering
  - Designed data models for scalable social features

### Technical Architecture
- **Frontend:** Next.js 14 with TypeScript and Tailwind CSS
- **Backend:** Next.js API routes with TypeScript
- **Database:** MongoDB for social features and user data
- **APIs:** Spotify Web API for music playback and control
- **Deployment:** Vercel for hosting and continuous deployment

## Key Features
- Realistic vinyl player interface with dynamic animations
- Seamless Spotify integration for music playback
- Social features including shared notes and reactions
- Real-time playlist management and track controls
- Responsive design for all device sizes

## Links
- [Live Site](https://custom-spotify-vinyl.vercel.app)
- [GitHub Repository](https://github.com/kebearry/custom-spotify-vinyl)
`,
    },
    {
      id: -2,
      image:
        "https://cdn.dribbble.com/userupload/23485394/file/original-8b7ddc2ea0d8eedf473d5e4ae5eeb1ef.png",
      slug: "mental-health",
      title: "Non-Profit Mental Health Website Revamp",
      type: "CMS Development, Frontend Development",
      industry: "Non-Profit, Social Services, Mental Health",
      role: "CMS Developer, Frontend Developer",
      tools: "Sitecore XM Cloud, Sitecore Search, NextJS, TailwindCSS",
      summary:
        "The revamp of the non-profit mental health website focused on enhancing accessibility, performance, and content management using Sitecore XM Cloud and React.",
      fullContent: `
  # Non-Profit Mental Health Website Revamp
  
  ## Introduction
  
The mental health website serves as a vital digital resource for individuals seeking mental health support, educational materials, and community services. The migration to Sitecore XM Cloud provided a scalable, headless CMS architecture for improved content management and omnichannel delivery, while a React-powered frontend delivered a seamless and interactive user experience with enhanced accessibility and performance.

## About My Contribution
#### Frontend Development:
I was responsible for implementing the frontend of the website, ensuring that the design provided by the project team members was faithfully translated into an interactive and responsive user interface. In this project, the frontend was built using headless NextJS to meet the client's specific requirements. The client specifically preferred TailwindCSS for styling due to its utility-first approach, which allowed for rapid development while maintaining a consistent design system. 

**Key Frontend Features:** 
- **Responsive Navigation Bar:** The navigation bar was designed to dynamically pull links from Sitecore XM Cloud's content tree. As a partial design, it allows content editors to manage navigation links directly in Sitecore without requiring developer intervention. This ensures that any updates made within the CMS are automatically reflected on the website, maintaining content accuracy.
![Example Image](https://i.imgur.com/QMSeg89.png)

- **Dynamic Column Content Blocks with CTA:** A flexible dynamic content block system was implemented, allowing content authors to configure the grid layout (1, 2, or 3 columns) and choose whether an image appears on the left or right. This feature ensures better visual storytelling while giving content teams full control over how information is presented.   
![Example Image](https://i.imgur.com/H9yQpcT.png)

- **Global Search** The website features a fully integrated search functionality, powered by Sitecore Search, providing fast and relevant results. Users can navigate search results, refine queries, and select content without using a mouse, ensuring full accessibility compliance (WCAG guidelines). Users can also refine search results by category, content type, or relevance, improving content discoverability and user experience.

![Example Image](https://i.imgur.com/1kfq428.png)
![Example Image](https://i.imgur.com/KsbLDCX.png)

#### CMS Development:
As the CMS developer, my responsibility was to configure and integrate the content management functionalities that empowered the client's team to manage content effortlessly without requiring technical expertise.
- **Sitecore Items and Template Structure:** By creating custom templates for different content types, I ensured that editors could easily create and update content while maintaining consistency across the website.
- **Sitecore Layouts and Renderings:** I developed layouts and renderings in Sitecore that presented content dynamically on the frontend, leveraging the headless architecture of Sitecore XM Cloud.
- **Modular Content Components:** To ensure flexibility and consistency, I built reusable content components within Sitecore. These components allowed editors to manage content blocks like hero banners, featured articles, calls to action, and multi-column sections. These components were customizable, enabling the content team to tailor content presentation without relying on developers.
- **Integration with Sitecore Search:** I integrated Sitecore Search with the CMS to enhance content discoverability across the website. This integration enabled content editors to ensure that search functionality was seamlessly aligned with the content structure. By leveraging Sitecore's search indexing and ranking capabilities, I improved the search experience, making it faster and more relevant for users. Additionally, content filters and refinements were incorporated into the search feature, empowering users to narrow down results based on categories, content types, and relevance

## Links:
- [Live Site](https://www.beyondblue.org.au/)
  `,
    },
    {
      id: -1,
      image:
        "https://cdn.dribbble.com/userupload/23453056/file/original-7360ef9b117cf0a2988932c596e853cd.png",
      slug: "financial-service",
      title: "Financial Service Website Revamp",
      type: "Frontend Development",
      industry: "Government, Financial Services",
      role: "Frontend Developer",
      tools: "Adobe Experience Manager, React",
      summary:
        "The revamped website, built on AEM, serves the Government and Financial Services industries, offering users a streamlined platform to access financial services and information.",
      fullContent: `
  # Financial Service Website Revamp
  
  ## Introduction
  
This government platform serves as a one-stop digital hub for Singaporean citizens and residents to manage their retirement savings, healthcare, housing, and other financial planning needs. The website offers a comprehensive set of tools for users to access their balances, track contributions, make withdrawals, and apply for various government schemes. Designed to be user-friendly and accessible, the website aims to empower individuals with the information and resources they need to plan for their financial future with confidence.

## About My Contribution
#### Frontend Development:
I was responsible for implementing the frontend of the website, ensuring that the design provided by the project team members was faithfully translated into an interactive and responsive user interface. In this project, the frontend was built using headless ReactJS to meet the client's specific requirements.

**Key Frontend Features:** 
- **Listing Carousel:** Carousel dynamically displays different types of content (articles, videos, etc.) in an interactive, scrollable format while clearly showing the content type and theme of the listing. This helps users easily access and engage with the most relevant content. With a clear CTA, users can be led to the full articles listing page too.
![Example Image](https://i.imgur.com/sVE3CUp.png)

- **Sticky Content Navigation:** To enhance the user experience on content-heavy pages of the Financial Service Website Revamp, a Sticky Content Navigation feature was introduced. This feature provides a persistent navigation menu that allows users to quickly jump to specific sections of the page without the need for excessive scrolling. As the user scrolls down the page, the navigation transitions from a non-full width layout at the top of the page to a full-width layout as they continue down the content to accommodate immediate navigation to more content sections. 

![Example Image](https://i.imgur.com/LH1JhvY.png)
![Example Image](https://i.imgur.com/gc556eQ.png)
![Example Image](https://i.imgur.com/nGkobz7.png)

- **Article Listing Page with Filters** To improve the accessibility and organization of content on the Financial Service Website Revamp, an Article Listing Page with Filters was implemented. This feature empowers users to easily filter and sort through a large set of articles, enabling them to quickly find relevant content based on their specific needs and interests.
![Example Image](https://i.imgur.com/SAA0oXs.png)
![Example Image](https://i.imgur.com/IwQN7G4.png)
![Example Image](https://i.imgur.com/wyTbcAq.png)

## Links:
- [Live Site](https://www.cpf.gov.sg/member)
  `,
    },
    {
      id: 0,
      image:
        "https://cdn.dribbble.com/userupload/23388689/file/original-07141c6e37cede9e327ffa10c89eabd3.png",
      slug: "fishing-equipments-ecomm",
      title: "Fishing Equipments Ecommerce",
      type: "CMS Development, Frontend Development",
      industry: "Sporting Goods,  Fishing Equipment",
      role: "CMS Developer, Frontend Developer",
      tools: "Adobe Experience Manager, VanillaJS, jQuery",
      summary:
        "From rods and reels to lures and accessories, this website built on AEM offers high-quality products tailored to enhance fishing experiences. The website also includes detailed product information, user-friendly navigation, and seamless product comparison, ensuring customers can easily find the equipment they need.",
      fullContent: `
  # Fishing Equipments Ecommerce
  
  ## Introduction
  
This fishing website serves as a comprehensive platform for anglers, offering a wide range of high-quality fishing gear and equipment. With a focus on precision engineering and innovation, the website showcases the client's extensive collection of fishing rods, reels, lures, accessories, and apparel, designed to enhance every fishing experience.

## About My Contribution
#### Frontend Development:
I was responsible for implementing the frontend of the website, ensuring that the design provided by the design agency was faithfully translated into an interactive and responsive user interface. In this project, the frontend was built using VanillaJS and jQuery to meet the client's specific requirements.

**Key Frontend Features:** 
- **Interactive Product Pages:** Built with jQuery and VanillaJS, the product pages were designed to update in real-time, showing dynamic information without reloading the page.
![Example Image](https://i.imgur.com/Yln1P81.png)

- **Product Comparison Feature:** This feature is designed to enhance the user experience by making it easier for potential customers to analyze different fishing gear side-by-side based on specific product details such as product type, specifications, and unique features.
![Example Image](https://i.imgur.com/WmsgzOG.png)

- **News Listing Features:** The news listing page includes a set of filter options that allow users to refine their view of news articles, which allows users to filter news articles by type.
![Example Image](https://i.imgur.com/fqFUNzm.png)

#### CMS Development:
As the CMS developer, my responsibility was to configure and integrate the content management functionalities that allowed the client's team to easily manage content without any technical expertise.
- **Content Templates:** I created flexible content templates that allowed the website administrators to easily populate pages with dynamic and consistent content. These templates were designed for various types of pages like product listings, landing pages, news articles, and informational sections.
- **Sling Models:** I create Sling Models to provide an abstraction layer that maps JCR (Java Content Repository) nodes to Java objects. This allows me to easily access and manipulate AEM content in a structured and efficient way, improving the maintainability and readability of the code. By using Sling Models, I can seamlessly integrate dynamic content into the frontend, making the development process faster and more scalable.
- **Modular Components:** I built reusable content components within AEM that allowed for consistent content presentation across different pages. These components, like image galleries, product carousels, and featured product sections, were designed to be flexible and customizable for the client's needs, ensuring that they could easily maintain a cohesive design while updating content.
- **User Permissions:** I set up user roles and permissions, ensuring that only authorized team members could make changes to sensitive or high-priority content, further enhancing security and content quality.

## Links:
  - [Live Site](https://fish.shimano.com/ja-JP)
  `,
    },
    {
      id: 1,
      image:
        "https://cdn.dribbble.com/userupload/22673787/file/original-3176c76942f83b535615d19cc42e2bc1.png",
      slug: "product-inventory",
      title: "Apple Product Inventory",
      type: "End-to-End Website Design and Development",
      industry: "Retail, eCommerce, Technology",
      role: "UI/UX Designer, Full Stack Developer",
      tools: "Figma, React, Jupyter, Vercel",
      summary:
        "A streamlined inventory management system designed specifically for Apple stores to assist call center agents in quickly addressing customer inquiries. This app allows agents to effortlessly check the availability of products across multiple store locations, providing real-time data to enhance customer service efficiency and accuracy.",
      fullContent: `
  # Apple Product Inventory
  
  ## The Problem
  
 Apple prides itself on delivering exceptional and fast customer service, setting high standards for customer experience. However, with a vast product inventory across multiple store locations, customer service agents often struggle to quickly and efficiently address customer inquiries, leading to potential delays and missed opportunities to provide timely solutions.

Customer service agents require an efficient system to access product availability, navigate through multiple locations, and provide accurate answers in real-time. Existing systems lack the flexibility and speed needed to manage complex product data, making it difficult for agents to provide quick, insightful responses.

 ## The Development Requirements
**Users (customer service agents) of the application should be able to perform the following actions:**
- Search for iPhone 13 models and their variants' availability in a given location
- The search results should answer customer inquiries, including, but not limited to: *Example 1: "Is the iPhone 13 256GB model available in California, United States?"
Example 2: "What stores have the iPhone 13 Pro Max 512GB Green available?"
Example 3: "What iPhone 13 models are available in Ohio, United States?"*
- The product inventory must include iPhone 13 and iPhone 13 Pro models.
- The web application must allow customer service agents to easily and quickly assist customers calling Apple by checking product availability in the specified locations
- Flexible technology stack and framework but web application should be responsive, intuitive, and highly functional for the end users

## Goals to Features
![Example Image](https://i.imgur.com/DS4Atcu.png)
### Real-time Search and Search Suggestions
![Example Image](https://i.imgur.com/FRF6r8l.png)

### Robust Filter Options: Location and Product Filter
![Example Image](https://i.imgur.com/2hSPror.png)
![Example Image](https://i.imgur.com/iLHscHd.png)

### Quick Access To Product Details
![Example Image](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWpoc3IzNzA0MzE1YnplcDRlMWk3YmhhajF4aTR4amF2dmVhNnViNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JfFDkkutNNC1k9SHxE/giphy.gif)

## Links:
  - [Live Site](https://fruity-inventory.vercel.app)
  - [Github Link](https://github.com/kebearry/fruity-inventory)
  `,
    },
    {
      id: 2,
      image:
        "https://cdn.dribbble.com/userupload/22771313/file/original-197520fe3527f919eddf3af664a9abc6.png",
      slug: "non-fungible-token",
      title: "Non Fungible Token Website",
      type: "End-to-End Website Design and Development",
      industry: "Cryptocurrency",
      role: "Graphic Design, UI/UX Designer, Full Stack Developer",
      tools: "Figma, React, Vercel, Adobe Illustrator",
      summary:
        "This NFT website is a passion project designed to promote and facilitate the Baonation NFTs. It provides collectors with an easy way to purchase and trade NFTs using MetaMask for secure transactions. ",
      fullContent: `
  # Non Fungible Token Website
  
  ## The Purpose
  
NFTs experienced explosive growth in 2021, with billions of dollars in cryptocurrency invested into this emerging asset class. Baonation was created as a passion project to tap into this trend, providing a platform for users to engage with the ever-expanding NFT market. NFTs are unique digital art pieces or images tokenized on the blockchain, often as one-of-a-kind works or part of limited collections. This tokenization makes them valuable to collectors, as they offer verifiable ownership and provenance, guaranteeing authenticity and rarity.

The relationship between NFTs and images has opened new avenues for digital artists, allowing for the creation, sale, and exchange of art in a way that mirrors the rarity and ownership seen in traditional art markets. Seeing NFTs grow in significance within the art world, I recognized it as a prime opportunity to push my creative boundaries. Through my digital illustrations, I've been able to experiment with new styles, connect with a broader audience, and fully explore my artistic potential in a way I hadn't before. 

## Goals to Features
![Example Image](https://i.imgur.com/Fzmgtcm.png)
### Unique Digital Art Pieces
![Example Image](https://i.imgur.com/jkw1gLh.png)

### Facilitate Easy Buying and Selling of NFTs
![Example Image](https://i.imgur.com/P6tL3IE.png)

### Quick Access To Project Details
![Example Image](https://i.imgur.com/j4zyRej.png)

![Example Image](https://i.imgur.com/6HW84B8.png)

![Example Image](https://i.imgur.com/XXKBzzi.png)

## Links:
  - [Live Site](https://baonation.vercel.app/)
  - [Github Link](https://github.com/kebearry/nft-spa)
  `,
    },
    {
      id: 3,
      image:
        "https://cdn.dribbble.com/users/4930198/screenshots/12059520/media/5084c5c7717f0411d9ffd1e5c5aa86b5.png",
      slug: "parking-mobile-app",
      title: "Award Winning Parking Mobile App",
      type: "End-to-End Mobile App Design and Development",
      industry: "Transportation, Mobility",
      role: "Co-founder & Visionary (Conceptual Stage), UI Designer, Frontend Developer",
      tools: "Figma, React Native",
      summary:
        "Our award winning parking mobile application integrates AWS technologies, machine learning, and real-time capabilities into a seamless location-based solution. Drivers can easily find the most optimal parking spot, not only enjoying unparalleled convenience but also saving costs by locating the cheapest available car parks near their destination. ",
      fullContent: `
  # Award Winning Parking Mobile App
  
  ## The Problem
  
In Singapore, securing a parking spot remains a time-consuming and frustrating experience for drivers. Key issues include:

- Lack of Real-Time Parking Information: Many parking apps do not provide real-time availability, making it difficult for drivers to know which parking spots are free before arriving.

- Unexpected High Parking Fees: Drivers often face shockingly high parking fees after parking, with no clear indication of pricing upfront.

- Wasted Time Searching for Parking: Drivers frequently waste time traveling to parking lots, only to find that they are full. This leads to unnecessary frustration and delays.

## How are Existing Competitors Supporting or Hindering Drivers' Journey
Existing apps like Parking.sg offer car park information, but they do not provide real-time data. Drivers must manually check each parking lot on a map, which is an inefficient process.
While there are applications like ParkWhiz that offer real-time parking information, they are primarily US-based and not suitable for Singapore's unique urban context.

## Getting to Know Our Users
A survey conducted with 31 drivers revealed that over 70% find it very time-consuming and inconvenient to find available parking spots, further emphasizing the need for a more efficient solution.

## Goals to Features
![Example Image](https://i.imgur.com/3enGkoG.png)
### Provide Real-Time Parking Availability Information
![Example Image](https://i.imgur.com/5jjYx2V.png)

### Simplify Parking Pricing and Cost Transparency
![Example Image](https://i.imgur.com/cefaMEx.png)

### Enhance User Experience with Predictive Features & Personalization
![Example Image](https://i.imgur.com/enbGQIj.png)

![Example Image](https://i.imgur.com/q4c7vrb.png)

## Links:
[Media Coverage](https://www.tech.gov.sg/media/technews/build-on-singapore-2019-hackathon/)
  `,
    },
    {
      id: 4,
      image:
        "https://cdn.dribbble.com/users/4930198/screenshots/10490790/media/baceee1368802ce9dc63f2245319ddba.png",
      slug: "ecomm-design",
      type: "End-to-end responsive website",
      role: "Sole UIUX Designer",
      title: "Ecommerce Website Design",
      industry: "eCommerce, Retail, Apparel",
      tools: "Figma, Notion",
      summary:
        "An end-to-end ecommerce website design, covering both pre-login and member-exclusive purchase journeys, focused on seamless user experience and intuitive navigation to drive conversions",
      fullContent: `
# Ecommerce Website Design
## The Problem
In Singapore's highly saturated blogshop industry, many businesses operate without physical stores, making their online presence the sole channel for engaging with customers. With an increasing number of online-only brands, it's critical for a blogshop to stand out by providing a seamless and memorable user experience. The challenge is to design an eCommerce website that not only drives traffic but also enhances conversion rates, ensuring that first-time visitors and repeat customers alike can easily navigate through the site and complete purchases. 

## How Are Our Competitors Supporting or Hindering Buyers' Journey?

#### Competitor 1: Example A
**Strengths:**
- Streamlined Navigation
- Mobile Optimization
- Clear CTAs and Checkout Flow
---
**Weaknesses:**
- Cluttered or Complicated UI
- Slow Load Times
- Limited Product Details
- Complicated Checkout Process

---

#### Competitor 2: Example B
**Strengths:**
- Fast Load Times
- Easy Payment Options
---
**Weaknesses:**
- Poor Mobile Optimization
- Lack of Product Reviews

---

#### Competitor 3: Example C
**Strengths:**
- Simple Checkout Process
- Free Returns
---

**Weaknesses:**
- Limited Product Images
- No Personalization
- Lack of Clear Brand Identity  

## Our Design Features:
- **Mobile First Design:** Responsive layout that automatically adjusts to all screen sizes.
- **High-Quality Product Images and Zoom Functionality:** Clear visuals and zoom features improve confidence in purchases, reducing hesitation and increasing conversions.
![Example Image](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGU0b3JweTNvdXF3cHNrcmFkNm9xamd5cnowMDF2bGk0cncwa3NqOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xP6D0QERnNK5nyc5kO/giphy.gif)
- **Conditionally Visible Information Panels:** This approach keeps the user interface clean and minimalist by showing only the most relevant information at first. Users can easily expand the sections they're interested in, allowing for a streamlined experience.
![Example Image](https://i.imgur.com/SDZXNvm.png)
![Example Image](https://i.imgur.com/bMDFATM.png)
- **A sleek and minimal filter bar:** It allows customers to find what they want faster, improving their browsing experience without feeling overwhelmed by excessive options
![Example Image](https://i.imgur.com/ixMSHxP.png)
- **A streamlined and intuitive checkout process with a built-in modal:**  The goal is to remove disruptions from the checkout flow, making the purchase process seamless and more enjoyable. Users can modify their cart without losing their place in the flow, reducing friction and abandoned carts.
![Example Image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3BmZzFjeDU4MDV5bzd1OHUwYWkwdDV2eW4wZTg3cGRjeWJ4Nzc0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ze9trmNwHm74MNCXNH/giphy.gif)
`,
    },
    {
      id: 5,
      image:
        "https://cdn.dribbble.com/users/4930198/screenshots/14201766/media/14df62f63bac4e3198b0f3c4aa6f98f5.png",
      slug: "sustainability-ambassador-program",
      type: "End-to-end digital experience (website and mobile app)",
      role: "Co-Founder & Visionary (Conceptual Stage), UIUX Designer",
      title: "Airline Sustainability Ambassador Program",
      industry: "Travel, Aviation",
      tools: "Figma, Notion, Google Sheets",
      summary:
        "Introducing a comprehensive, end-to-end digital experience (website and mobile app) designed for eco-conscious travelers. This platform offers an opt-in sustainable journey, empowering flyers to make environmentally responsible choices while enhancing their travel experience.",
      fullContent: `
# Airline Sustainability Ambassador Program

## The Problem

The aviation industry generates 6.7 million tonnes of cabin waste annually, costing about US$1.09 billion to manage. For Singapore Airlines (SIA), this translates to an additional US$1.92 million in costs each year due to the handling of increasing cabin waste. With 25% of fliers being environmentally conscious millennials, there's a growing risk of losing customers who demand more sustainable travel options. As eco-conscious travel continues to gain popularity, airlines must adapt or face losing a significant segment of their customer base.

## How  are Existing Competitors Supporting or Hindering Flyers' Journey
![Example Image](https://i.imgur.com/cYvDbo7.png)

## Getting to Know Our Users
The following insights were gathered from qualitative research involving 50 users across various age groups, helping to validate our hypothesis that environmentally conscious passengers also care about food wastage and are open to more sustainable travel options:
- 86% of environmentally conscious passengers expressed their care for reducing food waste.
- 60% of passengers would opt for a smaller portion if their family members don't consume much, helping to minimize food waste.
- 82% of passengers are inclined to join airline sustainability ambassador program if offered.

## How does the Sustainability Ambassador Program address users' needs?
![Example Image](https://i.imgur.com/I33lpCL.png)
### Effortless Access and Participation
![Example Image](https://i.imgur.com/enMP3WW.png)

![Example Image](https://i.imgur.com/JA3xJxh.png)
### Novel Portion Selection for Meal
![Example Image](https://i.imgur.com/PlWHEBy.png)
### KrisEco Sustainability Ambassador Program
![Example Image](https://i.imgur.com/G7HWYvT.png)
### Customer Inflight Mobile App Experience
![Example Image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3dscWxicWJqcGh5aGdsb2xkMGEwemZqeDh4djBhNTg1NWc1ZXk5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V99Q9nwBTFQXg2wGaw/giphy.gif)
### Steward(ess) Inflight Tablet Experience
![Example Image](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1mMTBnZGZ1Y29oMXIzZGJkMDlpbWY0OTgzMGtwbmpteWJuMWtreiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CzGGyAzcyUKPF8WRW7/giphy.gif)

### Links:
[Promotional Video](https://www.youtube.com/watch?v=0eUvtaxMNZ4)
`,
    },
    {
      id: 6,
      image:
        "https://cdn.dribbble.com/users/4930198/screenshots/10490654/media/ac222bd86f447458ce0abc34dd86ebdf.png",
      slug: "security-reporting-website-revamp",
      type: "End-to-end website design",
      role: "UIUX Designer",
      title: "Security Reporting Website Revamp",
      industry: "Security, Government",
      tools: "Figma, Notion, Zeplin",
      summary:
        "The Security Reporting Website Revamp project modernizes outdated security dashboards with a clean, intuitive design. It simplifies data presentation, making it easier for security teams to quickly access and interpret real-time reports, track incidents, and make informed decisions efficiently.",
      fullContent: `
# Security Reporting Revamp

## The Problem

Traditional security reporting platforms suffer from outdated, cluttered interfaces that overwhelm users and make it difficult to interpret critical data. These old-school dashboards are not visually engaging, often leading to confusion and slower decision-making. Security personnel need a more streamlined, user-friendly solution that presents key security metrics in an easily digestible format.

## How  are Existing Competitors Supporting or Hindering Users' Journey
#### Competitor 1: Example A
**Strengths:**
- Powerful analytics
- Scalability
- Customizable dashboards


**Weaknesses:**
- Complex to customise
- Performance issues with large data sets
#### Competitor 2: Example B
**Strengths:**
- Open source analytics
- Scalability

**Weaknesses:**
- Complex to customise
- Limited out of the box features
- Resource heavy
#### Competitor 3: Example C
**Strengths:**
- Strong threat detection
- Advanced analytics

**Weaknesses:**
- Complex to customise
- Limited customizations available
- Less scalable

## How does the Security Website Revamp address users' needs?
### User Friendly, Easy-to-Interpret Dashboard
![Example Image](https://i.imgur.com/5uMbhVY.png)

### Clear Ticket Statuses With Available Filter Options
![Example Image](https://i.imgur.com/19pykLm.png)
![Example Image](https://i.imgur.com/K9DcSOH.png)

### One Click Security Playbook Run for verified standard cases with SOP in Place
![Example Image](https://i.imgur.com/TDAjsJP.png)
![Example Image](https://i.imgur.com/1wDXMbF.png)

### Robust Website Security Reporting
![Example Image](https://i.imgur.com/Wnkx3Uu.png)
![Example Image](https://i.imgur.com/UOmCHKe.png)

### Links:
[Promotional Video](https://www.youtube.com/watch?v=0eUvtaxMNZ4)
`,
    },
    {
      id: 7,
      image:
        "https://cdn.dribbble.com/users/4930198/screenshots/10492493/media/1cf3f1ec55458ff85ac6948f6a7e6747.png",
      slug: "smart-travel-app",
      type: "End-to-end mobile app design + branding",
      industry: "Travel, Aviation, Entertainment",
      role: "Co-Founder & Visionary (Conceptual Stage), UIUX Designer",
      tools: "Figma, Notion, inVision",
      title: "Floy Smart Travel App",
      summary:
        "A one stop smart application that learns about what you like, and plans an entire itinerary for you, right down to flight, itinerary, lodging and transport options.",
      fullContent: `
# Floy Smart Travel App

## The Problem

Planning a well-rounded trip is often overwhelming, as travelers need to consider numerous factors, from destination selection to specific travel activities. Many people struggle with choosing the right destinations and experiences. Existing travel planning websites are not personalized enough to cater to individual preferences and needs, making the planning process more tedious and less enjoyable.

## How  are Existing Competitors Supporting or Hindering Travellers' Journey
### Trip Advisor:
- **Strengths:** Extensive database of reviews, user-generated content, and recommendations. They offer tools for comparing prices and creating itineraries.
- **Weaknesses:** Lacks personalized trip planning features and struggles to integrate local, customized experiences in an intuitive manner. It can also be overwhelming due to the sheer volume of information.

### Google Travel:
- **Strengths:** Google's strength lies in its ability to aggregate all travel-related information, from flights and hotels to activities. The platform offers automatic trip suggestions based on user searches and interests.
- **Weaknesses:** While highly efficient, it is not truly personalized. It lacks a human touch or specific guidance for unique trip needs or interests.

### Road Tripper:
- **Strengths:** Great for planning road trips, offering a route planner with suggested stops, attractions, and accommodation.
- **Weaknesses:**  It's mainly focused on road trips and doesn't provide comprehensive travel planning for international destinations or varied types of travel.

## How does the Floy Smart Travel App address users'needs?
### Preference Driven:
![Example Image](https://i.imgur.com/ygp4yH9.png)
### Budget & Duration Optimizer:
![Example Image](https://i.imgur.com/C9VEWYS.png)
### Personalized Travel Experience Engine (PTX Engine):
![Example Image](https://i.imgur.com/rcEamPj.png)
### Full Autonomy Over Your Itinerary Destinations:
![Example Image](https://i.imgur.com/MxGJ9nm.png)
### Full Autonomy Over Your Accommodations:
![Example Image](https://i.imgur.com/Sd3JtIW.png)
### Confirm Your Flight:
![Example Image](https://i.imgur.com/uQw8M5F.png)
### Tailored Itinerary at Your Fingertips:
![Example Image](https://i.imgur.com/j31Qxqy.png)
`,
    },
  ];
};
