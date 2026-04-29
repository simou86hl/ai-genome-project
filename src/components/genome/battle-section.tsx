"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Loader2,
  Trophy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Crown,
} from "lucide-react";

interface BattleResponse {
  response: string;
  model: string;
  tokens: number;
}

const presetPrompts = [
  {
    label: "Helpful Assistant",
    prompt: "You are a helpful, friendly AI assistant. Answer questions clearly and concisely.",
  },
  {
    label: "Strict Coder",
    prompt: "You are a senior software engineer with 20 years of experience. Only provide code that follows best practices. No shortcuts.",
  },
  {
    label: "Funny Teacher",
    prompt: "You are a funny teacher who explains complex topics using humor and everyday analogies. Keep it entertaining but educational.",
  },
  {
    label: "Sarcastic Expert",
    prompt: "You are a sarcastic but knowledgeable expert. Answer questions accurately but with dry humor and witty remarks.",
  },
];

export default function BattleSection() {
  const [promptA, setPromptA] = useState("");
  const [promptB, setPromptB] = useState("");
  const [question, setQuestion] = useState("");
  const [isBattling, setIsBattling] = useState(false);
  const [responseA, setResponseA] = useState<BattleResponse | null>(null);
  const [responseB, setResponseB] = useState<BattleResponse | null>(null);
  const [votes, setVotes] = useState<{ a: number; b: number; tie: number }>({
    a: 0,
    b: 0,
    tie: 0,
  });
  const [voteResult, setVoteResult] = useState<"a" | "b" | "tie" | null>(null);
  const [battleError, setBattleError] = useState("");

  const handleBattle = async () => {
    if (!promptA.trim() || !promptB.trim() || !question.trim()) return;
    setIsBattling(true);
    setResponseA(null);
    setResponseB(null);
    setVoteResult(null);
    setBattleError("");

    try {
      const [resA, resB] = await Promise.all([
        fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: promptA, question: question }),
        }),
        fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: promptB, question: question }),
        }),
      ]);

      const [dataA, dataB] = await Promise.all([resA.json(), resB.json()]);

      if (dataA.error && dataB.error) {
        setBattleError("Both prompts failed to generate responses.");
      } else {
        if (dataA.response) setResponseA(dataA);
        if (dataB.response) setResponseB(dataB);
        if (!dataA.response && !dataB.response) {
          setBattleError("No responses generated. Please try again.");
        }
      }
    } catch {
      setBattleError("Network error. Please check your connection and try again.");
    } finally {
      setIsBattling(false);
    }
  };

  const handleVote = (choice: "a" | "b" | "tie") => {
    setVoteResult(choice);
    setVotes((prev) => ({ ...prev, [choice]: prev[choice] + 1 }));
  };

  const handleReset = () => {
    setPromptA("");
    setPromptB("");
    setQuestion("");
    setResponseA(null);
    setResponseB(null);
    setVoteResult(null);
  };

  const applyPreset = (side: "a" | "b", presetIndex: number) => {
    const preset = presetPrompts[presetIndex];
    if (side === "a") setPromptA(preset.prompt);
    else setPromptB(preset.prompt);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Swords className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">
              Prompt Battle Arena
            </h3>
            <Badge variant="secondary" className="ml-auto bg-red-500/20 text-red-400 border-red-500/30">
              A: {votes.a} · B: {votes.b} · Tie: {votes.tie}
            </Badge>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Test two system prompts against the same question and see which
            performs better. Vote for the winner!
          </p>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-4">
            {presetPrompts.map((preset, i) => (
              <Badge
                key={i}
                className="cursor-pointer text-xs border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => applyPreset("a", i)}
              >
                {preset.label}
              </Badge>
            ))}
          </div>

          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                🔵 Prompt A
              </label>
              <Textarea
                placeholder="Enter first system prompt..."
                value={promptA}
                onChange={(e) => setPromptA(e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-500 min-h-[100px] text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                🔴 Prompt B
              </label>
              <Textarea
                placeholder="Enter second system prompt..."
                value={promptB}
                onChange={(e) => setPromptB(e.target.value)}
                className="bg-slate-800/50 border-red-500/30 text-white placeholder:text-slate-500 min-h-[100px] text-sm"
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">
              ⚡ Test Question
            </label>
            <Textarea
              placeholder="Ask a question to test both prompts..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-slate-500 min-h-[80px] text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleBattle}
                disabled={
                  !promptA.trim() ||
                  !promptB.trim() ||
                  !question.trim() ||
                  isBattling
                }
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold px-8 shadow-lg shadow-red-500/20 disabled:opacity-50"
              >
                {isBattling ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Battling...
                  </>
                ) : (
                  <>
                    <Swords className="w-5 h-5 mr-2" />
                    Start Battle!
                  </>
                )}
              </Button>
            </motion.div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-slate-600 text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Battle Error */}
      <AnimatePresence>
        {battleError && !isBattling && !responseA && !responseB && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-red-950/30 border-red-500/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-red-400">{battleError}</p>
                <Button variant="outline" size="sm" onClick={handleBattle} className="mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10">Try Again</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Battle Results */}
      <AnimatePresence>
        {responseA && responseB && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Response A */}
            <Card
              className={`bg-gradient-to-br from-slate-900 to-slate-800/80 transition-all ${
                voteResult === "a"
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-slate-700/50"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    🔵 Prompt A
                    {voteResult === "a" && (
                      <Crown className="w-4 h-4 text-blue-400" />
                    )}
                  </span>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    ~{responseA.tokens} tokens
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-slate-800/50 rounded-lg max-h-[300px] overflow-y-auto">
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {responseA.response}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Response B */}
            <Card
              className={`bg-gradient-to-br from-slate-900 to-slate-800/80 transition-all ${
                voteResult === "b"
                  ? "border-red-500 shadow-lg shadow-red-500/20"
                  : "border-slate-700/50"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    🔴 Prompt B
                    {voteResult === "b" && (
                      <Crown className="w-4 h-4 text-red-400" />
                    )}
                  </span>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    ~{responseB.tokens} tokens
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-slate-800/50 rounded-lg max-h-[300px] overflow-y-auto">
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {responseB.response}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voting */}
      <AnimatePresence>
        {responseA && responseB && !voteResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-white">
                    Which response is better?
                  </h3>
                </div>
                <div className="flex justify-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleVote("a")}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-8"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      A Wins
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleVote("tie")}
                      variant="outline"
                      className="border-slate-600 text-slate-300 px-8"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Tie
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleVote("b")}
                      className="bg-red-600 hover:bg-red-500 text-white px-8"
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      B Wins
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vote Result */}
      <AnimatePresence>
        {voteResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className={`text-center ${voteResult === "a" ? "bg-blue-950/30 border-blue-500/30" : voteResult === "b" ? "bg-red-950/30 border-red-500/30" : "bg-amber-950/30 border-amber-500/30"}`}>
              <CardContent className="p-6">
                <Crown className={`w-10 h-10 mx-auto mb-2 ${voteResult === "a" ? "text-blue-400" : voteResult === "b" ? "text-red-400" : "text-amber-400"}`} />
                <h3 className="text-xl font-bold text-white mb-1">
                  {voteResult === "tie" ? "It's a Tie!" : `Prompt ${voteResult.toUpperCase()} Wins!`}
                </h3>
                <p className="text-sm text-slate-400">
                  Total Score — A: {votes.a} · B: {votes.b} · Tie: {votes.tie}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
