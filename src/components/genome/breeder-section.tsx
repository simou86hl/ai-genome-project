"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { aiModels } from "@/data/ai-models";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dna,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Blend,
  ChevronDown,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

const traitOptions = [
  { id: "helpful", label: "Helpful", icon: "🤝" },
  { id: "precise", label: "Precise", icon: "🎯" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "safe", label: "Safe", icon: "🛡️" },
  { id: "fast", label: "Fast", icon: "⚡" },
  { id: "thorough", label: "Thorough", icon: "🔍" },
  { id: "friendly", label: "Friendly", icon: "😊" },
  { id: "professional", label: "Professional", icon: "💼" },
  { id: "technical", label: "Technical", icon: "⚙️" },
  { id: "minimal", label: "Minimal Censorship", icon: "🔓" },
  { id: "sarcastic", label: "Sarcastic", icon: "😏" },
  { id: "scholarly", label: "Scholarly", icon: "📚" },
];

const toneOptions = [
  { id: "formal", label: "Formal & Professional", icon: "👔" },
  { id: "casual", label: "Casual & Friendly", icon: "✌️" },
  { id: "technical", label: "Technical & Precise", icon: "🔬" },
  { id: "creative", label: "Creative & Expressive", icon: "🎭" },
  { id: "concise", label: "Concise & Direct", icon: "⚡" },
  { id: "educational", label: "Educational & Patient", icon: "👩‍🏫" },
];

export default function BreederSection() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(["helpful", "professional"]);
  const [selectedTone, setSelectedTone] = useState("formal");
  const [taskDescription, setTaskDescription] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState("");

  const toggleModel = (id: string) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleTrait = (id: string) => {
    setSelectedTraits((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedModels.length === 0) return;
    setIsGenerating(true);
    setGeneratedPrompt("");
    setError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch("/api/breed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelIds: selectedModels,
          traits: selectedTraits,
          taskDescription,
          tone: toneOptions.find((t) => t.id === selectedTone)?.label,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.prompt) {
        setGeneratedPrompt(data.prompt);
      } else {
        setError("No prompt was generated. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. The AI took too long to respond. Please try again with simpler options.");
      } else {
        setError("Failed to generate prompt. Please check your connection and try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-HTTPS environments
      const textarea = document.createElement("textarea");
      textarea.value = generatedPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSelectedModels([]);
    setSelectedTraits(["helpful", "professional"]);
    setSelectedTone("formal");
    setTaskDescription("");
    setGeneratedPrompt("");
    setError("");
  };

  const selectedModelNames = selectedModels
    .map((id) => aiModels.find((m) => m.id === id)?.name || id)
    .join(", ");

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Blend className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Step 1: Choose Parent Models
            </h3>
            <Badge variant="secondary" className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30">
              {selectedModels.length} / {aiModels.length}
            </Badge>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Select one or more AI models to mix their &quot;DNA&quot;. The
            generated prompt will combine the best traits from each.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {aiModels.map((model) => (
              <motion.button
                key={model.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleModel(model.id)}
                className={`relative p-3 rounded-lg text-left transition-all duration-200 border ${
                  selectedModels.includes(model.id)
                    ? "border-purple-500/50 bg-purple-500/15 shadow-lg shadow-purple-500/10"
                    : "border-slate-600/50 bg-slate-800/50 hover:border-slate-500"
                }`}
              >
                {selectedModels.includes(model.id) && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-400" />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{model.logo}</span>
                  <span className="text-sm font-medium text-white truncate">
                    {model.name}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{model.company}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traits & Tone */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">
              Step 2: Customize Traits
            </h3>
          </div>

          {/* Traits Grid */}
          <div className="mb-5">
            <Label className="text-sm text-slate-400 mb-3 block">
              Personality Traits
            </Label>
            <div className="flex flex-wrap gap-2">
              {traitOptions.map((trait) => (
                <motion.button
                  key={trait.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTrait(trait.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${
                    selectedTraits.includes(trait.id)
                      ? "border-amber-500/50 bg-amber-500/15 text-amber-400"
                      : "border-slate-600/50 bg-slate-800/50 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <span className="mr-1.5">{trait.icon}</span>
                  {trait.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="mb-5">
            <Label className="text-sm text-slate-400 mb-3 block">
              Communication Tone
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {toneOptions.map((tone) => (
                <motion.button
                  key={tone.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-3 rounded-lg text-left transition-all duration-200 border ${
                    selectedTone === tone.id
                      ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-400"
                      : "border-slate-600/50 bg-slate-800/50 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <span className="mr-1.5">{tone.icon}</span>
                  <span className="text-sm">{tone.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Advanced: Task Description */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
              />
              Advanced: Task Description (optional)
            </button>
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Textarea
                    placeholder="Describe what your AI assistant should do... (e.g., 'I need a coding assistant that helps with Python debugging')"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="mt-3 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 min-h-[80px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex gap-3 justify-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={selectedModels.length === 0 || isGenerating}
            className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-semibold px-8 shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Breeding Prompt...
              </>
            ) : (
              <>
                <Dna className="w-5 h-5 mr-2" />
                Breed System Prompt
              </>
            )}
          </Button>
        </motion.div>
        <Button
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-4"
                >
                  <Dna className="w-12 h-12 text-purple-400" />
                </motion.div>
                <h3 className="text-white font-semibold mb-2">
                  Breeding your hybrid prompt...
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Mixing DNA from <strong className="text-purple-400">{selectedModelNames}</strong>.
                  This may take 10-30 seconds.
                </p>
                <div className="flex justify-center gap-1 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-red-950/30 border-red-500/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-400 text-sm mb-1">
                      Generation Failed
                    </h4>
                    <p className="text-xs text-slate-400">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerate}
                      className="mt-3 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Prompt */}
      <AnimatePresence>
        {generatedPrompt && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Your Hybrid System Prompt
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-800/50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>{generatedPrompt.split(/\s+/).length} words</span>
                  <span>·</span>
                  <span>~{Math.ceil(generatedPrompt.split(/\s+/).length * 1.3)} tokens</span>
                  <span>·</span>
                  <span>Mixed from: {selectedModelNames}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
