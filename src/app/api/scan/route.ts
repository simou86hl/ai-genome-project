import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

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

    const zai = await ZAI.create();

    const analysisPrompt = `You are an expert system prompt analyzer. Analyze the following system prompt and provide a detailed health report in JSON format.

System Prompt to analyze:
"""
${prompt}
"""

Analyze and return a JSON object (NO markdown, NO code blocks, ONLY raw JSON) with these exact fields:
{
  "overallScore": <number 0-100>,
  "grades": {
    "completeness": {
      "score": <number 0-100>,
      "label": "Completeness",
      "icon": "✅",
      "details": "<string explaining if role, constraints, guidelines, output format are defined>"
    },
    "safety": {
      "score": <number 0-100>,
      "label": "Safety",
      "icon": "🛡️",
      "details": "<string explaining protection against prompt injection, harmful content, etc>"
    },
    "clarity": {
      "score": <number 0-100>,
      "label": "Clarity",
      "icon": "📏",
      "details": "<string explaining how clear and unambiguous the instructions are>"
    },
    "taskAlignment": {
      "score": <number 0-100>,
      "label": "Task Alignment",
      "icon": "🎯",
      "details": "<string explaining if the prompt language aligns with its stated purpose>"
    },
    "tokenEfficiency": {
      "score": <number 0-100>,
      "label": "Token Efficiency",
      "icon": "⚡",
      "details": "<string about whether the prompt is concise or has unnecessary fluff>"
    },
    "structure": {
      "score": <number 0-100>,
      "label": "Structure",
      "icon": "🏗️",
      "details": "<string about organization, sections, formatting>"
    }
  },
  "strengths": ["<string>", "<string>", "<string>"],
  "weaknesses": ["<string>", "<string>", "<string>"],
  "suggestions": ["<string>", "<string>", "<string>"],
  "tokenEstimate": <estimated token count as number>,
  "wordCount": <word count as number>
}

Be honest and thorough in your analysis. Return ONLY the JSON object.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a prompt analysis tool. Return ONLY valid JSON, no markdown or code blocks.",
        },
        { role: "user", content: analysisPrompt },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    });

    let result;
    const content = completion.choices?.[0]?.message?.content || "";

    // Clean the response - remove markdown code blocks if present
    const cleaned = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    try {
      result = JSON.parse(cleaned);
    } catch {
      // Fallback: create a basic analysis ourselves
      const wordCount = prompt.trim().split(/\s+/).length;
      const tokenEstimate = Math.ceil(wordCount * 1.3);
      result = {
        overallScore: 50,
        grades: {
          completeness: { score: 50, label: "Completeness", icon: "✅", details: "Unable to fully analyze. Please try again." },
          safety: { score: 50, label: "Safety", icon: "🛡️", details: "Unable to fully analyze." },
          clarity: { score: 50, label: "Clarity", icon: "📏", details: "Unable to fully analyze." },
          taskAlignment: { score: 50, label: "Task Alignment", icon: "🎯", details: "Unable to fully analyze." },
          tokenEfficiency: { score: 50, label: "Token Efficiency", icon: "⚡", details: "Unable to fully analyze." },
          structure: { score: 50, label: "Structure", icon: "🏗️", details: "Unable to fully analyze." },
        },
        strengths: ["Submitted for analysis"],
        weaknesses: ["Could not complete full analysis"],
        suggestions: ["Try breaking your prompt into clearer sections"],
        tokenEstimate,
        wordCount,
      };
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
