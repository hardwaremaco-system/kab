import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productName, category, condition } = await req.json();

    if (!productName) {
      return NextResponse.json({ success: false, error: "Product name is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Server missing AI API Key" }, { status: 500 });
    }

    // A prompt engineered to sound like a professional e-commerce store
    const prompt = `Write a high-converting, professional e-commerce product description for a "${condition}" condition "${productName}" in the "${category}" category. Keep it under 4 short paragraphs. Highlight key benefits. Also, write a 1-sentence SEO meta description. Return ONLY valid JSON in this exact format: {"description": "your description here", "metaDescription": "your short seo snippet here"}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      })
    });

    const aiData = await response.json();
    
    // Extract the raw text from Google's response
    const rawText = aiData.candidates[0].content.parts[0].text;
    
    // Parse the JSON out of the AI's response (removing markdown code blocks if any)
    const cleanedText = rawText.replace(/```json/g, '').replace(/
```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json({
      success: true,
      description: parsedData.description,
      metaDescription: parsedData.metaDescription
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate AI content" }, { status: 500 });
  }
}
