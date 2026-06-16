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

    const prompt = `Write a professional e-commerce product description for a "${condition}" condition "${productName}" in the "${category}" category. Keep it under 4 short paragraphs. Also, write a 1-sentence SEO meta description. Return JSON with keys: "description" and "metaDescription".`;

    // 🔥 FIXED: Updated from the retired 1.5 model to Google's active 'gemini-2.5-flash' model
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          // This forces Google to return pure JSON. No markdown, no crashing!
          response_mime_type: "application/json", 
        }
      })
    });

    const aiData = await response.json();

    // If Google returns an error, catch it safely!
    if (!response.ok || aiData.error) {
      console.error("Google AI Error:", aiData.error);
      return NextResponse.json({ success: false, error: aiData.error?.message || "AI API Error" }, { status: 500 });
    }

    // Safely extract the text
    const rawText = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) {
      throw new Error("AI returned an empty response.");
    }

    const parsedData = JSON.parse(rawText);

    return NextResponse.json({
      success: true,
      description: parsedData.description,
      metaDescription: parsedData.metaDescription
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to generate AI content" }, { status: 500 });
  }
}
