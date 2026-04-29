"use client";

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from "@/components/genome/hero-section";
import RadarSection from "@/components/genome/radar-section";
import BreederSection from "@/components/genome/breeder-section";
import TimelineSection from "@/components/genome/timeline-section";
import { motion } from "framer-motion";
import {
  Dna,
  Zap,
  Clock,
  FlaskConical,
  Github,
  Heart,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hero");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    const tabMap: Record<string, string> = {
      radar: "radar",
      breeder: "breeder",
      timeline: "timeline",
    };
    setActiveTab(tabMap[section] || "radar");
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <HeroSection onNavigate={handleNavigate} />

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl h-auto">
              <TabsTrigger
                value="radar"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 rounded-lg text-slate-400 transition-all"
              >
                <Zap className="w-4 h-4 hidden sm:block" />
                <span className="text-sm font-medium">DNA Radar</span>
              </TabsTrigger>
              <TabsTrigger
                value="breeder"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-400 rounded-lg text-slate-400 transition-all"
              >
                <Dna className="w-4 h-4 hidden sm:block" />
                <span className="text-sm font-medium">Prompt Breeder</span>
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-cyan-500/15 data-[state=active]:text-cyan-400 rounded-lg text-slate-400 transition-all"
              >
                <Clock className="w-4 h-4 hidden sm:block" />
                <span className="text-sm font-medium">Evolution</span>
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-400 rounded-lg text-slate-400 transition-all"
              >
                <FlaskConical className="w-4 h-4 hidden sm:block" />
                <span className="text-sm font-medium">About</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="radar">
              <RadarSection />
            </TabsContent>
            <TabsContent value="breeder">
              <BreederSection />
            </TabsContent>
            <TabsContent value="timeline">
              <TimelineSection />
            </TabsContent>
            <TabsContent value="about">
              <AboutSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Dna className="w-4 h-4 text-emerald-500" />
            <span>AI Genome Project</span>
            <span className="mx-2">·</span>
            <span>Built with data from system_prompts_leaks</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/asgeirtj/system_prompts_leaks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
            <span className="text-xs text-slate-600">
              Made with <Heart className="w-3 h-3 inline text-red-500" /> and curiosity
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-6">
      {/* What is this */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-amber-400" />
          What is AI Genome Project?
        </h3>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Every AI chatbot has a hidden instruction set called a{" "}
            <strong className="text-emerald-400">System Prompt</strong> — this is
            the &quot;DNA&quot; that defines its personality, safety rules,
            reasoning approach, and how it interacts with the world. These
            prompts are usually secret, but they can be extracted through clever
            techniques.
          </p>
          <p>
            The AI Genome Project analyzes these leaked system prompts from
            major AI companies — OpenAI, Anthropic, Google, xAI, and Perplexity
            — and breaks them down into 7 measurable &quot;genes&quot; or
            traits. Think of it as sequencing the genome of artificial
            intelligence.
          </p>
        </div>
      </div>

      {/* The 7 Genes */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">The 7 AI Genes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: "🎭",
              name: "Personality",
              desc: "How strongly defined and consistent the AI's personality is — from Claude's warm thoughtfulness to Grok's rebellious humor.",
            },
            {
              icon: "🛡️",
              name: "Safety Level",
              desc: "The strictness of content restrictions. Anthropic leads with Constitutional AI, while Grok takes a deliberately permissive approach.",
            },
            {
              icon: "🧩",
              name: "Reasoning",
              desc: "Depth of analytical capabilities. Specialized research agents like Deep Research score highest in multi-step reasoning.",
            },
            {
              icon: "🔧",
              name: "Tool Usage",
              desc: "Integration with external tools — from Claude Code's terminal access to Perplexity's web search and citation system.",
            },
            {
              icon: "🌍",
              name: "Knowledge",
              desc: "Breadth of accessible knowledge. Models with real-time search and large context windows score highest.",
            },
            {
              icon: "💬",
              name: "Tone Control",
              desc: "Flexibility of conversational style — how easily the AI can shift between formal, casual, technical, and creative tones.",
            },
            {
              icon: "🔄",
              name: "Self-Correction",
              desc: "Ability to recognize mistakes, backtrack, and improve. Coding agents tend to excel at this through iterative debugging.",
            },
          ].map((gene) => (
            <div
              key={gene.name}
              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{gene.icon}</span>
                <span className="font-semibold text-white text-sm">
                  {gene.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {gene.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Source */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Data Source</h3>
        <p className="text-sm text-slate-400 mb-4">
          All system prompt analysis is based on publicly available data from the{" "}
          <a
            href="https://github.com/asgeirtj/system_prompts_leaks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            system_prompts_leaks
          </a>{" "}
          GitHub repository by{" "}
          <span className="text-white">asgeirtj</span>. The gene scores are
          analytical estimates derived from studying prompt structure, length,
          content restrictions, tool definitions, and instruction complexity.
        </p>
        <p className="text-xs text-slate-500">
          This project is for educational and research purposes only. AI Genome
          Project is not affiliated with any of the mentioned AI companies.
        </p>
      </div>
    </div>
  );
}
