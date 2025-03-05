
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BrowserViewCVProps {
  content: string;
  onBack: () => void;
}

export const BrowserViewCV = ({ content, onBack }: BrowserViewCVProps) => {
  const { toast } = useToast();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Process CV content to create a clean display
  const processedContent = React.useMemo(() => {
    // Clean up any formatting markers or annotations
    const cleanContent = content
      .replace(/\[Improvement based on:.*?\]/g, '')
      .replace(/\[Improved based on recommendation\]:/g, '')
      .replace(/\[Consider adding based on recommendation:.*?\]/g, '');
    
    // Split into lines for processing
    const lines = cleanContent.split('\n').filter(line => line.trim().length > 0);
    
    // Identify sections (lines that are likely headers)
    const processedLines = lines.map(line => {
      // Check if this looks like a section header (all caps, short line)
      const isLikelyHeader = /^[A-Z\s]{3,30}$/.test(line.trim()) || 
                             line.trim().endsWith(':') ||
                             /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(line.trim());
      
      if (isLikelyHeader) {
        return { text: line, type: 'header' };
      }
      
      // Detect bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return { text: line, type: 'bullet' };
      }
      
      // Check if this might be a date range (common in CV experience sections)
      if (/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)(\s+\d{4})?(\s+(-|–|to)\s+)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?(\s+\d{4})?\b/i.test(line)) {
        return { text: line, type: 'date' };
      }
      
      return { text: line, type: 'text' };
    });
    
    return processedLines;
  }, [content]);
  
  // Handle printing the CV
  const handlePrint = () => {
    window.print();
  };
  
  // Handle copying the styled content (will copy HTML)
  const handleCopyFormatted = () => {
    if (containerRef.current) {
      // Create a selection
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(containerRef.current);
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        
        toast({
          title: "Copied formatted CV",
          description: "The formatted CV has been copied to your clipboard."
        });
      }
    }
  };
  
  // Handle copying just the plain text
  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied plain text",
      description: "The plain text of your CV has been copied to your clipboard."
    });
  };
  
  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none">
      {/* Print styles - these will only apply when printing */}
      <style type="text/css" media="print">
        {`
          @page { size: A4; margin: 20mm 15mm; }
          body { background: white; }
          .no-print { display: none !important; }
          .print-container { margin: 0 !important; padding: 0 !important; }
        `}
      </style>
      
      {/* Header with controls - will be hidden when printing */}
      <div className="p-4 bg-slate-100 border-b print:hidden no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyPlainText}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyFormatted}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Formatted
            </Button>
            <Button variant="default" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
      
      {/* The CV content */}
      <div className="p-8 print-container">
        <div 
          ref={containerRef}
          className="cv-content max-w-3xl mx-auto"
          style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {processedContent.map((line, index) => {
            if (line.type === 'header') {
              return (
                <h2 
                  key={index} 
                  className="text-xl font-bold text-gray-800 mt-6 mb-2 border-b border-gray-300 pb-1"
                >
                  {line.text}
                </h2>
              );
            } else if (line.type === 'bullet') {
              return (
                <div key={index} className="flex items-start my-1.5">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>{line.text.replace(/^[•\-*]\s*/, '')}</span>
                </div>
              );
            } else if (line.type === 'date') {
              return (
                <p key={index} className="text-gray-600 font-medium my-2">
                  {line.text}
                </p>
              );
            } else {
              return (
                <p key={index} className="my-1.5">
                  {line.text}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
