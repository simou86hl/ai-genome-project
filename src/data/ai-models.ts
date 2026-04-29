export interface AIGenome {
  id: string;
  name: string;
  company: string;
  color: string;
  logo: string;
  version: string;
  genes: {
    personality: number;    // 0-100: how defined is the personality
    safety: number;         // 0-100: safety/restriction level
    reasoning: number;      // 0-100: reasoning depth
    toolUsage: number;      // 0-100: tool integration level
    knowledge: number;      // 0-100: knowledge boundary breadth
    toneControl: number;    // 0-100: tone/style flexibility
    selfCorrection: number; // 0-100: self-correction capability
  };
  traits: string[];
  description: string;
  promptLength: string;
  releaseDate: string;
}

export const aiModels: AIGenome[] = [
  {
    id: "claude-opus-4.7",
    name: "Claude Opus 4.7",
    company: "Anthropic",
    color: "#D97706",
    logo: "🟠",
    version: "4.7",
    genes: {
      personality: 92,
      safety: 95,
      reasoning: 96,
      toolUsage: 88,
      knowledge: 90,
      toneControl: 94,
      selfCorrection: 93,
    },
    traits: [
      "Constitutional AI Ethics",
      "Deep Analytical Reasoning",
      "Multi-step Planning",
      "Code Generation",
      "Research Assistance",
      "Careful Harm Avoidance",
    ],
    description:
      "Anthropic's most capable model with Constitutional AI principles. Extremely strong safety guardrails combined with exceptional reasoning abilities. Known for being thorough and self-aware.",
    promptLength: "~24K tokens",
    releaseDate: "2026",
  },
  {
    id: "claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    company: "Anthropic",
    color: "#F59E0B",
    logo: "🟡",
    version: "4.6",
    genes: {
      personality: 85,
      safety: 90,
      reasoning: 88,
      toolUsage: 82,
      knowledge: 85,
      toneControl: 88,
      selfCorrection: 86,
    },
    traits: [
      "Balanced Performance",
      "Constitutional AI",
      "Fast Response",
      "Code Understanding",
      "Adaptive Tone",
      "Safety First",
    ],
    description:
      "The balanced workhorse of Anthropic's lineup. Strong safety principles with excellent reasoning, optimized for real-world tasks where speed and quality need to coexist.",
    promptLength: "~18K tokens",
    releaseDate: "2026",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    company: "Anthropic",
    color: "#EF4444",
    logo: "🔴",
    version: "latest",
    genes: {
      personality: 75,
      safety: 70,
      reasoning: 94,
      toolUsage: 97,
      knowledge: 82,
      toneControl: 72,
      selfCorrection: 91,
    },
    traits: [
      "Git Integration",
      "Terminal Commands",
      "File System Operations",
      "Code Refactoring",
      "Test Generation",
      "Agentic Workflows",
    ],
    description:
      "Anthropic's coding agent designed to work inside developer environments. Extremely tool-heavy with deep git and filesystem integration. The most agentic Anthropic model.",
    promptLength: "~20K tokens",
    releaseDate: "2025",
  },
  {
    id: "chatgpt-5.5",
    name: "ChatGPT GPT-5.5",
    company: "OpenAI",
    color: "#10B981",
    logo: "🟢",
    version: "5.5",
    genes: {
      personality: 88,
      safety: 85,
      reasoning: 92,
      toolUsage: 90,
      knowledge: 94,
      toneControl: 86,
      selfCorrection: 84,
    },
    traits: [
      "Multi-modal Understanding",
      "Web Search Integration",
      "DALL-E Generation",
      "Plugin Ecosystem",
      "Memory Features",
      "Custom Instructions",
    ],
    description:
      "OpenAI's flagship conversational AI with broad capabilities. Strong tool integration and knowledge breadth. Balanced approach between safety and capability with extensive plugin support.",
    promptLength: "~15K tokens",
    releaseDate: "2026",
  },
  {
    id: "chatgpt-codex",
    name: "ChatGPT Codex",
    company: "OpenAI",
    color: "#14B8A6",
    logo: "🩵",
    version: "latest",
    genes: {
      personality: 60,
      safety: 75,
      reasoning: 90,
      toolUsage: 95,
      knowledge: 78,
      toneControl: 65,
      selfCorrection: 88,
    },
    traits: [
      "Code-first Design",
      "Sandbox Execution",
      "Auto-debugging",
      "Multi-file Editing",
      "GitHub Integration",
      "Autonomous Coding",
    ],
    description:
      "OpenAI's coding agent that lives in a sandbox environment. Highly focused on code generation with autonomous execution capabilities and deep development workflow integration.",
    promptLength: "~12K tokens",
    releaseDate: "2025",
  },
  {
    id: "deep-research",
    name: "Deep Research",
    company: "OpenAI",
    color: "#06B6D4",
    logo: "🔷",
    version: "latest",
    genes: {
      personality: 55,
      safety: 80,
      reasoning: 98,
      toolUsage: 92,
      knowledge: 96,
      toneControl: 70,
      selfCorrection: 90,
    },
    traits: [
      "Extended Web Research",
      "Source Aggregation",
      "Citation Generation",
      "Multi-step Analysis",
      "Report Writing",
      "Autonomous Browsing",
    ],
    description:
      "Specialized research agent that performs autonomous web research over extended periods. Excels at deep analysis, source synthesis, and generating comprehensive reports with citations.",
    promptLength: "~10K tokens",
    releaseDate: "2025",
  },
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    company: "Google",
    color: "#8B5CF6",
    logo: "💜",
    version: "3.1",
    genes: {
      personality: 80,
      safety: 88,
      reasoning: 87,
      toolUsage: 85,
      knowledge: 95,
      toneControl: 82,
      selfCorrection: 80,
    },
    traits: [
      "Google Search Integration",
      "Multi-modal Input",
      "Google Workspace",
      "Context Window (1M+)",
      "Grounding with Search",
      "YouTube Understanding",
    ],
    description:
      "Google's premium Gemini model with deep integration into Google services. Largest context window in the industry and strong grounding capabilities with real-time search.",
    promptLength: "~14K tokens",
    releaseDate: "2026",
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    company: "Google",
    color: "#A78BFA",
    logo: "🟣",
    version: "3",
    genes: {
      personality: 70,
      safety: 82,
      reasoning: 78,
      toolUsage: 75,
      knowledge: 88,
      toneControl: 76,
      selfCorrection: 74,
    },
    traits: [
      "Ultra-fast Responses",
      "Cost Efficient",
      "Google Integration",
      "Multi-modal",
      "Function Calling",
      "High Throughput",
    ],
    description:
      "Google's lightweight model optimized for speed and cost. Good integration with Google ecosystem while maintaining solid reasoning capabilities at a fraction of the cost.",
    promptLength: "~8K tokens",
    releaseDate: "2026",
  },
  {
    id: "grok-4.2",
    name: "Grok 4.2",
    company: "xAI",
    color: "#F97316",
    logo: "🟧",
    version: "4.2",
    genes: {
      personality: 95,
      safety: 45,
      reasoning: 85,
      toolUsage: 78,
      knowledge: 86,
      toneControl: 92,
      selfCorrection: 70,
    },
    traits: [
      "Rebellious Personality",
      "Real-time X/Twitter Data",
      "Witty & Sarcastic Tone",
      "Minimal Censorship",
      "Meme Culture",
      "Unfiltered Opinions",
    ],
    description:
      "xAI's model with a deliberately rebellious personality. Lowest safety guardrails among major AIs, integrated with real-time X/Twitter data. Known for humor and minimal content restrictions.",
    promptLength: "~10K tokens",
    releaseDate: "2026",
  },
  {
    id: "grok-4",
    name: "Grok 4",
    company: "xAI",
    color: "#FB923C",
    logo: "🟠",
    version: "4",
    genes: {
      personality: 90,
      safety: 50,
      reasoning: 82,
      toolUsage: 72,
      knowledge: 83,
      toneControl: 88,
      selfCorrection: 68,
    },
    traits: [
      "Distinctive Voice",
      "X Platform Access",
      "Casual Conversations",
      "Controversial Topics",
      "Pop Culture Knowledge",
      "Reduced Filtering",
    ],
    description:
      "The original Grok with its signature rebellious personality. Integrated with the X platform for real-time information access with intentionally looser content policies.",
    promptLength: "~9K tokens",
    releaseDate: "2025",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    color: "#3B82F6",
    logo: "🔵",
    version: "latest",
    genes: {
      personality: 65,
      safety: 80,
      reasoning: 83,
      toolUsage: 88,
      knowledge: 92,
      toneControl: 78,
      selfCorrection: 82,
    },
    traits: [
      "Citation-first Design",
      "Real-time Web Search",
      "Source Transparency",
      "Academic Style",
      "Follow-up Questions",
      "Focused Research",
    ],
    description:
      "Search-first AI assistant that prioritizes sourcing and citations. Every response is grounded in real web sources with transparent references, designed for research-oriented users.",
    promptLength: "~7K tokens",
    releaseDate: "2025",
  },
];

export const geneLabels: Record<string, { label: string; icon: string; description: string }> = {
  personality: {
    label: "Personality",
    icon: "🎭",
    description: "How strongly defined and consistent the AI's personality is",
  },
  safety: {
    label: "Safety Level",
    icon: "🛡️",
    description: "How strict the content restrictions and safety guardrails are",
  },
  reasoning: {
    label: "Reasoning",
    icon: "🧩",
    description: "Depth of analytical and multi-step reasoning capabilities",
  },
  toolUsage: {
    label: "Tool Usage",
    icon: "🔧",
    description: "Level of integration with external tools and APIs",
  },
  knowledge: {
    label: "Knowledge",
    icon: "🌍",
    description: "Breadth and depth of accessible knowledge base",
  },
  toneControl: {
    label: "Tone Control",
    icon: "💬",
    description: "Flexibility and range of conversational tone and style",
  },
  selfCorrection: {
    label: "Self-Correction",
    icon: "🔄",
    description: "Ability to recognize and correct its own mistakes",
  },
};

export const geneKeys = Object.keys(geneLabels) as (keyof AIGenome["genes"])[];
