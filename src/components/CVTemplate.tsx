
import React, { useEffect } from "react";

interface CVTemplateProps {
  content: string;
  generatePDF?: () => void;
}

export const CVTemplate = React.forwardRef<HTMLDivElement, CVTemplateProps>(
  ({ content }, ref) => {
    useEffect(() => {
      // Log for debugging
      console.log("CVTemplate received content length:", content?.length || 0);
    }, [content]);

    if (!content) {
      return <div ref={ref}>No CV content available</div>;
    }

    // Check if content appears to be a PDF filename (from the mock upload)
    const isPDFFilename = content.includes("PDF file uploaded:") && content.includes(".pdf");
    
    if (isPDFFilename) {
      console.log("Detected PDF filename in content, not actual CV text");
      return (
        <div 
          ref={ref} 
          className="cv-template bg-white text-black p-8 max-w-[800px] mx-auto shadow-lg"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">CV Preview Unavailable</h1>
            <p className="text-gray-600 mb-4">
              {content}
            </p>
            <p className="text-gray-600">
              Please use the "Text" download button instead, or paste your CV content manually.
            </p>
          </div>
        </div>
      );
    }

    // Clean up any special format markers that were added during improvement
    const cleanedContent = content
      .replace(/\[Improvement based on:.*?\]/g, '')
      .replace(/\[Improved based on recommendation\]:/g, '')
      .replace(/\[Consider adding based on recommendation:.*?\]/g, '');
    
    // Parse the plain text CV content
    const contentLines = cleanedContent.split("\n").filter(line => line.trim().length > 0);
    
    if (contentLines.length === 0) {
      return <div ref={ref} className="p-4">CV content appears to be empty after cleaning</div>;
    }

    // Log parsed content for debugging
    console.log("Parsed CV lines:", contentLines.length);
    console.log("First few lines:", contentLines.slice(0, 5));
    
    // Better section detection with known CV section headers
    const commonSectionHeaders = [
      'EDUCATION', 'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT', 
      'SKILLS', 'TECHNICAL SKILLS', 'PROFESSIONAL SKILLS',
      'PROJECTS', 'CERTIFICATIONS', 'ACHIEVEMENTS', 'AWARDS',
      'PUBLICATIONS', 'LANGUAGES', 'REFERENCES', 'SUMMARY',
      'PROFILE', 'OBJECTIVE', 'PROFESSIONAL SUMMARY', 'ABOUT ME',
      'CONTACT', 'PERSONAL INFORMATION', 'CONTACT INFORMATION'
    ];

    // Identify the header section (first few lines before any clear section header)
    let headerLines: string[] = [];
    let sections: { title: string; content: string[] }[] = [];
    let currentSectionTitle = "";
    let currentSectionContent: string[] = [];
    let firstSectionFound = false;
    
    // Process the CV content line by line to identify sections
    contentLines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if line appears to be a section header
      // Using let instead of const so we can modify it later
      let isSectionHeader = (
        // Matches strings that are all caps or Title Case with common section headings
        ((/^[A-Z\s]+$/.test(trimmedLine) || /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(trimmedLine)) 
          && trimmedLine.length < 30 
          && trimmedLine.length > 3)
        // Or matches common section headers
        || commonSectionHeaders.some(header => 
            trimmedLine.toUpperCase().includes(header) || 
            trimmedLine.toUpperCase().includes(header + ':'))
      );
      
      // Force certain keywords to be recognized as section headers even if they don't match the pattern
      if (trimmedLine.toUpperCase().includes('EDUCATION:') || 
          trimmedLine.toUpperCase().includes('EXPERIENCE:') ||
          trimmedLine.toUpperCase().includes('SKILLS:')) {
        isSectionHeader = true;
      }
      
      // First few lines (up to 5) are likely contact info if they don't match section patterns
      if (!firstSectionFound && index < 5) {
        if (isSectionHeader) {
          firstSectionFound = true;
          // Save any header lines we've collected
          if (headerLines.length > 0) {
            sections.push({
              title: "PERSONAL INFORMATION",
              content: headerLines
            });
          }
          
          currentSectionTitle = trimmedLine;
          currentSectionContent = [];
        } else {
          headerLines.push(line);
        }
      } else if (firstSectionFound) {
        // Already processing sections
        if (isSectionHeader) {
          // Save previous section
          if (currentSectionTitle && currentSectionContent.length > 0) {
            sections.push({
              title: currentSectionTitle,
              content: currentSectionContent
            });
          }
          
          // Start new section
          currentSectionTitle = trimmedLine;
          currentSectionContent = [];
        } else {
          // Add to current section
          currentSectionContent.push(line);
        }
      } else {
        // We're past the initial lines but haven't found a section header yet
        // Treat as content of an "unlabeled" section
        if (isSectionHeader) {
          firstSectionFound = true;
          
          // Add any previous content as a summary section
          if (headerLines.length > 0) {
            sections.push({
              title: "PERSONAL INFORMATION",
              content: headerLines
            });
            headerLines = [];
          }
          
          currentSectionTitle = trimmedLine;
          currentSectionContent = [];
        } else {
          // Still collecting initial content
          headerLines.push(line);
        }
      }
    });
    
    // Add final section
    if (currentSectionTitle && currentSectionContent.length > 0) {
      sections.push({
        title: currentSectionTitle,
        content: currentSectionContent
      });
    }
    
    // If we didn't identify any sections but have header lines,
    // create a single section with all content
    if (sections.length === 0 && headerLines.length > 0) {
      // Try to make best guess at structure
      if (headerLines.length <= 5) {
        // Probably just contact info
        sections.push({
          title: "PERSONAL INFORMATION",
          content: headerLines
        });
      } else {
        // Split into personal info and content
        sections.push({
          title: "PERSONAL INFORMATION",
          content: headerLines.slice(0, 5)
        });
        
        sections.push({
          title: "DETAILS",
          content: headerLines.slice(5)
        });
      }
    }
    
    // Fallback if we still have no sections
    if (sections.length === 0) {
      sections.push({
        title: "CV CONTENT",
        content: contentLines
      });
    }
    
    // Extract name and contact information
    const personalInfoSection = sections.find(
      s => s.title.toUpperCase().includes("PERSONAL") || 
           s.title === "HEADER" || 
           s.title === "CONTACT"
    );
    
    let name = "";
    let email = "";
    let phone = "";
    let location = "";
    
    if (personalInfoSection) {
      const personalInfo = personalInfoSection.content.join("\n");
      
      // Try to extract name (typically the first line)
      if (personalInfoSection.content.length > 0) {
        name = personalInfoSection.content[0].trim();
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
    }

    console.log("Debug - Sections found:", sections.length);
    console.log("Debug - Personal info:", { name, email, phone, location });

    return (
      <div 
        ref={ref} 
        className="cv-template bg-white text-black p-8 max-w-[800px] mx-auto shadow-lg" 
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header/Personal Information Section */}
        <div className="header border-b-2 border-gray-800 pb-4 mb-6">
          {name ? (
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
          ) : (
            <h1 className="text-3xl font-bold mb-2">CV Document</h1>
          )}
          
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
          
          {/* Display other personal info lines that aren't name/email/phone/location */}
          {personalInfoSection && (
            <div className="mt-2">
              {personalInfoSection.content.map((line, idx) => {
                const trimmedLine = line.trim();
                // Skip the line if it's already shown as name or contains email/phone/location
                if (trimmedLine === name || 
                    trimmedLine.includes(email) || 
                    trimmedLine.includes(phone) ||
                    trimmedLine.includes(location) ||
                    trimmedLine === "") {
                  return null;
                }
                return <p key={`personal-info-${idx}`} className="text-sm">{line}</p>;
              })}
            </div>
          )}
        </div>

        {/* Content Sections - Skip the personal info section */}
        <div className="content space-y-6">
          {sections
            .filter(section => 
              !section.title.toUpperCase().includes("PERSONAL") && 
              section.title !== "HEADER" &&
              section.title !== "CONTACT"
            )
            .map((section, index) => (
              <div key={`section-${index}`} className="section">
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
                    return <p key={`section-${index}-line-${lineIdx}`} className="mb-1">{line}</p>;
                  })}
                </div>
              </div>
            ))}
        </div>
        
        {/* Special case: if we only have one section and it's the personal info */}
        {sections.length === 1 && 
         (sections[0].title.toUpperCase().includes("PERSONAL") || 
          sections[0].title === "HEADER" ||
          sections[0].title === "CONTACT") && (
          <div className="fallback-content border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-xl font-semibold mb-3">CV Content</h2>
            <p className="text-gray-500 italic">The CV content appears to only contain personal information without structured sections.</p>
          </div>
        )}
        
        {/* Absolute Fallback if nothing else works */}
        {sections.length === 0 && (
          <div className="raw-content">
            <h2 className="text-xl font-semibold mb-3">CV Content</h2>
            {cleanedContent.split('\n')
              .filter(line => line.trim().length > 0)
              .map((line, idx) => (
                <p key={`raw-${idx}`} className="mb-1">{line}</p>
              ))
            }
          </div>
        )}
      </div>
    );
  }
);

CVTemplate.displayName = "CVTemplate";
