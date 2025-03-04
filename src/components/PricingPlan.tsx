
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlanProps {
  onSelectPlan: (planId: string, price: number) => void;
}

export const PricingPlan = ({ onSelectPlan }: PricingPlanProps) => {
  const handleSelectPlan = (planId: string, price: number) => {
    onSelectPlan(planId, price);
  };

  return (
    <div className="animate-scale-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-3">Analyze Your Resume</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered insights to improve your CV and increase your chances of landing that dream job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Single Analysis Plan */}
        <Card className="border-2 overflow-hidden flex flex-col relative">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Single Analysis</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-3xl font-bold">$4.99</span>
              <span className="text-muted-foreground mb-1">/ one-time</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Complete CV analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Skill gap identification</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Personalized recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>AI-improved CV generation</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 pt-0">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => handleSelectPlan("single", 4.99)}
            >
              Get Started
            </Button>
          </div>
        </Card>
        
        {/* Value Bundle Plan */}
        <Card className="border-2 border-primary overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            POPULAR
          </div>
          
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Value Bundle</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-3xl font-bold">$19.99</span>
              <span className="text-muted-foreground mb-1">/ bundle</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 font-medium">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>5 CV analyses (Save $5)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>All basic features included</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Multiple job descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Priority processing</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 pt-0">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => handleSelectPlan("bundle", 19.99)}
            >
              Best Value
            </Button>
          </div>
        </Card>
        
        {/* Premium Bundle Plan */}
        <Card className="border-2 overflow-hidden flex flex-col relative">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Premium Bundle</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-3xl font-bold">$34.99</span>
              <span className="text-muted-foreground mb-1">/ bundle</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 font-medium">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>10 CV analyses (Save $15)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>All bundle features included</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>Expert industry recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-500 h-5 w-5 mt-0.5 shrink-0" />
                <span>30-day access to all features</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 pt-0">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => handleSelectPlan("premium", 34.99)}
            >
              Get Premium
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-muted-foreground">
          For enterprise solutions or custom pricing, please <a href="#" className="text-primary underline">contact us</a>.
        </p>
      </div>
    </div>
  );
};
