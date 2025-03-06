
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";

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
    onSubmit(cvText, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          </div>
        </Card>
        
        <Card className="overflow-hidden border bg-white shadow-md rounded-xl dark:bg-slate-900">
          <div className="p-6 h-full flex flex-col">
            <div className="text-lg font-medium mb-2 text-slate-900 dark:text-white">Job Description</div>
            <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">
              <!-- Removed the text "Paste the job description you're applying for" -->
            </p>
            
            <div className="relative flex-1 min-h-[350px]">
              <Textarea
                placeholder="Paste the job description here..."
                className="resize-none absolute inset-0 h-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
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
          disabled={isLoading || !cvText.trim()} 
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
