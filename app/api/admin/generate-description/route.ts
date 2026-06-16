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

    const prompt = `Write a high-converting, professional e-commerce product description for a "${condition}" condition "${productName}" in the "${category}" category. Keep it under 4 short paragraphs. Highlight key benefits. Also, write a 1-sentence SEO meta description. Return ONLY valid JSON in this exact format: {"description": "your description here", "metaDescription": "your short seo snippet here"}`;

    // Broken into pieces so GitHub CANNOT turn it into a Markdown link
    const part1 = "https://generativelanguage.";
    const part2 = "googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
    const finalUrl = part1 + part2 + apiKey;

    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      })
    });

    const aiData = await response.json();
    const rawText = aiData.candidates[0].content.parts[0].text;

    // 🔥 FOOLPROOF FIX: Generate backticks mathematically so GitHub Mobile doesn't see them as Markdown
    const backticks = String.fromCharCode(96, 96, 96);
    const jsonMarker = backticks + 'json';

    const cleanedText = rawText.replaceAll(jsonMarker, '').replaceAll(backticks, '').trim();
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
