import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, BookOpenText, Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Color palette for blog posts
const colorPalettes = [{
  bg: 'bg-blue-100 dark:bg-blue-900/30',
  text: 'text-blue-600 dark:text-blue-400',
  hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/40'
}, {
  bg: 'bg-purple-100 dark:bg-purple-900/30',
  text: 'text-purple-600 dark:text-purple-400',
  hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40'
}, {
  bg: 'bg-green-100 dark:bg-green-900/30',
  text: 'text-green-600 dark:text-green-400',
  hover: 'hover:bg-green-200 dark:hover:bg-green-800/40'
}, {
  bg: 'bg-orange-100 dark:bg-orange-900/30',
  text: 'text-orange-600 dark:text-orange-400',
  hover: 'hover:bg-orange-200 dark:hover:bg-orange-800/40'
}, {
  bg: 'bg-red-100 dark:bg-red-900/30',
  text: 'text-red-600 dark:text-red-400',
  hover: 'hover:bg-red-200 dark:hover:bg-red-800/40'
}, {
  bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  text: 'text-indigo-600 dark:text-indigo-400',
  hover: 'hover:bg-indigo-200 dark:hover:bg-indigo-800/40'
}, {
  bg: 'bg-teal-100 dark:bg-teal-900/30',
  text: 'text-teal-600 dark:text-teal-400',
  hover: 'hover:bg-teal-200 dark:hover:bg-teal-800/40'
}];

// Define the categories
const categories = ["All", "AI Tools", "Resume Tips", "Resume Optimization", "Job Search", "Interviews", "Career Growth", "Networking"];

// Map posts to categories
const categoryMap = {
  "AI Tools": [1, 2, 5, 13, 20, 22, 23],
  "Resume Tips": [2, 8, 12, 15, 18],
  "Resume Optimization": [5, 12, 18],
  "Job Search": [1, 5, 7, 8, 10, 13, 16, 17, 21],
  "Interviews": [3, 5, 9, 14],
  "Career Growth": [6, 11, 19, 20, 23],
  "Networking": [4, 7, 8, 11]
};
const BlogIndex = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const posts = [{
    id: 25,
    title: 'Resume AI for Career Changers: Highlighting Transferable Skills',
    date: 'June 18, 2024',
    author: 'Hanan Amos',
    excerpt: 'Learn how AI-powered resume tools can help career changers identify and showcase transferable skills, overcome the experience gap, and successfully transition to new industries without formal retraining.',
    content: `Making a career change is one of the most challenging professional transitions. Without direct experience in your target industry, convincing employers of your value can seem nearly impossible. According to a LinkedIn survey, 61% of career changers cite "difficulty demonstrating transferable skills" as their biggest obstacle. This is where AI-powered resume tools are creating unprecedented opportunities for professionals seeking new paths.

## The Career Change Challenge

### Why Traditional Resumes Fail Career Changers

Conventional resume formats present a fundamental problem for career changers:

- They emphasize industry-specific experience
- They're structured chronologically, highlighting your past rather than your potential
- They use terminology familiar to your previous industry, not your target one
- They don't contextually explain how your skills translate to new environments

Before AI assistance, career changers faced rejection rates up to 300% higher than industry insiders when applying for positions, even when possessing relevant capabilities.

## How AI Transforms Career Transition Resumes

### Skill Translation: The AI Advantage

Modern AI resume tools leverage massive databases of cross-industry skill mapping to:

- Identify universal capabilities within your experience
- Translate industry-specific accomplishments into broadly recognized achievements
- Highlight portable skills valued across sectors
- Reframe technical capabilities in language familiar to target industries

### Before and After: Experience Transformation

**Banking Professional Moving to Healthcare Administration**

*Before (Traditional Resume):*
"Managed client portfolios valued at $12M, ensuring compliance with federal banking regulations while maintaining detailed transaction records."

*After (AI-Enhanced):*
"Administered complex record systems handling sensitive client information with 100% compliance adherence, demonstrating meticulous attention to detail and regulatory knowledge transferable to healthcare information management."

The AI-optimized version emphasizes universal skills (record management, regulatory compliance, attention to detail) rather than banking-specific experience, making the connection to healthcare administration explicit.

## Key Transferable Skill Categories AI Identifies

### 1. Process and Systems Management

AI tools excel at identifying process-oriented achievements that translate across industries:

- Workflow optimization
- Quality control procedures
- Resource allocation
- Documentation systems
- Compliance monitoring

### 2. People and Communication Skills

Interpersonal capabilities are highly portable, and AI helps highlight them effectively:

- Team leadership
- Stakeholder management
- Client/customer relations
- Cross-functional collaboration
- Training and development

### 3. Analysis and Problem-Solving

Analytical thinking translates across virtually all industries. AI tools help reframe these skills:

- Data analysis and interpretation
- Root cause investigation
- Process improvement
- Strategic planning
- Risk assessment

### 4. Technical Adaptability

AI identifies markers of technological versatility that indicate rapid learning potential:

- Software implementation experience
- Digital tool adoption
- Technology integration
- Systems migration
- Platform optimization

## The AI Resume Transformation Process for Career Changers

### Step 1: Comprehensive Skill Inventory

Unlike traditional resume writing that begins with job descriptions, AI career change optimization starts with a complete skills inventory:

- Hard skills (technical capabilities, certifications, methodologies)
- Soft skills (communication, leadership, collaboration)
- Adaptive skills (problem-solving, learning agility, flexibility)
- Industry-agnostic achievements (efficiency improvements, cost reductions)

AI tools help identify skills you may not have recognized as valuable or transferable.

### Step 2: Target Industry Analysis

Advanced AI resume builders analyze your target industry to identify:

- In-demand capabilities and trending skills
- Industry-specific terminology and keywords
- Valued certifications and qualifications
- Common transition paths from your current industry

### Step 3: Strategic Experience Reframing

The core of AI-assisted career transition is experience reframing:

- Repositioning achievements to highlight transferable elements
- Restructuring accomplishments to emphasize results over industry context
- Reducing industry-specific jargon from your previous sector
- Adding contextual explanations that connect past experience to new opportunities

### Step 4: Gap Identification and Development Planning

AI resume tools don't just optimize existing experience—they identify critical gaps:

- Suggesting skill development priorities
- Recommending certifications that facilitate transition
- Identifying volunteer or project opportunities to build relevant experience
- Providing language to frame ongoing learning initiatives

## Case Studies: Successful Career Transitions With AI

### Technical Support to UX Design

Lisa spent 8 years in technical support before deciding to pursue UX design. Her challenge: demonstrating design thinking without formal design experience.

*AI Resume Strategy:*
- Reframed customer problem resolution as user experience troubleshooting
- Highlighted pattern recognition in identifying common user challenges
- Emphasized user advocacy and requirement translation experience
- Showcased process improvement initiatives as design thinking examples

*Result:* After applying to 18 positions with her AI-optimized resume, Lisa received 5 interview requests and transitioned to a junior UX role within 6 weeks.

### Manufacturing to Healthcare Administration

Marcus had 12 years in manufacturing management but wanted to move into healthcare administration during an industry downturn.

*AI Resume Strategy:*
- Translated lean manufacturing achievements into healthcare efficiency terminology
- Emphasized regulatory compliance and safety protocol experience
- Restructured team management accomplishments to focus on service quality measures
- Highlighted complex scheduling and resource allocation skills applicable to healthcare settings

*Result:* Marcus successfully transitioned to a hospital operations role after 4 months of targeted applications with his AI-optimized resume.

## Beyond the Resume: AI-Assisted Career Transition Strategy

### LinkedIn Profile Optimization

AI tools extend beyond resumes to help career changers optimize their complete professional presence:

- Aligning LinkedIn profiles with target industry terminology
- Suggesting connection strategies to build relevant networks
- Recommending engagement approaches with industry content
- Identifying groups and associations to join for visibility

### Cover Letter Personalization

AI-enhanced cover letters for career changers:

- Address the "elephant in the room" of industry transition directly
- Highlight specific transferable skills relevant to each position
- Tell compelling stories that connect past achievements to future potential
- Demonstrate industry knowledge and transition motivation

## The Future of AI-Assisted Career Mobility

As workforce needs continue to evolve rapidly, career transitions are becoming increasingly common. Emerging AI capabilities for career changers include:

- Predictive career pathing based on skill adjacencies
- Automated project suggestion to build portfolio evidence
- Integration with learning platforms for targeted skill development
- Job market analysis to identify optimal transition timing

## Conclusion: Embracing Career Fluidity with AI Support

The modern career is increasingly non-linear, with professionals making multiple significant transitions throughout their working lives. AI resume tools are democratizing career mobility by helping candidates effectively communicate their transferable value to new industries.

By leveraging AI to identify, translate, and present transferable skills, career changers can overcome the "experience gap" and successfully navigate to new professional domains—often without the time and financial investment of formal retraining programs.

*[Ready to make your career change a reality? Visit ResumeAI.expert to transform your experience into a compelling case for your next professional chapter.]*`,
    slug: 'resume-ai-career-changers',
    categories: ['AI Tools', 'Resume Optimization', 'Career Growth']
  }, {
    id: 24,
    title: 'Resume Keywords: How AI Can Help You Pass ATS Screening Systems',
    date: 'June 12, 2024',
    author: 'Hanan Amos',
    excerpt: 'Discover how AI tools can help optimize your resume with the right keywords to pass Applicant Tracking Systems, increasing your chances of getting your resume in front of human recruiters.',
    content: `In today's digital hiring environment, your resume must impress not just human recruiters but also the software gatekeepers known as Applicant Tracking Systems (ATS). Studies show that 75% of resumes never reach human eyes, rejected by ATS filters before a hiring manager ever sees them. Understanding how to optimize for these systems isn't just helpful—it's essential for modern job seekers.

## Understanding ATS: The Digital Gatekeeper

### What Is an ATS and How Does It Work?

Applicant Tracking Systems are sophisticated software platforms that scan, sort, and rank resumes based on specific parameters set by employers. These systems use algorithms to:

- Search for specific keywords and phrases
- Analyze experience levels and qualifications
- Filter candidates based on preset requirements
- Rank applications before human review

Most large companies and approximately 99% of Fortune 500 organizations use some form of ATS to manage the high volume of applications they receive.

### Why Traditional Resume Approaches Fail

Many qualified candidates miss opportunities because their resumes aren't optimized for these digital screeners. Common issues include:

- Using graphics, tables, or complex formatting that ATS can't parse
- Missing critical industry-specific terminology
- Using non-standard section headings
- Failing to match keywords from the job description

## How AI Transforms Keyword Optimization

### Intelligent Keyword Analysis and Integration

Modern AI resume tools can:

- Analyze job descriptions to extract critical keywords
- Compare your existing resume against these requirements
- Suggest natural ways to incorporate missing terms
- Identify overused keywords that might trigger spam filters

This goes far beyond simple keyword stuffing, which can actually harm your chances. AI tools ensure keywords appear in context, maintaining readability for human reviewers who see your application after it passes the ATS.

### Before and After: AI Keyword Optimization in Action

**Original Resume Bullet:**
"Managed team projects and improved efficiency."

**AI-Enhanced Version:**
"Led cross-functional project teams implementing agile methodologies, improving operational efficiency by 27% while reducing development cycles by 15 days."

The enhanced version naturally incorporates critical keywords like "cross-functional," "agile methodologies," and "operational efficiency" while adding quantifiable achievements that appeal to human reviewers.

### Industry-Specific Terminology Integration

Different industries have unique vocabularies and expected terminology. AI resume tools can:

- Identify industry-standard certifications and acronyms
- Suggest sector-specific terminology
- Replace generic terms with industry-preferred language
- Flag outdated terminology that might date your experience

## The Science Behind ATS Algorithms

### How Different Systems Score Resumes

Not all ATS platforms operate identically. Common variations include:

- Boolean search systems looking for keyword matches
- Weighted keyword systems that prioritize certain terms
- Contextual analysis systems examining keyword placement
- Semantic search systems looking for related concepts

Modern AI resume tools are trained on multiple ATS platforms, optimizing for various screening approaches simultaneously.

### Beyond Simple Matching: Semantic Search

More sophisticated ATS systems now incorporate semantic search capabilities, looking not just for exact matches but related concepts. AI resume optimization accounts for this by:

- Including synonyms and related terminology
- Structuring content for context recognition
- Incorporating both abbreviated and spelled-out versions of terms
- Balancing keyword density for natural language patterns

## Practical Implementation: Optimizing Your Resume with AI

### Step 1: Job Description Analysis

AI tools excel at:
- Extracting primary and secondary keywords from job postings
- Identifying required vs. preferred qualifications
- Recognizing implied skills not explicitly stated
- Comparing requirements across similar positions

### Step 2: Resume Audit and Gap Analysis

Once key requirements are identified, AI tools:
- Scan your existing resume for keyword matches
- Calculate your current match percentage
- Identify missing critical terms
- Flag potentially problematic formatting issues

### Step 3: Strategic Keyword Integration

The most effective AI resume tools don't just tell you what keywords to add—they suggest where and how to incorporate them:

- Skills section optimization
- Experience bullet enhancement
- Summary statement refinement
- Professional certification formatting

### Step 4: ATS Simulation Testing

Advanced AI resume platforms can:
- Simulate various ATS systems
- Provide compatibility scores
- Identify parsing errors
- Suggest formatting adjustments for improved readability

## Beyond Keywords: Other ATS Optimization Factors

While keywords are critical, AI tools also optimize:

### Document Formatting

- Recommending ATS-friendly file formats
- Ensuring proper section headings
- Eliminating problematic elements like headers/footers
- Suggesting appropriate fonts and spacing

### Content Organization

- Structuring information in recognizable patterns
- Prioritizing recent, relevant experience
- Balancing keyword density throughout the document
- Creating logical information hierarchy

## Case Study: The Impact of AI Optimization

Michael, a cybersecurity professional, applied to 25 positions with his self-created resume, receiving only two responses. After AI keyword optimization:

- ATS compatibility score increased from 62% to 94%
- Response rate jumped from 8% to 36%
- Interview requests increased from 4% to 28%

The key difference? The AI tool identified that Michael was using outdated terminology ("information security" vs. "cybersecurity"), missing critical certifications in his skills section, and failing to include cloud security keywords that appeared in 80% of his target job descriptions.

## Future Trends in ATS Technology

As you optimize your resume today, consider these emerging trends:

- Increasing use of natural language processing (NLP)
- Video resume integration and analysis
- Social media profile correlation
- Predictive candidate success modeling

Modern AI resume tools continuously update their algorithms to stay ahead of these developments.

## Conclusion: Balancing AI and Authenticity

While keyword optimization is essential, remember that your resume must ultimately impress human readers once it passes the ATS. The best AI resume tools help you:

- Incorporate keywords naturally
- Maintain your authentic voice and experience
- Balance technical optimization with compelling storytelling
- Create a document that succeeds with both algorithms and hiring managers

By leveraging AI for keyword optimization while preserving your unique value proposition, you create a resume that not only passes digital screening but stands out to the humans who make final hiring decisions.

*[Ready to beat the ATS and land more interviews? Visit ResumeAI.expert to create a keyword-optimized resume that gets past the digital gatekeepers.]*`,
    slug: 'resume-keywords-ats-optimization',
    categories: ['AI Tools', 'Resume Optimization', 'Job Search']
  }, {
    id: 5,
    title: 'How AI Resume Builders Are Revolutionizing the Job Application Process',
    date: 'May 28, 2024',
    author: 'Hanan Amos',
    excerpt: 'Discover how AI resume builders are transforming the job application process with ATS optimization, data-driven content recommendations, personalized job matching, and professional design optimization.',
    content: `AI resume builders are fundamentally changing how job seekers create and optimize their resumes. These intelligent tools analyze job descriptions to highlight relevant skills, provide real-time feedback on resume content, and ensure ATS compatibility. Modern AI tools can match candidates with suitable job openings based on their qualifications and career goals. They also optimize resume designs for both visual appeal and machine readability, increasing the chances of getting past initial screening processes. By leveraging data from successful applications, these platforms provide personalized recommendations that significantly improve application success rates.`,
    slug: 'ai-resume-builders-revolution',
    categories: ['AI Tools', 'Resume Optimization', 'Job Search']
  }, {
    id: 23,
    title: 'KSAO Framework: The Foundation of Strategic HR Management',
    date: 'May 15, 2024',
    excerpt: 'Discover how the KSAO framework systematically aligns workforce capabilities with job requirements, enhancing recruitment, employee development, and organizational agility.',
    content: `The KSAO (Knowledge, Skills, Abilities, and Other characteristics) framework serves as a cornerstone for modern HR management. This approach meticulously categorizes workforce attributes, allowing organizations to match employees to roles with precision. Knowledge represents acquired information necessary for job performance. Skills encompass demonstrated proficiencies developed through training and experience. Abilities refer to innate talents that facilitate learning and task execution. Other characteristics include work styles, personality traits, and values that influence workplace fit. By implementing KSAO assessments, organizations can develop targeted training programs, create more effective job descriptions, and make more informed hiring decisions that lead to better retention and performance outcomes.`,
    slug: 'ksao-hr-framework',
    categories: ['AI Tools', 'Career Growth']
  }, {
    id: 22,
    title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
    date: 'April 30, 2024',
    excerpt: 'Explore how generative AI is transforming industries through AI-powered content creation, business automation, and innovative applications across sectors.',
    content: `Generative AI systems are radically transforming entire industries through their ability to create original content, optimize business processes, and enable innovation. In content creation, these systems now produce written materials, visuals, music, and code with increasing sophistication. Businesses are leveraging generative AI to automate customer service through intelligent chatbots, streamline document processing, and enhance product development cycles. The technology is making particularly significant impacts in healthcare (through drug discovery acceleration and medical imaging analysis), manufacturing (via optimal design generation and predictive maintenance), and creative industries (by enabling new forms of artistic expression and content personalization). As generative AI continues to evolve, it promises to create entirely new business models and transform how organizations deliver value to customers.`,
    slug: 'generative-ai-revolution',
    categories: ['AI Tools']
  }, {
    id: 1,
    title: 'AI Revolution in Job Hunting: A Personalized Approach',
    date: 'August 15, 2023',
    excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
    content: `Artificial intelligence is revolutionizing job hunting by delivering unprecedented personalization. AI-powered platforms now analyze individual career histories, skills profiles, and professional goals to identify ideal job matches with remarkable accuracy. These systems continuously learn from user interactions, refining recommendations over time to better align with candidate preferences. Beyond job matching, AI tools now optimize resumes for specific positions, prepare candidates for interviews through simulated sessions, and provide real-time feedback on application materials. The result is a significantly more efficient job search process with higher success rates and better employment outcomes.`,
    slug: 'ai-revolution-job-hunting'
  }, {
    id: 2,
    title: 'Mastering ATS-Friendly Resumes: Standing Out in the Digital Pile',
    date: 'September 2, 2023',
    excerpt: 'With over 90% of large companies using Applicant Tracking Systems, your resume needs to be optimized for these digital gatekeepers. Learn the key strategies to ensure your resume gets past the algorithms.',
    slug: 'ats-friendly-resumes'
  }, {
    id: 3,
    title: 'The Art of Virtual Interviewing: Techniques for Remote Success',
    date: 'September 18, 2023',
    excerpt: 'Virtual interviews are here to stay. Discover essential techniques to make a powerful impression through your screen, from optimizing your environment to mastering digital communication cues.',
    slug: 'virtual-interviewing-techniques'
  }, {
    id: 4,
    title: 'Strategic Networking in the Digital Age: Building Professional Relationships Online',
    date: 'October 5, 2023',
    excerpt: 'Professional networking has moved primarily online. Learn how to build meaningful connections virtually, leverage LinkedIn effectively, and nurture relationships that advance your career goals.',
    slug: 'digital-networking-strategies'
  }, {
    id: 5,
    title: 'Salary Negotiation: Data-Driven Approaches to Maximize Your Worth',
    date: 'October 22, 2023',
    excerpt: 'Never leave money on the table again. This guide explains how to research competitive compensation, time your negotiation perfectly, and articulate your value with confidence.',
    slug: 'salary-negotiation-strategies'
  }, {
    id: 6,
    title: 'Career Pivots: Navigating Industry Transitions With AI Tools',
    date: 'November 8, 2023',
    excerpt: 'Changing industries doesn\'t have to mean starting from scratch. Explore how AI can help identify transferable skills, fill knowledge gaps, and position yourself effectively for a successful career transition.',
    slug: 'ai-assisted-career-pivots'
  }, {
    id: 7,
    title: 'The Hidden Job Market: Accessing Unadvertised Opportunities',
    date: 'November 25, 2023',
    excerpt: 'Up to 80% of jobs are never publicly advertised. Discover proven strategies to tap into this hidden job market through targeted networking, informational interviews, and strategic relationship building.',
    slug: 'hidden-job-market'
  }, {
    id: 8,
    title: 'LinkedIn Optimization: Crafting a Profile That Attracts Recruiters',
    date: 'December 12, 2023',
    excerpt: 'Your LinkedIn profile is often your first professional impression. Learn how to optimize every section to increase visibility to recruiters and make your profile work as a 24/7 networking tool.',
    slug: 'linkedin-profile-optimization'
  }, {
    id: 9,
    title: 'Behavioral Interviewing: Using the STAR Method Effectively',
    date: 'December 29, 2023',
    excerpt: 'Behavioral questions are a staple of modern interviews. Master the STAR technique (Situation, Task, Action, Result) to craft compelling narratives that showcase your skills and experience.',
    slug: 'star-method-interviewing'
  }, {
    id: 10,
    title: 'Remote Work Success: Positioning Yourself for Distributed Teams',
    date: 'January 15, 2024',
    excerpt: 'Remote work requires a unique set of skills and presentation strategies. Learn how to position yourself as an ideal remote candidate and thrive in distributed team environments.',
    slug: 'remote-work-positioning'
  }, {
    id: 11,
    title: 'Personal Branding for Job Seekers: Standing Out in a Crowded Market',
    date: 'January 31, 2024',
    excerpt: 'A strong personal brand can set you apart from equally qualified candidates. Discover how to define, build, and communicate your unique professional identity across all touchpoints.',
    slug: 'personal-branding-job-seekers'
  }, {
    id: 12,
    title: 'Gaps in Employment: Strategies to Address Them Confidently',
    date: 'February 17, 2024',
    excerpt: 'Employment gaps don\'t have to be red flags. Learn how to frame time away from the workforce positively, focusing on growth, learning, and other valuable experiences gained during that period.',
    slug: 'addressing-employment-gaps'
  }, {
    id: 13,
    title: 'AI-Powered Job Search Tools: A Comprehensive Guide',
    date: 'March 5, 2024',
    excerpt: 'The landscape of AI tools for job seekers is vast and evolving. This guide breaks down the most effective platforms for resume optimization, job matching, application tracking, and interview preparation.',
    slug: 'ai-job-search-tools'
  }, {
    id: 14,
    title: 'Technical Skill Assessments: Preparing for Modern Hiring Evaluations',
    date: 'March 22, 2024',
    excerpt: 'More companies are incorporating skills assessments into their hiring process. Learn strategies to prepare for and excel in various types of technical evaluations, from coding challenges to case studies.',
    slug: 'technical-skill-assessments'
  }, {
    id: 15,
    title: 'Cover Letters That Convert: From Template to Personalized Pitch',
    date: 'April 8, 2024',
    excerpt: 'The cover letter isn\'t dead - it\'s evolved. Discover how to craft compelling, personalized cover letters that complement your resume and create a compelling case for your candidacy.',
    slug: 'effective-cover-letters'
  }, {
    id: 16,
    title: 'Job Search Resilience: Maintaining Motivation Through Rejection',
    date: 'April 25, 2024',
    excerpt: 'Rejection is part of every job search. This article explores practical strategies for building resilience, maintaining perspective, and using rejection as a springboard for improvement.',
    slug: 'job-search-resilience'
  }, {
    id: 17,
    title: 'Applicant Tracking Systems Decoded: What Happens After You Submit',
    date: 'May 12, 2024',
    excerpt: 'Understanding the journey your application takes through an ATS can help you optimize your approach. Learn what happens behind the scenes and how to maximize your chances at each stage.',
    slug: 'ats-systems-decoded'
  }, {
    id: 18,
    title: 'Industry-Specific Resume Strategies: Tailoring for Your Field',
    date: 'May 29, 2024',
    excerpt: 'Different industries value different resume elements. This guide breaks down resume optimization strategies for tech, healthcare, finance, creative fields, and more.',
    slug: 'industry-specific-resumes'
  }, {
    id: 19,
    title: 'The First 90 Days: Strategies for New Job Success',
    date: 'June 15, 2024',
    excerpt: 'Your first three months in a new role are critical. Learn how to create a strategic onboarding plan that helps you build relationships, demonstrate value, and set the foundation for long-term success.',
    slug: 'first-90-days-strategies'
  }, {
    id: 20,
    title: 'AI and the Future of Work: Preparing for Emerging Career Opportunities',
    date: 'July 2, 2024',
    excerpt: 'AI isn\'t just changing how we find jobs - it\'s changing the jobs themselves. Explore emerging career paths, skills in growing demand, and strategies to position yourself for the AI-augmented workplace.',
    slug: 'ai-future-career-opportunities'
  }, {
    id: 21,
    title: 'Leveraging Job Alerts: Optimizing Your Search Through Automation',
    date: 'July 19, 2024',
    excerpt: 'Setting up effective job alerts can ensure you never miss relevant opportunities. Learn how to craft precise search parameters and manage alerts across platforms for maximum efficiency.',
    slug: 'optimizing-job-alerts'
  }];

  // Add sample content to posts that don't have it
  posts.forEach(post => {
    if (!post.content) {
      // Generate placeholder content based on excerpt
      post.content = `${post.excerpt} This article explores this topic in depth, providing practical insights and actionable strategies for professionals at all career stages. By understanding these key principles, readers can improve their professional outcomes and achieve greater success in their chosen fields.`;
    }
    if (!post.categories) {
      post.categories = Object.entries(categoryMap).filter(([_, ids]) => ids.includes(post.id)).map(([category]) => category);
    }
  });

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return <Layout>
      <div className="bg-white dark:bg-gray-950 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Knowledge Base</h1>
            <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400 mb-8">AI-driven job search, resume tips, and career growth strategies.</p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Search articles..." className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg" value={searchQuery} onChange={handleSearch} />
              </div>
            </div>
            
            {/* Category Tabs */}
            <Tabs defaultValue="All" className="w-full max-w-6xl mx-auto">
              <TabsList className="h-auto flex flex-wrap justify-center bg-transparent gap-2 mb-4">
                {categories.map(category => <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)} className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    {category}
                  </TabsTrigger>)}
              </TabsList>
              
              {categories.map(category => <TabsContent key={category} value={category} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {filteredPosts.map((post, index) => {
                  // Cycle through the color palettes
                  const colorPalette = colorPalettes[index % colorPalettes.length];
                  return <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${colorPalette.bg}`}>
                                <Calendar className={`h-3 w-3 ${colorPalette.text}`} />
                              </div>
                              <span>{post.date}</span>
                              <span className="mx-1">•</span>
                              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${colorPalette.bg}`}>
                                <User className={`h-3 w-3 ${colorPalette.text}`} />
                              </div>
                              <span>{post.author || 'Hanan Amos'}</span>
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white text-left">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3 text-left">
                              {post.excerpt}
                            </CardDescription>
                            
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.categories.map(category => <Badge key={category} className={`${colorPalette.bg} ${colorPalette.text}`}>
                                  <Tag className="h-3 w-3 mr-1" />
                                  {category}
                                </Badge>)}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-2 mt-auto">
                            <Link to={`/blog/${post.slug}`}>
                              <Button variant="outline" className={`w-full transition-colors ${colorPalette.hover}`}>
                                <div className="flex items-center gap-2">
                                  <div className={`flex items-center justify-center w-5 h-5 rounded-full ${colorPalette.bg}`}>
                                    <BookOpenText className={`h-3 w-3 ${colorPalette.text}`} />
                                  </div>
                                  <span>Read More</span>
                                </div>
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>;
                })}
                  </div>
                </TabsContent>)}
            </Tabs>
            
            {/* No results message */}
            {filteredPosts.length === 0 && <div className="text-center py-12">
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or category filter to find what you're looking for.
                </p>
              </div>}
          </div>
        </div>
      </div>
    </Layout>;
};
export default BlogIndex;