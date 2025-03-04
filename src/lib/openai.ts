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

export async function analyzeCVWithOpenAI(
  cvText: string, 
  jobDescription: string
): Promise<any> {
  try {
    // System prompt to analyze CV against job description
    const systemPrompt = `
      You are an expert CV/Resume analyzer assistant. You will analyze a CV text against a job description to provide:
      1. An overall match score from 0-100
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

      Your analysis should be based solely on the CV and job description provided.
      Make sure the score is an accurate reflection of how well the CV matches the job description, with different CVs getting different scores.
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
        temperature: 0.7,
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
      console.log("Parsed response with score:", parsedResponse.overallScore);
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

interface ImproveOptions {
  originalCV: string;
  recommendations: any[];
  currentScore: number;
}

export async function improveCV({
  originalCV,
  recommendations,
  currentScore
}: ImproveOptions): Promise<{ success: boolean; improved_cv?: string; new_score?: number; error?: string }> {
  try {
    // System prompt to improve the CV based on recommendations
    const systemPrompt = `
      You are an expert CV/Resume improvement assistant. Your task is to seamlessly integrate 
      recommendations into a CV to make it more effective and better matched to job requirements.
      
      You will receive:
      1. The original CV text
      2. A list of recommendations to apply
      3. The current match score (0-100)
      
      Your response must be a JSON object with:
      {
        "improved_cv": "The complete improved CV with all changes integrated seamlessly",
        "new_score": number (A realistic improved score that's higher than the current score)
      }
      
      Guidelines:
      - Maintain the original structure and formatting of the CV
      - Integrate the recommendations naturally - don't just append them
      - Make the recommended changes flow naturally as if they were part of the original CV
      - Be subtle and professional - the improvements should be integrated seamlessly
      - Return only the JSON response with no additional text or formatting
    `;

    // Combine all recommendations into a structured format
    const recommendationsText = recommendations.map(rec => 
      `- ${rec.title}: ${rec.description}${rec.suggestedChange ? `\n  Suggested change: ${rec.suggestedChange}` : ''}`
    ).join('\n');

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
            content: `Original CV:\n${originalCV}\n\nRecommendations to apply:\n${recommendationsText}\n\nCurrent Score: ${currentScore}`,
          },
        ],
        temperature: 0.7,
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
      console.log("CV improvement successful with new score:", parsedResponse.new_score);
      
      return {
        success: true,
        improved_cv: parsedResponse.improved_cv,
        new_score: parsedResponse.new_score
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
