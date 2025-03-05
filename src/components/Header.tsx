
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 transform rotate-45 translate-y-4" />
            <span className="relative z-10 text-primary font-semibold">RA</span>
          </div>
          <span className="font-medium text-xl">Resume AI</span>
        </Link>

        {/* Desktop Navigation */}
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
          <Button size="sm" className="shadow-sm transition-all hover:shadow-md whitespace-nowrap">
            Get Started
          </Button>
          
          {/* Mobile Menu Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/#features" 
              className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/#tool" 
              className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try It
            </Link>
            <div className="pt-2 border-t border-muted">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full justify-center shadow-sm"
              >
                Log In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
