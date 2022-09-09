import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ['videos', 'video', 'relatedVideo'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            providesTags: ['videos'],
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [
                {
                    type: 'video',
                    id: arg,
                },
            ],
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const relatedWords = title.split(' ');
                const queryString = relatedWords
                    .map((word) => `title_like=${word}`)
                    .join('&');

                return `/videos?${queryString}&_limit=5&id_ne=${id}`;
            },
            providesTags: (result, error, arg) => [
                {
                    type: 'relatedVideos',
                    id: arg.id,
                },
            ],
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['videos'],
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                'videos',
                { type: 'video', id: arg.id },
                { type: 'relatedVideo', id: arg.id },
            ],
        }),
        deleteVideo: builder.mutation({
            query: (videoId) => ({
                url: `/videos/${videoId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['videos'],
        }),
    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideosQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
} = apiSlice;
