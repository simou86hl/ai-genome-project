export interface EvolutionEvent {
  date: string;
  company: string;
  model: string;
  version: string;
  color: string;
  changes: string[];
}

export const evolutionTimeline: EvolutionEvent[] = [
  {
    date: "2024-03",
    company: "Anthropic",
    model: "Claude 3",
    version: "3.0",
    color: "#D97706",
    changes: [
      "First constitutional AI framework",
      "Basic safety guidelines",
      "Limited tool usage",
      "Simple personality constraints",
    ],
  },
  {
    date: "2024-06",
    company: "OpenAI",
    model: "GPT-4o",
    version: "4o",
    color: "#10B981",
    changes: [
      "Multi-modal capabilities added",
      "Web browsing integration",
      "Enhanced safety filters",
      "Plugin ecosystem launched",
    ],
  },
  {
    date: "2024-09",
    company: "Google",
    model: "Gemini 1.5",
    version: "1.5",
    color: "#8B5CF6",
    changes: [
      "1M token context window",
      "Google Search grounding",
      "Multi-modal input",
      "Workspace integration",
    ],
  },
  {
    date: "2024-12",
    company: "Anthropic",
    model: "Claude 3.5 Sonnet",
    version: "3.5",
    color: "#F59E0B",
    changes: [
      "Improved reasoning capabilities",
      "Extended tool support",
      "Better self-correction",
      "Code generation enhancements",
    ],
  },
  {
    date: "2025-03",
    company: "xAI",
    model: "Grok",
    version: "2.0",
    color: "#F97316",
    changes: [
      "X/Twitter real-time data",
      "Rebellious personality trait",
      "Minimal content filtering",
      "Meme culture integration",
    ],
  },
  {
    date: "2025-06",
    company: "OpenAI",
    model: "ChatGPT Codex",
    version: "1.0",
    color: "#14B8A6",
    changes: [
      "Sandbox code execution",
      "Git integration",
      "Autonomous coding agent",
      "File system operations",
    ],
  },
  {
    date: "2025-09",
    company: "Anthropic",
    model: "Claude Code",
    version: "1.0",
    color: "#EF4444",
    changes: [
      "Full agentic coding workflows",
      "Terminal command execution",
      "Multi-file editing",
      "Auto-test generation",
    ],
  },
  {
    date: "2025-12",
    company: "OpenAI",
    model: "GPT-5",
    version: "5.0",
    color: "#10B981",
    changes: [
      "Deep Research mode",
      "Extended reasoning chains",
      "Enhanced memory system",
      "Better tool orchestration",
    ],
  },
  {
    date: "2026-01",
    company: "Google",
    model: "Gemini 3",
    version: "3.0",
    color: "#8B5CF6",
    changes: [
      "Gemini CLI introduced",
      "Function calling v2",
      "Improved grounding",
      "Enhanced code assistance",
    ],
  },
  {
    date: "2026-03",
    company: "xAI",
    model: "Grok",
    version: "4.0",
    color: "#FB923C",
    changes: [
      "Reasoning improvements",
      "Better X integration",
      "Image understanding",
      "Expanded personality range",
    ],
  },
  {
    date: "2026-04",
    company: "Anthropic",
    model: "Claude Opus 4.6",
    version: "4.6",
    color: "#D97706",
    changes: [
      "~24K token system prompt",
      "Advanced planning abilities",
      "Enhanced safety protocols",
      "Improved self-awareness",
    ],
  },
  {
    date: "2026-04",
    company: "Anthropic",
    model: "Claude Sonnet 4.6",
    version: "4.6",
    color: "#F59E0B",
    changes: [
      "Balanced performance upgrade",
      "Faster response times",
      "Better tool coordination",
      "Improved code analysis",
    ],
  },
  {
    date: "2026-04",
    company: "OpenAI",
    model: "ChatGPT GPT-5.5",
    version: "5.5",
    color: "#10B981",
    changes: [
      "Thinking mode enhancement",
      "Better multi-modal fusion",
      "Extended tool ecosystem",
      "Improved safety alignment",
    ],
  },
  {
    date: "2026-04",
    company: "Google",
    model: "Gemini 3.1 Pro",
    version: "3.1",
    color: "#8B5CF6",
    changes: [
      "Pro-level reasoning",
      "Deep Google integration",
      "Enhanced multimodal",
      "Improved accuracy",
    ],
  },
  {
    date: "2026-04",
    company: "xAI",
    model: "Grok 4.2",
    version: "4.2",
    color: "#F97316",
    changes: [
      "Improved reasoning depth",
      "Better knowledge synthesis",
      "Extended personality modes",
      "Enhanced X platform tools",
    ],
  },
];
