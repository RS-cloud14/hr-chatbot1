export default async function handler(req, res) {
  try {
    const body = await req.json();
    const message = body.message;

    const systemContext = `You are an AI assistant for the HR Aging Workforce Assessment Tool.
This tool helps HR professionals assess retirement risks in their organization.
Explain clearly and concisely based on HR risk categories and recommended actions.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: systemContext + "\n\nUser question: " + message }] }
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
        })
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
