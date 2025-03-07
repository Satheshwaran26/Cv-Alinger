
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MatchScore } from "./MatchScore";
import { Download, Copy, FileText, Eye, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { CVTemplate } from "./CVTemplate";
import { BrowserViewCV } from "./BrowserViewCV";
import { InterviewPreparation } from "./InterviewPreparation";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GeneratedCVProps {
  originalScore: number;
  newScore: number;
  appliedRecommendations: string[];
  cvContent: string;
  jobDescription?: string;
  onBack: () => void;
  addedKeywords?: string[];
}

export const GeneratedCV = ({
  originalScore,
  newScore,
  appliedRecommendations,
  cvContent,
  jobDescription = "",
  onBack,
  addedKeywords = []
}: GeneratedCVProps) => {
  const { toast } = useToast();
  const cvTemplateRef = useRef<HTMLDivElement>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const [viewInBrowser, setViewInBrowser] = useState(false);
  const [showInterviewPrep, setShowInterviewPrep] = useState(false);
  
  useEffect(() => {
    if (cvContent && cvTemplateRef.current) {
      const timer = setTimeout(() => {
        setPdfReady(true);
        console.log("PDF template ready for generation");
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [cvContent]);
  
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
    if (!cvTemplateRef.current || !pdfReady) {
      toast({
        title: "Please wait",
        description: "CV template is still preparing. Try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    const element = cvTemplateRef.current;
    
    console.log("PDF content length:", cvContent.length);
    console.log("PDF template element:", element);
    console.log("PDF template HTML:", element.innerHTML.substring(0, 200) + '...');
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'improved_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: true,
        letterRendering: true,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your CV..."
    });

    try {
      html2pdf().set(opt).from(element).save().then(() => {
        toast({
          title: "CV Downloaded",
          description: "Your improved CV has been downloaded as a PDF file."
        });
      }).catch(error => {
        console.error("PDF generation error:", error);
        toast({
          title: "PDF Generation Failed",
          description: "There was an error creating your PDF. Please try again or use text download.",
          variant: "destructive"
        });
      });
    } catch (err) {
      console.error("PDF generation exception:", err);
      toast({
        title: "PDF Generation Failed",
        description: "There was an unexpected error. Please try the text download option instead.",
        variant: "destructive"
      });
    }
  };
  
  const toggleBrowserView = () => {
    setViewInBrowser(!viewInBrowser);
  };
  
  const toggleInterviewPrep = () => {
    setShowInterviewPrep(!showInterviewPrep);
  };

  const handleShare = (platform: string) => {
    const title = "Check out my improved CV!";
    const url = window.location.href;
    
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this interesting: ${url}`)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      toast({
        title: "Sharing",
        description: `Sharing your CV on ${platform}`,
      });
    }
  };
  
  if (viewInBrowser) {
    return (
      <div className="animate-scale-in">
        <BrowserViewCV 
          content={cvContent} 
          onBack={toggleBrowserView}
        />
      </div>
    );
  }
  
  return (
    <div className="animate-scale-in">
      <Card className="overflow-hidden p-6 md:p-8">
        <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
          <img 
            src="/lovable-uploads/f1e201ea-cc59-4317-81e9-da4f83a81eb7.png" 
            alt="CV Improvement Showcase" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">Your Enhanced CV</h3>
          <p className="text-muted-foreground text-center max-w-2xl">
            We've applied your selected recommendations to create an improved version of your CV.
          </p>
          
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full">
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
        
        <div className="flex justify-end mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleShare("facebook")} className="p-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare("twitter")} className="p-2">
                  <Twitter className="h-5 w-5 text-blue-400" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare("linkedin")} className="p-2">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare("email")} className="p-2">
                  <Mail className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mb-6 md:mb-8">
          <h4 className="text-lg font-medium mb-3 md:mb-4">Applied Recommendations</h4>
          <ul className="space-y-2">
            {appliedRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {addedKeywords && addedKeywords.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h4 className="text-lg font-medium mb-3 md:mb-4">Added Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {addedKeywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="border rounded-lg p-3 md:p-4 bg-muted/20 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
            <h4 className="text-lg font-medium">CV Content</h4>
            <div className="flex flex-wrap gap-2">
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
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={toggleBrowserView}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                View in Browser
              </Button>
            </div>
          </div>
          
          <div className="max-h-60 md:max-h-80 overflow-y-auto whitespace-pre-wrap bg-background p-3 md:p-4 rounded border text-sm">
            {cvContent}
          </div>
        </div>

        <div className="mb-6 md:mb-8 border p-3 md:p-4 rounded-lg" style={{ display: 'block', width: '100%' }}>
          <h4 className="text-lg font-medium mb-2">PDF Preview</h4>
          <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #ddd' }}>
            <CVTemplate ref={cvTemplateRef} content={cvContent} />
          </div>
        </div>
        
        <div className="mb-6 md:mb-8 flex justify-center">
          <Button 
            onClick={toggleInterviewPrep} 
            variant="outline"
            className="w-full md:w-auto"
          >
            {showInterviewPrep ? "Hide Interview Questions" : "Prepare for Interview"}
          </Button>
        </div>
        
        {showInterviewPrep && (
          <div className="mb-6 md:mb-8">
            <InterviewPreparation cvContent={cvContent} jobDescription={jobDescription} />
          </div>
        )}
        
        <div className="flex justify-center">
          <Button variant="outline" onClick={onBack} className="w-full md:w-auto">
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

import { Check } from "lucide-react";
