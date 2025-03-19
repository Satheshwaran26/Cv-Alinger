import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Sparkles } from "lucide-react";

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter",
      });
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="border-t border-muted/30 py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 ">
          <div className="md:col-span-2 ">
            <Link to="/hom" className="group flex items-center gap-3 ">
              <div className="relative mb-6">
                {/* Dark box with glow effect */}
                <div className="w-10 h-10 bg-gray-900 rounded-lg relative overflow-hidden ">
                  {/* Purple glow effect */}
                  <div className="absolute inset-0 bg-fuchsia-500/30 blur-sm" />
                  {/* Icon inside */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Logo text */}
              <div className="flex items-center gap-1 mb-6">
                <span className="text-2xl font-bold text-white">
                  Resume <span className="text-fuchsia-500">AI</span>
                </span>
                <Sparkles className="h-5 w-5 text-fuchsia-500 animate-pulse" />
              </div>
            </Link>

            <p className="text-muted-foreground max-w-sm mb-5">
              AI-powered resume optimization to align your resume with job descriptions using the KSAO framework.
            </p>

            {/* LinkedIn Button */}
            <a
              className="libutton"
              href="https://www.linkedin.com/in/brittytino"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn
            </a>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Get Updates</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to receive the latest news and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="shrink-0" disabled={isSubscribing}>
                {isSubscribing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2025 Resume AI. All rights reserved.</div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm">
            <div className="text-primary font-medium">
              <a
                href="https://www.linkedin.com/in/brittytino/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                Built by Tino Britty
                <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
