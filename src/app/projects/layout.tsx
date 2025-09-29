export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="bg-primary min-h-screen">{children}</section>
  }