import { Layout } from "@/components/Layout";
import { Ribbon, Linkedin, Coffee, ChevronRight, Star, Sparkles, Brain, Users, Target, MessageCircle } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Profile Image Section */}
              <div className="w-full lg:w-1/3">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src="/lovable-uploads/image.png" 
                      alt="tino britty"
                      className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex gap-4 justify-center">
                  <a 
                    href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hanan-amos"
                    className="group bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 p-0.5 rounded-xl hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-[9px] flex items-center gap-2">
                      <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                      <span className="font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 text-transparent bg-clip-text">Follow</span>
                    </div>
                  </a>
                  
                  <a 
                    href="https://buymeacoffee.com/hanana"
                    className="group bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 p-0.5 rounded-xl hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-[9px] flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-amber-500" />
                      <span className="font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 text-transparent bg-clip-text">Support</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="w-full lg:w-2/3">
                <div className="space-y-6">
                  <div className="inline-block">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 text-transparent bg-clip-text flex items-center gap-3">
                      Tino Britty
                      <Sparkles className="h-8 w-8 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
                    </h1>
                  </div>
                  <h2 className="text-2xl font-semibold text-violet-600 dark:text-violet-400">
                    CEO of Divine Infotech
                  </h2>
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                    I blend data, strategy, and a passion for people to make marketing smarter. With a keen interest in generative AI and process optimization, I continuously seek ways to drive efficiency and create engaging experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Brain className="h-8 w-8 text-white" />,
                title: "Data-Driven Strategy",
                description: "Using analytics and AI to optimize campaigns and refine strategies.",
                gradient: "from-fuchsia-500 to-violet-500"
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Team Empowerment",
                description: "Fostering collaboration and continuous learning with a people-first approach.",
                gradient: "from-violet-500 to-cyan-500"
              },
              {
                icon: <Target className="h-8 w-8 text-white" />,
                title: "Process Optimization",
                description: "Streamlining operations to boost productivity and efficiency.",
                gradient: "from-cyan-500 to-fuchsia-500"
              },
            ].map((item, index) => (
              <div key={index} className="group bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl rounded-3xl border-2 border-white/50 dark:border-gray-700/50 shadow-2xl p-8 transition-all duration-500 hover:scale-105">
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center transform rotate-3 transition-transform duration-300 group-hover:rotate-6 shadow-xl`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 text-transparent bg-clip-text">
                  {item.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
