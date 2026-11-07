import { apiSlice } from "./baseApi";

export interface CollegeItem {
  id: string;
  name: string;
  city: string;
  isPopular?: boolean;
}

export const collegeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColleges: builder.query<CollegeItem[], string | void>({
      query: (search) =>
        search ? `/colleges?search=${encodeURIComponent(search)}` : "/colleges",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["Colleges"],
    }),
  }),
});

export const { useGetCollegesQuery, useLazyGetCollegesQuery } = collegeApiSlice;
