
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';

// Example HTML template for blog posts
const htmlTemplateExample = `<h2>Introduction</h2>
<p>Start with an engaging introduction that hooks the reader and presents the main topic of your article.</p>

<h2>First Main Point</h2>
<p>Develop your first key point with clear explanations and evidence.</p>
<ul>
  <li>Supporting point one</li>
  <li>Supporting point two</li>
  <li>Supporting point three</li>
</ul>

<h2>Second Main Point</h2>
<p>Continue with your next important point, maintaining a logical flow.</p>

<h2>Third Main Point</h2>
<p>Develop your third key argument or information section.</p>

<h2>Practical Tips</h2>
<p>Provide actionable advice that readers can implement.</p>

<h2>Conclusion</h2>
<p>Summarize your main points and end with a thought-provoking statement or call to action.</p>`;

interface ContentEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const ContentEditor = ({
  content,
  setContent,
}: ContentEditorProps) => {
  const handleTemplateInsert = () => {
    setContent(htmlTemplateExample);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="content">Content *</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleTemplateInsert}
          className="text-xs"
        >
          Insert Template
        </Button>
      </div>
      
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="formatting-guide">
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              HTML Formatting Guidelines
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-4 bg-slate-50 dark:bg-slate-900 text-sm">
              <h3 className="font-medium mb-2">Use the following HTML tags for consistent formatting:</h3>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;h2&gt;</code> - For section headings</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;p&gt;</code> - For paragraphs</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;ul&gt;</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;li&gt;</code> - For bullet lists</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;ol&gt;</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;li&gt;</code> - For numbered lists</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;strong&gt;</code> - For bold text</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;em&gt;</code> - For italic text</li>
                <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;a href="..."&gt;</code> - For links</li>
              </ul>
              <p className="text-xs mt-2">For best results, maintain a consistent structure with other blog posts on the site.</p>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Textarea
        id="content"
        placeholder="Write your post content here (HTML supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="min-h-[300px] font-mono"
      />
      <p className="text-xs text-slate-500 dark:text-slate-400">
        HTML formatting is supported and encouraged for consistent styling. Use the template button for a starting point.
      </p>
    </div>
  );
};
