import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, FileText, LightbulbIcon, BookOpenIcon, InfoIcon, HelpCircle, GraduationCap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomepage = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  const navItems = [{
    path: "/",
    label: "Home",
    icon: <FileText className="h-4 w-4" />
  }, {
    path: "/how-it-works",
    label: "How It Works",
    icon: <LightbulbIcon className="h-4 w-4" />
  }, {
    path: "/blog",
    label: "Blog",
    icon: <BookOpenIcon className="h-4 w-4" />
  }, {
    path: "/interview-prep",
    label: "Interview Prep",
    icon: <GraduationCap className="h-4 w-4" />
  }, {
    path: "/about",
    label: "About",
    icon: <InfoIcon className="h-4 w-4" />
  }];
  const isCurrentPage = (path: string) => {
    return location.pathname === path;
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomepage ? "bg-background/80 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img alt="Resume AI" className="h-8 md:h-10" src="/lovable-uploads/f2ec032b-7fab-47a4-adb9-6d15241ff48d.png" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => <Button key={item.path} variant={isCurrentPage(item.path) ? "default" : "ghost"} asChild className={`flex items-center gap-1 ${isCurrentPage(item.path) ? "" : "hover:text-primary"}`}>
                <Link to={item.path}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>)}
            
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && isMobile && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.2
      }} className="md:hidden bg-background border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              {navItems.map(item => <Button key={item.path} variant={isCurrentPage(item.path) ? "default" : "ghost"} onClick={() => setIsOpen(false)} asChild className="justify-start w-full">
                  <Link to={item.path}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>)}
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
};