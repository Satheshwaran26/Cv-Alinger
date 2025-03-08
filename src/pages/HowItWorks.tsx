
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  FileText, 
  Search, 
  CheckCircle, 
  BarChart, 
  Lightbulb,
  Zap,
  Trophy,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:py-24 bg-white dark:bg-gray-950">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">How Resume AI Works</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-slate-400">
            Our AI-powered platform analyzes your resume against job descriptions to maximize your chances of landing interviews and securing your dream job.
          </p>
        </div>

        {/* Key Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 dark:bg-blue-900/30">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Customize for Success</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Use our AI-powered ATS tool to tailor your resume for each job. It matches keywords from the job description to boost your chances of landing an interview.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900/30">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Show Off Your Strengths</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Highlight what makes you unique. Our AI resume builder gives clear suggestions so you can stand out from the competition.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 dark:bg-orange-900/30">
                <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Make Your Experience Count</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Beyond basic checks, our AI refines your resume to showcase impactful achievements and make every experience count.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-16 md:gap-24">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                1. Upload Your Resume
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Begin by pasting your current resume content. Our intelligent system analyzes your skills, experience, education, and other key elements to create a comprehensive profile.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Simple copy-and-paste functionality with secure data handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Advanced text analysis to identify strengths and improvement areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Format-agnostic processing works with various resume styles</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg">
              <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-full h-6 bg-slate-100 rounded mb-4 dark:bg-slate-700"></div>
                <div className="w-2/3 h-6 bg-slate-100 rounded mb-6 dark:bg-slate-700"></div>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center gap-4 dark:border-slate-700">
                  <FileText className="text-blue-500" size={32} />
                  <p className="text-sm text-slate-500 text-center dark:text-slate-400">
                    Paste the content of your resume here
                  </p>
                  <div className="w-full h-20 bg-slate-50 rounded-md dark:bg-slate-700/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg">
              <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-full h-6 bg-slate-100 rounded mb-4 dark:bg-slate-700"></div>
                <div className="w-2/3 h-6 bg-slate-100 rounded mb-6 dark:bg-slate-700"></div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <Search size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                2. Add Job Description
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Enter the job description for your target position. Our advanced AI analyzes the requirements and expectations to create a personalized matching profile and targeted recommendations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Smart keyword extraction identifies what recruiters are looking for</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Industry-specific context understanding across various fields</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Comprehensive analysis of hard skills, soft skills, and qualifications</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <BarChart size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                3. Receive Detailed Analysis
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Our AI performs a comprehensive comparison between your resume and the job description, providing a detailed match analysis with concrete improvement areas.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Detailed breakdown of skills match with percentage scores</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Gap analysis with missing keywords and qualifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Experience alignment scoring with detailed recommendations</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg">
              <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-1/2 h-6 bg-slate-100 rounded mb-6 dark:bg-slate-700"></div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "75%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "60%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "85%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg">
              <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-full h-6 bg-slate-100 rounded mb-4 dark:bg-slate-700"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-slate-100 rounded mb-2 dark:bg-slate-700"></div>
                      <div className="w-5/6 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-slate-100 rounded mb-2 dark:bg-slate-700"></div>
                      <div className="w-5/6 h-4 bg-slate-100 rounded dark:bg-slate-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                4. Select Recommendations
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Choose from our AI-generated recommendations to optimize your resume. Each suggestion is tailored to improve your match score and highlight your relevant qualifications.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Personalized improvement suggestions with impact ratings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">ATS-friendly formatting tips for better scanner results</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Strategic keyword placement for maximum impact</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 5 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                5. Get Your Optimized Resume
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Receive your enhanced resume with all selected improvements applied, relevant keywords added, and a significantly improved match score to maximize your interview chances.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Download your optimized resume in multiple formats</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Average match score improvement of 30-40%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Strategic keyword placement and quantifiable achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Bonus interview preparation questions tailored to your profile</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg">
              <div className="overflow-hidden rounded-lg shadow-xl border border-slate-100 dark:border-slate-700">
                <img 
                  src="/lovable-uploads/f1e201ea-cc59-4317-81e9-da4f83a81eb7.png" 
                  alt="CV Improvement Result" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">Ready to Transform Your Job Search?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto dark:text-slate-400">
            Start using Resume AI today and dramatically increase your chances of landing interviews for the positions you truly desire.
          </p>
          <Link to="/#tool">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all px-8 py-6 gap-2">
              Try It Now <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
