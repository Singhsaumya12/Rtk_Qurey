
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
    }),
    tagTypes:["Posts"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "posts",
        providesTags:["Posts"]   
        }),
        newPost: builder.mutation({
            query: (post) => ({
                url: "posts",
                method: "POST",
                body: post,  
                // headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["Posts"],  
        }),
    }),
});

export const { useGetPostsQuery, useNewPostMutation } = myApi;
