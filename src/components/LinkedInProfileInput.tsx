
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
  const [isLoading, setIsLoading] = useState(false);
  const [extractedProfile, setExtractedProfile] = useState("");

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
    
    // In a real implementation, this would call a backend API
    // For this demo, we'll simulate extraction with a timeout
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted profile data (in a real app, this would come from the API)
      const mockExtractedData = `John Doe
Marketing Professional | Digital Strategy | Brand Development

EXPERIENCE
Senior Marketing Manager
ABC Company | Jan 2020 - Present
• Led digital marketing campaigns resulting in 45% increase in engagement
• Managed a team of 5 marketing specialists and $500k annual budget
• Implemented data-driven strategies improving conversion rates by 30%

Marketing Specialist
XYZ Corporation | Jun 2017 - Dec 2019
• Developed content strategy across social media platforms
• Coordinated with sales team to optimize lead generation process
• Created monthly performance reports for executive leadership

EDUCATION
Master of Business Administration
University of Marketing | 2017

Bachelor of Arts in Communications
State University | 2015

SKILLS
• Digital Marketing
• Content Strategy
• Social Media Management
• SEO/SEM
• Data Analysis
• Team Leadership`;

      setExtractedProfile(mockExtractedData);
      onProfileExtracted(mockExtractedData);
      
      toast({
        title: "Profile Extracted",
        description: "Your LinkedIn profile information has been successfully extracted!",
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "There was an error extracting your LinkedIn profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5 h-full">
      {/* LinkedIn Profile Input Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Linkedin className="h-5 w-5 text-blue-600" />
          <div className="text-lg font-medium text-slate-900 dark:text-white">LinkedIn Profile</div>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your LinkedIn profile URL to automatically extract your resume content
        </p>
        
        <div className="flex gap-2">
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
                Extracting...
              </>
            ) : (
              "Extract Profile"
            )}
          </Button>
        </div>
      </div>

      {/* Extracted Profile Content Section */}
      {extractedProfile && (
        <div className="flex-1 overflow-auto mt-3">
          <div className="text-sm font-medium text-slate-700 mb-2 dark:text-slate-300">Extracted Profile</div>
          <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-800 h-[200px] overflow-y-auto whitespace-pre-line text-sm">
            {extractedProfile}
          </div>
        </div>
      )}
    </div>
  );
};
