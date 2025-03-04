
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled 
          ? "glass shadow-sm py-3" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 transform rotate-45 translate-y-4" />
            <span className="relative z-10 text-primary font-semibold">RA</span>
          </div>
          <span className="font-medium text-xl">Resume AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
          <Link to="/#tool" className="text-sm font-medium transition-colors hover:text-primary">
            Try It
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Log In
          </Button>
          <Button size="sm" className="shadow-sm transition-all hover:shadow-md">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
