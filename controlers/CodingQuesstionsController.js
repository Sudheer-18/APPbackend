const axios = require('axios');

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

console.log(GEMINI_API_URL)
exports.generateCodingQuestion = async (req, res) => {
  const { Q } = req.body;
//   console.log(topic)
//   if ( !Q) return res.status(400).json({ error: 'Topic is required' });

try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Generate exactly 10 coding questions covering the topics: Binary Search, Sliding Window, Dynamic Programming, and Greedy Algorithms.

Each question must follow the **exact** format below:

Format:
Q: <question text>
1) <input1>
   <output1>
2) <input2>
   <output2>
3) Solutions:
   - Brute Force:
     <brute force code here in cpp,python ,java>

   - Optimized Solution 1:
     <optimized code 1 here in cpp ,java,python>

Ensure:
- Each question is clearly labeled starting with "Q:"
- Provide exactly 2 example inputs and outputs per question
- Separate each question with two newlines for clarity
- Do not add any explanation or numbering outside the given format
- Maintain consistency and indentation in inputs and outputs

Begin with the first question immediately.`
            }
          ]
        }
      ]
    });

    const question = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({ question });
  } catch (error) {
    console.error('Gemini API Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate question' });
  }
};