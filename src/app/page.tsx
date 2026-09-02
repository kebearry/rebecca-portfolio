import Banner from "./ui/banner";
import CustomCursor from "./ui/customcursor";
import Sidebar from "./ui/sidebar";
import Projects from "./projects/projects";
import BlogSection from "./blog/section";
import Timeline from "./ui/timeline";
import ContactForm from "./ui/contactform";

export default function Page() {
  return (
    <>
      <CustomCursor />
      <Sidebar />
      <Banner />
      <Projects />
      <BlogSection />
      <Timeline />
      <ContactForm />
    </>
  );
}
