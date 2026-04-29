"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";

interface Grade {
  score: number;
  label: string;
  icon: string;
  details: string;
}

interface ScanResult {
  overallScore: number;
  grades: Record<string, Grade>;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  tokenEstimate: number;
  wordCount: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-500/15 border-emerald-500/30";
  if (score >= 60) return "bg-amber-500/15 border-amber-500/30";
  if (score >= 40) return "bg-orange-500/15 border-orange-500/30";
  return "bg-red-500/15 border-red-500/30";
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Work";
  return "Poor";
}

export default function ScannerSection() {
  const [prompt, setPrompt] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [copied, setCopied] = useState(false);

  const [scanError, setScanError] = useState("");

  const handleScan = async () => {
    if (prompt.trim().length < 10) return;
    setIsScanning(true);
    setResult(null);
    setScanError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.overallScore !== undefined) {
        setResult(data);
      } else if (data.error) {
        setScanError(data.error);
      } else {
        setScanError("Unexpected response. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setScanError("Request timed out. Please try with a shorter prompt.");
      } else {
        setScanError("Failed to scan prompt. Please check your connection and try again.");
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopy = (text: string) => {
    try { navigator.clipboard.writeText(text); } catch { /* fallback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              Paste Your System Prompt
            </h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Drop any system prompt and get a comprehensive health report with
            scores, strengths, weaknesses, and improvement suggestions.
          </p>
          <Textarea
            placeholder="You are a helpful AI assistant that..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 min-h-[160px] font-mono text-sm"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500">
              {prompt.trim().split(/\s+/).filter(Boolean).length} words ·{" "}
              {Math.ceil((prompt.trim().split(/\s+/).filter(Boolean).length || 0) * 1.3)} estimated tokens
            </span>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleScan}
                disabled={prompt.trim().length < 10 || isScanning}
                className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Scan Prompt
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Error */}
      <AnimatePresence>
        {scanError && !isScanning && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-red-950/30 border-red-500/30">
              <CardContent className="p-4">
                <p className="text-sm text-red-400">{scanError}</p>
                <Button variant="outline" size="sm" onClick={handleScan} className="mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10">Try Again</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <Card className={`border ${getScoreBg(result.overallScore)}`}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-slate-700/50"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={
                          result.overallScore >= 80
                            ? "#34d399"
                            : result.overallScore >= 60
                              ? "#fbbf24"
                              : result.overallScore >= 40
                                ? "#fb923c"
                                : "#f87171"
                        }
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${result.overallScore * 2.64} 264`}
                        initial={{ strokeDasharray: "0 264" }}
                        animate={{
                          strokeDasharray: `${result.overallScore * 2.64} 264`,
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}
                      </span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Health Score: {getScoreLabel(result.overallScore)}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {result.wordCount} words · ~{result.tokenEstimate} tokens estimated
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {result.strengths.length} strengths
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {result.weaknesses.length} weaknesses
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grade Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.grades).map(([key, grade]: [string, Grade], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border ${getScoreBg(grade.score)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{grade.icon}</span>
                          <span className="font-semibold text-white text-sm">
                            {grade.label}
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${getScoreColor(grade.score)}`}>
                          {grade.score}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
                        <motion.div
                          className={`h-full rounded-full ${
                            grade.score >= 80
                              ? "bg-emerald-500"
                              : grade.score >= 60
                                ? "bg-amber-500"
                                : grade.score >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${grade.score}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {grade.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Strengths & Weaknesses & Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Strengths */}
              <Card className="bg-emerald-950/30 border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">+</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="bg-red-950/30 border-red-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Weaknesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-red-500 mt-0.5">!</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="bg-amber-950/30 border-amber-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-amber-400 text-sm">
                    <Lightbulb className="w-4 h-4" />
                    Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5">&rarr;</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">
                    Quick Stats
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-emerald-400">{result.wordCount}</div>
                    <div className="text-xs text-slate-500">Words</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-purple-400">~{result.tokenEstimate}</div>
                    <div className="text-xs text-slate-500">Tokens</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-cyan-400">${(result.tokenEstimate * 0.00003).toFixed(4)}</div>
                    <div className="text-xs text-slate-500">Cost (GPT-5.5)</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xl font-bold text-amber-400">{Math.round(result.overallScore / 20)}</div>
                    <div className="text-xs text-slate-500">/ 5 Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
