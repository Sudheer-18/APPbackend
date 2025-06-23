const axios = require('axios');

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

exports.SolveeQuestion = async (req, res) => {
  const { language, question, code } = req.body;

  // Validate required fields
  if (!language || !question || !code) {
    return res.status(400).json({ error: 'language, question, and code are required' });
  }

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `You are a strict programming evaluator.
                      Evaluate the following code submission for the given question and language.
                      Return only a JSON object with two fields: "accuracy" (a number from 0 to 100 representing how correct the code is) and "feedback" (a short explanation of the result).
                      Language: ${language}
                      Question: ${question}
                      Code:
                      ${code}
                      Respond only with the score of the code`
            }
          ]
        }
      ]
    });

    const evaluation = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.status(200).json({ evaluation });
  } catch (error) {
    console.error('Gemini API Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to evaluate code' });
  }
};
