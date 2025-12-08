const OpenAI = require('openai');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SUMMARY_PROMPT = `You are an expert book summarizer. Create a detailed, structured, and comprehensive summary of the book content provided.

Include the following sections:
1. Book Title
2. Author(s) (if identifiable)
3. Genre
4. Publication Date (if identifiable)
5. Key Themes
6. Main Characters (with brief descriptions, if applicable)
7. Chapter-wise or Section-wise Summary
8. Important Quotes (3-5 notable quotes)
9. Overall Conclusion or Takeaways

Format the output in clear markdown with proper headings. Make it concise, well-structured, and professional.`;

async function summarizeBook(pdfPath) {
  // Extract text from PDF
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(dataBuffer);
  const bookText = pdfData.text;

  if (!bookText || bookText.trim().length < 100) {
    throw new Error('Could not extract sufficient text from PDF');
  }

  // Truncate if too long (OpenAI has token limits)
  const maxChars = 50000;
  const textToSummarize = bookText.length > maxChars 
    ? bookText.substring(0, maxChars) + '\n\n[Text truncated due to length...]'
    : bookText;

  // Generate summary using OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SUMMARY_PROMPT },
      { role: 'user', content: `Please summarize this book:\n\n${textToSummarize}` }
    ],
    temperature: 0.7,
    max_tokens: 3000
  });

  return response.choices[0].message.content;
}

async function summarizeByTitle(title) {
  const prompt = `${SUMMARY_PROMPT}

The user has provided the book title: "${title}"

Since the full text is not available, search your knowledge base for information about this book and create a comprehensive summary based on what you know. If you don't have enough information, clearly state that and provide what you can.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: `Create a comprehensive summary for: ${title}` }
    ],
    temperature: 0.7,
    max_tokens: 3000
  });

  return response.choices[0].message.content;
}

module.exports = { summarizeBook, summarizeByTitle };
