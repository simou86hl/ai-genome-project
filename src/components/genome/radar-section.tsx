"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiModels, geneLabels, geneKeys, type AIGenome } from "@/data/ai-models";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Eye, EyeOff, Info, X, Zap } from "lucide-react";

export default function RadarSection() {
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "claude-opus-4.7",
    "chatgpt-5.5",
    "grok-4.2",
  ]);
  const [hoveredGene, setHoveredGene] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const toggleModel = (id: string) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const chartData = geneKeys.map((key) => {
    const entry: Record<string, string | number> = {
      gene: geneLabels[key].label,
      fullMark: 100,
    };
    aiModels.forEach((model) => {
      if (selectedModels.includes(model.id)) {
        entry[model.id] = model.genes[key];
      }
    });
    return entry;
  });

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Dna className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              Select AI Models to Compare
            </h3>
            <Badge variant="secondary" className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              {selectedModels.length} selected
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiModels.map((model) => (
              <motion.button
                key={model.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleModel(model.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedModels.includes(model.id)
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10"
                    : "border-slate-600/50 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="mr-1.5">{model.logo}</span>
                {model.name}
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      {selectedModels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-emerald-400" />
                AI Genome Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square max-w-2xl mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid
                      stroke="rgba(148,163,184,0.15)"
                      strokeDasharray="3 3"
                    />
                    <PolarAngleAxis
                      dataKey="gene"
                      tick={{
                        fill: "#94a3b8",
                        fontSize: 12,
                      }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    {selectedModels.map((id) => {
                      const model = aiModels.find((m) => m.id === id);
                      if (!model) return null;
                      return (
                        <Radar
                          key={id}
                          name={model.name}
                          dataKey={id}
                          stroke={model.color}
                          fill={model.color}
                          fillOpacity={0.15}
                          strokeWidth={2}
                        />
                      );
                    })}
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value: string) => (
                        <span className="text-slate-300">{value}</span>
                      )}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: "8px",
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#e2e8f0" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Gene Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {geneKeys.map((key) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredGene(key)}
            onHoverEnd={() => setHoveredGene(null)}
          >
            <Card
              className={`bg-slate-800/50 border-slate-700/50 cursor-pointer transition-all duration-300 ${
                hoveredGene === key
                  ? "border-emerald-500/50 shadow-lg shadow-emerald-500/5"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{geneLabels[key].icon}</span>
                  <span className="text-sm font-semibold text-white">
                    {geneLabels[key].label}
                  </span>
                  <Info className="w-3.5 h-3.5 text-slate-500 ml-auto" />
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  {geneLabels[key].description}
                </p>
                <div className="space-y-1.5">
                  {aiModels
                    .filter((m) => selectedModels.includes(m.id))
                    .slice(0, 3)
                    .map((model) => (
                      <div key={model.id} className="flex items-center gap-2">
                        <span className="text-xs w-24 truncate text-slate-400">
                          {model.logo} {model.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: model.color }}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${model.genes[key]}%`,
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <span className="text-xs font-mono text-slate-500 w-8 text-right">
                          {model.genes[key]}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Model Detail Cards */}
      <AnimatePresence>
        {showDetails && (
          <ModelDetailCard
            model={aiModels.find((m) => m.id === showDetails)!}
            onClose={() => setShowDetails(null)}
          />
        )}
      </AnimatePresence>

      {/* Selected Model Quick Info */}
      {selectedModels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModels
            .filter((m) => selectedModels.includes(m.id))
            .map((model) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: model.color + "20" }}
                      >
                        {model.logo}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {model.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {model.company}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-auto text-xs border-slate-600 text-slate-400"
                      >
                        {model.promptLength}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {model.traits.slice(0, 3).map((trait) => (
                        <Badge
                          key={trait}
                          className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                      onClick={() =>
                        setShowDetails(
                          showDetails === model.id ? null : model.id
                        )
                      }
                    >
                      {showDetails === model.id ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" /> Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" /> View Full Profile
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}

function ModelDetailCard({
  model,
  onClose,
}: {
  model: AIGenome;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: model.color + "25" }}
              >
                {model.logo}
              </div>
              <div>
                <CardTitle className="text-white">{model.name}</CardTitle>
                <p className="text-sm text-slate-400">
                  {model.company} · v{model.version} · {model.releaseDate}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-300">{model.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {geneKeys.map((key) => (
              <div key={key} className="text-center">
                <div className="text-2xl mb-1">{geneLabels[key].icon}</div>
                <div className="text-xs text-slate-400 mb-1">
                  {geneLabels[key].label}
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: model.color }}
                >
                  {model.genes[key]}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {model.traits.map((trait) => (
              <Badge
                key={trait}
                className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50"
              >
                {trait}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
