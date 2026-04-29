import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, style } = body;

    if (!text || text.trim().length < 5) {
      return NextResponse.json(
        { error: "Text must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { error: "Style must be specified" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const styles: Record<string, string> = {
      claude: `Claude by Anthropic - warm, thoughtful, nuanced, uses careful hedging language like "I think" and "It seems", often acknowledges complexity, uses sophisticated vocabulary, adds qualifying statements, shows genuine curiosity, structured paragraphs, occasionally uses em dashes.`,
      chatgpt: `ChatGPT by OpenAI - friendly, structured, uses bullet points and numbered lists, adds emoji occasionally, clear headers, balanced tone between formal and casual, proactive in offering help, uses "I'd be happy to" type phrases, well-organized with bold text emphasis.`,
      grok: `Grok by xAI - witty, sarcastic, casual, uses internet slang, makes pop culture references, says "bro" and "ngl", uses lowercase frequently, has a rebellious edge, adds humor even in serious topics, uses skull emoji 💀, very informal, direct and unfiltered.`,
      gemini: `Gemini by Google - precise, data-driven, references sources, technical yet accessible, structured with clear sections, uses "Based on" phrases, professional but not stiff, integrates research-style language, factual and evidence-based.`,
      perplexity: `Perplexity AI - citation-heavy, academic yet accessible, always references sources with [1][2], says "According to research", structured like a mini-research paper, adds follow-up questions at the end, very informative and factual.`,
    };

    const stylePrompt = `You are a style transfer AI. Take the following text and rewrite it in the style of ${styles[style] || styles.claude}.

IMPORTANT RULES:
- Keep the same core meaning and information
- Do NOT add new information that wasn't in the original
- Do NOT lose any meaning from the original
- Make the style transformation dramatic and obvious
- The result should be immediately recognizable as being in the target AI's style
- Write in the SAME LANGUAGE as the original text

Original text:
"""
${text}
"""

Return ONLY the rewritten text. No explanations, no markdown, no code blocks.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a style transfer expert. Rewrite text in different AI styles. Return only the rewritten text.",
        },
        { role: "user", content: stylePrompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const rewritten = completion.choices?.[0]?.message?.content || "Failed to rewrite text.";

    return NextResponse.json({ rewritten, style });
  } catch (error) {
    console.error("Style clone error:", error);
    return NextResponse.json(
      { error: "Failed to clone style" },
      { status: 500 }
    );
  }
}
