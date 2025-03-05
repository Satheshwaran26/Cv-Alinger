
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface PDFUploaderProps {
  onUploadSuccess: (text: string) => void;
}

export const PDFUploader = ({ onUploadSuccess }: PDFUploaderProps) => {
  const { toast } = useToast();
  const [cvText, setCvText] = useState("");

  const handleSubmit = () => {
    if (cvText.trim()) {
      onUploadSuccess(cvText);
      toast({
        title: "CV Content Submitted",
        description: "Your CV content has been processed successfully.",
      });
    } else {
      toast({
        title: "Empty Content",
        description: "Please paste your CV content before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/20 transition-all">
      <div className="p-6 flex flex-col h-full">
        <div className="text-lg font-medium mb-2">Your Resume</div>
        <p className="text-sm text-muted-foreground mb-4">
          Paste your resume content below for AI analysis
        </p>
        
        <div className="flex-1 min-h-[300px] flex flex-col">
          <Textarea 
            placeholder="Paste the content of your resume here..." 
            className="resize-none flex-1 min-h-[250px]"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          />
          
          <div className="mt-4">
            <Button 
              variant="default" 
              onClick={handleSubmit}
              disabled={!cvText.trim()}
            >
              Submit Resume Content
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
