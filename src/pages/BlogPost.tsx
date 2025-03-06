import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Blog posts database
  const posts = {
    'ai-revolution-job-hunting': {
      title: 'AI Revolution in Job Hunting: A Personalized Approach',
      date: 'August 15, 2023',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">AI has fundamentally transformed the way we approach job searching. Traditional methods, involving hours spent browsing through job listings and manually tailoring applications, are now giving way to highly personalized, targeted, and efficient AI-driven strategies. Here's how AI is revolutionizing the job hunt and adding significant value through personalization:</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Personalized Recommendations</h3>
        <p class="mb-4">One of the biggest challenges in job searching is the overwhelming volume of opportunities, many of which may not align with your skills or interests. AI tackles this problem head-on by deeply analyzing your resume, previous experience, skill sets, and personal job preferences. By understanding your professional background and career aspirations, AI tools can suggest roles that match your profile closely, saving you considerable time and frustration by eliminating irrelevant job postings.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Smarter Job Matches</h3>
        <p class="mb-4">The strength of AI lies in its ability to continuously learn and adapt. Each interaction you have with job postings—whether you apply, express interest, or even disregard them—is valuable data for AI algorithms. These interactions allow the system to refine its understanding of your preferences. Over time, this leads to smarter, increasingly accurate job recommendations, tailored specifically to your evolving career goals and interests.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Automated Resume Optimization</h3>
        <p class="mb-4">A common barrier in job applications is navigating Applicant Tracking Systems (ATS). These automated systems scan resumes to filter out candidates, making it essential that your resume is optimized for each specific role. AI provides solutions to this challenge by scanning and analyzing your resume, offering insights on keyword optimization, skill highlighting, and formatting adjustments. By ensuring your resume is ATS-friendly, AI significantly increases your chances of advancing to the interview stage.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Efficient Application Process</h3>
        <p class="mb-4">Applying for jobs can be repetitive and time-consuming, with each application demanding similar information entered repeatedly. AI streamlines this process dramatically by automating the form-filling process, tracking your application status, and even coordinating interview schedules. This automated support lets you focus less on administrative tasks and more on preparing effectively for interviews and networking.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Interview Preparation</h3>
        <p class="mb-4">The anxiety associated with job interviews is universal. AI-powered interview preparation platforms can help alleviate this stress by providing mock interview scenarios tailored to the specific roles you're applying for. These platforms simulate real interview conditions, record your responses, and analyze your performance, providing detailed feedback on areas for improvement. This personalized coaching approach boosts your confidence and greatly enhances your performance in actual interviews.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Continuous Learning and Career Development</h3>
        <p class="mb-4">The dynamic nature of the job market means that skills in demand today might change tomorrow. AI systems excel at tracking industry trends, analyzing job market data, and predicting future skill requirements. By tapping into this intelligence, you receive recommendations on training, certifications, or skills development that align with future market demands. This proactive approach helps you stay relevant and competitive in your career.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">A Personalized Future of Job Searching</h3>
        <p class="mb-4">AI's ability to personalize the job search process transforms what used to be a generic, often frustrating task into an intuitive, user-friendly experience. By harnessing vast amounts of data and delivering tailored recommendations and tools, AI ensures your job search is not only more productive but also more aligned with your unique professional journey.</p>

        <p class="mb-4">Ultimately, AI doesn't just simplify job searching—it makes it profoundly personal, aligning each opportunity with your individual goals, skills, and aspirations. The result is a smoother, more efficient path to meaningful employment.</p>
      `
    },
    'ats-friendly-resumes': {
      title: 'Mastering ATS-Friendly Resumes: Standing Out in the Digital Pile',
      date: 'September 2, 2023',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">In today's digital job market, your resume often meets an algorithm before it ever reaches human eyes. With over 90% of large companies using Applicant Tracking Systems (ATS) to screen candidates, understanding how to create an ATS-friendly resume is no longer optional—it's essential.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Understanding the ATS Gatekeeper</h3>
        <p class="mb-4">An ATS works by scanning resumes for specific keywords, qualifications, and formatting elements to determine which candidates move forward. These systems help employers efficiently process large volumes of applications, but they can also inadvertently filter out qualified candidates whose resumes aren't properly optimized.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Keyword Optimization: Speaking the ATS Language</h3>
        <p class="mb-4">Keywords are the foundation of ATS optimization. These systems look for terms related to specific skills, qualifications, and experiences relevant to the position. To identify the right keywords, carefully analyze the job description, paying attention to repeated terms, required skills, and industry-specific language. Include these keywords naturally throughout your resume, particularly in your skills section and job descriptions.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Format Matters: Clean, Simple, and Scannable</h3>
        <p class="mb-4">While creative resume designs might catch a human's eye, they often confuse ATS algorithms. Stick to clean, simple formats with standard section headings like "Experience," "Education," and "Skills." Avoid tables, graphics, headers/footers, and text boxes, as many ATS systems can't properly parse these elements. Use standard fonts like Arial, Calibri, or Times New Roman, and save your file as a .docx or .pdf (though .docx is generally safer).</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Tailoring: Customization is Key</h3>
        <p class="mb-4">Each job application deserves a tailored resume. Adjust your keywords, skills, and highlighted experiences to match each specific job description. This doesn't mean completely rewriting your resume for every application, but rather strategically emphasizing different aspects of your experience based on the role's requirements.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Beyond the ATS: The Human Reader</h3>
        <p class="mb-4">While optimizing for ATS is crucial, remember that if your resume passes this first test, it will eventually be read by a human. Balance keyword optimization with compelling, achievement-focused content that clearly communicates your value to potential employers. Use metrics and specific examples to quantify your achievements whenever possible.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Testing Your ATS Readiness</h3>
        <p class="mb-4">Several online tools can help you evaluate how well your resume will perform with an ATS. These services analyze your resume against a job description and provide feedback on keyword matches, formatting issues, and overall ATS compatibility. Consider using these tools to fine-tune your resume before submitting applications.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">The Balanced Approach</h3>
        <p class="mb-4">Successful ATS optimization is about balance—incorporating the right keywords and following formatting best practices while still creating a document that's compelling to human readers. By understanding how these systems work and adapting your resume accordingly, you can significantly increase your chances of making it past the digital gatekeeper to the interview stage.</p>

        <p class="mb-4">Remember: the goal isn't to game the system, but to effectively communicate your qualifications in a format that both algorithms and humans can understand. With these strategies, you'll be well-equipped to navigate the digital screening process and land more interviews in today's competitive job market.</p>
      `
    },
    'virtual-interviewing-techniques': {
      title: 'The Art of Virtual Interviewing: Techniques for Remote Success',
      date: 'September 18, 2023',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">Virtual interviews have become a permanent fixture in the hiring landscape. Whether conducted via Zoom, Microsoft Teams, Google Meet, or other platforms, these remote interactions present unique challenges and opportunities. Mastering the art of virtual interviewing requires a combination of technical preparation, environmental awareness, and adapted communication skills.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Technical Preparation: Creating a Solid Foundation</h3>
        <p class="mb-4">Technical issues can derail even the most qualified candidate's interview. Several days before your interview, test your camera, microphone, and internet connection. Download any required software and create an account if needed. Have a backup plan ready—keep your phone charged and have the interviewer's number handy in case your primary connection fails. On interview day, close unnecessary applications, silence notifications, and connect to your meeting a few minutes early to work through any unexpected technical challenges.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Your Digital Environment: Setting the Stage</h3>
        <p class="mb-4">Your background communicates as much about you as your answers. Choose a clean, professional space with minimal distractions. Natural light is ideal, positioned in front of you rather than behind to avoid backlighting. If your home environment isn't suitable, consider using a simple virtual background—but test it first to ensure it works with your setup and doesn't create awkward visual artifacts. Pay attention to your camera angle (eye level is best) and distance (your head and shoulders should be clearly visible).</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Professional Presentation: Dressing the Part</h3>
        <p class="mb-4">The temptation to dress casually for a remote interview can be strong, but professional attire is still important. Research the company culture and dress slightly more formally than their everyday attire. Avoid busy patterns and opt for solid colors that contrast with your background. And yes, dress professionally from head to toe—you never know when you might need to stand up during the interview.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Virtual Body Language: Communicating Presence</h3>
        <p class="mb-4">Physical presence is diminished in virtual settings, making intentional body language crucial. Maintain eye contact by looking at your camera (not at the interviewer's face on your screen). Sit up straight with your shoulders back, and position yourself so gestures are visible but not overwhelming. Nod and smile to show engagement, and use deliberate hand gestures to emphasize points. Remember that screen lag can affect perception, so slightly exaggerate your expressions and slow your speech patterns.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Active Listening in the Virtual Space</h3>
        <p class="mb-4">Demonstrating attentiveness is more challenging in virtual interviews. Practice active listening by minimizing self-view (which can be distracting), using verbal affirmations ("I see," "That makes sense"), and taking brief notes. If you need a moment to think, it's perfectly acceptable to say, "That's a great question, let me think about that for a moment" to avoid awkward silence.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Building Connection Through the Screen</h3>
        <p class="mb-4">Establishing rapport virtually requires extra effort. Arrive early for casual conversation, reference earlier exchanges to show you're paying attention, and use the interviewer's name occasionally. Share brief personal anecdotes when relevant, and express genuine interest in the company and role through thoughtful questions.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">The Power of Practice</h3>
        <p class="mb-4">Like any skill, virtual interviewing improves with practice. Conduct mock interviews with friends or mentors, or record yourself answering common interview questions. Review these recordings critically—you may notice distracting habits or areas for improvement that wouldn't be apparent otherwise.</p>

        <p class="mb-4">Virtual interviews are here to stay, and mastering this format can give you a significant competitive advantage. By preparing thoroughly, creating an optimal environment, and adapting your communication style to the digital medium, you can create a powerful, professional presence that resonates with interviewers—even through a screen.</p>
      `
    },
    'generative-ai-revolution': {
      title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
      date: 'April 30, 2024',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">Generative AI has emerged as a transformative force, revolutionizing industries and reshaping the way we work, create, and interact. This comprehensive guide explores the various facets of generative AI, from its fundamental concepts to its wide-ranging applications across different sectors.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Understanding Generative AI: A Beginner's Guide</h3>
        <p class="mb-4">Generative AI refers to artificial intelligence systems capable of producing original, human-like outputs such as text, images, and audio. These systems use advanced algorithms, including generative adversarial networks (GANs), to create new content based on the data they've been trained on.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Transforming Business Operations</h3>
        <p class="mb-4">Businesses across various industries are leveraging generative AI to streamline operations, enhance productivity, and foster innovation. From automating report generation to optimizing workflows, the impact is substantial and measurable.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Ethical Considerations and Responsible Usage</h3>
        <p class="mb-4">As generative AI adoption grows, it's crucial to address ethical challenges including potential deepfakes, data privacy concerns, and biases in AI-generated content. Organizations must implement transparent AI governance policies and stay informed about regulatory frameworks.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Enhancing Content Creation</h3>
        <p class="mb-4">Generative AI is revolutionizing content creation across various media, from writing articles and designing visuals to producing videos and automating social media posts. These tools support creators by increasing production efficiency while maintaining consistency.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Impact on HR and Recruitment</h3>
        <p class="mb-4">HR professionals are increasingly utilizing generative AI to transform recruitment, employee onboarding, and professional development. Benefits include reducing hiring biases, streamlining processes, and personalizing training programs.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">The Future of Marketing</h3>
        <p class="mb-4">In marketing, generative AI enables targeted customer interactions, AI-driven innovations in digital advertising, and predictive analytics for campaign optimization, leading to increased ROI and improved customer retention.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Enhancing Education and Learning</h3>
        <p class="mb-4">Educational institutions are adopting generative AI to create adaptive, personalized learning experiences through customized study materials, intelligent tutoring systems, and immersive virtual simulations.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Looking Ahead</h3>
        <p class="mb-4">As generative AI continues to evolve, it's crucial for businesses and individuals to stay informed, adapt to new possibilities, and address challenges responsibly to harness the full potential of this revolutionary technology.</p>
      `
    },
    'ksao-hr-framework': {
      title: 'KSAO Framework: The Foundation of Strategic HR Management',
      date: 'May 15, 2024',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">KSAOs (Knowledge, Skills, Abilities, and Other Characteristics) form a foundational framework in human resource management, enabling organizations to systematically align workforce capabilities with job requirements. This comprehensive analysis explores KSAO-based approaches and their impact on HR processes.</p>

        <h3 class="text-xl font-bold mb-2 mt-6">Understanding KSAOs</h3>
        <p class="mb-4">KSAOs categorize essential human attributes for job performance:</p>
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-2"><strong>Knowledge:</strong> Mastery of job-specific information (e.g., medical protocols for nurses, programming languages for engineers)</li>
          <li class="mb-2"><strong>Skills:</strong> Learned proficiencies through practice (e.g., financial analysis for accountants, campaign management for marketers)</li>
          <li class="mb-2"><strong>Abilities:</strong> Innate or developed traits (e.g., problem-solving for surgeons, strategic thinking for managers)</li>
          <li class="mb-2"><strong>Other Characteristics:</strong> Personality traits (e.g., communication skills for customer service reps, adaptability for remote workers)</li>
        </ol>

        <p class="mb-4"><strong>Example:</strong></p>
        <p class="mb-4"><strong>Software Engineer:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><em>Knowledge:</em> Agile methodologies, Python syntax</li>
          <li class="mb-1"><em>Skills:</em> Debugging, algorithm design</li>
          <li class="mb-1"><em>Abilities:</em> Logical reasoning, attention to detail</li>
          <li class="mb-1"><em>Other:</em> Team collaboration, innovation</li>
        </ul>

        <h3 class="text-xl font-bold mb-2 mt-6">Importance of KSAO-Based Analysis</h3>
        
        <h4 class="text-lg font-semibold mb-2 mt-4">1. Recruitment & Selection</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Precision:</strong> Job descriptions aligned with KSAOs attract qualified candidates (e.g., specifying "data analysis skills" for marketers)</li>
          <li class="mb-1"><strong>Bias Reduction:</strong> Objective evaluation minimizes subjective biases during screening</li>
          <li class="mb-1"><strong>Turnover Mitigation:</strong> Hiring candidates with aligned KSAOs improves retention by 20–30%</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2 mt-4">2. Employee Development</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Gap Identification:</strong> Pinpoints training needs (e.g., leadership programs for technically skilled employees lacking managerial abilities)</li>
          <li class="mb-1"><strong>Career Pathing:</strong> Guides employees toward roles matching their KSAOs (e.g., transitioning engineers to project management with targeted upskilling)</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2 mt-4">3. Legal Compliance</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Fair Hiring:</strong> Focus on job-relevant criteria ensures compliance with anti-discrimination laws</li>
          <li class="mb-1"><strong>Documentation:</strong> KSAO-based job analyses defend against legal challenges by proving role requirements are non-arbitrary</li>
        </ul>

        <h3 class="text-xl font-bold mb-2 mt-6">Conducting a KSAO-Based Analysis</h3>
        
        <h4 class="text-lg font-semibold mb-2 mt-4">Step 1: Job Analysis</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1">Identify core tasks and responsibilities (e.g., using surveys, interviews, or observation)</li>
          <li class="mb-1"><strong>Case Study:</strong> A multinational firm derived 15 critical KSAOs for a role through task inventories and stakeholder input, improving hiring accuracy by 40%</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2 mt-4">Step 2: Prioritize KSAOs</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1">Weight attributes by importance (e.g., "emotional resilience" weighted higher than "software knowledge" for emergency responders)</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2 mt-4">Step 3: Integrate into HR Processes</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Recruitment:</strong> Use KSAOs to design behavioral interview questions (e.g., "Describe a time you resolved a conflict")</li>
          <li class="mb-1"><strong>Performance Reviews:</strong> Evaluate employees against KSAO benchmarks (e.g., rating nurses on "patient care protocols")</li>
        </ul>

        <h3 class="text-xl font-bold mb-2 mt-6">Applications in HR Functions</h3>
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse border border-slate-300 dark:border-slate-700">
            <thead>
              <tr class="bg-slate-100 dark:bg-slate-800">
                <th class="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">HR Process</th>
                <th class="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">KSAO Integration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Recruitment</td>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Targeted job ads, skills-based assessments</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Training</td>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Customized programs (e.g., coding bootcamps for IT staff)</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Compensation</td>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Tie pay scales to KSAO complexity (e.g., higher salaries for multilingual customer support)</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Succession Planning</td>
                <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Identify high-potential employees using leadership-related KSAOs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold mb-2 mt-6">Challenges & Best Practices</h3>
        
        <h4 class="text-lg font-semibold mb-2 mt-4">Challenges</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Subjectivity:</strong> Risk of overemphasizing easily measurable skills (e.g., coding vs. creativity)</li>
          <li class="mb-1"><strong>Dynamic Roles:</strong> Rapidly evolving jobs (e.g., AI specialists) require frequent KSAO updates</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2 mt-4">Best Practices</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>Stakeholder Involvement:</strong> Engage managers and employees to validate KSAOs</li>
          <li class="mb-1"><strong>Data-Driven Updates:</strong> Use performance metrics to refine KSAOs annually</li>
        </ul>

        <h3 class="text-xl font-bold mb-2 mt-6">Future Trends</h3>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-1"><strong>AI-Driven Assessments:</strong> Tools like gamified simulations to evaluate problem-solving abilities</li>
          <li class="mb-1"><strong>Remote Work Adaptations:</strong> Emphasize KSAOs like self-motivation and digital collaboration in hybrid roles</li>
        </ul>

        <p class="mb-4">By anchoring HR strategies in KSAO-based analysis, organizations enhance hiring quality, employee growth, and operational agility, ensuring sustained competitiveness in evolving markets.</p>
      `
    },
    
    'default-content': {
      title: 'Article Coming Soon',
      date: 'Forthcoming',
      author: 'Hanan Amos',
      content: `
        <p class="mb-4">Thank you for your interest in this article. We're currently expanding our content library.</p>
        
        <p class="mb-4">While this article is under development, we invite you to explore our published articles:</p>
        
        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2"><a href="/blog/ai-revolution-job-hunting" class="text-blue-600 hover:underline dark:text-blue-400">AI Revolution in Job Hunting: A Personalized Approach</a></li>
          <li class="mb-2"><a href="/blog/ats-friendly-resumes" class="text-blue-600 hover:underline dark:text-blue-400">Mastering ATS-Friendly Resumes: Standing Out in the Digital Pile</a></li>
          <li class="mb-2"><a href="/blog/virtual-interviewing-techniques" class="text-blue-600 hover:underline dark:text-blue-400">The Art of Virtual Interviewing: Techniques for Remote Success</a></li>
        </ul>
        
        <p class="mb-4">Check back soon as we continue to publish in-depth articles on AI-powered job searching, resume optimization, and career advancement strategies.</p>
        
        <p class="mb-4">Have a specific topic you'd like us to cover? Contact us with your suggestions!</p>
      `
    }
  };
  
  // Get the requested post or use a default message if the post doesn't exist
  const post = slug && posts[slug as keyof typeof posts] 
    ? posts[slug as keyof typeof posts] 
    : { 
        title: 'Article Coming Soon', 
        date: 'Forthcoming',
        author: 'Hanan Amos',
        content: posts['default-content'].content 
      };
  
  return (
    <Layout>
      <div className="bg-white dark:bg-gray-950 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/blog">
              <Button variant="ghost" className="flex items-center gap-2 mb-6">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Articles</span>
              </Button>
            </Link>
          </div>
          
          <article className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
              <span className="mx-1">•</span>
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">{post.title}</h1>
            
            <div 
              className="prose dark:prose-invert prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
