const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, system } = req.body;
  const key = process.env.GEMINI_API_KEY;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const geminiRes = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { maxOutputTokens: 1024 }
    })
  });

  if (!geminiRes.ok) {
    const err = await geminiRes.json();
    return res.status(geminiRes.status).json({ error: err.error?.message || 'Gemini API error' });
  }

  const data = await geminiRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  res.json({ text });
};
