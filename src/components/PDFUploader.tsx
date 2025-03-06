
import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileUp, FileText, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processFile } from "@/utils/fileProcessing";

interface PDFUploaderProps {
  onUploadSuccess: (text: string) => void;
}

export const PDFUploader = ({ onUploadSuccess }: PDFUploaderProps) => {
  const { toast } = useToast();
  const [cvText, setCvText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cvText.trim()) {
      onUploadSuccess(cvText);
    }
  }, [cvText, onUploadSuccess]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(e.target.value);
    
    if (!cvText.trim() && e.target.value.trim()) {
      toast({
        title: "CV Content Updated",
        description: "Your CV content is being processed as you type.",
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    try {
      const extractedText = await processFile(file);
      setCvText(extractedText);

      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} has been processed.`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error Processing File",
        description: error instanceof Error ? error.message : "Failed to process file. Please try again.",
        variant: "destructive",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center gap-2">
          <FileUp className="h-5 w-5 text-orange-500" />
          <div className="text-md font-medium text-slate-900 dark:text-white">Upload Your Resume</div>
        </div>
        
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 transition-all hover:border-blue-500 dark:border-slate-700 dark:hover:border-blue-400">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".docx,.doc,.txt"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center gap-2 mb-4">
            {fileName ? (
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-blue-500" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
            ) : (
              <File className="h-12 w-12 text-slate-400" />
            )}
            
            <p className="text-sm text-slate-500 text-center dark:text-slate-400">
              Supported formats: DOCX, TXT
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="relative"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileUp className="h-4 w-4 mr-2" />
                {fileName ? "Upload Another File" : "Select File"}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
          Resume Content
        </label>
        <Textarea 
          placeholder="Content will appear here after file upload, or you can manually paste your resume content..." 
          className="resize-none w-full h-full min-h-[200px] border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
          value={cvText}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};
