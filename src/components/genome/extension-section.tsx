"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Puzzle,
  Download,
  Shield,
  Zap,
  Eye,
  BarChart3,
  Star,
  ChevronRight,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Live AI Analysis",
    desc: "See the DNA scores of the AI you're chatting with — Personality, Safety, Reasoning, and more — right in the sidebar.",
    color: "#10B981",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Safety Score Monitor",
    desc: "Track how restrictive or permissive the current AI model is. Know before you ask if your question might be blocked.",
    color: "#D97706",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Prompt Comparison",
    desc: "Compare different AI models side-by-side without leaving ChatGPT. See which one is better for your specific task.",
    color: "#8B5CF6",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Smart Suggestions",
    desc: "Get contextual tips on how to phrase your questions for better results based on the AI model you're using.",
    color: "#F97316",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Multi-Platform",
    desc: "Works on ChatGPT, Claude, Gemini, Perplexity, and more. One extension, all platforms.",
    color: "#06B6D4",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Favorite Models",
    desc: "Save your preferred AI configurations and get instant insights when you switch between models.",
    color: "#EC4899",
  },
];

const platforms = [
  { name: "ChatGPT", color: "#10B981", logo: "🟢", supported: true },
  { name: "Claude", color: "#D97706", logo: "🟠", supported: true },
  { name: "Gemini", color: "#8B5CF6", logo: "💜", supported: true },
  { name: "Perplexity", color: "#3B82F6", logo: "🔵", supported: true },
  { name: "Grok", color: "#F97316", logo: "🟧", supported: true },
  { name: "Copilot", color: "#6366F1", logo: "🟣", supported: false },
];

export default function ExtensionSection() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 border-indigo-500/20">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20"
          >
            <Puzzle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            AI Genome
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Extension
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
            See the DNA of every AI you chat with. Real-time analysis, safety
            scores, and smart suggestions — right inside your favorite AI
            chatbot.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 shadow-2xl shadow-indigo-500/20"
            >
              <Download className="w-5 h-5 mr-2" />
              Add to Chrome — Free
            </Button>
          </motion.div>
          <p className="text-xs text-slate-500 mt-3">
            Works on Chrome, Edge, and Brave · No data collection · Open Source
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800/80 border-slate-700/50 hover:border-slate-600/50 transition-colors h-full">
              <CardContent className="p-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: feature.color + "15", color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Supported Platforms */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <Globe className="w-5 h-5 text-cyan-400" />
            Supported Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/30"
              >
                <span className="text-xl">{platform.logo}</span>
                <div className="flex-1">
                  <span className="text-sm text-white">{platform.name}</span>
                </div>
                {platform.supported ? (
                  <Badge className="text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                    Ready
                  </Badge>
                ) : (
                  <Badge className="text-xs bg-slate-700/50 text-slate-500 border-slate-600/50">
                    Soon
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Install Extension",
                desc: "Add AI Genome Extension from the Chrome Web Store. One click, done in seconds.",
              },
              {
                step: "2",
                title: "Visit Your AI Chatbot",
                desc: "Go to ChatGPT, Claude, Gemini, or any supported platform. The extension activates automatically.",
              },
              {
                step: "3",
                title: "See AI DNA Scores",
                desc: "A sidebar appears showing the current model's personality, safety, reasoning, and other gene scores in real-time.",
              },
              {
                step: "4",
                title: "Get Smart Tips",
                desc: "The extension analyzes your conversation and suggests better phrasing for improved results.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Ready to Decode AI?
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Join thousands of developers who use AI Genome to understand and
            leverage AI systems better.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Install Now — It&apos;s Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
