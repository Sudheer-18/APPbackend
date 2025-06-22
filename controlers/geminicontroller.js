const axios = require('axios');

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

exports.generateQuestion = async (req, res) => {
  const { topic } = req.body;

  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Generate a random, creative question about: "${topic}"`
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
