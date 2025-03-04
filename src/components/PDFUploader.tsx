
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface PDFUploaderProps {
  onUploadSuccess: (text: string) => void;
}

export const PDFUploader = ({ onUploadSuccess }: PDFUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setFileName(file.name);
    
    try {
      // In a real implementation, you would use a PDF parsing library
      // For now, we'll simulate successful processing and extract filename as metadata
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Pass file metadata (filename) rather than content
      onUploadSuccess(`PDF file uploaded: ${file.name}`);
      
      setUploadStatus("success");
      toast({
        title: "PDF uploaded successfully",
        description: `${file.name} has been processed`,
      });
    } catch (error) {
      console.error("Error processing PDF:", error);
      setUploadStatus("error");
      toast({
        title: "Upload failed",
        description: "There was an error processing your PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  return (
    <Card 
      className={`overflow-hidden border-2 border-dashed ${
        dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
      } transition-all`}
    >
      <div
        className="p-6 flex flex-col"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-lg font-medium mb-2">Your Resume</div>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your resume PDF for AI analysis
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center transition-all">
          {uploadStatus === "idle" && (
            <>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center transition-all hover:bg-muted/50 cursor-pointer relative w-full">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept=".pdf"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <div className="text-base font-medium">
                    Drag & drop or click to upload
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Supports PDF files only
                  </div>
                </div>
              </div>
            </>
          )}
          
          {isUploading && (
            <div className="flex flex-col items-center py-8">
              <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-base font-medium">Uploading {fileName}...</p>
              <p className="text-sm text-muted-foreground mt-1">Processing PDF file...</p>
            </div>
          )}
          
          {uploadStatus === "success" && !isUploading && (
            <div className="flex flex-col items-center py-8">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-base font-medium">Upload Complete</p>
              <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => {
                  setUploadStatus("idle");
                  setFileName(null);
                }}
              >
                Upload Another Resume
              </Button>
            </div>
          )}
          
          {uploadStatus === "error" && !isUploading && (
            <div className="flex flex-col items-center py-8">
              <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-base font-medium">Upload Failed</p>
              <p className="text-sm text-muted-foreground mt-1">Please try again with a valid PDF file</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => {
                  setUploadStatus("idle");
                  setFileName(null);
                }}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
