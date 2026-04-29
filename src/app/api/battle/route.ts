import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, question } = body;

    if (!prompt || !question) {
      return NextResponse.json(
        { error: "Both prompt and question are required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: question },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({
      response,
      model: "AI Genome Arena",
      tokens: completion.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error("Battle error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
