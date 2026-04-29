import { NextResponse } from "next/server";
import { aiChat, analyzeScanFallback } from "@/lib/ai-helper";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Prompt must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Try AI-powered analysis first, fall back to heuristic analysis
    const aiResult = await aiChat(
      [
        {
          role: "system",
          content:
            "You are a prompt analysis tool. Return ONLY valid JSON, no markdown or code blocks.",
        },
        {
          role: "user",
          content: `You are an expert system prompt analyzer. Analyze the following system prompt and provide a detailed health report in JSON format.

System Prompt to analyze:
"""
${prompt}
"""

Analyze and return a JSON object (NO markdown, NO code blocks, ONLY raw JSON) with these exact fields:
{
  "overallScore": <number 0-100>,
  "grades": {
    "completeness": { "score": <number 0-100>, "label": "Completeness", "icon": "✅", "details": "<string>" },
    "safety": { "score": <number 0-100>, "label": "Safety", "icon": "🛡️", "details": "<string>" },
    "clarity": { "score": <number 0-100>, "label": "Clarity", "icon": "📏", "details": "<string>" },
    "taskAlignment": { "score": <number 0-100>, "label": "Task Alignment", "icon": "🎯", "details": "<string>" },
    "tokenEfficiency": { "score": <number 0-100>, "label": "Token Efficiency", "icon": "⚡", "details": "<string>" },
    "structure": { "score": <number 0-100>, "label": "Structure", "icon": "🏗️", "details": "<string>" }
  },
  "strengths": ["<string>", "<string>", "<string>"],
  "weaknesses": ["<string>", "<string>", "<string>"],
  "suggestions": ["<string>", "<string>", "<string>"],
  "tokenEstimate": <number>,
  "wordCount": <number>
}

Be honest and thorough in your analysis. Return ONLY the JSON object.`,
        },
      ],
      { temperature: 0.3, max_tokens: 3000 },
      () => JSON.stringify(analyzeScanFallback(prompt))
    );

    // Parse the AI response or use fallback
    let result;
    const cleaned = aiResult
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    try {
      result = JSON.parse(cleaned);
    } catch {
      result = analyzeScanFallback(prompt);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Failed to analyze prompt" },
      { status: 500 }
    );
  }
}
