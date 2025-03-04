
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
      return JSON.parse(content);
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
