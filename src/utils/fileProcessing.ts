
/**
 * File processing utility functions for handling different file types
 */

/**
 * Process DOCX/DOC file and extract text content
 * @param file The DOCX/DOC file to process
 * @returns Promise resolving to the extracted text
 */
export const parseDocFile = async (file: File): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const text = `Extracted content from DOCX: ${file.name}\n\n` +
              `This is a simulated extraction as browser-based DOCX parsing requires additional libraries.\n\n` +
              `For a production environment, consider:\n` +
              `1. Using a server-side API for DOCX parsing\n` +
              `2. Integrating with a document parsing service\n\n` +
              `Please manually paste your CV content below for this demo.`;
  
  return text;
};

/**
 * Process TXT file and extract text content
 * @param file The TXT file to process
 * @returns Promise resolving to the extracted text
 */
export const parseTextFile = async (file: File): Promise<string> => {
  const reader = new FileReader();
  
  return new Promise<string>((resolve, reject) => {
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

/**
 * Detect file type and process accordingly
 * @param file The file to process
 * @returns Promise resolving to the extracted text
 */
export const processFile = async (file: File): Promise<string> => {
  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
    file.type === "application/msword"
  ) {
    return parseDocFile(file);
  } else if (file.type === "text/plain") {
    return parseTextFile(file);
  } else {
    throw new Error("Unsupported file type. Please upload a DOCX or TXT file.");
  }
};
