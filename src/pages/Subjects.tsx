import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Atom,
  Flame,
  Dna,
  Calculator,
  Languages,
  Scroll,
  Code2,
  ArrowRight,
  BookOpen,
  Search,
  X,
  FileSpreadsheet,
  Briefcase,
  TrendingUp,
  Percent,
  Megaphone,
  Hotel,
  Sparkles,
  GraduationCap,
  Clock,
  Layers,
  ChevronRight,
  BarChart3,
  Award,
  Trophy,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { GradeLevel, SubjectName } from "../types/question";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setGrade,
  setSubject,
  setTopic,
  setPracticeMode,
} from "../store/api/quizConfigApi";
import { fetchSubjectDetails } from "../store/api/syllabusApi";
import { useSEO } from "../hooks/useSEO";
import { SyllabusChapter } from "../types/syllabus";
import { SpecificationGridModal } from "../components/syllabus/SpecificationGridModal";
import { getSpecificationGrid } from "../data/syllabus/specificationGrids";
import { FormulaSheetModal } from "../components/syllabus/FormulaSheetModal";
import { getFormulaSheet } from "../data/syllabus/formulaSheets";
import { SubjectiveBankModal } from "../components/syllabus/SubjectiveBankModal";
import { getSubjectiveBank } from "../data/syllabus/subjectiveQuestions";

export const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedStream, setSelectedStream] = useState<"science" | "commerce">(
    "science",
  );
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(12);
  const [activeSubject, setActiveSubject] = useState<string>("Physics");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingChapter, setInspectingChapter] =
    useState<SyllabusChapter | null>(null);
  const [isSpecGridOpen, setIsSpecGridOpen] = useState(false);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);
  const [formulaTargetUnit, setFormulaTargetUnit] = useState<
    string | undefined
  >(undefined);
  const [isSubjectiveModalOpen, setIsSubjectiveModalOpen] = useState(false);
  const [subjectiveTargetChapter, setSubjectiveTargetChapter] = useState<
    string | undefined
  >(undefined);
  const [masteryFilter, setMasteryFilter] = useState<
    "all" | "mastered" | "proficient" | "needs_revision" | "unattempted"
  >("all");

  const { subjects, topicsByGrade, syllabusBySubject } = useAppSelector(
    (state) => state.syllabus,
  );
  const history = useAppSelector((state) => state.results.history);

  const specGrid = useMemo(
    () => getSpecificationGrid(activeSubject, selectedGrade),
    [activeSubject, selectedGrade],
  );

  const formulaSheet = useMemo(
    () => getFormulaSheet(activeSubject, selectedGrade),
    [activeSubject, selectedGrade],
  );

  const subjectiveBank = useMemo(
    () => getSubjectiveBank(activeSubject, selectedGrade),
    [activeSubject, selectedGrade],
  );

  useSEO({
    title:
      "NEB Curriculum Syllabus, Specification Grids & Formulas – Grade 11 & 12",
    description:
      "Explore official CDC and NEB syllabus chapters, specification grids, mark distributions, high-yield formula cheatsheets, and Group B (5M) & Group C (8M) model derivations across Science and Management streams.",
    canonicalPath: "/subjects",
    keywords:
      "NEB syllabus, CDC curriculum, NEB Grade 11 syllabus, NEB Grade 12 syllabus, Specification Grid NEB, marks weightage, Physics formula sheet, Math formulas, Accounting ratios, Group B questions, Group C derivations",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "NEB Grade 11 & 12 Official Curriculum Syllabus",
      description:
        "Complete curriculum specifications, chapter objectives, formula cheatsheets, and question weightage grids for Grade 11 and 12 in Nepal.",
      provider: {
        "@type": "EducationalOrganization",
        name: "Nepal MCQ",
        url: "https://nepalmcq.edu.np",
      },
      educationalCredentialAwarded:
        "National Examinations Board (NEB) Certification Preparation",
    },
  });

  // Fetch full syllabus tree for active subject when changed
  useEffect(() => {
    if (activeSubject) {
      dispatch(fetchSubjectDetails(activeSubject));
    }
  }, [activeSubject, dispatch]);

  // Filter subjects by stream
  const streamSubjects = useMemo(() => {
    const list = subjects.filter((s) => s.category === selectedStream);
    if (list.length > 0) return list;

    // Fallbacks if backend list is loading
    if (selectedStream === "science") {
      return [
        { name: "Physics", code: "PHY", category: "science" },
        { name: "Chemistry", code: "CHE", category: "science" },
        { name: "Biology", code: "BIO", category: "science" },
        { name: "Mathematics", code: "MAT", category: "science" },
        { name: "Computer Science", code: "CS", category: "science" },
        { name: "English", code: "ENG", category: "science" },
        { name: "Nepali", code: "NEP", category: "science" },
      ];
    } else {
      return [
        { name: "Accounting", code: "ACC", category: "commerce" },
        { name: "Economics", code: "ECO", category: "commerce" },
        { name: "Business Studies", code: "BST", category: "commerce" },
        { name: "Business Math", code: "BMAT", category: "commerce" },
        { name: "Marketing", code: "MKT", category: "commerce" },
        { name: "Hotel Management", code: "HM", category: "commerce" },
      ];
    }
  }, [subjects, selectedStream]);

  // Ensure activeSubject is valid for current stream
  useEffect(() => {
    const exists = streamSubjects.some((s) => s.name === activeSubject);
    if (!exists && streamSubjects.length > 0) {
      setActiveSubject(streamSubjects[0].name);
    }
  }, [selectedStream, streamSubjects, activeSubject]);

  // Dynamic chapters list from backend syllabus
  const gradeTopics =
    topicsByGrade[selectedGrade]?.[activeSubject] ||
    (streamSubjects.find((s) => s.name === activeSubject) as any)
      ?.chaptersByGrade?.[selectedGrade] ||
    [];

  // Detailed syllabus branches for active subject from backend
  const activeSyllabus = syllabusBySubject[activeSubject];
  const activeGradeData =
    activeSyllabus?.grades?.[String(selectedGrade) as "11" | "12"];
  const activeBranches = activeGradeData?.branches || [];

  // Compute student's historical mastery map across all chapters of active subject
  const chapterMasteryMap = useMemo(() => {
    const map = new Map<
      string,
      {
        attempted: number;
        correct: number;
        accuracy: number;
        status: "mastered" | "proficient" | "needs_revision" | "unattempted";
      }
    >();

    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

    history.forEach((result) => {
      // Check subject match
      if (
        result.config.subject !== "All Subjects" &&
        result.config.subject !== activeSubject
      ) {
        return;
      }
      // Check grade match if defined
      if (result.config.grade && result.config.grade !== selectedGrade) {
        return;
      }

      // Track by individual question results
      result.questionResults?.forEach((qr) => {
        if (!qr.question) return;
        if (qr.question.subject !== activeSubject) return;

        const topicKey = norm(qr.question.topic || "");
        if (!topicKey) return;

        const current = map.get(topicKey) || {
          attempted: 0,
          correct: 0,
          accuracy: 0,
          status: "unattempted" as const,
        };

        if (qr.status !== "unattempted") {
          current.attempted += 1;
          if (qr.isCorrect) {
            current.correct += 1;
          }
        }
        map.set(topicKey, current);
      });

      // Also track overall topic breakdown if available
      result.topicBreakdown?.forEach((tb) => {
        if (tb.subject !== activeSubject) return;
        const topicKey = norm(tb.topic || "");
        if (!topicKey) return;

        if (!map.has(topicKey) && tb.attempted > 0) {
          map.set(topicKey, {
            attempted: tb.attempted,
            correct: tb.correct,
            accuracy: tb.accuracy,
            status:
              tb.accuracy >= 80
                ? "mastered"
                : tb.accuracy >= 50
                  ? "proficient"
                  : "needs_revision",
          });
        }
      });
    });

    // Finalize accuracy calculations
    map.forEach((val) => {
      if (val.attempted > 0) {
        val.accuracy = Math.round((val.correct / val.attempted) * 100);
        if (val.accuracy >= 80) val.status = "mastered";
        else if (val.accuracy >= 50) val.status = "proficient";
        else val.status = "needs_revision";
      } else {
        val.status = "unattempted";
      }
    });

    return map;
  }, [history, activeSubject, selectedGrade]);

  const getChapterMastery = useMemo(() => {
    return (chapter: SyllabusChapter) => {
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const chKey = norm(chapter.chapterName);

      if (chapterMasteryMap.has(chKey)) {
        return chapterMasteryMap.get(chKey)!;
      }

      for (const [key, val] of chapterMasteryMap.entries()) {
        if (key.includes(chKey) || chKey.includes(key)) {
          return val;
        }
      }

      if (chapter.topics) {
        for (const t of chapter.topics) {
          const tKey = norm(t.topic);
          if (chapterMasteryMap.has(tKey)) {
            return chapterMasteryMap.get(tKey)!;
          }
        }
      }

      return {
        attempted: 0,
        correct: 0,
        accuracy: 0,
        status: "unattempted" as const,
      };
    };
  }, [chapterMasteryMap]);

  // Aggregate mastery counts for filter pills
  const chapterMasteryCounts = useMemo(() => {
    let mastered = 0;
    let proficient = 0;
    let needsRevision = 0;
    let unattempted = 0;
    let total = 0;

    activeBranches.forEach((b) => {
      b.chapters.forEach((ch) => {
        total += 1;
        const m = getChapterMastery(ch);
        if (m.status === "mastered") mastered++;
        else if (m.status === "proficient") proficient++;
        else if (m.status === "needs_revision") needsRevision++;
        else unattempted++;
      });
    });

    return {
      all: total,
      mastered,
      proficient,
      needsRevision,
      unattempted,
    };
  }, [activeBranches, getChapterMastery]);

  // Syllabus progress tracker metrics
  const syllabusProgress = useMemo(() => {
    let totalChaptersCount = 0;
    let practicedChaptersCount = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;

    activeBranches.forEach((branch) => {
      branch.chapters.forEach((ch) => {
        totalChaptersCount += 1;
        const m = getChapterMastery(ch);
        if (m.attempted > 0) {
          practicedChaptersCount += 1;
          totalAttempted += m.attempted;
          totalCorrect += m.correct;
        }
      });
    });

    const coveragePercent =
      totalChaptersCount > 0
        ? Math.round((practicedChaptersCount / totalChaptersCount) * 100)
        : 0;

    const avgAccuracy =
      totalAttempted > 0
        ? Math.round((totalCorrect / totalAttempted) * 100)
        : 0;

    return {
      totalChaptersCount,
      practicedChaptersCount,
      coveragePercent,
      avgAccuracy,
      totalAttempted,
    };
  }, [activeBranches, getChapterMastery]);

  // Filter chapters by search query & mastery state
  const filteredBranches = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return activeBranches
      .map((branch) => {
        const matchingChapters = branch.chapters.filter((ch) => {
          const matchSearch =
            !query ||
            ch.chapterName.toLowerCase().includes(query) ||
            ch.topics?.some(
              (t) =>
                t.topic.toLowerCase().includes(query) ||
                t.brief?.toLowerCase().includes(query),
            );

          if (!matchSearch) return false;

          if (masteryFilter === "all") return true;
          const m = getChapterMastery(ch);
          return m.status === masteryFilter;
        });

        return {
          ...branch,
          chapters: matchingChapters,
        };
      })
      .filter((branch) => branch.chapters.length > 0);
  }, [activeBranches, searchQuery, masteryFilter, getChapterMastery]);

  const totalFilteredChapters = useMemo(() => {
    return filteredBranches.reduce((acc, b) => acc + b.chapters.length, 0);
  }, [filteredBranches]);

  const handleLaunchPractice = (
    topic: string,
    mode: "study" | "exam" = "study",
  ) => {
    dispatch(setGrade(selectedGrade));
    dispatch(setSubject(activeSubject as SubjectName));
    dispatch(setTopic(topic));
    dispatch(setPracticeMode(mode));
    setInspectingChapter(null);
    navigate("/practice");
  };

  const subjectIcons: Record<string, React.ElementType> = {
    Physics: Atom,
    Chemistry: Flame,
    Biology: Dna,
    Mathematics: Calculator,
    English: Languages,
    Nepali: Scroll,
    "Computer Science": Code2,
    Accounting: FileSpreadsheet,
    Economics: TrendingUp,
    "Business Studies": Briefcase,
    "Business Math": Percent,
    Marketing: Megaphone,
    "Hotel Management": Hotel,
  };

  const ActiveIcon = subjectIcons[activeSubject] || BookOpen;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Official NEB Curriculum</span>
          <span>·</span>
          <span>Curriculum Development Centre (CDC) Syllabus Grid</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Curriculum Syllabi &amp; Chapters
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Explore complete chapter maps, learning objectives, and unit topics
          aligned with the National Examinations Board curriculum. Practice in
          either self-paced Study Mode or timed Exam Simulation.
        </p>
      </div>

      {/* Stream & Grade Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Stream Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setSelectedStream("science");
                setActiveSubject("Physics");
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedStream === "science"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Science Stream
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStream("commerce");
                setActiveSubject("Accounting");
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedStream === "commerce"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Management Stream
            </button>
          </div>

          {/* Grade Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {[11, 12].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGrade(g as GradeLevel)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedGrade === g
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters or concepts..."
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

      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {streamSubjects.map((sub) => {
          const isSubActive = activeSubject === sub.name;
          const Icon = subjectIcons[sub.name] || BookOpen;
          return (
            <button
              key={sub.name}
              type="button"
              onClick={() => setActiveSubject(sub.name)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                isSubActive
                  ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sub.name}</span>
              <span className="text-[10px] opacity-60 font-mono">
                ({sub.code})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Subject Overview Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Grade {selectedGrade} {activeSubject}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                {selectedStream === "science"
                  ? "Science Stream"
                  : "Management Stream"}
              </span>
              {specGrid && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  {specGrid.theoryMarks} Th + {specGrid.practicalMarks} Pr
                  (Full: {specGrid.theoryMarks + specGrid.practicalMarks})
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {activeBranches.length > 0
                ? `${totalFilteredChapters} chapters across ${filteredBranches.length} units`
                : `${gradeTopics.length} chapters loaded from curriculum syllabus`}
              {specGrid &&
                ` · ${Math.round(specGrid.examDurationMinutes / 60)}hr NEB Exam · ${specGrid.creditHours} Credit Hours`}
            </p>

            {/* Student Syllabus Coverage & Performance Tracker */}
            {syllabusProgress.totalChaptersCount > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Syllabus Coverage:
                  </span>
                  <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${syllabusProgress.coveragePercent}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {syllabusProgress.coveragePercent}%
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    ({syllabusProgress.practicedChaptersCount}/
                    {syllabusProgress.totalChaptersCount} chapters practiced)
                  </span>
                </div>

                {syllabusProgress.totalAttempted > 0 && (
                  <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-800 font-medium">
                    <span className="text-slate-500">Subject Accuracy:</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {syllabusProgress.avgAccuracy}%
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      ({syllabusProgress.totalAttempted} Qs)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {specGrid && (
            <button
              type="button"
              onClick={() => setIsSpecGridOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>CDC Specification Grid</span>
            </button>
          )}

          {formulaSheet && (
            <button
              type="button"
              onClick={() => {
                setFormulaTargetUnit(undefined);
                setIsFormulaSheetOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Formula Cheatsheet</span>
            </button>
          )}

          {subjectiveBank && (
            <button
              type="button"
              onClick={() => {
                setSubjectiveTargetChapter(undefined);
                setIsSubjectiveModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Group B &amp; C Qs</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleLaunchPractice("All Topics", "study")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Study All Topics</span>
          </button>

          <button
            type="button"
            onClick={() => handleLaunchPractice("All Topics", "exam")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timed Exam</span>
          </button>
        </div>
      </div>

      {/* Chapter Mastery Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-1">
            Status:
          </span>
          <button
            type="button"
            onClick={() => setMasteryFilter("all")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              masteryFilter === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            All Chapters ({chapterMasteryCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setMasteryFilter("mastered")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              masteryFilter === "mastered"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                : "border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mastered ({chapterMasteryCounts.mastered})</span>
          </button>
          <button
            type="button"
            onClick={() => setMasteryFilter("proficient")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              masteryFilter === "proficient"
                ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                : "border-slate-200 dark:border-slate-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            <span>Proficient ({chapterMasteryCounts.proficient})</span>
          </button>
          <button
            type="button"
            onClick={() => setMasteryFilter("needs_revision")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              masteryFilter === "needs_revision"
                ? "bg-rose-600 text-white border-rose-600 shadow-2xs"
                : "border-slate-200 dark:border-slate-800 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Needs Revision ({chapterMasteryCounts.needsRevision})</span>
          </button>
          <button
            type="button"
            onClick={() => setMasteryFilter("unattempted")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              masteryFilter === "unattempted"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            Unattempted ({chapterMasteryCounts.unattempted})
          </button>
        </div>

        <span className="text-[11px] font-mono font-medium text-slate-400">
          Showing {totalFilteredChapters} of {chapterMasteryCounts.all} chapters
        </span>
      </div>

      {/* Chapters Grid with Backend Branches & Subtopics */}
      {filteredBranches.length > 0 ? (
        <div className="space-y-6">
          {filteredBranches.map((branch) => {
            const unitWeightage = specGrid?.units.find((u) => {
              const normU = u.unitName.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normB = branch.branchName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
              return normU.includes(normB) || normB.includes(normU);
            });

            return (
              <div key={branch.id} className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Unit: {branch.branchName}
                    </h3>
                  </div>

                  {unitWeightage && (
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 shadow-2xs">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span>{unitWeightage.weightageMarks} Marks</span>
                        <span className="text-amber-600/60 dark:text-amber-400/60 font-normal">
                          · {unitWeightage.teachingHours} hrs
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {branch.chapters.map((ch) => {
                    const chMastery = getChapterMastery(ch);
                    return (
                      <div
                        key={ch.id}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                                {ch.id}
                              </span>
                              {chMastery.status === "mastered" && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 shadow-2xs">
                                  <Trophy className="w-3 h-3 text-emerald-500" />
                                  <span>{chMastery.accuracy}%</span>
                                </span>
                              )}
                              {chMastery.status === "proficient" && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 shadow-2xs">
                                  <TrendingUp className="w-3 h-3 text-amber-500" />
                                  <span>{chMastery.accuracy}%</span>
                                </span>
                              )}
                              {chMastery.status === "needs_revision" && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 shadow-2xs">
                                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                                  <span>{chMastery.accuracy}%</span>
                                </span>
                              )}
                              {chMastery.status === "unattempted" && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-400">
                                  Unattempted
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => setInspectingChapter(ch)}
                              className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                            >
                              <span>{ch.topics?.length || 0} subtopics</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {ch.chapterName}
                          </h4>

                          {/* Preview first subtopic brief */}
                          {ch.topics && ch.topics[0]?.brief && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                              {ch.topics[0].brief}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setInspectingChapter(ch)}
                            className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>View Topics</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleLaunchPractice(ch.chapterName, "study")
                              }
                              title="Practice this chapter in Study Mode"
                              className="px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                            >
                              Study
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleLaunchPractice(ch.chapterName, "exam")
                              }
                              title="Timed Test for this chapter"
                              className="px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <span>Test</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback if branches not yet loaded */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradeTopics.map((topicName, index) => (
            <div
              key={topicName}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">
                    Chapter {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    CDC Aligned
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {topicName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Theory, formula derivations, and standard numerical problems.
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  NEB Curriculum
                </span>
                <button
                  type="button"
                  onClick={() => handleLaunchPractice(topicName, "study")}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chapter Subtopics Inspection Modal */}
      {inspectingChapter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            {(() => {
              const modalMastery = getChapterMastery(inspectingChapter);
              return (
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      <span>{inspectingChapter.id}</span>
                      <span>·</span>
                      <span>
                        Grade {selectedGrade} {activeSubject}
                      </span>
                      {modalMastery.attempted > 0 ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                          · {modalMastery.accuracy}% Mastery (
                          {modalMastery.correct}/{modalMastery.attempted} Qs)
                        </span>
                      ) : (
                        <span className="text-slate-400 font-sans font-normal">
                          · Not yet practiced
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {inspectingChapter.chapterName}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectingChapter(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })()}

            {/* Subtopics List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              <div className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                Prescribed Topics &amp; Learning Objectives (
                {inspectingChapter.topics?.length || 0})
              </div>
              {inspectingChapter.topics &&
              inspectingChapter.topics.length > 0 ? (
                inspectingChapter.topics.map((t) => (
                  <div
                    key={t.id || t.topicNumber}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] flex items-center justify-center font-mono shrink-0">
                          {t.topicNumber}
                        </span>
                        <span>{t.topic}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {t.id}
                      </span>
                    </div>
                    {t.brief && (
                      <p className="text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        {t.brief}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  No detailed subtopics recorded for this chapter.
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInspectingChapter(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                {formulaSheet && (
                  <button
                    type="button"
                    onClick={() => {
                      const chapName =
                        inspectingChapter.chapterName.toLowerCase();
                      const matchingUnit = formulaSheet.units.find(
                        (u) =>
                          u.unitName.toLowerCase().includes(chapName) ||
                          u.chapterNames?.some(
                            (c) =>
                              chapName.includes(c.toLowerCase()) ||
                              c.toLowerCase().includes(chapName),
                          ),
                      );
                      setFormulaTargetUnit(matchingUnit?.unitName);
                      setIsFormulaSheetOpen(true);
                    }}
                    className="px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Formulas</span>
                  </button>
                )}
                {subjectiveBank && (
                  <button
                    type="button"
                    onClick={() => {
                      setSubjectiveTargetChapter(inspectingChapter.chapterName);
                      setIsSubjectiveModalOpen(true);
                    }}
                    className="px-3 py-2 text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Group B &amp; C Qs</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleLaunchPractice(inspectingChapter.chapterName, "study")
                  }
                  className="px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Practice in Study Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLaunchPractice(inspectingChapter.chapterName, "exam")
                  }
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timed Exam</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEB Specification Grid & Weightage Modal */}
      <SpecificationGridModal
        grid={specGrid}
        isOpen={isSpecGridOpen}
        onClose={() => setIsSpecGridOpen(false)}
      />

      {/* NEB High-Yield Formula Sheet Modal */}
      {formulaSheet && (
        <FormulaSheetModal
          formulaSheet={formulaSheet}
          isOpen={isFormulaSheetOpen}
          onClose={() => setIsFormulaSheetOpen(false)}
          initialUnit={formulaTargetUnit}
        />
      )}

      {/* NEB Subjective Model Bank (Group B & C) Modal */}
      {subjectiveBank && (
        <SubjectiveBankModal
          bank={subjectiveBank}
          isOpen={isSubjectiveModalOpen}
          onClose={() => setIsSubjectiveModalOpen(false)}
          initialChapter={subjectiveTargetChapter}
        />
      )}
    </div>
  );
};

export default Subjects;
