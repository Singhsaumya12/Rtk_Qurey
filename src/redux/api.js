import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "posts",
            providesTags: ["Posts"], 
        }),
        
        newPost: builder.mutation({
            query: (post) => ({
                url: "posts",        
                method: "POST",
                body: post, 
                headers: { "Content-Type": "application/json" },

            }),
            invalidatesTags: ["Posts"], 
        }),
        
        updatePost: builder.mutation({
            query: (post) => ({
                url: `posts/${post.id}`,
                method: "PUT",
                body: post,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["Posts"], 
        }),
        
        deletePost:builder.mutation({
            query:(postId) => ({
                url:`posts/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags:["Posts"]
        })

    }),
});

export const { useGetPostsQuery, useNewPostMutation ,useDeletePostMutation ,useUpdatePostMutation} = myApi;
