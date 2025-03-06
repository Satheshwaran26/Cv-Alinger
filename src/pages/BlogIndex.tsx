
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const BlogIndex = () => {
  const posts = [
    {
      id: 23,
      title: 'KSAO Framework: The Foundation of Strategic HR Management',
      date: 'May 15, 2024',
      excerpt: 'Discover how the KSAO framework systematically aligns workforce capabilities with job requirements, enhancing recruitment, employee development, and organizational agility.',
      slug: 'ksao-hr-framework'
    },
    {
      id: 22,
      title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
      date: 'April 30, 2024',
      excerpt: 'Explore how generative AI is transforming industries through AI-powered content creation, business automation, and innovative applications across sectors.',
      slug: 'generative-ai-revolution'
    },
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
      excerpt: 'Changing industries doesn\'t have to mean starting from scratch. Explore how AI can help identify transferable skills, fill knowledge gaps, and position yourself effectively for a successful career transition.',
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
      excerpt: 'Employment gaps don\'t have to be red flags. Learn how to frame time away from the workforce positively, focusing on growth, learning, and other valuable experiences gained during that period.',
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
      excerpt: 'The cover letter isn\'t dead - it\'s evolved. Discover how to craft compelling, personalized cover letters that complement your resume and create a compelling case for your candidacy.',
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
      excerpt: 'AI isn\'t just changing how we find jobs - it\'s changing the jobs themselves. Explore emerging career paths, skills in growing demand, and strategies to position yourself for the AI-augmented workplace.',
      slug: 'ai-future-career-opportunities'
    },
    {
      id: 21,
      title: 'Leveraging Job Alerts: Optimizing Your Search Through Automation',
      date: 'July 19, 2024',
      excerpt: 'Setting up effective job alerts can ensure you never miss relevant opportunities. Learn how to craft precise search parameters and manage alerts across platforms for maximum efficiency.',
      slug: 'optimizing-job-alerts'
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
