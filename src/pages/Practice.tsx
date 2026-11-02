import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  BookOpen,
  Award,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setGrade,
  setSubject,
  setTopic,
  setQuestionCount,
  setDifficulty,
  setQuestionMode,
  resetConfig,
} from "../store/slices/quizConfigSlice";
import { startQuiz } from "../store/slices/quizSlice";
import { GradeLevel, SubjectName, DifficultyLevel } from "../types/question";
import { useSEO } from "../hooks/useSEO";

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.quizConfig);
  const topicsByGrade = useAppSelector((state) => state.syllabus.topicsByGrade);

  useSEO({
    title: "Practice Center – NEB MCQs & Board Mock Examinations",
    description:
      "Practice topic-wise drills or launch full-length NEB Grade 11 & 12 mock examinations across Physics, Chemistry, Biology, Mathematics, English, Nepali, and Computer Science.",
    canonicalPath: "/practice",
  });

  // Available topics loaded dynamically from backend syllabus
  const availableTopics = useMemo(() => {
    const gradeTopics = topicsByGrade[config.grade] || {};
    if (config.subject === "All Subjects") {
      const allSubjTopics: string[] = [];
      Object.values(gradeTopics).forEach((topicList) => {
        allSubjTopics.push(...topicList);
      });
      return allSubjTopics;
    }
    return gradeTopics[config.subject] || [];
  }, [config.grade, config.subject, topicsByGrade]);

  const handleStartExam = () => {
    dispatch(startQuiz(config));
    navigate("/exam/active");
  };

  const handlePresetSelect = (preset: {
    count: number;
    mode: "random" | "sequential";
    diff: DifficultyLevel | "All Levels";
  }) => {
    dispatch(setQuestionCount(preset.count));
    dispatch(setQuestionMode(preset.mode));
    dispatch(setDifficulty(preset.diff));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>NEB Examination &amp; Practice Center</span>
          <span>·</span>
          <span>Custom Mock Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Practice &amp; Examination Setup
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Customize your syllabus scope, duration, difficulty, and question
          pool. Practice specific chapters or simulate real NEB board
          examination conditions.
        </p>
      </div>

      {/* Quick Mode Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 20,
              mode: "random",
              diff: "All Levels",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.questionCount === 20
              ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Rapid Speed Drill
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              20 Questions · 20 Mins
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            Quick
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({ count: 30, mode: "random", diff: "Medium" })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.questionCount === 30
              ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              Standard Chapter Test
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              30 Questions · 30 Mins
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
            Balanced
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 60,
              mode: "random",
              diff: "All Levels",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.questionCount === 60
              ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              Full NEB Board Mock
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              60 Questions · 60 Mins
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            Full Mock
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Form Controls */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-7">
          {/* 1. Academic Level (Required) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Academic Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[11, 12].map((g) => {
                const isSelected = config.grade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      dispatch(setGrade(g as GradeLevel));
                      dispatch(setTopic("All Topics"));
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-600 text-slate-900 dark:text-white"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="block text-sm font-bold">Grade {g}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {g === 11
                        ? "Class XI Core Syllabus"
                        : "Class XII Board & Entrance"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Subject Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Subject Scope
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                [
                  "All Subjects",
                  "Physics",
                  "Chemistry",
                  "Biology",
                  "Mathematics",
                  "English",
                  "Nepali",
                  "Computer Science",
                ] as const
              ).map((sub) => {
                const isSelected = config.subject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      dispatch(setSubject(sub));
                      dispatch(setTopic("All Topics"));
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-600 text-white shadow-xs"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Specific Topic Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Topic / Chapter Filter
              </label>
              <span className="text-[11px] text-slate-500">
                {availableTopics.length} chapters available
              </span>
            </div>
            <select
              value={config.topic}
              onChange={(e) => dispatch(setTopic(e.target.value))}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All Topics">
                All Topics ({availableTopics.length} available)
              </option>
              {availableTopics.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Number of Questions & Examination Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Number of Questions
              </label>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold font-mono">
                {config.questionCount} Mins Total (1 min / question)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[20, 30, 45, 60].map((count) => {
                const isSelected = config.questionCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => dispatch(setQuestionCount(count))}
                    className={`py-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="block font-mono text-sm">{count}</span>
                    <span className="text-[10px] font-normal text-slate-500">
                      MCQs
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Difficulty & Question Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Difficulty */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["All Levels", "Easy", "Medium", "Hard"] as const).map(
                  (diff) => {
                    const isSelected = config.difficulty === diff;
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={() =>
                          dispatch(
                            setDifficulty(
                              diff as DifficultyLevel | "All Levels",
                            ),
                          )
                        }
                        className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold"
                            : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {diff}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Question Mode */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Question Ordering
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "random", label: "Randomized" },
                  { id: "sequential", label: "Sequential" },
                ].map((mode) => {
                  const isSelected = config.questionMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() =>
                        dispatch(
                          setQuestionMode(mode.id as "random" | "sequential"),
                        )
                      }
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                        isSelected
                          ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary Card & Start Button */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Practice Summary</span>
            </h3>
            <button
              type="button"
              onClick={() => dispatch(resetConfig())}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Target Level</span>
              <span className="font-bold text-slate-900 dark:text-white">
                Grade {config.grade}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Subject</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {config.subject}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Topic Scope</span>
              <span
                className="font-bold text-slate-900 dark:text-white truncate max-w-[140px]"
                title={config.topic}
              >
                {config.topic}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Questions</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {config.questionCount} Questions
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Duration</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {config.durationMinutes} Minutes
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Question Speed</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                60s per Question
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Difficulty</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {config.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Marking Scheme</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                +1 Correct / 0 Incorrect
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Practice Test</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-normal">
              Clicking will immediately launch the timed interface. Both overall
              and question timers will start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
