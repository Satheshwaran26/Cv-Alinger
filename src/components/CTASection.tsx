
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
      
      {/* Blurred shapes */}
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass rounded-2xl p-12 md:p-16 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Optimize your CV with our AI-powered platform and increase your chances of getting interviews.
            Join thousands of successful job seekers who have enhanced their careers with our tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-md transition-all hover:shadow-lg px-8 py-6">
              Get Started For Free
            </Button>
            <Button size="lg" variant="outline" className="border-2 px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
