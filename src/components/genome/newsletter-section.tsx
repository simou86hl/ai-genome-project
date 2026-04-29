"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Newspaper,
  TrendingDown,
  TrendingUp,
  Minus,
  Flame,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const weeklyReport = {
  issue: 12,
  date: "2026-04-29",
  coverModel: "Claude Opus 4.7",
  summary:
    "This week saw significant safety score adjustments across Anthropic models, while Grok continued pushing the envelope with minimal censorship. Google's Gemini 3.1 Pro made quiet but impactful changes to its grounding system.",
  changes: [
    {
      model: "Claude Opus 4.7",
      company: "Anthropic",
      logo: "🟠",
      color: "#D97706",
      changes: [
        { metric: "Safety", before: 95, after: 90, direction: "down" as const },
        { metric: "Reasoning", before: 94, after: 96, direction: "up" as const },
        { metric: "Self-Correction", before: 91, after: 93, direction: "up" as const },
      ],
      notes: "Refined safety guidelines to be less restrictive on creative tasks while maintaining core safety principles.",
    },
    {
      model: "ChatGPT GPT-5.5",
      company: "OpenAI",
      logo: "🟢",
      color: "#10B981",
      changes: [
        { metric: "Tool Usage", before: 88, after: 92, direction: "up" as const },
        { metric: "Tone Control", before: 84, after: 88, direction: "up" as const },
      ],
      notes: "Expanded tool ecosystem with new deep research integration. Improved tone flexibility for different contexts.",
    },
    {
      model: "Grok 4.2",
      company: "xAI",
      logo: "🟧",
      color: "#F97316",
      changes: [
        { metric: "Personality", before: 93, after: 95, direction: "up" as const },
        { metric: "Safety", before: 45, after: 40, direction: "down" as const },
        { metric: "Reasoning", before: 83, after: 87, direction: "up" as const },
      ],
      notes: "Amplified personality traits and further reduced content filters. Reasoning improvements focused on multi-step analysis.",
    },
    {
      model: "Gemini 3.1 Pro",
      company: "Google",
      logo: "💜",
      color: "#8B5CF6",
      changes: [
        { metric: "Knowledge", before: 93, after: 96, direction: "up" as const },
        { metric: "Tool Usage", before: 83, after: 87, direction: "up" as const },
      ],
      notes: "Enhanced Google Search grounding with better source verification. Improved tool orchestration for complex queries.",
    },
  ],
  trends: [
    { text: "Safety scores dropping across major models", trend: "down" as const },
    { text: "Tool usage capabilities expanding rapidly", trend: "up" as const },
    { text: "Personality traits becoming more defined", trend: "up" as const },
    { text: "Token efficiency improving in newer models", trend: "up" as const },
  ],
  topChanged: [
    { rank: 1, model: "Grok 4.2", company: "xAI", score: -8, logo: "🟧" },
    { rank: 2, model: "Claude Opus 4.7", company: "Anthropic", score: -5, logo: "🟠" },
    { rank: 3, model: "ChatGPT GPT-5.5", company: "OpenAI", score: +8, logo: "🟢" },
    { rank: 4, model: "Gemini 3.1 Pro", company: "Google", score: +7, logo: "💜" },
    { rank: 5, model: "Grok 4", company: "xAI", score: +2, logo: "🟠" },
  ],
};

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim().includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Newspaper className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                AI Genome Weekly #{weeklyReport.issue}
              </h3>
              <p className="text-sm text-slate-400">{weeklyReport.date}</p>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            {weeklyReport.summary}
          </p>
        </CardContent>
      </Card>

      {/* Model Changes */}
      <div className="space-y-4">
        {weeklyReport.changes.map((model, index) => (
          <motion.div
            key={model.model}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800/80 border-slate-700/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{model.logo}</span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {model.model}
                    </h4>
                    <p className="text-xs text-slate-500">{model.company}</p>
                  </div>
                </div>

                {/* Score Changes */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {model.changes.map((change) => (
                    <div
                      key={change.metric}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        backgroundColor:
                          change.direction === "up"
                            ? "#10B98115"
                            : "#F8717115",
                        color:
                          change.direction === "up" ? "#34d399" : "#f87171",
                      }}
                    >
                      {change.direction === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {change.metric} {change.before} → {change.after}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {model.notes}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Industry Trends */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <Zap className="w-5 h-5 text-amber-400" />
            Industry Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyReport.trends.map((trend) => (
              <div key={trend.text} className="flex items-center gap-2">
                {trend.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <span className="text-sm text-slate-300">{trend.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Changed Leaderboard */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <ArrowUpRight className="w-5 h-5 text-purple-400" />
            Most Changed This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyReport.topChanged.map((item) => (
              <div
                key={item.rank}
                className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50"
              >
                <span className="text-sm font-bold text-slate-500 w-6 text-center">
                  #{item.rank}
                </span>
                <span className="text-lg">{item.logo}</span>
                <span className="text-sm text-white flex-1">
                  {item.model}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    color: item.score >= 0 ? "#34d399" : "#f87171",
                    borderColor:
                      item.score >= 0
                        ? "rgba(52,211,153,0.3)"
                        : "rgba(248,113,113,0.3)",
                  }}
                >
                  {item.score >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {item.score > 0 ? "+" : ""}
                  {item.score}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscribe */}
      <Card className="bg-gradient-to-br from-cyan-950/30 via-slate-900 to-purple-950/30 border-cyan-500/20">
        <CardContent className="p-6 text-center">
          <Newspaper className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Get Weekly AI Genome Reports
          </h3>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            Subscribe to receive weekly analysis of how AI system prompts are
            evolving, trend reports, and competitive insights.
          </p>
          {!subscribed ? (
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={handleSubscribe}
                  disabled={!email.includes("@")}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  Subscribe
                </Button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-1.5">
                Subscribed! Check your inbox.
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
