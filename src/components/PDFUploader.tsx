
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface PDFUploaderProps {
  onUploadSuccess: (text: string) => void;
}

export const PDFUploader = ({ onUploadSuccess }: PDFUploaderProps) => {
  const { toast } = useToast();
  const [cvText, setCvText] = useState("");

  // Update parent component whenever text changes
  useEffect(() => {
    if (cvText.trim()) {
      onUploadSuccess(cvText);
    }
  }, [cvText, onUploadSuccess]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(e.target.value);
    
    // Show toast only on first input
    if (!cvText.trim() && e.target.value.trim()) {
      toast({
        title: "CV Content Updated",
        description: "Your CV content is being processed as you type.",
      });
    }
  };

  return (
    <Card className="overflow-hidden border bg-white shadow-md rounded-xl dark:bg-slate-900">
      <div className="p-6 flex flex-col h-full">
        <div className="text-lg font-medium mb-2 text-slate-900 dark:text-white">Your Resume</div>
        <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">
          Paste your resume content below for AI analysis
        </p>
        
        <div className="flex-1 min-h-[300px] flex flex-col">
          <Textarea 
            placeholder="Paste the content of your resume here..." 
            className="resize-none flex-1 min-h-[250px] border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            value={cvText}
            onChange={handleTextChange}
          />
        </div>
      </div>
    </Card>
  );
};
