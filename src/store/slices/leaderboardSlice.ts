import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubjectName, GradeLevel } from '../../types/question';
import {
  StudentProfile,
  LeaderboardScope,
  TimeframeFilter,
} from '../../types/leaderboard';
import {
  getStoredUserProfile,
  saveStoredUserProfile,
  DEFAULT_USER_PROFILE,
} from '../../utils/leaderboardUtils';

interface LeaderboardState {
  profile: StudentProfile;
  scope: LeaderboardScope;
  gradeFilter: 'All' | GradeLevel;
  subjectFilter: 'All' | SubjectName;
  timeframe: TimeframeFilter;
  schoolFilter: string;
  searchQuery: string;
  isProfileModalOpen: boolean;
  isBadgesModalOpen: boolean;
}

const initialProfile = getStoredUserProfile() || DEFAULT_USER_PROFILE;

const initialState: LeaderboardState = {
  profile: initialProfile,
  scope: 'students',
  gradeFilter: 'All',
  subjectFilter: 'All',
  timeframe: 'all-time',
  schoolFilter: 'All Schools',
  searchQuery: '',
  isProfileModalOpen: false,
  isBadgesModalOpen: false,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<Partial<Omit<StudentProfile, 'id' | 'joinDate'>>>
    ) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
      saveStoredUserProfile(state.profile);
    },
    setScope: (state, action: PayloadAction<LeaderboardScope>) => {
      state.scope = action.payload;
    },
    setGradeFilter: (state, action: PayloadAction<'All' | GradeLevel>) => {
      state.gradeFilter = action.payload;
    },
    setSubjectFilter: (state, action: PayloadAction<'All' | SubjectName>) => {
      state.subjectFilter = action.payload;
    },
    setTimeframe: (state, action: PayloadAction<TimeframeFilter>) => {
      state.timeframe = action.payload;
    },
    setSchoolFilter: (state, action: PayloadAction<string>) => {
      state.schoolFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setProfileModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProfileModalOpen = action.payload;
    },
    setBadgesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isBadgesModalOpen = action.payload;
    },
  },
});

export const {
  updateProfile,
  setScope,
  setGradeFilter,
  setSubjectFilter,
  setTimeframe,
  setSchoolFilter,
  setSearchQuery,
  setProfileModalOpen,
  setBadgesModalOpen,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
