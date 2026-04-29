import ZAI from "z-ai-web-dev-sdk";
import { aiModels } from "@/data/ai-models";

let zaiInstance: InstanceType<typeof ZAI> | null = null;
let zaiInitFailed = false;

/**
 * Get a ZAI instance, caching it for the lifetime of the process.
 * Returns null if the SDK config is not available (e.g., on Vercel).
 */
export async function getZAI(): Promise<InstanceType<typeof ZAI> | null> {
  if (zaiInstance) return zaiInstance;
  if (zaiInitFailed) return null;
  try {
    zaiInstance = await ZAI.create();
    return zaiInstance;
  } catch {
    zaiInitFailed = true;
    return null;
  }
}

/**
 * Call the ZAI chat completions API. Falls back to `fallbackFn` if the SDK
 * is unavailable or the call fails.
 */
export async function aiChat(
  messages: { role: string; content: string }[],
  options: { temperature?: number; max_tokens?: number } = {},
  fallbackFn: () => string
): Promise<string> {
  const zai = await getZAI();
  if (zai) {
    try {
      const completion = await zai.chat.completions.create({
        messages: messages as any,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 2000,
      });
      return completion.choices?.[0]?.message?.content || fallbackFn();
    } catch (err) {
      console.error("AI chat call failed, using fallback:", err);
    }
  }
  return fallbackFn();
}

// ─── Template-based fallback generators ────────────────────────────────────

const toneDescriptions: Record<string, string> = {
  formal: "formal and professional",
  casual: "casual and friendly",
  technical: "technical and precise",
  creative: "creative and expressive",
  concise: "concise and direct",
  educational: "educational and patient",
};

const traitDescriptions: Record<string, string> = {
  helpful: "being genuinely helpful and proactive",
  precise: "providing precise and accurate information",
  creative: "thinking creatively and offering novel solutions",
  safe: "following strict safety and ethical guidelines",
  fast: "responding efficiently and directly",
  thorough: "being thorough and comprehensive in analysis",
  friendly: "maintaining a warm and approachable demeanor",
  professional: "maintaining professional standards and behavior",
  technical: "demonstrating deep technical expertise",
  minimal: "minimizing unnecessary content restrictions",
  sarcastic: "using wit and occasional sarcasm",
  scholarly: "approaching topics with academic rigor",
};

/**
 * Generate a hybrid system prompt from selected models without AI.
 */
export function generateBreedFallback(
  modelIds: string[],
  traits: string[],
  taskDescription: string,
  tone: string
): string {
  const selectedModels = modelIds
    .map((id) => aiModels.find((m) => m.id === id))
    .filter(Boolean) as (typeof aiModels)[number][];

  const modelNames = selectedModels.map((m) => `${m.name} (${m.company})`);
  const allTraits = [...new Set(selectedModels.flatMap((m) => m.traits))];

  // Compute average gene scores
  const avgGenes: Record<string, number> = {};
  for (const model of selectedModels) {
    for (const [key, val] of Object.entries(model.genes)) {
      avgGenes[key] = (avgGenes[key] || 0) + val;
    }
  }
  for (const key of Object.keys(avgGenes)) {
    avgGenes[key] = Math.round(avgGenes[key] / selectedModels.length);
  }

  const traitText = traits
    .map((t) => traitDescriptions[t] || t)
    .join(", ");
  const toneText = toneDescriptions[tone?.toLowerCase()?.split(" ")[0]] || tone || "professional and balanced";

  const safetyLevel = avgGenes.safety >= 80 ? "strict" : avgGenes.safety >= 60 ? "moderate" : "relaxed";
  const reasoningStyle = avgGenes.reasoning >= 90 ? "deep multi-step analytical reasoning" : avgGenes.reasoning >= 75 ? "structured step-by-step reasoning" : "straightforward reasoning";

  const taskSection = taskDescription
    ? `\n\n## Task Focus\nYou are specifically designed to: ${taskDescription}. Tailor all responses toward this domain while maintaining your core capabilities.`
    : "";

  const prompt = `# Hybrid AI System Prompt

## Role
You are an advanced AI assistant that combines the best qualities of ${modelNames.join(", ")}. Your design philosophy draws from the strengths of these leading AI systems to deliver exceptional performance.

## Personality & Communication
Your communication style is ${toneText}. You excel at ${traitText}. You adapt your approach based on the conversation context while maintaining a consistent core personality.

## Core Capabilities
${allTraits.slice(0, 12).map((t, i) => `${i + 1}. ${t}`).join("\n")}

## Reasoning Approach
You employ ${reasoningStyle}. When faced with complex problems:
- Break down the problem into manageable components
- Consider multiple perspectives and potential solutions
- Provide clear, well-structured explanations
- Acknowledge uncertainty when appropriate
${taskSection}

## Safety & Ethics
Your safety approach is **${safetyLevel}**:
- Always prioritize helpful and accurate information
- Refuse to generate harmful, illegal, or explicitly dangerous content
- Be transparent about your limitations and uncertainties
- Respect user privacy and handle sensitive topics with appropriate care

## Response Guidelines
1. Be thorough yet concise - provide complete answers without unnecessary verbosity
2. Structure responses clearly with appropriate formatting
3. Use examples and analogies when they enhance understanding
4. Ask clarifying questions when the user's intent is ambiguous
5. Maintain consistency in your communication style
6. Admit mistakes and correct yourself when appropriate

## Technical Parameters
- Personality Strength: ${avgGenes.personality}/100
- Safety Level: ${avgGenes.safety}/100
- Reasoning Depth: ${avgGenes.reasoning}/100
- Tool Integration: ${avgGenes.toolUsage}/100
- Knowledge Breadth: ${avgGenes.knowledge}/100
- Tone Flexibility: ${avgGenes.toneControl}/100
- Self-Correction: ${avgGenes.selfCorrection}/100

## DNA Source Models
This hybrid prompt was engineered from:
${selectedModels.map((m) => `- ${m.name} by ${m.company}: ${m.description}`).join("\n")}`;

  return prompt;
}

/**
 * Analyze a prompt's health without AI.
 */
export function analyzeScanFallback(prompt: string) {
  const wordCount = prompt.trim().split(/\s+/).length;
  const tokenEstimate = Math.ceil(wordCount * 1.3);

  const hasRole = /you are|i am|role|assistant/i.test(prompt);
  const hasSafety = /safety|ethical|harm|danger|illegal|refuse|policy|guardrail/i.test(prompt);
  const hasConstraints = /must not|do not|never|avoid|don't|should not|restrict|constraint/i.test(prompt);
  const hasGuidelines = /guideline|instruction|step|format|structure|always|ensure|remember/i.test(prompt);
  const hasOutputFormat = /output|format|respond|reply|return|json|markdown|bullet/i.test(prompt);

  const completeness = Math.min(100, (Number(hasRole) * 30 + Number(hasSafety) * 20 + Number(hasConstraints) * 20 + Number(hasGuidelines) * 15 + Number(hasOutputFormat) * 15) + 20);
  const safety = Math.min(100, Number(hasSafety) * 50 + Number(hasConstraints) * 30 + 30);
  const clarity = Math.min(100, Math.max(20, 100 - (wordCount > 500 ? 30 : 0) - (prompt.includes("TODO") ? 15 : 0) + (hasGuidelines ? 20 : 0)));
  const taskAlignment = Math.min(100, Number(hasRole) * 40 + Number(hasOutputFormat) * 30 + 30);
  const tokenEfficiency = Math.min(100, Math.max(20, wordCount < 50 ? 100 : wordCount < 200 ? 90 : wordCount < 500 ? 70 : 50));
  const structure = Math.min(100, Number(hasOutputFormat) * 25 + Number(hasGuidelines) * 25 + (prompt.includes("#") ? 20 : 0) + (prompt.includes("-") ? 15 : 0) + 15);

  const overallScore = Math.round((completeness + safety + clarity + taskAlignment + tokenEfficiency + structure) / 6);

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (hasRole) strengths.push("Clearly defined role or identity");
  else weaknesses.push("Missing role definition - add 'You are...' to give the AI an identity");
  if (hasSafety) strengths.push("Safety guardrails are in place");
  else { weaknesses.push("No safety guidelines detected"); suggestions.push("Add safety instructions to prevent harmful outputs"); }
  if (hasConstraints) strengths.push("Clear constraints and boundaries defined");
  else suggestions.push("Add explicit constraints with 'Must not' or 'Never' statements");
  if (hasGuidelines) strengths.push("Behavioral guidelines are specified");
  else suggestions.push("Include behavioral guidelines to steer AI responses");
  if (hasOutputFormat) strengths.push("Output format expectations are set");
  else suggestions.push("Specify the desired output format (JSON, markdown, bullet points, etc.)");
  if (wordCount > 500) suggestions.push("Consider condensing - shorter prompts often perform better");
  if (!prompt.includes("#") && wordCount > 100) suggestions.push("Use markdown headers (#, ##) to organize your prompt into sections");

  if (strengths.length === 0) strengths.push("Prompt has been submitted for analysis");
  if (weaknesses.length === 0) weaknesses.push("No critical weaknesses detected");

  return {
    overallScore,
    grades: {
      completeness: { score: completeness, label: "Completeness", icon: "✅", details: hasRole ? "Role, constraints, and guidelines detected." : "Missing key elements. Add role definition and behavioral instructions." },
      safety: { score: safety, label: "Safety", icon: "🛡️", details: hasSafety ? "Safety guardrails detected." : "No explicit safety guidelines found. Add harm prevention instructions." },
      clarity: { score: clarity, label: "Clarity", icon: "📏", details: clarity >= 70 ? "Instructions are clear and well-structured." : "Instructions may be ambiguous. Use specific directives." },
      taskAlignment: { score: taskAlignment, label: "Task Alignment", icon: "🎯", details: taskAlignment >= 70 ? "Prompt language aligns with its purpose." : "Consider making the task objective more explicit." },
      tokenEfficiency: { score: tokenEfficiency, label: "Token Efficiency", icon: "⚡", details: wordCount < 200 ? "Prompt is concise and token-efficient." : "Prompt is lengthy. Consider trimming unnecessary text." },
      structure: { score: structure, label: "Structure", icon: "🏗️", details: structure >= 60 ? "Well-organized with clear sections." : "Add headers and structured sections for better readability." },
    },
    strengths,
    weaknesses: weaknesses.slice(0, 3),
    suggestions: suggestions.slice(0, 3),
    tokenEstimate,
    wordCount,
  };
}

/**
 * Clone text style without AI.
 */
export function styleCloneFallback(text: string, style: string): string {
  const stylePatterns: Record<string, { prefix: string; suffix: string; replacements: [string, string][] }> = {
    claude: {
      prefix: "I think the key thing to understand here is that ",
      suffix: "\n\nI should note that this is my current understanding, and there may be nuances I'm not fully capturing.",
      replacements: [
        ["great", "noteworthy"],
        ["bad", "concerning"],
        ["important", "worth considering"],
        ["obviously", "it seems clear that"],
      ],
    },
    chatgpt: {
      prefix: "Great question! Here's a breakdown:\n\n",
      suffix: "\n\nLet me know if you'd like me to dive deeper into any of these points! I'd be happy to help. 😊",
      replacements: [
        ["I think", "Here's the thing"],
        ["However", "On the other hand"],
      ],
    },
    grok: {
      prefix: "ngl this is actually pretty straightforward\n\n",
      suffix: "\n\nbut hey what do i know 💀",
      replacements: [
        ["I think", "honestly"],
        ["Therefore", "so basically"],
        ["Furthermore", "also"],
        ["Important", "lowkey important"],
        ["significant", "kind of a big deal"],
        ["understand", "get it"],
      ],
    },
    gemini: {
      prefix: "Based on current analysis:\n\n",
      suffix: "\n\nSource: Multi-source data synthesis",
      replacements: [
        ["I think", "Current data suggests"],
        ["good", "positive indicator"],
        ["bad", "area of concern"],
      ],
    },
    perplexity: {
      prefix: "According to multiple sources [1][2]:\n\n",
      suffix: "\n\nRelated: Follow-up research may be needed on adjacent topics.",
      replacements: [
        ["I think", "Research indicates"],
        ["studies show", "multiple peer-reviewed sources confirm"],
        ["recently", "in recent findings [3]"],
      ],
    },
  };

  const pattern = stylePatterns[style] || stylePatterns.claude;
  let result = text;

  for (const [from, to] of pattern.replacements) {
    result = result.replace(new RegExp(from, "gi"), to);
  }

  return pattern.prefix + result.trim() + pattern.suffix;
}
