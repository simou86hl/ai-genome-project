"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dna, Github, Sparkles, Zap, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Open Source Intelligence Project
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Genome
          </span>
          <br />
          <span className="text-white">Project</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Decode the DNA of every major AI. Analyze system prompts, compare
          personalities, breed custom AI instructions, and trace the evolution
          of the most powerful language models.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={() => onNavigate("radar")}
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-emerald-500/20"
          >
            <Zap className="w-5 h-5 mr-2" />
            Explore AI DNA
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("breeder")}
            className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-6"
          >
            <Dna className="w-5 h-5 mr-2" />
            Breed a Prompt
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(
                "https://github.com/asgeirtj/system_prompts_leaks",
                "_blank"
              )
            }
            className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-6"
          >
            <Github className="w-5 h-5 mr-2" />
            Source Data
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: "11", label: "AI Models", color: "text-emerald-400" },
            {
              value: "5",
              label: "Companies",
              color: "text-purple-400",
            },
            {
              value: "7",
              label: "DNA Traits",
              color: "text-cyan-400",
            },
            {
              value: "15",
              label: "Milestones",
              color: "text-amber-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 bg-slate-800/30 backdrop-blur rounded-xl border border-slate-700/30"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-slate-600" />
      </motion.div>
    </section>
  );
}
