
import { howAiResumeBuilders } from './howAiResumeBuilders';
import { tenWaysResumeAI } from './tenWaysResumeAI';
import { aiRevolutionJobHunting } from './aiRevolutionJobHunting';
import { atsFriendlyResumes } from './atsFriendlyResumes';
import { resumeAIvsProfessional } from './resumeAIvsProfessional';
import { customizeResumeByIndustry } from './customizeResumeByIndustry';
import { aiInterviewPrep } from './aiInterviewPrep';
import { interviewQuestionsAI } from './interviewQuestionsAI';
import { colorPalette } from './colorPalette';

// Export posts mapped by their slugs
export const posts = {
  'how-ai-resume-builders-revolutionizing-job-application': howAiResumeBuilders,
  '10-ways-resume-ai-interview-chances': tenWaysResumeAI,
  'ai-revolution-job-hunting': aiRevolutionJobHunting,
  'ats-friendly-resumes': atsFriendlyResumes,
  'future-resume-writing-ai-vs-professional': resumeAIvsProfessional,
  'customize-resume-by-industry': customizeResumeByIndustry,
  'ai-interview-preparation': aiInterviewPrep,
  '5-common-interview-questions-ai-help-answer-perfectly': interviewQuestionsAI
};

// Add SEO metadata to all posts if not already present
Object.entries(posts).forEach(([slug, post]) => {
  if (!post.metaDescription) {
    post.metaDescription = post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  }
  if (!post.keywords && post.categories) {
    post.keywords = [...post.categories];
  }
});

export { colorPalette };
