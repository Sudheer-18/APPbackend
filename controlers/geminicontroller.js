const axios = require('axios');

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

console.log(GEMINI_API_URL)
exports.generateQuestion = async (req, res) => {
  const { topic } = req.body;
  console.log(topic)
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Generate one multiple choice question on the topic "${topic}".
              Format:
              Q: <question text>
              0) <option A>
              1) <option B>
              2) <option C>
              3) <option D>
              Correct answer index: <number from 0 to 3>`
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
