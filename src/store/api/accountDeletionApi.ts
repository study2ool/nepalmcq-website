import { apiSlice } from './baseApi';

export interface AccountDeletionPayload {
  email?: string;
  reason?: string;
  feedback?: string;
  source?: string;
}

export interface AccountDeletionResponse {
  id: string;
  email: string;
  reason: string;
  feedback?: string;
  status: 'pending' | 'completed' | 'cancelled';
  source: string;
  requestedAt: string;
}

export const accountDeletionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccountDeletion: builder.mutation<
      AccountDeletionResponse,
      AccountDeletionPayload
    >({
      query: (body) => ({
        url: "/account-deletions",
        method: "POST",
        body: {
          ...body,
          source: body.source || "website",
        },
      }),
      invalidatesTags: ["AccountDeletions"],
    }),
    getAccountDeletionById: builder.query<
      AccountDeletionResponse,
      string
    >({
      query: (id) => `/account-deletions/${encodeURIComponent(id)}`,
      providesTags: (_result, _error, id) => [
        { type: "AccountDeletions", id },
      ],
    }),
  }),
});

export const {
  useCreateAccountDeletionMutation,
  useGetAccountDeletionByIdQuery,
} = accountDeletionApi;

