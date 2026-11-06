import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookmarkCheck,
  BookOpen,
  Trash2,
  GraduationCap,
  Clock,
  ArrowRight,
  Filter,
  Search,
  X,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Cloud,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleBookmarkThunk } from "../store/api/questionBankApi";
import { startQuizWithQuestions } from "../store/api/quizApi";
import { loadConfig } from "../store/api/quizConfigApi";
import { openAuthModal } from "../store/api/authApi";
import { allQuestions } from "../data/questions";
import { Question, SubjectName } from "../types/question";
import { QuizConfig } from "../types/quiz";
import MathRenderer from "../components/common/MathRenderer";
import { useSEO } from "../hooks/useSEO";

export const Bookmarks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.questionBank.bookmarks);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedGrade, setSelectedGrade] = useState<number | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: "Saved Questions Vault & Revision Drills – Nepal MCQ",
    description:
      "Review your saved difficult questions, inspect step-by-step conceptual derivations, and launch targeted practice sessions across NEB Science and Management subjects.",
    canonicalPath: "/saved",
    keywords:
      "saved questions, bookmark questions, revision drills, question bank Nepal, NEB exam revision",
  });

  // Resolve bookmarked question objects from allQuestions (or local storage/backend)
  const savedQuestions = useMemo(() => {
    const questionMap = new Map<string, Question>();
    allQuestions.forEach((q) => questionMap.set(q.id, q));

    const list: Question[] = [];
    bookmarks.forEach((id) => {
      const q = questionMap.get(id);
      if (q) {
        list.push(q);
      }
    });

    return list;
  }, [bookmarks]);

  // Distinct subjects in bookmarked questions
  const availableSubjects = useMemo(() => {
    const subs = new Set<string>();
    savedQuestions.forEach((q) => subs.add(q.subject));
    return Array.from(subs);
  }, [savedQuestions]);

  // Filtered saved questions
  const filteredQuestions = useMemo(() => {
    return savedQuestions.filter((q) => {
      if (selectedSubject !== "All" && q.subject !== selectedSubject) return false;
      if (selectedGrade !== "All" && q.grade !== selectedGrade) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchText = q.question.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchExp = q.explanation.toLowerCase().includes(query);
        return matchText || matchTopic || matchExp;
      }
      return true;
    });
  }, [savedQuestions, selectedSubject, selectedGrade, searchQuery]);

  // Launch custom quiz session using specifically the saved questions
  const handleLaunchPractice = (mode: "study" | "exam") => {
    const questionsToPractice =
      filteredQuestions.length > 0 ? filteredQuestions : savedQuestions;
    if (questionsToPractice.length === 0) return;

    const config: QuizConfig = {
      grade: (selectedGrade !== "All" ? selectedGrade : 12) as 11 | 12,
      subject: (selectedSubject !== "All"
        ? selectedSubject
        : "All Subjects") as SubjectName | "All Subjects",
      topic: "Saved & Bookmarked Questions",
      questionCount: questionsToPractice.length,
      durationMinutes: questionsToPractice.length,
      difficulty: "All Levels",
      questionMode: "sequential",
      mode,
      sourceFilter: "all",
      negativeMarking: false,
    };

    dispatch(loadConfig(config));
    dispatch(
      startQuizWithQuestions({
        config,
        questions: questionsToPractice,
      }),
    );
    navigate(`/exam/saved-${Date.now()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <BookmarkCheck className="w-4 h-4" />
          <span>Personal Study Vault</span>
          <span>·</span>
          <span>Saved &amp; Starred Questions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Saved Questions Bank
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Review high-yield questions you've saved during mock exams, inspect
          full step-by-step derivations, and launch targeted drill sessions.
        </p>
      </div>

      {/* Guest Notice & Cloud Sync Banner */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-indigo-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs sm:text-sm">
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Saved locally on this device</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  Guest Mode
                </span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Your bookmarks are preserved in this browser. Sign in with Google to sync them securely across your phone and PC, and never lose your revision drills.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(openAuthModal())}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            <span>Sign In to Sync</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Action & Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {bookmarks.length} Saved {bookmarks.length === 1 ? "Question" : "Questions"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {savedQuestions.length > 0
                  ? `Across ${availableSubjects.length} subjects in your personal bank`
                  : "Bookmark challenging questions during exams to review them here"}
              </p>
            </div>
          </div>
        </div>

        {savedQuestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleLaunchPractice("study")}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Practice in Study Mode ({filteredQuestions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleLaunchPractice("exam")}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Timed Test ({filteredQuestions.length})</span>
            </button>
          </div>
        )}
      </div>

      {savedQuestions.length > 0 ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              {/* Subject Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("All")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedSubject === "All"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  All Subjects
                </button>
                {availableSubjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedSubject === sub
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Grade Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(["All", 11, 12] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedGrade === g
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {g === "All" ? "All Grades" : `Grade ${g}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved questions..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        #{idx + 1} ({q.id})
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Grade {q.grade}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold">
                        {q.subject}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {q.topic}
                      </span>
                      {q.year && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-mono">
                          📜 {q.year}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch(toggleBookmarkThunk(q.id))}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove from saved questions"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-relaxed">
                    <MathRenderer content={q.question} />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isCorrect = opt.id === q.correctAnswer;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-center gap-3 text-xs sm:text-sm ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-500"
                              : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 opacity-80"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isCorrect
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="flex-1">
                            <MathRenderer content={opt.text} />
                          </span>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Derivation Box */}
                  {q.explanation && (
                    <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-1.5 text-xs">
                      <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Derivation &amp; Conceptual Solution</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
                        <MathRenderer content={q.explanation} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Filter className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No matching saved questions found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Try adjusting your subject, grade, or search filters above.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No saved questions yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Whenever you encounter a tricky question or an important board
              problem while practicing, tap the bookmark icon on the question card
              to save it here for targeted revision.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Practice Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
