import Banner from "./ui/banner";
import CustomCursor from "./ui/customcursor";
import Sidebar from "./ui/sidebar";
import Projects from "./projects/projects";
import BlogSection from "./blog/section";
import Timeline from "./ui/timeline";
import ContactForm from "./ui/contactform";

type PageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const tagParam = resolved.tag;
  const initialTag = Array.isArray(tagParam) ? tagParam[0] : tagParam;

  return (
    <>
      <CustomCursor />
      <Sidebar />
      <Banner />
      <Projects />
      <BlogSection initialTag={initialTag} />
      <Timeline />
      <ContactForm />
    </>
  );
}
