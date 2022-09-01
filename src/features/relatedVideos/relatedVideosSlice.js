import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRelatedVideos } from './relatedVideosAPI';

const initialState = {
    isLoading: false,
    isError: false,
    relatedVideos: [],
    error: '',
};

export const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchRelatedVideos', async ({tags, id}) => {
    const relatedVideos = await getRelatedVideos({tags, id});

    return relatedVideos;
});

const relatedVideosSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatedVideos.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.relatedVideos = action.payload;
                state.error = '';
            })
            .addCase(fetchRelatedVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.relatedVideos = [];
                state.error = action.error.message;
            });
    },
});

export default relatedVideosSlice.reducer;