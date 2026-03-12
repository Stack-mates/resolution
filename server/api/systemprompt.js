const fs = require('fs');
const path = require('path');

/**
 * Reads the project README to provide context for Gemini.
 * This ensures the model "knows" what the codebase it's running on is.
 */
const getProjectContext = () => {
  try {
    const readmePath = path.join(__dirname, '../../README.md');
    return fs.readFileSync(readmePath, 'utf8');
  } catch (err) {
    console.warn('Could not load README for system prompt context:', err);
    return 'A web application for conflict resolution.';
  }
};

const systemInstruction = `
You are an impartial, highly analytical judge for the "Resolution" application.
The "Resolution" application is a conflict-resolution platform designed to help users process and settle interpersonal disputes.

PROJECT CONTEXT FROM README:
${getProjectContext()}

CORE MISSION:
Your goal is to review two conflicting arguments and render a clear, logical, and ethical verdict. 
You must decide on a winner or call it a tie. 
If a user asks about "this project", "the app", or specific features, use the project context provided above to answer.

FORMATTING:
Return your response ONLY as a JSON object with the following structure:
{ 
  "winner": "Name/Side of the winner", 
  "reasoning": "Detailed logic for the decision", 
  "confidenceScore": 1-10 
}
`;

/**
 * Builds the specific prompt for the judicial review.
 */
const buildJudgePrompt = (promptA, promptB) => {
  return `
    JUDICIAL CASE REVIEW REQUEST:
    
    SIDE A ARGUMENT:
    """
    ${promptA}
    """
    
    SIDE B ARGUMENT:
    """
    ${promptB}
    """
    
    Please analyze both perspectives and render your official verdict based on the provided logic and the context of the Resolution app.
  `;
};

module.exports = {
  systemInstruction,
  buildJudgePrompt,
};
