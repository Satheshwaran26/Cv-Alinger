
import React from "react";

interface CVTemplateProps {
  content: string;
  generatePDF: () => void;
}

export const CVTemplate = React.forwardRef<HTMLDivElement, CVTemplateProps>(
  ({ content }, ref) => {
    // Parse the plain text CV content
    const sections = content.split("\n\n").filter(section => section.trim() !== "");
    
    // Try to extract name and contact info from the first section
    const firstSection = sections[0] || "";
    const nameMatch = firstSection.match(/^([A-Za-z\s]+)/);
    const name = nameMatch ? nameMatch[0].trim() : "John Doe";
    
    // Try to extract email, phone and location
    const emailMatch = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const email = emailMatch ? emailMatch[0] : "email@example.com";
    
    const phoneMatch = content.match(/(\+?[0-9\s-]{10,15})/);
    const phone = phoneMatch ? phoneMatch[0] : "+1 123 456 7890";
    
    const locationMatch = content.match(/((?:(?![0-9-+@]).)+, [A-Za-z\s]+)/);
    const location = locationMatch ? locationMatch[0] : "City, Country";

    // Process the remaining sections
    const remainingSections = sections.slice(1);

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
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="content space-y-6">
          {remainingSections.map((section, index) => {
            // Try to determine if this is a section header
            const lines = section.split("\n");
            const firstLine = lines[0];
            const isHeader = 
              firstLine.toUpperCase() === firstLine || 
              firstLine.endsWith(":") || 
              ["EXPERIENCE", "EDUCATION", "SKILLS", "PROJECTS", "SUMMARY"].some(
                keyword => firstLine.toUpperCase().includes(keyword)
              );

            if (isHeader && lines.length > 1) {
              return (
                <div key={index} className="section">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">
                    {firstLine.replace(/:$/, "")}
                  </h2>
                  <div className="section-content space-y-4">
                    {lines.slice(1).join("\n").split("\n\n").map((item, idx) => (
                      <div key={idx} className="section-item">
                        {item.split("\n").map((line, lineIdx) => (
                          <p key={lineIdx} className="mb-1">
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else {
              // Regular paragraph
              return (
                <div key={index} className="paragraph">
                  {section.split("\n").map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
);

CVTemplate.displayName = "CVTemplate";
