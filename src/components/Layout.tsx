
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  // Add viewport meta tag for better mobile optimization
  useEffect(() => {
    // Check if viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // Set content with proper mobile viewport settings
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Ensure Open Graph image is set correctly
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      const imageUrl = '/lovable-uploads/d22204d5-1a3e-407b-a58d-a8e541c58198.png';
      ogImage.setAttribute('content', window.location.origin + imageUrl);
    }
    
    // Also update Twitter image if present
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      const imageUrl = '/lovable-uploads/d22204d5-1a3e-407b-a58d-a8e541c58198.png';
      twitterImage.setAttribute('content', window.location.origin + imageUrl);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden bg-background text-foreground">
      <Header />
      <main className="flex-grow w-full pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
