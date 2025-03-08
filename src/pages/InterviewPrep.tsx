
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { InterviewPreparation } from "@/components/InterviewPreparation";
import { InterviewTips } from "@/components/InterviewTips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

const InterviewPrep = () => {
  const [showTips, setShowTips] = useState(true); // Changed initial state to true
  const location = useLocation();
  const { cvContent, jobDescription } = location.state || { cvContent: "", jobDescription: "" };
  
  return (
    <Layout>
      <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Interview Preparation
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Get ready for your next interview with AI-generated questions and expert tips.
            </p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <Button 
              onClick={() => setShowTips(!showTips)} 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              {showTips ? "Hide Interview Tips" : "Show Interview Tips"}
            </Button>
          </div>
          
          {showTips && (
            <div className="mb-10 animate-scale-in">
              <InterviewTips />
            </div>
          )}
          
          {(!cvContent || !jobDescription) ? (
            <Card className="p-8 border-2 border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950 shadow-lg max-w-2xl mx-auto text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">No Resume Detected</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                To get AI-generated interview questions based on your resume, please return to the main page and analyze your resume first.
              </p>
              <Button 
                onClick={() => window.location.href = "/#tool"}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Analyze Your Resume
              </Button>
            </Card>
          ) : (
            <InterviewPreparation cvContent={cvContent} jobDescription={jobDescription} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
