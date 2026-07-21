import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins font
import "./globals.css";

// Use Poppins font with specific weights (e.g., 400 and 600)
const poppins = Poppins({
  variable: "--font-poppins", // Define the CSS variable for the font
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rebecca-portfolio.vercel.app"),
  title: "Rebecca Tan | Solution Architect",
  description:
    "Solution Architect specializing in frontend experiences and CMS platforms across Sitecore, AEM, Magnolia, and more. Based in Singapore.",
  openGraph: {
    title: "Rebecca Tan | Solution Architect",
    description:
      "Solution Architect specializing in frontend experiences and CMS platforms across Sitecore, AEM, Magnolia, and more. Based in Singapore.",
    url: "https://rebecca-portfolio.vercel.app",
    siteName: "Rebecca Tan Portfolio",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebecca Tan | Solution Architect",
    description:
      "Solution Architect specializing in frontend experiences and CMS platforms across Sitecore, AEM, Magnolia, and more. Based in Singapore.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
