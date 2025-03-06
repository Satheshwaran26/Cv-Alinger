
import { useEffect } from "react";

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
    <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background light elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-2xl p-12 md:p-16 max-w-5xl mx-auto text-center shadow-lg border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            We'd Be Happy to Hear From You
          </h2>
          
          {/* Tally.so embed form */}
          <div className="mb-8">
            <iframe 
              data-tally-src="https://tally.so/embed/mVDPBN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="237" 
              frameBorder="0" 
              title="Contact form"
              className="mx-auto"
            ></iframe>
          </div>
          
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 dark:text-white">
            How did you find us?
          </p>
          <a 
            href="#hero" 
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};
