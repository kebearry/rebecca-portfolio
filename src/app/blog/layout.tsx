import StripHomeHash from "../utility/striphomehash";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-primary min-h-screen">
      <StripHomeHash />
      {children}
    </section>
  );
}
