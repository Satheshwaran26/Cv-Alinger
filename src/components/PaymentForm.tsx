
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  planId: string;
  price: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export const PaymentForm = ({ 
  planId, 
  price,
  onPaymentSuccess,
  onCancel 
}: PaymentFormProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Basic input formatting
    let formattedValue = value;
    if (name === "cardNumber") {
      // Remove non-digits and limit to 16 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === "expiry") {
      // Format as MM/YY
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (name === "cvc") {
      // Limit to 3-4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // This would be where you'd integrate with a real payment processor
    // For this example, we'll simulate a successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Your payment of $${price.toFixed(2)} has been processed successfully.`,
      });
      onPaymentSuccess();
    }, 2000);
  };

  const getPlanName = () => {
    switch(planId) {
      case "single": return "Single Analysis";
      case "bundle": return "Value Bundle (5 Analyses)";
      case "premium": return "Premium Bundle (10 Analyses)";
      default: return "Plan";
    }
  };

  return (
    <div className="animate-scale-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-3">Complete Your Purchase</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          You're purchasing the {getPlanName()} for ${price.toFixed(2)}
        </p>
      </div>
      
      <Card className="max-w-md mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input 
                id="name"
                name="name"
                placeholder="John Doe" 
                required
                className="mt-1"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456" 
                required
                className="mt-1"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY" 
                  required
                  className="mt-1"
                  value={formData.expiry}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc"
                  name="cvc"
                  placeholder="123" 
                  required
                  className="mt-1"
                  type="password"
                  value={formData.cvc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="sm:min-w-[140px]"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay $${price.toFixed(2)}`
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>This is a demo payment form. No real payments will be processed.</p>
        <p className="mt-1">In a production environment, you would integrate with Stripe, PayPal, or another payment processor.</p>
      </div>
    </div>
  );
};
