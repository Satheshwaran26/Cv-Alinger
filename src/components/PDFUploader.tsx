
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileUp } from "lucide-react";

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
    <div className="flex flex-col space-y-4 h-full">
      {/* PDF Upload Section - Simplified at top */}
      <div className="flex items-center gap-2 mb-2">
        <FileUp className="h-5 w-5 text-orange-500" />
        <div className="text-md font-medium text-slate-900 dark:text-white">PDF Upload</div>
      </div>
      
      <p className="text-sm text-slate-500 mb-2 dark:text-slate-400">
        For this demo, please paste the content extracted from your PDF below
      </p>

      {/* PDF Content Section - Takes remaining space */}
      <div className="flex-1 min-h-[250px]">
        <Textarea 
          placeholder="Paste the content of your resume here..." 
          className="resize-none w-full h-full min-h-[250px] border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
          value={cvText}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};
