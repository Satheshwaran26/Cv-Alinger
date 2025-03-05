
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LinkedInProfileInputProps {
  onProfileExtracted: (text: string) => void;
}

export const LinkedInProfileInput = ({ onProfileExtracted }: LinkedInProfileInputProps) => {
  const { toast } = useToast();
  const [profileUrl, setProfileUrl] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extractedProfile, setExtractedProfile] = useState("");
  const [isManualMode, setIsManualMode] = useState(false);

  const handleExtract = async () => {
    if (!profileUrl.includes("linkedin.com/in/")) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // For now, we'll use a simplified extraction mechanism
      // In a real app, this would connect to a backend service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Instead of mock data, we'll prompt the user to manually input their LinkedIn info
      setIsManualMode(true);
      
      toast({
        title: "LinkedIn Integration",
        description: "This demo requires manual input of your LinkedIn information",
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "There was an error connecting to LinkedIn. Please try the manual input option.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualInput.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter your LinkedIn profile information",
        variant: "destructive",
      });
      return;
    }
    
    setExtractedProfile(manualInput);
    onProfileExtracted(manualInput);
    
    toast({
      title: "Profile Processed",
      description: "Your LinkedIn profile information has been successfully extracted!",
    });
  };

  return (
    <div className="flex flex-col space-y-4 h-full">
      {!isManualMode ? (
        <div>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="https://linkedin.com/in/your-profile"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleExtract} 
              disabled={isLoading || !profileUrl.trim()} 
              className="whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                "Connect to LinkedIn"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-slate-700 mb-1">
            Please paste your LinkedIn information below:
          </div>
          <textarea
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Enter your LinkedIn profile information (name, title, experience, education, skills, etc.)"
            className="w-full h-32 p-2 border rounded-md text-sm"
          />
          <div className="flex justify-end">
            <Button onClick={handleManualSubmit} disabled={!manualInput.trim()}>
              Submit Profile
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto min-h-[220px]">
        {extractedProfile ? (
          <>
            <div className="text-sm font-medium text-slate-700 mb-2 dark:text-slate-300">Your LinkedIn Profile</div>
            <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-800 h-[220px] overflow-y-auto whitespace-pre-line text-sm">
              {extractedProfile}
            </div>
          </>
        ) : (
          <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-800 h-[220px] flex items-center justify-center text-slate-400 text-sm">
            {isManualMode 
              ? "Enter your LinkedIn profile information and click Submit"
              : "Enter your LinkedIn URL and click Connect to proceed"}
          </div>
        )}
      </div>
    </div>
  );
};
