const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { getVideos } = require('./videosAPI');

const initialState = {
    isLoading: false,
    isError: false,
    videos: [],
    error: '',
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const videos = await getVideos();

    return videos;
});

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.videos = action.payload;
                state.error = '';
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.videos = [];
                state.error = action.error.message;
            });
    },
});

export default videosSlice.reducer;