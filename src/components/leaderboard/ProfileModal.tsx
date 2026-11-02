import React, { useState } from 'react';
import { X, User, School, MapPin, Check, GraduationCap } from 'lucide-react';
import { StudentProfile } from '../../types/leaderboard';
import { GradeLevel } from '../../types/question';
import { NEPAL_POPULAR_SCHOOLS } from '../../data/mockLeaderboard';

interface ProfileModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  onClose: () => void;
  onSave: (updated: Partial<StudentProfile>) => void;
}

const AVATAR_COLORS = [
  { name: 'Indigo', bg: 'bg-indigo-600' },
  { name: 'Emerald', bg: 'bg-emerald-600' },
  { name: 'Violet', bg: 'bg-violet-600' },
  { name: 'Sky', bg: 'bg-sky-600' },
  { name: 'Amber', bg: 'bg-amber-600' },
  { name: 'Rose', bg: 'bg-rose-600' },
  { name: 'Teal', bg: 'bg-teal-600' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [school, setSchool] = useState(profile.school);
  const [city, setCity] = useState(profile.city);
  const [grade, setGrade] = useState<GradeLevel>(profile.grade);
  const [avatarBg, setAvatarBg] = useState(profile.avatarBg);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'You (Student)',
      school: school.trim() || "St. Xavier's College",
      city: city.trim() || 'Kathmandu',
      grade,
      avatarBg,
    });
    onClose();
  };

  const handleSelectPopularSchool = (item: { name: string; city: string }) => {
    setSchool(item.name);
    setCity(item.city);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Leaderboard Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize your name and college to represent your institution on Nepal MCQ
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Preview & Color Palette */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Avatar Color
            </label>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm ${avatarBg}`}
              >
                {name ? name.slice(0, 2).toUpperCase() : 'ME'}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {AVATAR_COLORS.map((c) => (
                  <button
                    key={c.bg}
                    type="button"
                    onClick={() => setAvatarBg(c.bg)}
                    className={`w-7 h-7 rounded-xl ${c.bg} flex items-center justify-center text-white transition-transform ${
                      avatarBg === c.bg ? 'scale-110 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {avatarBg === c.bg && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Full Name or Display Handle
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Shrestha"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Academic Level */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Academic Grade
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g as GradeLevel)}
                  className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    grade === g
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Grade {g} (NEB)</span>
                </button>
              ))}
            </div>
          </div>

          {/* School / College Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Secondary School / +2 College
              </label>
              <span className="text-[10px] text-slate-400">Type or select below</span>
            </div>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. St. Xavier's College, Prasadi Academy..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Popular quick-pick badges */}
            <div className="mt-2.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1.5">
                Quick Select Popular NEB Colleges:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {NEPAL_POPULAR_SCHOOLS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelectPopularSchool(item)}
                    className="px-2 py-1 text-[11px] rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City / District */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              City / Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Kathmandu, Lalitpur, Pokhara, Chitwan"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit & Cancel */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
