import { useState } from "react";
import { Layout } from "@/components/Layout";
import { InterviewPreparation } from "@/components/InterviewPreparation";
import { InterviewTips } from "@/components/InterviewTips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const InterviewPrep = () => {
  const [showTips, setShowTips] = useState(true);
  const location = useLocation();
  const { cvContent, jobDescription } = location.state || { cvContent: "", jobDescription: "" };
  
  return (
    <Layout>
      <div className="min-h-screen py-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-cyan-900/20 animate-pulse delay-1000"></div>
        </div>

        <div className="container px-4 mx-auto max-w-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl dark:from-gray-900/95 dark:to-gray-900/80 border border-white/30 dark:border-gray-700/30">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text flex items-center justify-center gap-3">
                  Interview Preparation <Sparkles className="h-8 w-8 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
                </h1>
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mt-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
              Get ready for your next interview with AI-generated questions and expert tips.
            </p>
          </div>

          <div className="flex items-center justify-center mb-12">
            <Button 
              onClick={() => setShowTips(!showTips)} 
              className="group relative bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-500 dark:via-violet-500 dark:to-cyan-500 text-white py-6 px-8 rounded-2xl shadow-2xl hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 dark:hover:from-fuchsia-400 dark:hover:via-violet-400 dark:hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 border border-white/30 dark:border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="flex items-center gap-3 text-lg font-medium">
                <GraduationCap className="h-6 w-6" />
                {showTips ? "Hide Interview Tips" : "Show Interview Tips"}
              </span>
            </Button>
          </div>
          
          {showTips && (
            <div className="mb-16 animate-scale-in">
              <InterviewTips />
            </div>
          )}
          
          {(!cvContent || !jobDescription) ? (
            <Card className="group bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-12 max-w-2xl mx-auto text-center overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5 dark:from-fuchsia-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-8 mx-auto w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-violet-500 dark:from-fuchsia-400 dark:to-violet-400 rounded-2xl flex items-center justify-center transform rotate-3 transition-transform duration-300 group-hover:rotate-6 shadow-xl">
                  <Sparkles className="h-10 w-10 text-white animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
                  No Resume Detected
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg mb-8">
                  To get AI-generated interview questions based on your resume, please return to the main page and analyze your resume first.
                </p>
                <Button 
                  onClick={() => window.location.href = "/#tool"}
                  className="group relative bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-500 dark:via-violet-500 dark:to-cyan-500 text-white py-4 px-6 rounded-xl shadow-xl hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 dark:hover:from-fuchsia-400 dark:hover:via-violet-400 dark:hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 border border-white/30 dark:border-white/10"
                >
                  <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="flex items-center gap-2 text-lg font-medium">
                    Analyze Your Resume
                    <ArrowRight className="h-5 w-5 animate-pulse-slow" />
                  </span>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8">
              <InterviewPreparation cvContent={cvContent} jobDescription={jobDescription} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
