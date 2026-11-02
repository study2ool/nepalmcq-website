import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateUserLocal } from '../../store/api/authApi';
import { saveUserProfile } from '../../store/api/leaderboardApi';
import { useGetCollegesQuery, useUpdateProfileMutation, CollegeItem } from '../../store/api/apiSlice';
import {
  School,
  Check,
  Search,
  Sparkles,
  Loader2,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Show only if authenticated and student hasn't selected a college yet
  const needsOnboarding = Boolean(
    isAuthenticated && user && (!user.collegeId || !user.isOnboarded)
  );

  const { data: colleges = [] } = useGetCollegesQuery(undefined, { skip: !needsOnboarding });
  const [updateProfileMutation] = useUpdateProfileMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<CollegeItem | null>(null);
  const [customCollegeName, setCustomCollegeName] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [isCustomCollege, setIsCustomCollege] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | 'other' | 'prefer_not_to_say'>('male');
  const [grade, setGrade] = useState<11 | 12>(user?.grade || 12);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-select first college if none selected
  useEffect(() => {
    if (colleges.length > 0 && !selectedCollege) {
      setSelectedCollege(colleges[0]!);
    }
  }, [colleges, selectedCollege]);

  if (!needsOnboarding || !user) return null;

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCollege = (c: CollegeItem) => {
    if (c.id === 'clg_other') {
      setIsCustomCollege(true);
      setSelectedCollege(c);
    } else {
      setIsCustomCollege(false);
      setSelectedCollege(c);
      setCustomCollegeName('');
      setCustomCity('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let finalCollegeId = selectedCollege?.id || 'clg_other';
    let finalCollegeName = selectedCollege?.name || '';
    let finalCity = selectedCollege?.city || 'Nepal';

    if (isCustomCollege) {
      if (!customCollegeName.trim()) {
        setErrorMessage('Please enter your college name');
        return;
      }
      finalCollegeId = `clg_custom_${customCollegeName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30)}`;
      finalCollegeName = customCollegeName.trim();
      finalCity = customCity.trim() || 'Nepal';
    }

    if (!finalCollegeName) {
      setErrorMessage('Please select or specify your college');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        collegeId: finalCollegeId,
        collegeName: finalCollegeName,
        school: finalCollegeName,
        collegeCity: finalCity,
        city: finalCity,
        gender,
        grade,
        name: user.name,
      };

      await updateProfileMutation(payload).unwrap();

      // Update Redux states
      dispatch(
        updateUserLocal({
          collegeId: finalCollegeId,
          collegeName: finalCollegeName,
          collegeCity: finalCity,
          gender,
          grade,
          isOnboarded: true,
        })
      );

      dispatch(
        saveUserProfile({
          school: finalCollegeName,
          city: finalCity,
          grade,
        })
      );
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save student profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Welcome, {user.name.split(' ')[0]}!
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Sparkles className="w-3 h-3" /> Step 1 of 1
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your College and Gender to personalize your dashboard and represent your institution on the Nepal leaderboard.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grade Level Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-wider">
              1. Current Grade / Class
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g as 11 | 12)}
                  className={`p-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    grade === g
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-500 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span>Grade {g}</span>
                  {grade === g && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-wider">
              2. Gender
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'male', label: 'Male', icon: '👨' },
                { id: 'female', label: 'Female', icon: '👩' },
                { id: 'other', label: 'Other', icon: '🧑' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGender(item.id as any)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
                    gender === item.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-500 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* College Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                3. Your Higher Secondary College
              </label>
              <button
                type="button"
                onClick={() => setIsCustomCollege(!isCustomCollege)}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                {isCustomCollege ? 'Choose from list' : '+ Enter other college'}
              </button>
            </div>

            {!isCustomCollege ? (
              <div className="space-y-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your college by name or city..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* College options list */}
                <div className="max-h-48 overflow-y-auto space-y-1.5 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-2 bg-slate-50/50 dark:bg-slate-950/30">
                  {filteredColleges.map((col) => {
                    const isSelected = selectedCollege?.id === col.id;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => handleSelectCollege(col)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="text-xs font-bold truncate">{col.name}</p>
                          <p
                            className={`text-[11px] truncate ${
                              isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {col.city}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                      </button>
                    );
                  })}

                  {filteredColleges.length === 0 && (
                    <div className="p-4 text-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        No college matching "{searchQuery}"
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCollege(true);
                          setCustomCollegeName(searchQuery);
                        }}
                        className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Use "{searchQuery}" as my college name
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    College / School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customCollegeName}
                    onChange={(e) => setCustomCollegeName(e.target.value)}
                    placeholder="e.g. Pentagon International College"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="e.g. Kathmandu / Pokhara / Lalitpur"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving College Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Setup & Start Practicing</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

