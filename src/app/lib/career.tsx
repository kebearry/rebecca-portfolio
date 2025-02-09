// libs/career.tsx

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technology?: string[];
  certifications?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Solution Architect",
    company: "Sitecore",
    description:
      "Work directly with customers & partners to offer advisory and hands-on assistance in architecting, developing, troubleshooting and leveraging Sitecore products",
    technology: [
      "Sitecore XM Cloud",
      "Sitecore CDP/P",
      "Sitecore Connect",
      "Next.js",
      "GraphQL",
      "TypeScript",
      "JavaScript",
      "Storybook",
      "TailwindCSS",
      "Styled-components",
      "Jest",
      "Jira",
      "Confluence",
    ],
    certifications: ["/xmcp.png", "/xmccdp.jpg", "/xmccert.png"],
  },
  {
    year: "2022",
    title: "Senior Software Engineer / Consultant",
    company: "Accenture Song",
    description:
      "Led end-to-end solution architecture discussions with clients from the RFP phase to uncover technical requirements, while creating detailed user stories, business & workflow analysis, and architecture diagrams.",
    technology: [
      "Jira",
      "Confluence",
      "Lucidchart",
      "Miro",
      "Trello",
      "Draw.io",
    ],
  },
  {
    year: "2020",
    title: "Software Engineer / Analyst",
    company: "Accenture Song",
    description:
      "Lead the development and delivery of high-quality websites and digital experiences, managing client requirements, team collaboration, and integration with various platforms, while ensuring seamless user interfaces and backend services.",
    technology: [
      "Adobe Experience Manager",
      "Magnolia",
      "Adobe Campaign",
      "Adobe Target",
      "React",
      "Angular",
      "VanillaJS",
      "jQuery",
      "Session M",
      "Dynamic Yield",
      "Mulesoft",
      "Salesforce Commerce Cloud",
      "SAP Hybris",
      "NodeJS",
      "Mocha Testing",
      "MongoDB",
    ],
  },
  {
    year: "2019",
    title: "UIUX Developer",
    company: "GovTech",
    description:
      "Revamped website UI design, implemented frontend changes, and also adhoc backend functionalities to enhance the user experience.",
    technology: ["Figma", "Zeplin", "React", "Redux", "Flask", "PostgresQL"],
  },
];
