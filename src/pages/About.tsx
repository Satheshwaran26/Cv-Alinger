
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Profile Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/02a454e3-669a-4993-ab5c-956cd4e535c9.png" 
                  alt="Hanan Amos" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Collaboration section under profile image - with LinkedIn button */}
              <div className="mt-6 p-5 bg-card rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Ready to Collaborate?</h3>
                <p className="text-base mb-5">
                  If you want to consult with me, please reach out.
                </p>
                <div className="flex flex-col gap-3 items-start">
                  {/* LinkedIn Button */}
                  <a 
                    className="libutton"
                    href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hanan-amos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Follow on LinkedIn
                  </a>
                  
                  {/* Buy Me a Coffee Button */}
                  <a 
                    className="bmcbutton"
                    href="https://buymeacoffee.com/hanana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src="/lovable-uploads/e2677669-689e-4db1-915d-3ed8aee2f9e7.png" 
                      alt="Buy Me A Coffee"
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Profile Information */}
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Hanan Amos</h1>
              <h2 className="text-xl text-primary mb-6">Head of Marketing Operations</h2>
              
              <p className="text-lg mb-8 text-muted-foreground">
                I blend data, strategy, and a passion for people to make marketing smarter. With a keen interest in generative AI and process optimization, I continuously seek ways to drive efficiency and create engaging experiences.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">What I Do:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Streamline Processes:</strong> I design and implement systems that simplify operations and boost productivity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Data-Driven Decisions:</strong> I use analytics and emerging AI tools to refine strategies and optimize campaigns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Empower Teams:</strong> I believe in a people-first approach that values collaboration and continuous learning.</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-4">My Approach:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Audience Focus:</strong> I shift the focus from what I want to say to what you need to know.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Clear & Concise:</strong> I prioritize brevity and clarity so key messages cut through the noise.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Innovative Mindset:</strong> Embracing generative AI, I blend new technologies with proven methods to stay ahead.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span><strong>Human Touch:</strong> Beyond numbers and processes, I care deeply about people and fostering a culture of trust and growth.</span>
                </li>
              </ul>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Collaborate?</h3>
                <p className="text-lg mb-6">
                  If you want to consult with me, please reach out.
                </p>
                <div className="flex flex-wrap gap-3 items-start">
                  {/* LinkedIn Button */}
                  <a 
                    className="libutton"
                    href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hanan-amos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Follow on LinkedIn
                  </a>
                  
                  {/* Buy Me a Coffee Button */}
                  <a 
                    className="bmcbutton"
                    href="https://buymeacoffee.com/hanana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src="/lovable-uploads/e2677669-689e-4db1-915d-3ed8aee2f9e7.png" 
                      alt="Buy Me A Coffee"
                      className="w-[200px] h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for LinkedIn button and Buy Me a Coffee button */}
      <style>
        {`
        .libutton {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7px;
          text-align: center;
          outline: none;
          text-decoration: none !important;
          color: #ffffff !important;
          width: 200px;
          height: 32px;
          border-radius: 16px;
          background-color: #0A66C2;
          font-family: "SF Pro Text", Helvetica, sans-serif;
        }
        
        .bmcbutton {
          display: flex;
          width: 200px;
          height: auto;
          text-decoration: none !important;
        }
        `}
      </style>
    </Layout>
  );
};

export default About;
