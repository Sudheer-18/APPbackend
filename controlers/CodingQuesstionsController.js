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
              text: ` Generate thr coding 10 Questions on BinarySeach, Sliding Window, DP,greedy".
              Each question should follow exactly this format:
              Format:
              Q: <question text>
              0) <input1>
              1) <output1>
              2) <input2>
              3) <output2>
              Separate each question by two newlines.`
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
