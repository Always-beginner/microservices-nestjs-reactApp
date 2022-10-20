import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "login",
          method: "post",
          body: body,
        };
      },
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});
export const { useLoginUserMutation } = authApi;
