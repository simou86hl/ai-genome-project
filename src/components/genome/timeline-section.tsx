"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { evolutionTimeline } from "@/data/evolution";
import { motion } from "framer-motion";
import { Clock, TrendingUp, ChevronRight } from "lucide-react";

export default function TimelineSection() {
  const companies = [...new Set(evolutionTimeline.map((e) => e.company))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">
              AI Evolution Timeline
            </h3>
          </div>
          <p className="text-sm text-slate-400">
            Track how AI system prompts evolved over time. Each milestone
            represents significant changes in how companies instruct their
            models.
          </p>
          {/* Company Legend */}
          <div className="flex flex-wrap gap-2 mt-4">
            {companies.map((company) => {
              const event = evolutionTimeline.find((e) => e.company === company);
              return (
                <Badge
                  key={company}
                  className="text-xs border-slate-600/50"
                  style={{
                    backgroundColor: event?.color + "20",
                    color: event?.color,
                    borderColor: event?.color + "40",
                  }}
                >
                  {company}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-emerald-500/30 to-slate-700" />

        <div className="space-y-6">
          {evolutionTimeline.map((event, index) => (
            <motion.div
              key={`${event.model}-${event.version}-${event.date}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-16"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 border-slate-800 z-10"
                style={{ backgroundColor: event.color }}
              />

              <Card className="bg-gradient-to-br from-slate-900 to-slate-800/80 border-slate-700/50 hover:border-slate-600/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge
                      className="text-xs font-mono"
                      style={{
                        backgroundColor: event.color + "20",
                        color: event.color,
                        borderColor: event.color + "40",
                      }}
                    >
                      {event.date}
                    </Badge>
                    <span className="text-sm font-semibold text-white">
                      {event.model}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-600 text-slate-400"
                    >
                      v{event.version}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-600 text-slate-500"
                    >
                      {event.company}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.changes.map((change, i) => (
                      <motion.div
                        key={change}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ChevronRight
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: event.color }}
                        />
                        <span className="text-sm text-slate-300">{change}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Evolution Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">
                {evolutionTimeline.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Total Milestones</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {companies.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">AI Companies</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-amber-400">
                {evolutionTimeline.filter(
                  (e) => e.date.startsWith("2026")
                ).length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Events in 2026</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">
                {evolutionTimeline.filter((e) =>
                  e.changes.some(
                    (c) =>
                      c.toLowerCase().includes("tool") ||
                      c.toLowerCase().includes("agent")
                  )
                ).length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Tool/Agent Updates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
