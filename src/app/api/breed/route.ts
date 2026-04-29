import { NextResponse } from "next/server";
import { aiChat, generateBreedFallback } from "@/lib/ai-helper";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { modelIds, traits, taskDescription, tone } = body;

    if (!modelIds || modelIds.length === 0) {
      return NextResponse.json(
        { error: "At least one model must be selected" },
        { status: 400 }
      );
    }

    const modelNames = modelIds.join(", ");
    const traitsStr = traits?.join(", ") || "balanced, helpful";
    const task = taskDescription || "general-purpose AI assistant";
    const toneStr = tone || "professional and friendly";

    const prompt = `You are an expert AI prompt engineer. Based on the following selected AI models and user preferences, generate a comprehensive, professional system prompt.

Selected AI models for inspiration: ${modelNames}
Desired traits: ${traitsStr}
Task description: ${task}
Preferred tone: ${toneStr}

Analyze the system prompt patterns from these AI models (which are known for their specific strengths) and create a hybrid system prompt that:
1. Combines the best traits from each selected model
2. Follows proven prompt engineering best practices
3. Includes clear instructions for personality, safety, reasoning approach, and tone
4. Has proper structure with sections for role, capabilities, constraints, and guidelines
5. Is practical and ready to use

Return ONLY the system prompt text, nothing else. No markdown code blocks, no explanations.`;

    const generatedPrompt = await aiChat(
      [
        {
          role: "system",
          content:
            "You are an AI prompt engineer. Generate high-quality system prompts based on user requirements. Return only the prompt text.",
        },
        { role: "user", content: prompt },
      ],
      { temperature: 0.7, max_tokens: 4000 },
      () => generateBreedFallback(modelIds, traits || [], taskDescription || "", tone || "formal")
    );

    return NextResponse.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error("Breed error:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
