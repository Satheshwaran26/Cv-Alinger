interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Your API key - replace with your actual OpenAI API key
const API_KEY = "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";

// Cache to store analysis results for the same CV and job description
const analysisCache = new Map<string, any>();

export async function analyzeCVWithOpenAI(
  cvText: string, 
  jobDescription: string
): Promise<any> {
  try {
    // Create a cache key from the CV text and job description
    const cacheKey = `${cvText.trim()}_${jobDescription.trim()}`;
    
    // Check if we have a cached result
    if (analysisCache.has(cacheKey)) {
      console.log("Using cached analysis result");
      return analysisCache.get(cacheKey);
    }
    
    // Updated system prompt with more guidance on scoring
    const systemPrompt = `
      You are an expert CV/Resume analyzer assistant. You will analyze a CV text against a job description to provide:
      1. An overall match score from 0-100 that MUST be fair and accurate
      2. KSAO analysis (Knowledge, Skills, Abilities, Other) with scores and recommendations
      3. Specific recommendations for CV improvements
      4. Missing and present keywords

      Format your response as JSON with the following structure:
      {
        "overallScore": number,
        "ksaoData": {
          "knowledge": [{"name": string, "score": number, "jobReqScore": number, "gap": number, "recommendation": string}],
          "skills": [{"name": string, "score": number, "jobReqScore": number, "gap": number, "recommendation": string}],
          "abilities": [{"name": string, "score": number, "jobReqScore": number, "gap": number, "recommendation": string}],
          "other": [{"name": string, "score": number, "jobReqScore": number, "gap": number, "recommendation": string}]
        },
        "recommendations": [
          {"title": string, "description": string, "impact": "high"|"medium"|"low", "category": string, "suggestedChange": string}
        ],
        "keywordsMissing": string[],
        "keywordsPresent": string[]
      }

      SCORING GUIDELINES:
      - The overall score MUST reflect how well the CV matches the job description requirements and should NOT be inflated
      - Most CVs should score between 40-75 for their initial submission, with exceptional matches scoring higher
      - Be critical and realistic - a perfect match is extremely rare
      - Consider both keyword matching AND substantive qualifications
      - Higher scores should only be given when there is clear evidence the candidate meets all key requirements
      - Lower scores should be given when major requirements are missing
      - BE CONSISTENT in your scoring approach - if you analyze the same CV and job description multiple times, the score should be very similar
      
      Your analysis should be based solely on the CV and job description provided.
      Be factual, precise, and provide actionable recommendations based on modern CV best practices.
      IMPORTANT: Return ONLY the JSON with no markdown formatting, code blocks, or any other text.
    `;

    // Making the request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `CV Text:\n${cvText}\n\nJob Description:\n${jobDescription}`,
          },
        ],
        temperature: 0.3, // Lower temperature for more consistent results
        seed: 12345, // Fixed seed for deterministic results
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean the response if it contains markdown code blocks or any non-JSON formatting
    if (content.includes('```')) {
      // Extract content between markdown code blocks if present
      const match = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match && match[1]) {
        content = match[1].trim();
      } else {
        // Remove all markdown formatting
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      }
    }
    
    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(content);
      
      // Add validation to ensure scores are reasonable
      if (parsedResponse.overallScore > 90) {
        console.log("Adjusting an unusually high score to be more realistic");
        parsedResponse.overallScore = Math.floor(parsedResponse.overallScore * 0.85);
      }
      
      console.log("Parsed response with score:", parsedResponse.overallScore);
      
      // Cache the result
      analysisCache.set(cacheKey, parsedResponse);
      
      return parsedResponse;
    } catch (error) {
      console.error("Failed to parse OpenAI response as JSON:", error);
      console.log("Raw response content:", content);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("Error analyzing CV with OpenAI:", error);
    throw error;
  }
}

export async function generateImprovedCVWithOpenAI(prompt: string): Promise<any> {
  try {
    // Making the request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert CV/Resume improvement assistant. Your task is to make targeted improvements to a CV based on specific recommendations."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    
    // Process the response to extract the improved CV
    const improvedCV = data.choices[0].message.content;
    
    // Calculate a new score (this is a placeholder - in a real implementation,
    // you'd want to analyze the improved CV to get an accurate score)
    const newScore = Math.floor(Math.random() * 20) + 70; // Random score between 70-90
    
    return {
      improvedCV: improvedCV,
      newScore: newScore,
      // Extract recommendations that were applied (this is a placeholder)
      appliedRecommendations: ["Improved Skills Section", "Enhanced Job Descriptions", "Added Quantifiable Achievements"]
    };
    
  } catch (error) {
    console.error("Error generating improved CV with OpenAI:", error);
    throw error;
  }
}

interface ImproveOptions {
  originalCV: string;
  recommendations: any[];
  currentScore: number;
  missingKeywords?: string[];
}

export async function improveCV({
  originalCV,
  recommendations,
  currentScore,
  missingKeywords = []
}: ImproveOptions): Promise<{ 
  success: boolean; 
  improved_cv?: string; 
  new_score?: number; 
  added_keywords?: string[];
  error?: string 
}> {
  try {
    // System prompt to improve the CV based on recommendations
    const systemPrompt = `
      You are an expert CV/Resume improvement assistant. Your task is to make targeted improvements to a CV
      based on specific recommendations while preserving the original content and structure.
      
      You will receive:
      1. The original CV text
      2. A list of recommendations to apply
      3. The current match score (0-100)
      4. A list of keywords that are missing from the CV but should be added
      
      Your response must be a JSON object with:
      {
        "improved_cv": "The complete improved CV with all changes integrated seamlessly",
        "new_score": number (A realistic improved score that's measurably higher than the current score),
        "added_keywords": [list of keywords you successfully added from the missing keywords list]
      }
      
      IMPORTANT GUIDELINES:
      - You MUST retain all original information from the CV - don't remove or replace actual facts
      - You MUST maintain the same original structure and sections of the CV
      - You MUST NOT invent new jobs, education, or experience that wasn't in the original CV
      - You MUST NOT add fictitious skills, certifications, or qualifications
      - You SHOULD improve the phrasing, formatting, and emphasis of existing content
      - You SHOULD add quantifiable metrics to existing achievements when relevant
      - You SHOULD adjust keyword usage to better match job requirements
      - You SHOULD implement the specific recommendations provided
      - You MUST naturally incorporate the missing keywords into relevant sections
      - The new score should be between 5-15 points higher than the current score, reflecting realistic improvement
      - Do not make the new score more than 90, as that would be unrealistic
      - Return only the JSON response with no additional text or formatting
    `;

    // Combine all recommendations into a structured format
    const recommendationsText = recommendations.map(rec => 
      `- ${rec.title}: ${rec.description}${rec.suggestedChange ? `\n  Suggested change: ${rec.suggestedChange}` : ''}`
    ).join('\n');

    // Format missing keywords
    const missingKeywordsText = missingKeywords.length > 0 
      ? `\n\nMissing Keywords to Add:\n${missingKeywords.join(', ')}`
      : '';

    // Making the request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Original CV:\n${originalCV}\n\nRecommendations to apply:\n${recommendationsText}${missingKeywordsText}\n\nCurrent Score: ${currentScore}`,
          },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean the response if it contains markdown code blocks or any non-JSON formatting
    if (content.includes('```')) {
      // Extract content between markdown code blocks if present
      const match = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match && match[1]) {
        content = match[1].trim();
      } else {
        // Remove all markdown formatting
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      }
    }
    
    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(content);
      
      // Validate the improved score - ensure it's higher but not unrealistically high
      if (parsedResponse.new_score) {
        const scoreIncrease = parsedResponse.new_score - currentScore;
        
        // If score increase is too high, adjust it to a more realistic improvement
        if (scoreIncrease > 15) {
          console.log("Adjusting an unrealistically large score improvement");
          parsedResponse.new_score = Math.min(currentScore + 10, 90);
        }
        
        // Ensure the score isn't already too high
        if (parsedResponse.new_score > 90) {
          parsedResponse.new_score = 90;
        }
      }

      // Implement a fallback method if the improved CV seems too different from the original
      // This is a basic check to ensure content preservation
      if (parsedResponse.improved_cv) {
        const originalWords = originalCV.split(/\s+/).length;
        const improvedWords = parsedResponse.improved_cv.split(/\s+/).length;
        const wordCountDiff = Math.abs(improvedWords - originalWords) / originalWords;
        
        // If the word count changed by more than 30%, it's likely the content was too drastically changed
        if (wordCountDiff > 0.3) {
          console.log("Improved CV differs too much from original, using conservative fallback");
          
          // Apply more conservative improvements
          let improvedCV = originalCV;
          
          // Process each recommendation to make targeted changes
          for (const rec of recommendations) {
            if (rec.suggestedChange) {
              // Look for a section or line that could be improved based on recommendation
              const relevantSection = findRelevantSection(originalCV, rec.category, rec.title);
              
              if (relevantSection) {
                // Make targeted replacement of just the relevant section
                improvedCV = improvedCV.replace(relevantSection, 
                  applyConservativeImprovement(relevantSection, rec.suggestedChange));
              } else {
                // If no clear section found, append the suggestion at the end with a note
                improvedCV += `\n\n[Consider adding based on recommendation: ${rec.title}]\n${rec.suggestedChange}`;
              }
            }
          }

          // Add missing keywords
          let addedKeywords: string[] = [];
          if (missingKeywords.length > 0) {
            const skillsSection = findRelevantSection(improvedCV, "skills", "skills");
            
            if (skillsSection) {
              // Add keywords to skills section
              const keywordsToAdd = missingKeywords.join(', ');
              const updatedSkillsSection = `${skillsSection}\n\nAdditional Skills: ${keywordsToAdd}`;
              improvedCV = improvedCV.replace(skillsSection, updatedSkillsSection);
              addedKeywords = [...missingKeywords];
            } else {
              // Add a new skills section with the keywords
              improvedCV += `\n\nAdditional Skills: ${missingKeywords.join(', ')}`;
              addedKeywords = [...missingKeywords];
            }
          }
          
          parsedResponse.improved_cv = improvedCV;
          parsedResponse.added_keywords = addedKeywords;
        }
      }
      
      console.log("CV improvement successful with new score:", parsedResponse.new_score);
      
      return {
        success: true,
        improved_cv: parsedResponse.improved_cv,
        new_score: parsedResponse.new_score,
        added_keywords: parsedResponse.added_keywords || missingKeywords
      };
    } catch (error) {
      console.error("Failed to parse OpenAI response as JSON:", error);
      console.log("Raw response content:", content);
      return { 
        success: false, 
        error: "Invalid response format from OpenAI"
      };
    }
  } catch (error) {
    console.error("Error improving CV with OpenAI:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Helper function to find a relevant section in the CV based on a recommendation
function findRelevantSection(originalCV: string, category: string, title: string): string | null {
  // Split CV into sections by common headers
  const sections = originalCV.split(/\n\s*([A-Z][A-Z\s]+):\s*\n/);
  
  // Check for sections that might be relevant to the recommendation
  if (category.toLowerCase().includes('skills')) {
    const skillsSection = sections.find(s => 
      s.toLowerCase().includes('skills') || 
      s.toLowerCase().includes('technical') || 
      s.toLowerCase().includes('competencies')
    );
    return skillsSection || null;
  }
  
  if (category.toLowerCase().includes('experience')) {
    const expSection = sections.find(s => 
      s.toLowerCase().includes('experience') || 
      s.toLowerCase().includes('employment') || 
      s.toLowerCase().includes('work history')
    );
    return expSection || null;
  }
  
  if (category.toLowerCase().includes('education')) {
    const eduSection = sections.find(s => 
      s.toLowerCase().includes('education') || 
      s.toLowerCase().includes('academic') || 
      s.toLowerCase().includes('qualifications')
    );
    return eduSection || null;
  }
  
  // For structure or format recommendations, return the full CV
  if (category.toLowerCase().includes('structure') || 
      category.toLowerCase().includes('format') ||
      category.toLowerCase().includes('layout')) {
    return originalCV;
  }
  
  // If no specific section matches, return null
  return null;
}

// Helper function to apply conservative improvements
function applyConservativeImprovement(originalSection: string, suggestedChange: string): string {
  // For now, we're just appending the suggestion to the section
  // In a more sophisticated implementation, this would parse the section
  // and make targeted replacements
  return `${originalSection}\n\n[Improved based on recommendation]:\n${suggestedChange}`;
}
