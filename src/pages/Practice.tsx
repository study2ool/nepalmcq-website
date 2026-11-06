import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  BookOpen,
  Award,
  Loader2,
  Lock,
  GraduationCap,
  Clock,
  Scroll,
  AlertTriangle,
  Stethoscope,
  Compass,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { openAuthModal } from "../store/api/authApi";
import {
  setGrade,
  setSubject,
  setTopic,
  setQuestionCount,
  setDifficulty,
  setQuestionMode,
  setPracticeMode,
  setSourceFilter,
  setYear,
  setNegativeMarking,
  setExamPreset,
  resetConfig,
} from "../store/api/quizConfigApi";
import { startQuiz, prepareAndStartQuiz } from "../store/api/quizApi";
import { GradeLevel, SubjectName, DifficultyLevel } from "../types/question";
import { SearchableSelect } from "../components/common/SearchableSelect";
import { useSEO } from "../hooks/useSEO";

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.quizConfig);
  const topicsByGrade = useAppSelector((state) => state.syllabus.topicsByGrade);
  const isQuizLoading = useAppSelector((state) => state.quiz.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isStartingExam, setIsStartingExam] = useState(false);
  const [practiceStream, setPracticeStream] = useState<
    "all" | "science" | "commerce"
  >("all");

  const displayedSubjects = useMemo(() => {
    if (practiceStream === "science") {
      return [
        "All Subjects",
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Computer Science",
        "English",
        "Nepali",
      ] as const;
    }
    if (practiceStream === "commerce") {
      return [
        "All Subjects",
        "Accounting",
        "Economics",
        "Business Studies",
        "Business Math",
        "Hotel Management",
        "English",
        "Nepali",
        "Computer Science",
      ] as const;
    }
    return [
      "All Subjects",
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Accounting",
      "Economics",
      "Computer Science",
      "English",
      "Nepali",
      "Business Studies",
      "Business Math",
      "Hotel Management",
    ] as const;
  }, [practiceStream]);

  useSEO({
    title: "NEB Online Practice & Mock Examination Center – Grade 11 & 12",
    description:
      "Practice chapter-wise MCQs, simulate full-length NEB board examinations with strict timers, and solve past questions ('Old is Gold') across Science and Management streams.",
    canonicalPath: "/practice",
    keywords:
      "NEB mock test, NEB practice exam, Old is Gold NEB, Class 11 MCQ, Class 12 MCQ, IOE entrance test, CEE mock test, timed examination Nepal, online exam NEB",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": "NEB Grade 11 & 12 Practice Tests & Board Examination Center",
      "description":
        "Computer-based tests, instant study mode with derivations, and past paper drills for secondary education students in Nepal.",
      "educationalLevel": "Secondary Education (NEB Grade 11-12)",
      "isAccessibleForFree": true,
    },
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

  const topicOptions = useMemo(() => {
    return [
      {
        value: "All Topics",
        label: `All Topics (${availableTopics.length} available)`,
      },
      ...availableTopics.map((top) => ({
        value: top,
        label: top,
      })),
    ];
  }, [availableTopics]);

  const handleStartExam = async (useAiGenerator = false) => {
    // If student is not logged in, block starting the exam and open auth modal
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }

    setIsStartingExam(true);
    try {
      await dispatch(
        prepareAndStartQuiz({ config, useAi: useAiGenerator }),
      ).unwrap();
    } catch {
      // Fallback directly to local questions if API is unavailable
      dispatch(startQuiz(config));
    } finally {
      setIsStartingExam(false);
    }
  };

  const handlePresetSelect = (preset: {
    count: number;
    mode: "random" | "sequential";
    diff: DifficultyLevel | "All Levels";
    practiceMode?: "exam" | "study";
    sourceFilter?: "all" | "past_papers" | "model_questions";
    year?: string;
    negativeMarking?: boolean;
    examPreset?: "custom" | "neb_board" | "cee_medical" | "ioe_engineering";
    subject?: SubjectName | "All Subjects";
  }) => {
    dispatch(setQuestionCount(preset.count));
    dispatch(setQuestionMode(preset.mode));
    dispatch(setDifficulty(preset.diff));
    if (preset.practiceMode) dispatch(setPracticeMode(preset.practiceMode));
    if (preset.sourceFilter) dispatch(setSourceFilter(preset.sourceFilter));
    if (preset.year) dispatch(setYear(preset.year));
    if (preset.negativeMarking !== undefined)
      dispatch(setNegativeMarking(preset.negativeMarking));
    if (preset.examPreset) dispatch(setExamPreset(preset.examPreset));
    if (preset.subject) {
      dispatch(setSubject(preset.subject));
      dispatch(setTopic("All Topics"));
    }
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
          pool. Practice specific chapters, past NEB board papers ("Old is Gold"),
          or simulate real examination conditions.
        </p>
      </div>

      {/* Quick Mode Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 20,
              mode: "random",
              diff: "All Levels",
              practiceMode: "study",
              sourceFilter: "all",
              year: "All",
              negativeMarking: false,
              examPreset: "custom",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.questionCount === 20 && config.year === "All" && !config.negativeMarking
              ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Rapid Drill
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              20 Qs · 20 Mins
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            Quick
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 30,
              mode: "random",
              diff: "Medium",
              practiceMode: "study",
              sourceFilter: "all",
              year: "All",
              negativeMarking: false,
              examPreset: "custom",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.questionCount === 30 && config.year === "All" && !config.negativeMarking
              ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              Chapter Mastery
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              30 Qs · 30 Mins
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
              count: 30,
              mode: "sequential",
              diff: "All Levels",
              practiceMode: "exam",
              sourceFilter: "past_papers",
              year: "2080 NEB",
              negativeMarking: false,
              examPreset: "neb_board",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.year === "2080 NEB"
              ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-1 ring-amber-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-amber-500" />
              Old is Gold
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              2080 Board Paper
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            Past
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 60,
              mode: "random",
              diff: "All Levels",
              practiceMode: "exam",
              sourceFilter: "model_questions",
              year: "CDC Model Set",
              negativeMarking: false,
              examPreset: "neb_board",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.year === "CDC Model Set"
              ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              CDC Model Set
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              60 Qs · 60 Mins
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            Model
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 100,
              mode: "random",
              diff: "Hard",
              practiceMode: "exam",
              sourceFilter: "all",
              year: "All",
              negativeMarking: true,
              examPreset: "cee_medical",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.examPreset === "cee_medical" || (config.negativeMarking && config.questionCount === 100)
              ? "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-1 ring-rose-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-rose-500" />
              CEE Medical
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              100 Qs · -0.25 Neg
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
            CEE
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            handlePresetSelect({
              count: 100,
              mode: "random",
              diff: "Hard",
              practiceMode: "exam",
              sourceFilter: "all",
              year: "All",
              negativeMarking: true,
              examPreset: "ioe_engineering",
            })
          }
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            config.examPreset === "ioe_engineering"
              ? "border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 ring-1 ring-purple-500 text-slate-900 dark:text-white"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-purple-500" />
              IOE Engineering
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              100 Qs · -0.25 Neg
            </span>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
            IOE
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Form Controls */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-7">
          {/* Practice Experience Mode (Study vs Exam Simulation) */}
          <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Practice Experience Mode <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {config.mode === "study"
                  ? "🎓 Instant Explanations Enabled"
                  : "⏱️ Timed Board Simulation"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => dispatch(setPracticeMode("study"))}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  config.mode === "study"
                    ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-slate-900 dark:text-white"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Instant Study Mode
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Immediate answer reveals, comprehensive derivations, and concept notes after each question. No timer panic.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => dispatch(setPracticeMode("exam"))}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  config.mode === "exam"
                    ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-slate-900 dark:text-white"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Board Exam Simulation
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                      Timed Test
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Strict time countdown, question palette tracking, and final scorecard review upon complete submission.
                  </p>
                </div>
              </button>
            </div>
          </div>

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
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Subject Scope
              </label>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setPracticeStream("all")}
                  className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    practiceStream === "all"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeStream("science")}
                  className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    practiceStream === "science"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  Science
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeStream("commerce")}
                  className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    practiceStream === "commerce"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  Management
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {displayedSubjects.map((sub) => {
                const isSelected = config.subject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      dispatch(setSubject(sub as any));
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
            <SearchableSelect
              options={topicOptions}
              value={config.topic}
              onChange={(val) => dispatch(setTopic(val))}
              searchPlaceholder="Search syllabus chapters..."
              icon={<BookOpen className="w-3.5 h-3.5" />}
              className="w-full"
              buttonClassName="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs sm:text-sm"
            />
          </div>

          {/* 4. Question Source & Past Papers ("Old is Gold") */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Question Source &amp; Past Papers ("Old is Gold")
              </label>
              <span className="text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                {config.year && config.year !== "All"
                  ? `Filtered: ${config.year}`
                  : "All Curriculum Questions"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "all", label: "All Questions", year: "All" },
                { id: "past_papers", label: "2080 NEB Board", year: "2080 NEB" },
                { id: "past_papers", label: "2079 NEB Board", year: "2079 NEB" },
                { id: "model_questions", label: "CDC Model Sets", year: "CDC Model Set" },
              ].map((src) => {
                const isSelected =
                  src.id === "all"
                    ? (!config.year || config.year === "All") &&
                      (!config.sourceFilter || config.sourceFilter === "all")
                    : config.year === src.year;
                return (
                  <button
                    key={src.label}
                    type="button"
                    onClick={() => {
                      if (src.id === "all") {
                        dispatch(setSourceFilter("all"));
                        dispatch(setYear("All"));
                      } else {
                        dispatch(setSourceFilter(src.id as any));
                        dispatch(setYear(src.year));
                      }
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Scroll className="w-3.5 h-3.5 text-amber-500" />
                      <span>{src.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
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
            <div className="grid grid-cols-5 gap-2">
              {[20, 30, 45, 60, 100].map((count) => {
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

          {/* 6. Scoring Scheme & Negative Marking */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Scoring Scheme &amp; Negative Marking
              </label>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                {config.negativeMarking
                  ? "-0.25 Mark / Incorrect Option"
                  : "Standard NEB (0 Penalty)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => dispatch(setNegativeMarking(false))}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  !config.negativeMarking
                    ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500 shadow-2xs"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold block">
                    NEB Board Scheme (No Penalty)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    +1 for correct, 0 for incorrect or unattempted.
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  NEB Standard
                </span>
              </button>

              <button
                type="button"
                onClick={() => dispatch(setNegativeMarking(true))}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  config.negativeMarking
                    ? "border-rose-600 dark:border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500 shadow-2xs"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Entrance Scheme (-0.25 Penalty)</span>
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    +1 for correct, -0.25 penalty per wrong option.
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  CEE / IOE
                </span>
              </button>
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
              <span className="text-slate-500">Practice Mode</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {config.mode === "study" ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Study Mode
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Exam Simulation</span>
                  </>
                )}
              </span>
            </div>

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
              <span className="text-slate-500">Question Source</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 font-mono text-[11px]">
                <Scroll className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {config.year && config.year !== "All"
                    ? config.year
                    : "All Question Bank"}
                </span>
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
              <span
                className={`font-bold font-mono text-[11px] ${
                  config.negativeMarking
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {config.negativeMarking
                  ? "+1 / -0.25 Neg. Penalty"
                  : "+1 Correct / 0 Penalty"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <button
              type="button"
              disabled={isStartingExam || isQuizLoading}
              onClick={() => handleStartExam(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-60 rounded-xl shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              {!isAuthenticated ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Start Practice</span>
                </>
              ) : isStartingExam || isQuizLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading Questions...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {config.mode === "study"
                      ? "Start Study Session"
                      : "Start Practice Test"}
                  </span>
                </>
              )}
            </button>

            {config.subject !== "All Subjects" && (
              <button
                type="button"
                disabled={isStartingExam || isQuizLoading}
                onClick={() => handleStartExam(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/80 rounded-xl transition-colors cursor-pointer"
              >
                {!isAuthenticated ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In to Generate AI Questions</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Dynamic AI Questions</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[11px] text-slate-400 text-center leading-normal">
              Clicking will launch the timed examination interface connected to
              our NEB question bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
