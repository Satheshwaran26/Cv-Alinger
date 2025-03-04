
import React from "react";

interface CVTemplateProps {
  content: string;
  generatePDF: () => void;
}

export const CVTemplate = React.forwardRef<HTMLDivElement, CVTemplateProps>(
  ({ content }, ref) => {
    // Clean up any special format markers added during improvement
    const cleanedContent = content.replace(/\[Improvement based on:.*?\]/g, '').replace(/\[Consider adding based on recommendation:.*?\]/g, '');
    
    // Parse the plain text CV content
    const contentLines = cleanedContent.split("\n");
    const sections: { title: string; content: string[] }[] = [];
    
    let currentSectionTitle = "Header";
    let currentSectionContent: string[] = [];
    
    // Process the CV content line by line to identify sections
    contentLines.forEach((line, index) => {
      // Check if line appears to be a section header
      const isSectionHeader = 
        (line.toUpperCase() === line && line.trim().length > 0) || 
        (line.endsWith(':') && line.length < 50) ||
        /^[A-Z][A-Z\s]+$/.test(line.trim());
      
      if (isSectionHeader && index > 0) {
        // Save the previous section
        sections.push({
          title: currentSectionTitle,
          content: currentSectionContent
        });
        
        // Start a new section
        currentSectionTitle = line.trim();
        currentSectionContent = [];
      } else {
        // Add line to current section content
        if (line.trim().length > 0) {
          currentSectionContent.push(line);
        }
      }
    });
    
    // Add the last section
    if (currentSectionContent.length > 0) {
      sections.push({
        title: currentSectionTitle,
        content: currentSectionContent
      });
    }
    
    // Extract personal information from the first section
    const firstSection = sections[0] || { title: "Header", content: [] };
    const personalInfo = firstSection.content.join("\n");
    
    // Try to extract name, email, phone and location
    // Assume name is in the first line if it doesn't contain @ or digits
    let nameIndex = 0;
    while (nameIndex < firstSection.content.length && 
           (firstSection.content[nameIndex].includes('@') || 
            /\d/.test(firstSection.content[nameIndex]))) {
      nameIndex++;
    }
    
    const name = nameIndex < firstSection.content.length ? 
      firstSection.content[nameIndex] : 
      "Name";
    
    const emailMatch = personalInfo.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const email = emailMatch ? emailMatch[0] : "";
    
    const phoneMatch = personalInfo.match(/(\+?\d[\d\s-]{7,})/);
    const phone = phoneMatch ? phoneMatch[0] : "";
    
    const locationMatch = personalInfo.match(/([A-Za-z\s]+,\s*[A-Za-z\s]+)/);
    const location = locationMatch ? locationMatch[0] : "";

    return (
      <div 
        ref={ref} 
        className="cv-template bg-white text-black p-8 max-w-[800px] mx-auto shadow-lg" 
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div className="header border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <div className="contact-info flex flex-wrap gap-4 text-sm">
            {email && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Content Sections - Skip the first "Header" section */}
        <div className="content space-y-6">
          {sections.slice(1).map((section, index) => (
            <div key={index} className="section">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">
                {section.title.replace(/:$/, "")}
              </h2>
              <div className="section-content">
                {section.content.map((line, lineIdx) => (
                  <div key={lineIdx} className="section-item mb-2">
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Fallback for CVs that couldn't be properly parsed into sections */}
        {sections.length <= 1 && (
          <div className="raw-content whitespace-pre-wrap">
            {cleanedContent}
          </div>
        )}
      </div>
    );
  }
);

CVTemplate.displayName = "CVTemplate";
