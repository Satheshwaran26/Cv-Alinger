
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-200",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 transform rotate-45 translate-y-4" />
            <span className="relative z-10 text-primary font-semibold">RA</span>
          </div>
          <span className="font-bold text-lg md:text-xl">Resume AI</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="ghost">How It Works</Button>
          </Link>
          <Link to="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="flex md:hidden items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
          <div className="fixed z-50 top-16 inset-x-0 bg-background border-b shadow-lg">
            <div className="container p-4 flex flex-col space-y-3">
              <Link to="/" onClick={toggleMobileMenu}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/how-it-works" onClick={toggleMobileMenu}>
                <Button variant="ghost" className="w-full justify-start">How It Works</Button>
              </Link>
              <Link to="/blog" onClick={toggleMobileMenu}>
                <Button variant="ghost" className="w-full justify-start">Blog</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
