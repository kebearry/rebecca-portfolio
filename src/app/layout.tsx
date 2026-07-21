import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
      <body className={`${poppins.variable} ${plusJakartaSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
