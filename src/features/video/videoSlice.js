import { getVideo } from './videoAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isError: false,
    video: {},
    error: '',
};

export const fetchVideo = createAsyncThunk('video/fetchVideo', async (id) => {
    const video = await getVideo(id);

    return video;
});

const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.video = action.payload;
                state.error = '';
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.video = [];
                state.error = action.error.message;
            });
    },
});

export default videoSlice.reducer;