import Banner from "./ui/banner";
import CustomCursor from "./ui/customcursor";
import Sidebar from "./ui/sidebar";
import Blog from "./projects/projects";
import Timeline from "./ui/timeline";
import ContactForm from "./ui/contactform";

export default function Page() {
  return (
    <>
      <CustomCursor />
      <Sidebar />
      <Banner />
      <Blog />
      <Timeline />
      <ContactForm />
    </>
  );
}
