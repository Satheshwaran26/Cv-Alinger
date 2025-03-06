
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const BlogIndex = () => {
  const posts = [
    {
      id: 1,
      title: 'AI Revolution in Job Hunting: A Personalized Approach',
      date: 'August 15, 2023',
      excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
      slug: 'ai-revolution-job-hunting'
    },
    {
      id: 2,
      title: 'Mastering ATS-Friendly Resumes: Standing Out in the Digital Pile',
      date: 'September 2, 2023',
      excerpt: 'With over 90% of large companies using Applicant Tracking Systems, your resume needs to be optimized for these digital gatekeepers. Learn the key strategies to ensure your resume gets past the algorithms.',
      slug: 'ats-friendly-resumes'
    },
    {
      id: 3,
      title: 'The Art of Virtual Interviewing: Techniques for Remote Success',
      date: 'September 18, 2023',
      excerpt: 'Virtual interviews are here to stay. Discover essential techniques to make a powerful impression through your screen, from optimizing your environment to mastering digital communication cues.',
      slug: 'virtual-interviewing-techniques'
    },
    {
      id: 4,
      title: 'Strategic Networking in the Digital Age: Building Professional Relationships Online',
      date: 'October 5, 2023',
      excerpt: 'Professional networking has moved primarily online. Learn how to build meaningful connections virtually, leverage LinkedIn effectively, and nurture relationships that advance your career goals.',
      slug: 'digital-networking-strategies'
    },
    {
      id: 5,
      title: 'Salary Negotiation: Data-Driven Approaches to Maximize Your Worth',
      date: 'October 22, 2023',
      excerpt: 'Never leave money on the table again. This guide explains how to research competitive compensation, time your negotiation perfectly, and articulate your value with confidence.',
      slug: 'salary-negotiation-strategies'
    },
    {
      id: 6,
      title: 'Career Pivots: Navigating Industry Transitions With AI Tools',
      date: 'November 8, 2023',
      excerpt: 'Changing industries doesn't have to mean starting from scratch. Explore how AI can help identify transferable skills, fill knowledge gaps, and position yourself effectively for a successful career transition.',
      slug: 'ai-assisted-career-pivots'
    },
    {
      id: 7,
      title: 'The Hidden Job Market: Accessing Unadvertised Opportunities',
      date: 'November 25, 2023',
      excerpt: 'Up to 80% of jobs are never publicly advertised. Discover proven strategies to tap into this hidden job market through targeted networking, informational interviews, and strategic relationship building.',
      slug: 'hidden-job-market'
    },
    {
      id: 8,
      title: 'LinkedIn Optimization: Crafting a Profile That Attracts Recruiters',
      date: 'December 12, 2023',
      excerpt: 'Your LinkedIn profile is often your first professional impression. Learn how to optimize every section to increase visibility to recruiters and make your profile work as a 24/7 networking tool.',
      slug: 'linkedin-profile-optimization'
    },
    {
      id: 9,
      title: 'Behavioral Interviewing: Using the STAR Method Effectively',
      date: 'December 29, 2023',
      excerpt: 'Behavioral questions are a staple of modern interviews. Master the STAR technique (Situation, Task, Action, Result) to craft compelling narratives that showcase your skills and experience.',
      slug: 'star-method-interviewing'
    },
    {
      id: 10,
      title: 'Remote Work Success: Positioning Yourself for Distributed Teams',
      date: 'January 15, 2024',
      excerpt: 'Remote work requires a unique set of skills and presentation strategies. Learn how to position yourself as an ideal remote candidate and thrive in distributed team environments.',
      slug: 'remote-work-positioning'
    },
    {
      id: 11,
      title: 'Personal Branding for Job Seekers: Standing Out in a Crowded Market',
      date: 'January 31, 2024',
      excerpt: 'A strong personal brand can set you apart from equally qualified candidates. Discover how to define, build, and communicate your unique professional identity across all touchpoints.',
      slug: 'personal-branding-job-seekers'
    },
    {
      id: 12,
      title: 'Gaps in Employment: Strategies to Address Them Confidently',
      date: 'February 17, 2024',
      excerpt: 'Employment gaps don't have to be red flags. Learn how to frame time away from the workforce positively, focusing on growth, learning, and other valuable experiences gained during that period.',
      slug: 'addressing-employment-gaps'
    },
    {
      id: 13,
      title: 'AI-Powered Job Search Tools: A Comprehensive Guide',
      date: 'March 5, 2024',
      excerpt: 'The landscape of AI tools for job seekers is vast and evolving. This guide breaks down the most effective platforms for resume optimization, job matching, application tracking, and interview preparation.',
      slug: 'ai-job-search-tools'
    },
    {
      id: 14,
      title: 'Technical Skill Assessments: Preparing for Modern Hiring Evaluations',
      date: 'March 22, 2024',
      excerpt: 'More companies are incorporating skills assessments into their hiring process. Learn strategies to prepare for and excel in various types of technical evaluations, from coding challenges to case studies.',
      slug: 'technical-skill-assessments'
    },
    {
      id: 15,
      title: 'Cover Letters That Convert: From Template to Personalized Pitch',
      date: 'April 8, 2024',
      excerpt: 'The cover letter isn't dead - it's evolved. Discover how to craft compelling, personalized cover letters that complement your resume and create a compelling case for your candidacy.',
      slug: 'effective-cover-letters'
    },
    {
      id: 16,
      title: 'Job Search Resilience: Maintaining Motivation Through Rejection',
      date: 'April 25, 2024',
      excerpt: 'Rejection is part of every job search. This article explores practical strategies for building resilience, maintaining perspective, and using rejection as a springboard for improvement.',
      slug: 'job-search-resilience'
    },
    {
      id: 17,
      title: 'Applicant Tracking Systems Decoded: What Happens After You Submit',
      date: 'May 12, 2024',
      excerpt: 'Understanding the journey your application takes through an ATS can help you optimize your approach. Learn what happens behind the scenes and how to maximize your chances at each stage.',
      slug: 'ats-systems-decoded'
    },
    {
      id: 18,
      title: 'Industry-Specific Resume Strategies: Tailoring for Your Field',
      date: 'May 29, 2024',
      excerpt: 'Different industries value different resume elements. This guide breaks down resume optimization strategies for tech, healthcare, finance, creative fields, and more.',
      slug: 'industry-specific-resumes'
    },
    {
      id: 19,
      title: 'The First 90 Days: Strategies for New Job Success',
      date: 'June 15, 2024',
      excerpt: 'Your first three months in a new role are critical. Learn how to create a strategic onboarding plan that helps you build relationships, demonstrate value, and set the foundation for long-term success.',
      slug: 'first-90-days-strategies'
    },
    {
      id: 20,
      title: 'AI and the Future of Work: Preparing for Emerging Career Opportunities',
      date: 'July 2, 2024',
      excerpt: 'AI isn't just changing how we find jobs - it's changing the jobs themselves. Explore emerging career paths, skills in growing demand, and strategies to position yourself for the AI-augmented workplace.',
      slug: 'ai-future-career-opportunities'
    },
    {
      id: 21,
      title: 'Leveraging Job Alerts: Optimizing Your Search Through Automation',
      date: 'July 19, 2024',
      excerpt: 'Setting up effective job alerts can ensure you never miss relevant opportunities. Learn how to craft precise search parameters and manage alerts across platforms for maximum efficiency.',
      slug: 'optimizing-job-alerts'
    },
    {
      id: 22,
      title: 'Effective Job Application Tracking: Staying Organized in Your Search',
      date: 'August 5, 2024',
      excerpt: 'Managing multiple applications can quickly become overwhelming. Discover systems and tools to track your applications, follow-ups, and interview stages for a more effective job search.',
      slug: 'job-application-tracking'
    },
    {
      id: 23,
      title: 'Keyword Optimization: Making Your Resume ATS-Compliant',
      date: 'August 22, 2024',
      excerpt: 'Learn the science of strategic keyword placement in your resume to ensure maximum visibility in ATS systems without sacrificing readability for human reviewers.',
      slug: 'resume-keyword-optimization'
    },
    {
      id: 24,
      title: 'Upskilling Strategies: Closing Skill Gaps for Your Target Role',
      date: 'September 8, 2024',
      excerpt: 'Identify the most valuable skills for your desired position and develop a targeted learning plan to acquire them efficiently through online courses, projects, and other resources.',
      slug: 'upskilling-strategies'
    },
    {
      id: 25,
      title: 'Portfolio Development for Non-Creative Professionals',
      date: 'September 25, 2024',
      excerpt: 'Portfolios aren't just for designers. Learn how professionals in any field can showcase their work, projects, and achievements in compelling digital portfolios that complement traditional resumes.',
      slug: 'professional-portfolio-development'
    },
    {
      id: 26,
      title: 'Interview Question Preparation: Anticipating and Structuring Responses',
      date: 'October 12, 2024',
      excerpt: 'Master the art of interview preparation by learning to anticipate questions and develop structured, compelling responses that highlight your qualifications and experience.',
      slug: 'interview-question-preparation'
    },
    {
      id: 27,
      title: 'Social Media Presence: Professional Optimization Beyond LinkedIn',
      date: 'October 29, 2024',
      excerpt: 'While LinkedIn is essential, other social platforms may also influence hiring decisions. Learn strategies for maintaining a professional presence across multiple platforms without sacrificing authenticity.',
      slug: 'professional-social-media'
    },
    {
      id: 28,
      title: 'Reference Management: Building and Maintaining Your Professional Advocates',
      date: 'November 15, 2024',
      excerpt: 'References can make or break your candidacy. Discover how to select, prepare, and maintain relationships with professional references who can effectively advocate for your skills and character.',
      slug: 'reference-management'
    },
    {
      id: 29,
      title: 'Navigating Multiple Offers: Decision Frameworks for Career Advancement',
      date: 'December 2, 2024',
      excerpt: 'Multiple job offers present both opportunity and challenge. Learn systematic approaches to evaluating competing offers beyond salary, considering culture, growth potential, and work-life balance.',
      slug: 'evaluating-multiple-offers'
    },
    {
      id: 30,
      title: 'AI Resume Review: Using Technology to Perfect Your Application',
      date: 'December 19, 2024',
      excerpt: 'Explore how AI tools can provide objective feedback on your resume, helping you identify weak points, optimize formatting, and create a more compelling presentation of your qualifications.',
      slug: 'ai-resume-review'
    },
    {
      id: 31,
      title: 'Recruiter Relationships: Building Connections That Last Beyond Your Search',
      date: 'January 5, 2025',
      excerpt: 'Recruiters can be valuable career allies. Learn strategies for developing authentic, mutually beneficial relationships with recruiters that extend beyond your current job search.',
      slug: 'recruiter-relationships'
    },
    {
      id: 32,
      title: 'Executive Job Search: Strategies for Senior-Level Positions',
      date: 'January 22, 2025',
      excerpt: 'Senior roles require specialized search strategies. Discover approaches tailored to executive positions, including leveraging board networks, executive search firms, and demonstrating strategic leadership.',
      slug: 'executive-job-search'
    },
    {
      id: 33,
      title: 'Overcoming Rejection: Turning Job Search Setbacks into Growth Opportunities',
      date: 'February 8, 2025',
      excerpt: 'Rejection is inevitable in most job searches. Learn practical techniques for processing disappointment, gathering constructive feedback, and using setbacks to strengthen future applications.',
      slug: 'overcoming-job-rejection'
    },
    {
      id: 34,
      title: 'Age-Proofing Your Job Search: Strategies for Experienced Professionals',
      date: 'February 25, 2025',
      excerpt: 'Experienced professionals face unique challenges in the job market. Discover approaches to highlighting the value of your experience while addressing potential age bias in your application materials.',
      slug: 'experienced-professional-job-search'
    },
    {
      id: 35,
      title: 'Pre-Interview Company Research: Beyond the Basics',
      date: 'March 14, 2025',
      excerpt: 'Thorough company research sets exceptional candidates apart. Learn advanced research techniques to understand company culture, challenges, and opportunities before walking into the interview.',
      slug: 'advanced-company-research'
    },
    {
      id: 36,
      title: 'Body Language in Virtual Interviews: Nonverbal Communication Through a Screen',
      date: 'March 31, 2025',
      excerpt: 'Virtual interviews require adaptation of traditional body language techniques. Master the nuances of effective nonverbal communication in video interviews to build rapport and project confidence.',
      slug: 'virtual-interview-body-language'
    },
    {
      id: 37,
      title: 'Freelance to Full-Time: Transitioning Between Work Models',
      date: 'April 17, 2025',
      excerpt: 'Moving between freelance and traditional employment presents unique challenges. Learn how to position your independent work experience effectively when seeking full-time roles.',
      slug: 'freelance-to-fulltime'
    },
    {
      id: 38,
      title: 'Job Search Automation: Tools to Streamline Your Process',
      date: 'May 4, 2025',
      excerpt: 'Automation can significantly increase your job search efficiency. Discover tools and techniques to automate application tracking, follow-ups, and other repetitive aspects of your search.',
      slug: 'job-search-automation'
    },
    {
      id: 39,
      title: 'Informational Interviews: Leveraging Conversations for Opportunity',
      date: 'May 21, 2025',
      excerpt: 'Informational interviews can open unexpected doors. Master the art of requesting, conducting, and following up on these valuable conversations to expand your network and uncover hidden opportunities.',
      slug: 'informational-interviewing'
    },
    {
      id: 40,
      title: 'AI Job Market Analysis: Understanding Industry Trends and Opportunities',
      date: 'June 7, 2025',
      excerpt: 'AI tools can provide valuable insights into job market trends. Learn to leverage data analysis to identify growing fields, in-demand skills, and emerging opportunities in your industry.',
      slug: 'ai-job-market-analysis'
    }
  ];

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-950 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Our Blog</h1>
            <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
              Expert articles on AI-powered job searching, resume optimization, and career advancement strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map(post => (
              <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
