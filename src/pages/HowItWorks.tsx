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
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HowItWorks = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950">
        <div className="container mx-auto py-16 px-4 md:py-24">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              How Resume AI Works
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-slate-400 leading-relaxed">
            Our AI-powered platform analyzes your resume against job descriptions to maximize your chances of landing interviews and securing your dream job.
          </p>
          </motion.div>

        {/* Key Benefits Section */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-24"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Card className="group hover:scale-105 transition-transform duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-xl hover:shadow-2xl overflow-hidden">
            <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 dark:bg-blue-900/30 group-hover:rotate-6 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Customize for Success</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Use our AI-powered ATS tool to tailor your resume for each job. It matches keywords from the job description to boost your chances of landing an interview.
              </p>
            </CardContent>
          </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="group hover:scale-105 transition-transform duration-300 border-green-100 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 shadow-xl hover:shadow-2xl overflow-hidden">
            <CardContent className="p-8">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 dark:bg-green-900/30 group-hover:rotate-6 transition-transform duration-300">
                    <Star className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Show Off Your Strengths</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Highlight what makes you unique. Our AI resume builder gives clear suggestions so you can stand out from the competition.
              </p>
            </CardContent>
          </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="group hover:scale-105 transition-transform duration-300 border-orange-100 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800 shadow-xl hover:shadow-2xl overflow-hidden">
            <CardContent className="p-8">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 dark:bg-orange-900/30 group-hover:rotate-6 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Make Your Experience Count</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Beyond basic checks, our AI refines your resume to showcase impactful achievements and make every experience count.
              </p>
            </CardContent>
          </Card>
            </motion.div>
          </motion.div>

          <div className="grid gap-24 md:gap-32">
            {/* Steps */}
            {[
              {
                icon: <FileText size={24} />,
                title: "Upload Your Resume",
                description: "Begin by pasting your current resume content. Our intelligent system analyzes your skills, experience, education, and other key elements to create a comprehensive profile.",
                features: [
                  "Simple copy-and-paste functionality with secure data handling",
                  "Advanced text analysis to identify strengths and improvement areas",
                  "Format-agnostic processing works with various resume styles"
                ]
              },
              {
                icon: <Search size={24} />,
                title: "Add Job Description",
                description: "Enter the job description for your target position. Our advanced AI analyzes the requirements and expectations to create a personalized matching profile and targeted recommendations.",
                features: [
                  "Smart keyword extraction identifies what recruiters are looking for",
                  "Industry-specific context understanding across various fields",
                  "Comprehensive analysis of hard skills, soft skills, and qualifications"
                ]
              },
              {
                icon: <BarChart size={24} />,
                title: "Receive Detailed Analysis",
                description: "Our AI performs a comprehensive comparison between your resume and the job description, providing a detailed match analysis with concrete improvement areas.",
                features: [
                  "Detailed breakdown of skills match with percentage scores",
                  "Gap analysis with missing keywords and qualifications",
                  "Experience alignment scoring with detailed recommendations"
                ]
              },
              {
                icon: <Lightbulb size={24} />,
                title: "Select Recommendations",
                description: "Choose from our AI-generated recommendations to optimize your resume. Each suggestion is tailored to improve your match score and highlight your relevant qualifications.",
                features: [
                  "Personalized improvement suggestions with impact ratings",
                  "ATS-friendly formatting tips for better scanner results",
                  "Strategic keyword placement for maximum impact"
                ]
              },
              {
                icon: <CheckCircle size={24} />,
                title: "Get Your Optimized Resume",
                description: "Receive your enhanced resume with all selected improvements applied, relevant keywords added, and a significantly improved match score to maximize your interview chances.",
                features: [
                  "Download your optimized resume in multiple formats",
                  "Average match score improvement of 30-40%",
                  "Strategic keyword placement and quantifiable achievements",
                  "Bonus interview preparation questions tailored to your profile"
                ]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : ''}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 dark:bg-blue-900/30 dark:text-blue-400 transform hover:rotate-6 transition-transform duration-300">
                    {step.icon}
              </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    {`${index + 1}. ${step.title}`}
              </h2>
                  <p className="text-lg text-slate-600 mb-8 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-4">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <CheckCircle className="text-green-500 mt-1.5 shrink-0 group-hover:scale-110 transition-transform duration-300" size={20} />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
                    ))}
              </ul>
            </div>
                <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : ''} bg-gradient-to-br from-blue-50 to-blue-100/20 rounded-xl p-8 flex items-center justify-center dark:from-blue-900/20 dark:to-blue-900/5 shadow-lg`}>
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
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-32 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Ready to Transform Your Job Search?
              </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto dark:text-slate-400 leading-relaxed">
            Start using Resume AI today and dramatically increase your chances of landing interviews for the positions you truly desire.
          </p>
          <Link to="/#tool">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all px-10 py-7 gap-3 text-lg group"
              >
                Try It Now 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
