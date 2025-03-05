
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden bg-background text-foreground">
      <Header />
      <main className="flex-grow w-full pt-20 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
