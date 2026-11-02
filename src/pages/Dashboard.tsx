import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trophy,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Database,
  School,
  GraduationCap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../store";
import { setSubject, setTopic } from "../store/api/quizConfigApi";
import { SubjectName } from "../types/question";
import { useSEO } from "../hooks/useSEO";
import {
  useGetQuizSubjectsQuery,
  useGetLeaderboardQuery,
  useGetDashboardSummaryQuery,
} from "../store/api/apiSlice";
import {
  buildCurrentUserLeaderboardEntry,
  getRankedStudents,
} from "../utils/leaderboardUtils";

export const Dashboard: React.FC = () => {
  useSEO({
    title: "Student Dashboard & Performance Diagnostics",
    description:
      "Track your examination history, accuracy trends, subject mastery, and weak topics across NEB curriculum.",
    canonicalPath: "/dashboard",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.results.history);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // RTK Query Hooks with automatic caching and invalidation
  const { data: bankStats = [] } = useGetQuizSubjectsQuery();
  const { data: serverLeaderboardData } = useGetLeaderboardQuery({ timeframe: "all-time" });
  const { data: backendStats } = useGetDashboardSummaryQuery(undefined, { skip: !isAuthenticated });

  const serverLeaderboard = useMemo(() => {
    if (!serverLeaderboardData) return null;
    return {
      totalStudents: serverLeaderboardData.students.length,
      currentUserRank: serverLeaderboardData.currentUserRank,
    };
  }, [serverLeaderboardData]);

  // Compute aggregate statistics (prioritizes persistent backend stats when available)
  const stats = useMemo(() => {
    if (backendStats && backendStats.lifetime.totalExams > 0) {
      const subAccs: Record<SubjectName, number> = {
        Physics: backendStats.subjectMastery["Physics"]?.accuracy || 0,
        Chemistry: backendStats.subjectMastery["Chemistry"]?.accuracy || 0,
        Biology: backendStats.subjectMastery["Biology"]?.accuracy || 0,
        Mathematics: backendStats.subjectMastery["Mathematics"]?.accuracy || 0,
        English: backendStats.subjectMastery["English"]?.accuracy || 0,
        Nepali: backendStats.subjectMastery["Nepali"]?.accuracy || 0,
        "Computer Science": backendStats.subjectMastery["Computer Science"]?.accuracy || 0,
      };

      const progressData = backendStats.recentTrend.map((t, idx) => ({
        examNumber: t.examNumber || `Test ${idx + 1}`,
        accuracy: t.accuracy,
        score: t.score,
      }));

      const weakTopics = backendStats.weakTopics.map((wt) => ({
        topic: wt.topic,
        subject: wt.subject as SubjectName,
        accuracy: wt.accuracy,
        total: wt.total,
      }));

      const avgScore =
        backendStats.lifetime.totalExams > 0
          ? Math.round(
              (backendStats.lifetime.totalCorrect / backendStats.lifetime.totalExams) * 10
            ) / 10
          : 0;

      return {
        totalExams: backendStats.lifetime.totalExams,
        totalQuestionsAttempted: backendStats.lifetime.totalQuestionsAttempted,
        overallAccuracy: backendStats.lifetime.overallAccuracy,
        averageScore: avgScore,
        bestScore: backendStats.lifetime.bestScore,
        bestAccuracy: backendStats.lifetime.bestAccuracy,
        weakTopics,
        subjectAccuracies: subAccs,
        progressData,
      };
    }

    if (history.length === 0) {
      return {
        totalExams: 0,
        totalQuestionsAttempted: 0,
        overallAccuracy: 0,
        averageScore: 0,
        bestScore: 0,
        bestAccuracy: 0,
        weakTopics: [] as {
          topic: string;
          subject: SubjectName;
          accuracy: number;
          total: number;
        }[],
        subjectAccuracies: {
          Physics: 0,
          Chemistry: 0,
          Biology: 0,
          Mathematics: 0,
          English: 0,
          Nepali: 0,
          "Computer Science": 0,
        },
        progressData: [] as {
          examNumber: string;
          accuracy: number;
          score: number;
        }[],
      };
    }

    const totalExams = history.length;
    let totalQuestionsAttempted = 0;
    let totalCorrect = 0;
    let totalScores = 0;
    let bestScore = 0;
    let bestAccuracy = 0;

    // Subject breakdown
    const subjectStats: Record<
      SubjectName,
      { correct: number; attempted: number }
    > = {
      Physics: { correct: 0, attempted: 0 },
      Chemistry: { correct: 0, attempted: 0 },
      Biology: { correct: 0, attempted: 0 },
      Mathematics: { correct: 0, attempted: 0 },
      English: { correct: 0, attempted: 0 },
      Nepali: { correct: 0, attempted: 0 },
      "Computer Science": { correct: 0, attempted: 0 },
    };

    // Topic aggregator
    const topicStats = new Map<
      string,
      { subject: SubjectName; correct: number; total: number }
    >();

    history.forEach((result) => {
      totalQuestionsAttempted += result.attemptedQuestions;
      totalCorrect += result.correctAnswers;
      totalScores += result.totalMarksObtained;

      if (result.totalMarksObtained > bestScore) {
        bestScore = result.totalMarksObtained;
      }
      if (result.accuracy > bestAccuracy) {
        bestAccuracy = result.accuracy;
      }

      // Subject breakdown
      result.subjectBreakdown.forEach((sb) => {
        if (subjectStats[sb.subject]) {
          subjectStats[sb.subject].correct += sb.correct;
          subjectStats[sb.subject].attempted += sb.attempted;
        }
      });

      // Topics breakdown
      result.topicBreakdown.forEach((tb) => {
        if (!topicStats.has(tb.topic)) {
          topicStats.set(tb.topic, {
            subject: tb.subject,
            correct: 0,
            total: 0,
          });
        }
        const st = topicStats.get(tb.topic)!;
        st.correct += tb.correct;
        st.total += tb.total;
      });
    });

    const overallAccuracy =
      totalQuestionsAttempted > 0
        ? Math.round((totalCorrect / totalQuestionsAttempted) * 100)
        : 0;
    const averageScore = Math.round((totalScores / totalExams) * 10) / 10;

    const calcSubAccuracy = (sub: SubjectName) =>
      subjectStats[sub].attempted > 0
        ? Math.round(
            (subjectStats[sub].correct / subjectStats[sub].attempted) * 100,
          )
        : 0;

    const subjectAccuracies: Record<SubjectName, number> = {
      Physics: calcSubAccuracy("Physics"),
      Chemistry: calcSubAccuracy("Chemistry"),
      Biology: calcSubAccuracy("Biology"),
      Mathematics: calcSubAccuracy("Mathematics"),
      English: calcSubAccuracy("English"),
      Nepali: calcSubAccuracy("Nepali"),
      "Computer Science": calcSubAccuracy("Computer Science"),
    };

    // Weak topics (accuracy < 60% with at least 2 questions)
    const weakTopics = Array.from(topicStats.entries())
      .map(([topic, data]) => ({
        topic,
        subject: data.subject,
        accuracy: Math.round((data.correct / data.total) * 100),
        total: data.total,
      }))
      .filter((t) => t.accuracy < 60)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 4);

    // Progress data (chronological)
    const progressData = [...history]
      .reverse()
      .slice(-10)
      .map((res, i) => ({
        examNumber: `Test ${i + 1}`,
        accuracy: res.accuracy,
        score: res.totalMarksObtained,
      }));

    return {
      totalExams,
      totalQuestionsAttempted,
      overallAccuracy,
      averageScore,
      bestScore,
      bestAccuracy,
      weakTopics,
      subjectAccuracies,
      progressData,
    };
  }, [history]);

  const handlePracticeTopic = (subject: SubjectName, topic: string) => {
    dispatch(setSubject(subject));
    dispatch(setTopic(topic));
    navigate("/practice");
  };

  const authUser = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.leaderboard.profile);

  // Compute live leaderboard rank
  const { currentUser, userRank, totalStudents, isRanked } = useMemo(() => {
    const activeProfile = {
      ...profile,
      school: authUser?.collegeName || profile.school,
      city: authUser?.collegeCity || profile.city,
      grade: authUser?.grade || profile.grade,
      name: authUser?.name || profile.name,
    };
    const user = buildCurrentUserLeaderboardEntry(activeProfile, history);
    const ranked = getRankedStudents(user, "All", "All", "all-time");
    const idx = ranked.findIndex((s) => s.isCurrentUser);

    const total = serverLeaderboard ? serverLeaderboard.totalStudents : ranked.length;
    const rank = serverLeaderboard?.currentUserRank || (idx !== -1 ? idx + 1 : 1);
    const hasAttempted = stats.totalExams > 0 || history.length > 0 || user.totalTests > 0;

    return {
      currentUser: user,
      userRank: rank,
      totalStudents: total,
      isRanked: hasAttempted && total > 0,
    };
  }, [profile, history, authUser, serverLeaderboard, stats.totalExams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Student Dashboard</span>
            <span>·</span>
            <span>Performance History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Academic Progress &amp; Diagnostics
          </h1>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            to="/leaderboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-xs"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Leaderboard {isRanked ? `(#${userRank})` : ''}</span>
          </Link>

          <Link
            to="/practice"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Leaderboard Standing & School Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                National Standing
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-mono">
                Class {currentUser.grade}
              </span>
              {authUser?.gender && authUser.gender !== 'prefer_not_to_say' && (
                <>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-indigo-300 capitalize">
                    {authUser.gender}
                  </span>
                </>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
              {isRanked ? (
                <>Rank #{userRank} of {totalStudents} Students Nationwide</>
              ) : (
                <>Unranked · Complete your first exam to appear on the leaderboard!</>
              )}
            </h4>
            <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md flex items-center gap-1.5 mt-0.5">
              <School className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">
                Representing{" "}
                <strong className="text-slate-200">
                  {authUser?.collegeName || currentUser.school}
                </strong>
                {authUser?.collegeCity ? ` (${authUser.collegeCity})` : ""} ·{" "}
                {currentUser.totalXp.toLocaleString()} XP earned
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/leaderboard"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <span>View Full Leaderboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Aggregate KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Exams Taken
          </span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {stats.totalExams}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Full &amp; topic mocks
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Questions Attempted
          </span>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {stats.totalQuestionsAttempted}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Cumulative practice
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Overall Accuracy
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {stats.overallAccuracy}%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Average success rate
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Average Score
          </span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {stats.averageScore}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Marks per exam
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Best Score
          </span>
          <div className="text-2xl font-bold font-mono text-amber-500">
            {stats.bestScore}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            High mark recorded
          </span>
        </div>
      </div>

      {/* Progress Charts & Subject Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Over Time Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span>Accuracy Trend Over Time</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Recent Examinations
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracks changes in your accuracy percentage over consecutive test
              attempts
            </p>
          </div>

          <div className="h-64 my-4">
            {stats.progressData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.progressData}
                  margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis
                    dataKey="examNumber"
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#1E293B",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#4F46E5" }}
                    activeDot={{ r: 6 }}
                    name="Accuracy %"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                <span>
                  Complete your first examination to generate accuracy trends.
                </span>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span>
              Consistent practice reduces variance in examination scores
            </span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Target: $\ge 80\%$
            </span>
          </div>
        </div>

        {/* Subject Mastery Progress Bars */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Subject Mastery
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated accuracy across tested science disciplines
            </p>
          </div>

          <div className="space-y-3.5 my-3 max-h-[290px] overflow-y-auto pr-1">
            {(
              [
                {
                  name: "Physics",
                  color: "bg-indigo-600",
                  text: "text-indigo-600 dark:text-indigo-400",
                },
                {
                  name: "Chemistry",
                  color: "bg-emerald-600",
                  text: "text-emerald-600 dark:text-emerald-400",
                },
                {
                  name: "Biology",
                  color: "bg-teal-600",
                  text: "text-teal-600 dark:text-teal-400",
                },
                {
                  name: "Mathematics",
                  color: "bg-sky-600",
                  text: "text-sky-600 dark:text-sky-400",
                },
                {
                  name: "English",
                  color: "bg-amber-600",
                  text: "text-amber-600 dark:text-amber-400",
                },
                {
                  name: "Nepali",
                  color: "bg-rose-600",
                  text: "text-rose-600 dark:text-rose-400",
                },
                {
                  name: "Computer Science",
                  color: "bg-violet-600",
                  text: "text-violet-600 dark:text-violet-400",
                },
              ] as const
            ).map((subItem) => {
              const acc = stats.subjectAccuracies[subItem.name];
              return (
                <div key={subItem.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {subItem.name}
                      {bankStats.find((s) => s.name === subItem.name)?.existingQuestionsCount ? (
                        <span className="ml-1.5 text-[10px] font-normal text-slate-400">
                          ({bankStats.find((s) => s.name === subItem.name)?.existingQuestionsCount} questions)
                        </span>
                      ) : null}
                    </span>
                    <span className={`font-mono font-bold ${subItem.text}`}>
                      {acc}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${subItem.color} h-full rounded-full transition-all`}
                      style={{ width: `${acc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/subjects"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80"
          >
            <span>View All Syllabus Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Weak Topics & Recommended Practice */}
      {stats.weakTopics.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/40 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recommended Revision Focus (Weak Topics)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Based on your past results, these chapters had lower accuracy and
            will yield the highest score improvements:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.weakTopics.map((item) => (
              <div
                key={item.topic}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                    {item.subject}
                  </span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-0.5">
                    {item.topic}
                  </span>
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-mono mt-1 block">
                    {item.accuracy}% accuracy
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handlePracticeTopic(item.subject, item.topic)}
                  className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice this topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Examinations History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Examination History
          </h3>
          <Link
            to="/history"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            View Full History ({history.length})
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No examinations recorded yet. Take your first test from the
            Configure page.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Grade &amp; Subject</th>
                  <th className="pb-3">Questions</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Accuracy</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {history.slice(0, 5).map((exam) => (
                  <tr
                    key={exam.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="py-3 text-slate-500 font-mono">
                      {new Date(exam.completedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">
                      Grade {exam.config.grade} · {exam.config.subject}
                    </td>
                    <td className="py-3 font-mono text-slate-600 dark:text-slate-300">
                      {exam.attemptedQuestions}/{exam.totalQuestions}
                    </td>
                    <td className="py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {exam.totalMarksObtained} / {exam.totalPossibleMarks}
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {exam.accuracy}%
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/result/${exam.id}`}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        View Analysis
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
