import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  FileText, 
  Search, 
  CheckCircle, 
  BarChart, 
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:py-24 bg-white dark:bg-gray-950">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">How Resume AI Works</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Our AI-powered platform analyzes your resume against job descriptions to maximize your chances of landing interviews.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                1. Paste Your Resume
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Start by pasting the content of your current resume. Our system will analyze your skills, experience, education, and other key elements.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Simple copy and paste</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Secure and private text handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Advanced text analysis technology</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5">
              <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5">
              <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-full h-6 bg-slate-100 rounded mb-4 dark:bg-slate-700"></div>
                <div className="w-2/3 h-6 bg-slate-100 rounded mb-6 dark:bg-slate-700"></div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <div className="w-full h-4 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                2. Provide Job Description
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Enter the job description for the position you're applying to. Our AI analyzes the requirements and expectations to create a tailored comparison.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Copy-paste convenience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Keyword and requirement extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Industry-specific context understanding</span>
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
                3. Get Detailed Analysis
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Our AI compares your resume against the job description, providing a comprehensive match analysis and highlighting areas for improvement.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Skills match percentage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Missing keywords identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Experience alignment scoring</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5">
              <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-1/2 h-6 bg-slate-100 rounded mb-6 dark:bg-slate-700"></div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "75%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "60%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                      <div className="w-1/4 h-4 bg-slate-100 rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: "85%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5">
              <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="w-full h-6 bg-slate-100 rounded mb-4 dark:bg-slate-700"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-slate-100 rounded mb-2 dark:bg-slate-700"></div>
                      <div className="w-5/6 h-4 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-slate-100 rounded mb-2 dark:bg-slate-700"></div>
                      <div className="w-5/6 h-4 bg-slate-100 rounded"></div>
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
                4. Receive Tailored Recommendations
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Get personalized suggestions to optimize your resume for the specific job, including wording improvements, skills to highlight, and content restructuring.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">AI-generated improvement suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">ATS-friendly formatting tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Content prioritization guidance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Result Showcase - NEW SECTION */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                5. Get Your Improved Resume
              </h2>
              <p className="text-slate-600 mb-6 dark:text-slate-400">
                Receive your enhanced resume with all recommendations applied, relevant keywords added, and a significant improvement in match score.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Download in PDF or text format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Significantly improved match score</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Added relevant keywords and optimized content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300">Interview preparation questions</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5">
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

        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">Ready to Optimize Your Resume?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto dark:text-slate-400">
            Start using Resume AI today and maximize your chances of landing interviews for the jobs you really want.
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
