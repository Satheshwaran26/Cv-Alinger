
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Edit, FileText, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadFormProps {
  onSubmit: (cvText: string, jobDescription: string) => void;
  isLoading: boolean;
}

export const UploadForm = ({ onSubmit, isLoading }: UploadFormProps) => {
  const { toast } = useToast();
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

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
    
    // Check minimum text length
    if (cvText.trim().length < 200) {
      toast({
        title: "Resume is too short",
        description: "Please provide a more detailed resume for better analysis",
        variant: "destructive",
      });
      return;
    }
    
    if (jobDescription.trim().length < 100) {
      toast({
        title: "Job description is too short",
        description: "Please provide a more detailed job description for better analysis",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(cvText, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          For best results, paste your complete resume text and a detailed job description. More information leads to better analysis.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border bg-white shadow-md rounded-xl dark:bg-slate-900">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Edit className="h-5 w-5 text-orange-500" />
              <div className="text-lg font-medium text-slate-900 dark:text-white">Your Resume</div>
            </div>
            
            <div className="flex-1 min-h-[350px]">
              <Textarea 
                placeholder="Paste the content of your resume here..." 
                className="resize-none w-full h-full min-h-[350px] border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Minimum 200 characters required for analysis
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div 
                  className={`h-1 rounded-full transition-all ${cvText.length >= 200 ? 'bg-green-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (cvText.length / 200) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="overflow-hidden border bg-white shadow-md rounded-xl dark:bg-slate-900">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-500" />
              <div className="text-lg font-medium text-slate-900 dark:text-white">Job Description</div>
            </div>
            <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">
              Please include key responsibilities, requirements, and qualifications.
            </p>
            
            <div className="relative flex-1 min-h-[350px]">
              <Textarea
                placeholder="Paste the job description here..."
                className="resize-none absolute inset-0 h-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Minimum 100 characters required for analysis
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div 
                  className={`h-1 rounded-full transition-all ${jobDescription.length >= 100 ? 'bg-green-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (jobDescription.length / 100) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading || !cvText.trim() || !jobDescription.trim()} 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all px-8 py-6"
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
