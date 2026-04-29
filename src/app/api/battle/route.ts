import { NextResponse } from "next/server";
import { aiChat } from "@/lib/ai-helper";

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

    const response = await aiChat(
      [
        { role: "system", content: prompt },
        { role: "user", content: question },
      ],
      { temperature: 0.7, max_tokens: 1500 },
      () => `[Simulated Response] Based on the system prompt provided, here is how an AI configured with these instructions would likely respond to: "${question}"\n\nThis is a template-based simulation. Connect an AI backend for live generation.`
    );

    return NextResponse.json({
      response,
      model: "AI Genome Arena",
      tokens: Math.ceil(response.split(/\s+/).length * 1.3),
    });
  } catch (error) {
    console.error("Battle error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
