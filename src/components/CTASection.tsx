
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const scrollToAnalyzer = () => {
    const analyzerSection = document.getElementById("tool");
    if (analyzerSection) {
      analyzerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10 dark:text-slate-400">
            Optimize your CV with our AI-powered platform and increase your chances of getting interviews.
            Join thousands of successful job seekers who have enhanced their careers with our tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all px-8 py-6"
              onClick={scrollToAnalyzer}
            >
              Start for free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 rounded-full transition-all px-8 py-6 border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              Request demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
