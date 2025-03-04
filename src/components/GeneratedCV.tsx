
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MatchScore } from "./MatchScore";
import { Download, Copy, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { CVTemplate } from "./CVTemplate";

interface GeneratedCVProps {
  originalScore: number;
  newScore: number;
  appliedRecommendations: string[];
  cvContent: string;
  onBack: () => void;
}

export const GeneratedCV = ({
  originalScore,
  newScore,
  appliedRecommendations,
  cvContent,
  onBack
}: GeneratedCVProps) => {
  const { toast } = useToast();
  const cvTemplateRef = useRef<HTMLDivElement>(null);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cvContent);
    toast({
      title: "Copied to clipboard",
      description: "Your improved CV has been copied to your clipboard."
    });
  };
  
  const handleDownloadText = () => {
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "improved_cv.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "CV Downloaded",
      description: "Your improved CV has been downloaded as a text file."
    });
  };

  const handleDownloadPDF = () => {
    if (!cvTemplateRef.current) return;

    const element = cvTemplateRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'improved_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      toast({
        title: "CV Downloaded",
        description: "Your improved CV has been downloaded as a PDF file."
      });
    });
  };
  
  return (
    <div className="animate-scale-in">
      <Card className="overflow-hidden p-8">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl font-semibold mb-2">Your Enhanced CV</h3>
          <p className="text-muted-foreground text-center max-w-2xl">
            We've applied your selected recommendations to create an improved version of your CV.
          </p>
          
          <div className="mt-8 flex flex-col md:flex-row gap-8 items-center justify-center w-full">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Original Score</div>
              <MatchScore score={originalScore} showPercentage={true} />
            </div>
            
            <div className="hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="block md:hidden">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">New Score</div>
              <MatchScore score={newScore} showPercentage={true} />
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Applied Recommendations</h4>
          <ul className="space-y-2">
            {appliedRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4 bg-muted/20 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium">CV Content</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadText}>
                <FileText className="mr-2 h-4 w-4" />
                Text
              </Button>
              <Button variant="default" size="sm" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
          
          {/* Preview of CV text content */}
          <div className="max-h-80 overflow-y-auto whitespace-pre-wrap bg-background p-4 rounded border text-sm">
            {cvContent}
          </div>
        </div>

        {/* CV template for PDF generation - now visible for better preview */}
        <div className="mb-8 p-4 border rounded-lg hidden">
          <h4 className="text-lg font-medium mb-4">PDF Preview</h4>
          <div className="bg-white rounded shadow">
            <CVTemplate ref={cvTemplateRef} content={cvContent} generatePDF={handleDownloadPDF} />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Fix for missing import
import { Check } from "lucide-react";
