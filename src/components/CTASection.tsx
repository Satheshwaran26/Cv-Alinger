import { useEffect } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";

export const CTASection = () => {
  // Effect to initialize the Tally embed
  useEffect(() => {
    // Function to load Tally embeds
    const loadTallyEmbeds = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe: HTMLIFrameElement) => {
          iframe.src = iframe.dataset.tallySrc || "";
        });
      }
    };

    // Check if Tally script is already loaded
    if (typeof (window as any).Tally !== "undefined") {
      loadTallyEmbeds();
    } else {
      // Check if script is already being loaded
      const tallyScript = "https://tally.so/widgets/embed.js";
      if (!document.querySelector(`script[src="${tallyScript}"]`)) {
        const script = document.createElement("script");
        script.src = tallyScript;
        script.onload = loadTallyEmbeds;
        script.onerror = loadTallyEmbeds;
        document.body.appendChild(script);
      }
    }

    // Cleanup function
    return () => {
      // No cleanup needed for this case
    };
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Aesthetic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-violet-100/20 to-transparent dark:from-blue-900/10 dark:via-violet-900/10 dark:to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-blue-100/30 via-violet-100/30 to-blue-100/30 rounded-full blur-3xl opacity-50 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-blue-900/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/10 to-violet-500/10 dark:from-blue-400/10 dark:to-violet-400/10 px-4 py-2 rounded-full mb-6">
              <MessageCircle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Contact Us</span>
            </div>
            
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-xl rounded-full transform rotate-1 scale-105"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 text-transparent bg-clip-text">
                Let's Start a Conversation
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Have questions or ideas? We're here to help you achieve your career goals.
            </p>
          </div>

          {/* Form Container */}
          <div className="relative group">
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur group-hover:blur-xl transition-all duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/20 dark:border-slate-700/20">
              {/* Decorative corner elements */}
              <div className="absolute -top-3 -right-3">
                <div className="relative">
                  <Sparkles className="h-6 w-6 text-blue-400 dark:text-blue-500 animate-pulse" />
                  <Send className="h-4 w-4 text-violet-400 dark:text-violet-500 absolute -bottom-1 -right-1 rotate-45" />
                </div>
              </div>
              
              <div className="absolute -bottom-3 -left-3">
                <div className="relative">
                  <Sparkles className="h-6 w-6 text-violet-400 dark:text-violet-500 animate-pulse" />
                  <MessageCircle className="h-4 w-4 text-blue-400 dark:text-blue-500 absolute -top-1 -right-1" />
                </div>
              </div>
              
              {/* Form */}
              <iframe 
                data-tally-src="https://tally.so/embed/mVDPBN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                loading="lazy" 
                width="100%" 
                height="237" 
                frameBorder="0" 
                title="Contact form"
                className="relative z-10"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
