export async function POST(req) {
  const { message } = await req.json();

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await result.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak ada respons.";
    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json({ reply: "Terjadi kesalahan." }, { status: 500 });
  }
}
