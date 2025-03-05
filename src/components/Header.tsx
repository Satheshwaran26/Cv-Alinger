
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";

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

  const scrollToAnalyzer = () => {
    const analyzerSection = document.getElementById("tool");
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 w-full",
        scrolled 
          ? "bg-white shadow-sm dark:bg-gray-900 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="font-bold text-xl text-slate-900 dark:text-white">Resume AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm font-medium text-slate-700 hover:text-blue-600 flex items-center gap-1 dark:text-slate-200 dark:hover:text-blue-400">
            Features <ChevronDown size={16} />
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
            How It Works
          </Link>
          <Link to="/#tool" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
            Try It
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
            Sign in
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm transition-all"
            onClick={scrollToAnalyzer}
          >
            Start for free
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
              className="text-sm font-medium py-2 px-4 hover:bg-slate-100 rounded-md dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-sm font-medium py-2 px-4 hover:bg-slate-100 rounded-md dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/#tool" 
              className="text-sm font-medium py-2 px-4 hover:bg-slate-100 rounded-md dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try It
            </Link>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                onClick={scrollToAnalyzer}
              >
                Start for free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
