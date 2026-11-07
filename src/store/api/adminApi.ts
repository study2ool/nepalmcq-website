import { apiSlice } from "./baseApi";
import type { User } from "./authApi";

export interface GenderBreakdown {
  male: number;
  female: number;
  other: number;
}

export interface SchoolAnalyticsItem {
  collegeId: string;
  name: string;
  city: string;
  studentCount: number;
  male: number;
  female: number;
  other: number;
}

export interface PlatformAnalytics {
  id: string;
  totalColleges: number;
  totalStudents: number;
  totalUsers: number;
  onboardedCount: number;
  genderWise: GenderBreakdown;
  schoolWise: Record<string, SchoolAnalyticsItem>;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalStudents?: number;
  usersByRole: {
    student: number;
    teacher: number;
    admin: number;
  };
  onboardedCount: number;
  genderDistribution: Record<string, number>;
  gradeDistribution?: Record<string, number>;
  schoolWise?: Record<string, SchoolAnalyticsItem>;
  analytics?: PlatformAnalytics;
  totalColleges: number;
  totalAttempts: number;
  totalQuestionsAnswered: number;
  averageAccuracy: number;
  averageScore: number;
  recentUsers: User[];
  recentAttempts: Array<{
    id: string;
    userId: string;
    studentName: string;
    subject: string;
    grade: number;
    score: number;
    totalMarks: number;
    accuracy: number;
    completedAt: string;
  }>;
  topSchools: Array<{
    id: string;
    collegeId: string;
    name: string;
    city: string;
    studentCount: number;
    totalXp: number;
    averageAccuracy: number;
    topSubject: string;
    nationalRank: number;
  }>;
  totalInquiries?: number;
  pendingInquiries?: number;
  inquiryStats?: {
    total: number;
    pending: number;
    reviewed: number;
    resolved: number;
    archived: number;
    byCategory: Record<string, number>;
  };
}

export interface AdminSchool {
  id: string;
  name: string;
  city: string;
  isPopular?: boolean;
  studentCount: number;
}

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
      transformResponse: (res: any) => res.data,
      providesTags: ["AdminStats"],
    }),

    getAdminUsers: builder.query<
      User[],
      { search?: string; role?: string; grade?: number } | void
    >({
      query: (params) => {
        const sp = new URLSearchParams();
        if (params?.search) sp.set("search", params.search);
        if (params?.role && params.role !== "all") sp.set("role", params.role);
        if (params?.grade) sp.set("grade", String(params.grade));
        return `/admin/users${sp.toString() ? `?${sp.toString()}` : ""}`;
      },
      transformResponse: (res: any) => res.data || [],
      providesTags: ["AdminUsers"],
    }),

    getAdminUserById: builder.query<
      { user: User; stats: any; attempts: any[] },
      string
    >({
      query: (id) => `/admin/users/${id}`,
      transformResponse: (res: any) => res.data,
    }),

    updateAdminUser: builder.mutation<
      User,
      { id: string; updates: Partial<User> }
    >({
      query: ({ id, updates }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),

    deleteAdminUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),

    getAdminSchools: builder.query<AdminSchool[], string | void>({
      query: (search) =>
        search
          ? `/admin/schools?search=${encodeURIComponent(search)}`
          : "/admin/schools",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["AdminSchools"],
    }),

    createAdminSchool: builder.mutation<
      AdminSchool,
      { name: string; city: string; isPopular?: boolean }
    >({
      query: (payload) => ({
        url: "/admin/schools",
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["AdminSchools", "Colleges", "AdminStats"],
    }),

    updateAdminSchool: builder.mutation<
      AdminSchool,
      {
        id: string;
        payload: Partial<{ name: string; city: string; isPopular: boolean }>;
      }
    >({
      query: ({ id, payload }) => ({
        url: `/admin/schools/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["AdminSchools", "Colleges", "AdminStats"],
    }),

    deleteAdminSchool: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/schools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminSchools", "Colleges", "AdminStats"],
    }),

    getPlatformAnalytics: builder.query<PlatformAnalytics, void>({
      query: () => "/admin/analytics",
      transformResponse: (res: any) => res.data,
      providesTags: ["AdminStats"],
    }),

    syncPlatformAnalytics: builder.mutation<PlatformAnalytics, void>({
      query: () => ({
        url: "/admin/analytics/sync",
        method: "POST",
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["AdminStats", "Colleges", "Leaderboard"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
  useGetAdminSchoolsQuery,
  useCreateAdminSchoolMutation,
  useUpdateAdminSchoolMutation,
  useDeleteAdminSchoolMutation,
  useGetPlatformAnalyticsQuery,
  useSyncPlatformAnalyticsMutation,
} = adminApiSlice;
