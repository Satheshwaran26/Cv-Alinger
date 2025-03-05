
import React from "react";

interface CVTemplateProps {
  content: string;
  generatePDF: () => void;
}

export const CVTemplate = React.forwardRef<HTMLDivElement, CVTemplateProps>(
  ({ content }, ref) => {
    // Clean up any special format markers that were added during improvement
    const cleanedContent = content
      .replace(/\[Improvement based on:.*?\]/g, '')
      .replace(/\[Improved based on recommendation\]:/g, '')
      .replace(/\[Consider adding based on recommendation:.*?\]/g, '');
    
    // Parse the plain text CV content
    const contentLines = cleanedContent.split("\n").filter(line => line.trim().length > 0);
    const sections: { title: string; content: string[] }[] = [];
    
    let currentSectionTitle = "";
    let currentSectionContent: string[] = [];
    
    // Identify the header section (first few lines before any clear section header)
    let headerLines: string[] = [];
    let firstSectionFound = false;
    
    // Process the CV content line by line to identify sections
    contentLines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if line appears to be a section header
      // This regex matches common CV section headers like "EDUCATION:", "Work Experience", etc.
      const sectionHeaderRegex = /^([A-Z][A-Za-z\s]+(?:\:|$))/;
      const isSectionHeader = sectionHeaderRegex.test(trimmedLine) && 
                             trimmedLine.length < 40 && 
                             trimmedLine.length > 0;
      
      if (!firstSectionFound) {
        // Still in header area
        if (isSectionHeader) {
          // First section header found, previous lines are the header
          firstSectionFound = true;
          if (headerLines.length > 0) {
            sections.push({
              title: "HEADER",
              content: headerLines
            });
          }
          
          // Start the new section
          currentSectionTitle = trimmedLine;
          currentSectionContent = [];
        } else if (trimmedLine.length > 0) {
          // Add to header lines
          headerLines.push(line);
        }
      } else {
        // Past header, processing normal sections
        if (isSectionHeader) {
          // Save the previous section if it has content
          if (currentSectionTitle && currentSectionContent.length > 0) {
            sections.push({
              title: currentSectionTitle,
              content: currentSectionContent
            });
          }
          
          // Start a new section
          currentSectionTitle = trimmedLine;
          currentSectionContent = [];
        } else {
          // Add line to current section content
          currentSectionContent.push(line);
        }
      }
    });
    
    // Add the last section if there's content
    if (currentSectionTitle && currentSectionContent.length > 0) {
      sections.push({
        title: currentSectionTitle,
        content: currentSectionContent
      });
    }
    
    // Handle case where no clear sections were identified
    if (sections.length === 0 && headerLines.length > 0) {
      sections.push({
        title: "CONTENT",
        content: headerLines
      });
    }
    
    // If no sections were identified at all, just use the raw content
    if (sections.length === 0) {
      sections.push({
        title: "CONTENT",
        content: cleanedContent.split('\n').filter(line => line.trim().length > 0)
      });
    }
    
    // Extract personal information from the first section
    const headerSection = sections.find(s => s.title === "HEADER") || { content: [] };
    const personalInfo = headerSection.content.join("\n");
    
    // Try to extract name, email, phone and location
    let name = "";
    let email = "";
    let phone = "";
    let location = "";
    
    // First try to find a name (usually the first line without numbers or @ symbol)
    for (const line of headerSection.content) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.includes('@') && !/\d/.test(trimmedLine)) {
        name = trimmedLine;
        break;
      }
    }
    
    // Find email
    const emailMatch = personalInfo.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) email = emailMatch[0];
    
    // Find phone
    const phoneMatch = personalInfo.match(/(\+?\d[\d\s-]{7,})/);
    if (phoneMatch) phone = phoneMatch[0];
    
    // Find location (often contains city or country names)
    const locationMatch = personalInfo.match(/([A-Za-z\s]+,\s*[A-Za-z\s]+)/);
    if (locationMatch) location = locationMatch[0];

    console.log("Debug - Sections found:", sections.length);
    console.log("Debug - First section:", sections[0]?.title);
    console.log("Debug - Name found:", name);

    return (
      <div 
        ref={ref} 
        className="cv-template bg-white text-black p-8 max-w-[800px] mx-auto shadow-lg" 
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        {headerSection.content.length > 0 && (
          <div className="header border-b-2 border-gray-800 pb-4 mb-6">
            {name && <h1 className="text-3xl font-bold mb-2">{name}</h1>}
            
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
            
            {/* Display other header lines that aren't name/email/phone/location */}
            <div className="mt-2">
              {headerSection.content.map((line, idx) => {
                const trimmedLine = line.trim();
                // Skip the line if it's already shown as name/email/phone/location
                if (trimmedLine === name || 
                    trimmedLine.includes(email) || 
                    trimmedLine.includes(phone) ||
                    trimmedLine.includes(location) ||
                    trimmedLine === "") {
                  return null;
                }
                return <p key={`header-${idx}`} className="text-sm">{line}</p>;
              })}
            </div>
          </div>
        )}

        {/* Fallback for minimal or no header info */}
        {headerSection.content.length === 0 && (
          <div className="header border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-3xl font-bold mb-2">CV Document</h1>
          </div>
        )}

        {/* Content Sections - Skip the HEADER section */}
        <div className="content space-y-6">
          {sections
            .filter(section => section.title !== "HEADER")
            .map((section, index) => (
              <div key={index} className="section">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">
                  {section.title.replace(/:$/, "")}
                </h2>
                <div className="section-content">
                  {section.content.map((line, lineIdx) => {
                    // Filter out any remaining recommendation markers
                    const lowerLine = line.toLowerCase();
                    if (lowerLine.includes('[improved based on') || 
                        lowerLine.includes('[consider adding') ||
                        lowerLine.includes('[improvement based')) {
                      return null;
                    }
                    return <p key={`line-${lineIdx}`} className="mb-1">{line}</p>;
                  })}
                </div>
              </div>
            ))}
        </div>
        
        {/* Fallback for CVs that couldn't be properly parsed into sections */}
        {sections.length === 0 && (
          <div className="raw-content">
            {cleanedContent.split('\n').filter(line => line.trim().length > 0).map((line, idx) => (
              <p key={`raw-${idx}`} className="mb-1">{line}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CVTemplate.displayName = "CVTemplate";
