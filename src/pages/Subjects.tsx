import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { GradeLevel, SubjectName } from '../types/question';
import { useAppDispatch, useAppSelector } from '../store';
import { setGrade, setSubject, setTopic } from '../store/api/quizConfigApi';
import { fetchSubjectDetails } from '../store/api/syllabusApi';
import { useSEO } from '../hooks/useSEO';

export const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(12);
  const [activeSubject, setActiveSubject] = useState<string>('Physics');

  const { subjects, topicsByGrade, syllabusBySubject } = useAppSelector(
    (state) => state.syllabus
  );

  useSEO({
    title: 'Science Curriculum Syllabi & Chapters – Grade 11 & 12',
    description:
      'Explore official Nepal NEB science curriculum chapters and syllabus trees for Physics, Chemistry, Biology, Mathematics, Computer Science, English, and Nepali.',
    canonicalPath: '/subjects',
  });

  // Fetch full syllabus tree for active subject when changed
  useEffect(() => {
    if (activeSubject) {
      dispatch(fetchSubjectDetails(activeSubject));
    }
  }, [activeSubject, dispatch]);

  // Only display Science subjects
  const scienceSubjects = subjects.filter((s) => s.category === 'science');

  // Dynamic chapters list from backend syllabus
  const gradeTopics =
    topicsByGrade[selectedGrade]?.[activeSubject] ||
    scienceSubjects.find((s) => s.name === activeSubject)?.chaptersByGrade[selectedGrade] ||
    [];

  // Detailed syllabus branches for active subject from backend
  const activeSyllabus = syllabusBySubject[activeSubject];
  const activeGradeData = activeSyllabus?.grades?.[String(selectedGrade) as '11' | '12'];
  const activeBranches = activeGradeData?.branches || [];

  const handleLaunchTopicPractice = (topic: string) => {
    dispatch(setGrade(selectedGrade));
    dispatch(setSubject(activeSubject as SubjectName));
    dispatch(setTopic(topic));
    navigate('/practice');
  };

  const subjectIcons: Record<string, React.ElementType> = {
    Physics: Atom,
    Chemistry: Flame,
    Biology: Dna,
    Mathematics: Calculator,
    English: Languages,
    Nepali: Scroll,
    'Computer Science': Code2,
  };

  const ActiveIcon = subjectIcons[activeSubject] || BookOpen;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Official NEB Science Curriculum</span>
          <span>·</span>
          <span>Curriculum Development Centre (CDC) Grid</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Science Syllabus &amp; Chapters
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Explore complete chapter maps, units, and lesson topics loaded directly from the backend science syllabus folder.
        </p>
      </div>

      {/* Grade Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start">
          {[11, 12].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGrade(g as GradeLevel)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedGrade === g
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Grade {g} Science
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Nepal National Examination Board (+2 Science)
        </div>
      </div>

      {/* Science Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(scienceSubjects.length > 0
          ? scienceSubjects
          : [
              { name: 'Physics', code: 'PHY' },
              { name: 'Chemistry', code: 'CHE' },
              { name: 'Biology', code: 'BIO' },
              { name: 'Mathematics', code: 'MAT' },
              { name: 'Computer Science', code: 'CS' },
              { name: 'English', code: 'ENG' },
              { name: 'Nepali', code: 'NEP' },
            ]
        ).map((sub) => {
          const isSubActive = activeSubject === sub.name;
          const Icon = subjectIcons[sub.name] || BookOpen;
          return (
            <button
              key={sub.name}
              type="button"
              onClick={() => setActiveSubject(sub.name)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                isSubActive
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sub.name}</span>
              <span className="text-[10px] opacity-60 font-mono">({sub.code})</span>
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Grade {selectedGrade} {activeSubject}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                Science Stream
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {gradeTopics.length} chapters loaded directly from backend science syllabus
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            dispatch(setGrade(selectedGrade));
            dispatch(setSubject(activeSubject as SubjectName));
            dispatch(setTopic('All Topics'));
            navigate('/practice');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs shrink-0"
        >
          <span>Practice All {activeSubject} Topics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Chapters Grid with Backend Branches & Subtopics */}
      {activeBranches.length > 0 ? (
        <div className="space-y-6">
          {activeBranches.map((branch) => (
            <div key={branch.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Unit: {branch.branchName}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {branch.chapters.map((ch) => (
                  <div
                    key={ch.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                          {ch.id}
                        </span>
                        <span>{ch.topics?.length || 0} subtopics</span>
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

                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        CDC Grid Aligned
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLaunchTopicPractice(ch.chapterName)}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice Chapter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
                  <span className="font-mono">Chapter {String(index + 1).padStart(2, '0')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">CDC Aligned</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {topicName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Theory, formula derivations, and standard numerical problems.
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">MCQ Mock Ready</span>
                <button
                  type="button"
                  onClick={() => handleLaunchTopicPractice(topicName)}
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
    </div>
  );
};

export default Subjects;
