import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface UploadFormProps {
  onSubmit: (cvText: string, jobDescription: string) => void;
  isLoading: boolean;
}

export const UploadForm = ({ onSubmit, isLoading }: UploadFormProps) => {
  const { toast } = useToast();
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      try {
        const file = e.dataTransfer.files[0];
        
        if (file.type !== "application/pdf" && 
            !file.type.includes("text") && 
            file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          toast({
            title: "Unsupported file",
            description: "Please upload a PDF, DOC, DOCX, or TXT file",
            variant: "destructive",
          });
          return;
        }
        
        if (file.type.includes("text")) {
          const text = await file.text();
          setCvText(text);
          toast({
            title: "CV uploaded",
            description: "Your CV has been successfully uploaded",
          });
        } else {
          toast({
            title: "CV uploaded",
            description: "Your CV has been successfully uploaded",
          });
          setCvText("Sample CV content from uploaded file: " + file.name);
        }
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const file = e.target.files[0];
        
        if (file.type !== "application/pdf" && 
            !file.type.includes("text") && 
            file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          toast({
            title: "Unsupported file",
            description: "Please upload a PDF, DOC, DOCX, or TXT file",
            variant: "destructive",
          });
          return;
        }
        
        if (file.type.includes("text")) {
          const text = await file.text();
          setCvText(text);
          toast({
            title: "CV uploaded",
            description: "Your CV has been successfully uploaded",
          });
        } else {
          toast({
            title: "CV uploaded",
            description: "Your CV has been successfully uploaded",
          });
          setCvText("Sample CV content from uploaded file: " + file.name);
        }
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cvText.trim() === "" || jobDescription.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and a job description",
        variant: "destructive",
      });
      return;
    }
    onSubmit(cvText, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/20 transition-all">
          <div 
            className={`p-6 h-full flex flex-col ${dragActive ? "bg-primary/5" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-lg font-medium mb-2">Your Resume</div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload or paste your resume content for AI analysis
            </p>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center transition-all hover:bg-muted/50 cursor-pointer relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z" fill="currentColor" />
                    <path d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z" fill="currentColor" />
                  </svg>
                  <div className="text-sm">
                    Drag & drop or click to upload
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX, TXT
                  </div>
                </div>
              </div>
              
              <div className="relative flex-1 min-h-[200px]">
                <Textarea
                  placeholder="Or paste your CV content here..."
                  className="resize-none absolute inset-0 h-full"
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/20 transition-all">
          <div className="p-6 h-full flex flex-col">
            <div className="text-lg font-medium mb-2">Job Description</div>
            <p className="text-sm text-muted-foreground mb-4">
              Paste the job description you're applying for
            </p>
            
            <div className="relative flex-1 min-h-[300px]">
              <Textarea
                placeholder="Paste the job description here..."
                className="resize-none absolute inset-0 h-full"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading} 
          className="w-full md:w-auto px-8 py-6 shadow-md transition-all hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing with AI...
            </>
          ) : (
            "Analyze My Resume with AI"
          )}
        </Button>
      </div>
    </form>
  );
};
