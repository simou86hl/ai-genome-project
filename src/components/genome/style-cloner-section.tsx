"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

const aiStyles = [
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    color: "#D97706",
    logo: "🟠",
    example: "That's a really thoughtful question. I'd say it depends on several factors, but generally speaking...",
    desc: "Warm, nuanced, hedging, sophisticated",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    color: "#10B981",
    logo: "🟢",
    example: "Great question! Here's what I think:\n\n**Key Points:**\n1. First point here\n2. Second point here",
    desc: "Structured, friendly, uses bullets & emojis",
  },
  {
    id: "grok",
    name: "Grok",
    company: "xAI",
    color: "#F97316",
    logo: "🟧",
    example: "ngl that's actually a solid question. Bro the answer is kinda wild but basically...",
    desc: "Witty, sarcastic, casual, slang",
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    color: "#8B5CF6",
    logo: "💜",
    example: "Based on the available data and research findings, the analysis indicates several key trends...",
    desc: "Precise, data-driven, academic",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    color: "#3B82F6",
    logo: "🔵",
    example: "According to recent research [1], the evidence suggests that this is indeed the case. As noted by Smith et al. [2]...",
    desc: "Citation-heavy, research-style",
  },
];

export default function StyleClonerSection() {
  const [text, setText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [cloneAll, setCloneAll] = useState(false);

  const handleClone = async (styleId: string) => {
    if (text.trim().length < 5 || !styleId) return;
    setIsCloning(true);

    try {
      const response = await fetch("/api/style-clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), style: styleId }),
      });

      const data = await response.json();
      if (data.rewritten) {
        setResults((prev) => ({ ...prev, [styleId]: data.rewritten }));
      }
    } catch {
      // silent
    } finally {
      setIsCloning(false);
    }
  };

  const handleCloneAll = async () => {
    setCloneAll(true);
    for (const style of aiStyles) {
      await handleClone(style.id);
    }
    setCloneAll(false);
  };

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Enter Text to Clone
            </h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Write any text in any language, then choose an AI style to rewrite
            it in that AI&apos;s unique voice!
          </p>
          <Textarea
            placeholder="Type anything here... e.g., 'The weather is really hot today' or 'I think pizza is the best food'"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 min-h-[120px]"
          />
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleCloneAll}
                disabled={text.trim().length < 5 || cloneAll}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 disabled:opacity-50 w-full sm:w-auto"
              >
                {cloneAll ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Cloning All Styles...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Clone All 5 Styles
                  </>
                )}
              </Button>
            </motion.div>
            <span className="text-xs text-slate-500">
              Or click individual styles below
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiStyles.map((style) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800/80 border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: style.color + "20" }}
                  >
                    {style.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">
                      {style.name}
                    </h4>
                    <p className="text-xs text-slate-500">{style.company}</p>
                  </div>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: style.color + "15",
                      color: style.color,
                      borderColor: style.color + "30",
                    }}
                    variant="outline"
                  >
                    {style.desc.split(",")[0]}
                  </Badge>
                </div>

                {/* Example */}
                <p className="text-xs text-slate-500 mb-3 italic line-clamp-2">
                  &quot;{style.example}&quot;
                </p>

                {/* Clone Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClone(style.id)}
                  disabled={text.trim().length < 5 || isCloning}
                  className="w-full border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-50"
                >
                  {isCloning && selectedStyle === style.id ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-1.5" />
                  )}
                  Clone Style
                </Button>

                {/* Result */}
                <AnimatePresence>
                  {results[style.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {results[style.id]}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleCopy(style.id, results[style.id])
                          }
                          className="mt-2 text-xs text-slate-500 hover:text-white"
                        >
                          {copiedKey === style.id ? (
                            <>
                              <Check className="w-3 h-3 mr-1" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
