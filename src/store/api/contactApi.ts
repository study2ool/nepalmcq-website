import { apiSlice } from './baseApi';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  category: string;
  role: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'archived';
  source: string;
  userId?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactInquiryPayload {
  name: string;
  email: string;
  category?: string;
  role?: string;
  subject?: string;
  message: string;
  source?: string;
}

export interface UpdateContactInquiryPayload {
  id: string;
  status?: 'pending' | 'reviewed' | 'resolved' | 'archived';
  adminNotes?: string;
}

export interface ContactInquiryStats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
  archived: number;
  byCategory: Record<string, number>;
}

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactInquiry: builder.mutation<
      ContactInquiry,
      CreateContactInquiryPayload
    >({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body: {
          ...body,
          source: body.source || 'website',
        },
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ['ContactInquiries', 'AdminStats'],
    }),

    getAdminInquiries: builder.query<
      ContactInquiry[],
      { search?: string; category?: string; status?: string } | void
    >({
      query: (params) => {
        const sp = new URLSearchParams();
        if (params?.search) sp.set('search', params.search);
        if (params?.category && params.category !== 'all')
          sp.set('category', params.category);
        if (params?.status && params.status !== 'all')
          sp.set('status', params.status);
        return `/admin/inquiries${sp.toString() ? `?${sp.toString()}` : ''}`;
      },
      transformResponse: (res: any) => res.data || [],
      providesTags: ['ContactInquiries'],
    }),

    getAdminInquiryStats: builder.query<ContactInquiryStats, void>({
      query: () => '/admin/inquiries/stats',
      transformResponse: (res: any) => res.data,
      providesTags: ['ContactInquiries'],
    }),

    getAdminInquiryById: builder.query<ContactInquiry, string>({
      query: (id) => `/admin/inquiries/${id}`,
      transformResponse: (res: any) => res.data,
      providesTags: (_res, _err, id) => [{ type: 'ContactInquiries', id }],
    }),

    updateAdminInquiry: builder.mutation<
      ContactInquiry,
      UpdateContactInquiryPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/inquiries/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ['ContactInquiries', 'AdminStats'],
    }),

    deleteAdminInquiry: builder.mutation<{ id: string; deleted: boolean }, string>({
      query: (id) => ({
        url: `/admin/inquiries/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ['ContactInquiries', 'AdminStats'],
    }),
  }),
});

export const {
  useSubmitContactInquiryMutation,
  useGetAdminInquiriesQuery,
  useGetAdminInquiryStatsQuery,
  useGetAdminInquiryByIdQuery,
  useUpdateAdminInquiryMutation,
  useDeleteAdminInquiryMutation,
} = contactApiSlice;

