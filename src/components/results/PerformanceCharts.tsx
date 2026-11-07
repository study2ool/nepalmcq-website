import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { QuizResult } from "../../types/results";

interface PerformanceChartsProps {
  result: QuizResult;
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  result,
}) => {
  // 1. Donut data
  const pieData = [
    { name: "Correct", value: result.correctAnswers, color: "#10B981" },
    { name: "Incorrect", value: result.incorrectAnswers, color: "#F43F5E" },
    {
      name: "Unattempted",
      value: result.unattemptedQuestions,
      color: "#94A3B8",
    },
  ].filter((item) => item.value > 0);

  // 2. Subject breakdown data for Bar Chart
  const subjectData = result.subjectBreakdown.map((sb) => ({
    name: sb.subject,
    Correct: sb.correct,
    Incorrect: sb.attempted - sb.correct,
    Skipped: sb.total - sb.attempted,
    Accuracy: sb.accuracy,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Question Distribution Donut Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Response Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Breakdown of your answers across the examination
          </p>
        </div>

        <div className="h-64 my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-slate-400 block text-[11px]">Correct</span>
            <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {result.correctAnswers} (
              {Math.round(
                (result.correctAnswers / result.totalQuestions) * 100,
              )}
              %)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Incorrect</span>
            <span className="font-bold font-mono text-rose-600 dark:text-rose-400">
              {result.incorrectAnswers} (
              {Math.round(
                (result.incorrectAnswers / result.totalQuestions) * 100,
              )}
              %)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">
              Unattempted
            </span>
            <span className="font-bold font-mono text-slate-600 dark:text-slate-400">
              {result.unattemptedQuestions} (
              {Math.round(
                (result.unattemptedQuestions / result.totalQuestions) * 100,
              )}
              %)
            </span>
          </div>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Subject-Wise Accuracy
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Performance comparison across tested science subjects
          </p>
        </div>

        <div className="h-64 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subjectData}
              margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748B" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                formatter={(value) => (
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {value}
                  </span>
                )}
              />
              <Bar dataKey="Correct" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Incorrect" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Skipped" fill="#94A3B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject badges */}
        <div className="flex flex-wrap items-center justify-around gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {result.subjectBreakdown.map((sb) => (
            <div key={sb.subject} className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {sb.subject}:
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                {sb.accuracy}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic-wise Breakdown Card spanning full width if present */}
      {result.topicBreakdown.length > 0 && (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Topic-Wise Mastery
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Granular breakdown to pinpoint syllabus chapters requiring
            additional practice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.topicBreakdown.map((topicItem) => {
              const accuracy = topicItem.accuracy;
              const isStrong = accuracy >= 70;
              const isNeedsWork = accuracy < 40;

              return (
                <div
                  key={topicItem.topic}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {topicItem.topic}
                      </span>
                      <span className="text-slate-400 text-[11px] ml-2">
                        ({topicItem.subject})
                      </span>
                    </div>
                    <span
                      className={`font-mono font-bold ${
                        isStrong
                          ? "text-emerald-600 dark:text-emerald-400"
                          : isNeedsWork
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {accuracy}% ({topicItem.correct}/{topicItem.total})
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isStrong
                          ? "bg-emerald-500"
                          : isNeedsWork
                            ? "bg-rose-500"
                            : "bg-amber-500"
                      }`}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceCharts;
