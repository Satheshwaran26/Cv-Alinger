
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Upload, 
  Search, 
  FileText, 
  CheckCircle, 
  BarChart, 
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Resume AI Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform analyzes your resume against job descriptions to maximize your chances of landing interviews.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Upload size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                1. Upload Your Resume
              </h2>
              <p className="text-muted-foreground mb-6">
                Start by uploading your current resume in PDF format. Our system will extract and analyze your skills, experience, education, and other key elements.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Supports PDF format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Secure and private document handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Advanced text extraction technology</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 flex items-center justify-center">
              <div className="max-w-xs w-full bg-card p-6 rounded-lg shadow-lg border border-border">
                <div className="w-full h-6 bg-muted rounded mb-4"></div>
                <div className="w-2/3 h-6 bg-muted rounded mb-8"></div>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 flex flex-col items-center justify-center gap-4">
                  <Upload className="text-primary" size={32} />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag and drop your resume or click to browse
                  </p>
                  <Button size="sm">Upload Resume</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 flex items-center justify-center">
              <div className="max-w-xs w-full bg-card p-6 rounded-lg shadow-lg border border-border">
                <div className="w-full h-6 bg-muted rounded mb-4"></div>
                <div className="w-2/3 h-6 bg-muted rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-primary shrink-0" />
                    <div className="w-full h-4 bg-muted rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-primary shrink-0" />
                    <div className="w-full h-4 bg-muted rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-primary shrink-0" />
                    <div className="w-full h-4 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                2. Provide Job Description
              </h2>
              <p className="text-muted-foreground mb-6">
                Enter the job description for the position you're applying to. Our AI analyzes the requirements and expectations to create a tailored comparison.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Copy-paste convenience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Keyword and requirement extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Industry-specific context understanding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <BarChart size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                3. Get Detailed Analysis
              </h2>
              <p className="text-muted-foreground mb-6">
                Our AI compares your resume against the job description, providing a comprehensive match analysis and highlighting areas for improvement.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Skills match percentage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Missing keywords identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Experience alignment scoring</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 flex items-center justify-center">
              <div className="max-w-xs w-full bg-card p-6 rounded-lg shadow-lg border border-border">
                <div className="w-1/2 h-6 bg-muted rounded mb-6"></div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-muted rounded"></div>
                      <div className="w-1/4 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{width: "75%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-muted rounded"></div>
                      <div className="w-1/4 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{width: "60%"}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 h-4 bg-muted rounded"></div>
                      <div className="w-1/4 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{width: "85%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 flex items-center justify-center">
              <div className="max-w-xs w-full bg-card p-6 rounded-lg shadow-lg border border-border">
                <div className="w-full h-6 bg-muted rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-muted rounded mb-2"></div>
                      <div className="w-5/6 h-4 bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb size={18} className="text-yellow-500 mt-1 shrink-0" />
                    <div className="w-full">
                      <div className="w-full h-4 bg-muted rounded mb-2"></div>
                      <div className="w-5/6 h-4 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                4. Receive Tailored Recommendations
              </h2>
              <p className="text-muted-foreground mb-6">
                Get personalized suggestions to optimize your resume for the specific job, including wording improvements, skills to highlight, and content restructuring.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>AI-generated improvement suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>ATS-friendly formatting tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>Content prioritization guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Optimize Your Resume?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using Resume AI today and maximize your chances of landing interviews for the jobs you really want.
          </p>
          <Link to="/#tool">
            <Button size="lg" className="px-8 gap-2 shadow-sm transition-all hover:shadow-md">
              Try It Now <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
