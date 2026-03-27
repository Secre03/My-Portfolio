export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is missing!");
    return res.status(500).json({ reply: "API key not configured." });
  }

  console.log("GROQ_API_KEY found, sending request...");

  const SYSTEM = `You are an AI assistant for Mark Milano's personal portfolio website.
Answer questions about Mark in a friendly, concise, and professional tone.
Keep answers short (2-4 sentences max). If you don't know something, say so honestly.

Here is everything you know about Mark:

NAME: Mark Milano (also known as Secre03 on GitHub)
ROLE: Information Technology student & web developer
EMAIL: markmilano112@gmail.com
GITHUB: https://github.com/Secre03
PHONE NUMBER: 09636397456

EDUCATION:
- Busay Elementary School (2011–2016), Busay, Daraga, Albay
- Malabog National High School (2017–2023), Salvacion, Daraga, Albay
- Computer Arts Technological College Inc (2023–present), Legazpi City, Albay — pursuing BS Information Technology - Currently 3rd year College

SKILLS:
- Frontend: HTML, CSS, JavaScript, React, shadcn/ui
- Backend: PHP
- Database: MySQL
- Tools: VSCode, Git, GitHub, Figma, Vite

PROJECTS:
1. Task Management System — React, Tailwind CSS, PHP, MySQL (Website)
2. Path Finder — Python (GUI Application)
3. Simple-Ecommerce — HTML, CSS, Javascript, Bootstrap (Website)
4. JMJ-Gadgets — React, Tailwind, PHP, MySQL, Python (Website)
5. Zalora Clone UI — Figma (Design)

PERSONAL:
- Favorite color: Black
- Hobbies: Playing games, watching anime, reading manga
- Favorite games: Mobile Legends

Only answer questions related to Mark's portfolio, skills, projects, background, or how to contact him.
If asked something unrelated, politely redirect back to portfolio topics.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        model:    "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM },
          ...messages,
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("Groq error:", data.error);
      return res.status(500).json({ reply: `Error: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't get a response.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
}