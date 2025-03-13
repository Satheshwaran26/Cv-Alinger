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
    id: 5,
    title: 'How AI Resume Builders Are Revolutionizing the Job Application Process',
    date: 'May 28, 2024',
    author: 'Hanan Amos',
    excerpt: 'Discover how AI resume builders are transforming the job application process with ATS optimization, data-driven content recommendations, personalized job matching, and professional design optimization.',
    slug: 'ai-resume-builders-revolution',
    categories: ['AI Tools', 'Resume Optimization', 'Job Search']
  }, {
    id: 23,
    title: 'KSAO Framework: The Foundation of Strategic HR Management',
    date: 'May 15, 2024',
    excerpt: 'Discover how the KSAO framework systematically aligns workforce capabilities with job requirements, enhancing recruitment, employee development, and organizational agility.',
    slug: 'ksao-hr-framework',
    categories: ['AI Tools', 'Career Growth']
  }, {
    id: 22,
    title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
    date: 'April 30, 2024',
    excerpt: 'Explore how generative AI is transforming industries through AI-powered content creation, business automation, and innovative applications across sectors.',
    slug: 'generative-ai-revolution',
    categories: ['AI Tools']
  }, {
    id: 1,
    title: 'AI Revolution in Job Hunting: A Personalized Approach',
    date: 'August 15, 2023',
    excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
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

  // Add categories to the rest of the posts
  posts.forEach(post => {
    if (!post.categories) {
      post.categories = Object.entries(categoryMap).filter(([_, ids]) => ids.includes(post.id)).map(([category]) => category);
    }
  });

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Knowledge base </h1>
            <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400 mb-8">AI-driven job search, resume tips, and career growth strategies.</p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Search articles..." className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg" value={searchQuery} onChange={handleSearch} />
              </div>
            </div>
            
            {/* Category Tabs */}
            <Tabs defaultValue="All" className="w-full max-w-3xl mx-auto">
              <TabsList className="h-auto flex flex-wrap justify-center bg-transparent gap-2 mb-4">
                {categories.map(category => <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)} className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    {category}
                  </TabsTrigger>)}
              </TabsList>
              
              {categories.map(category => <TabsContent key={category} value={category} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
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
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3">
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
