import { getTags } from './tagsAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isError: false,
    tags: [],
    error: '',
};

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const tags = await getTags();

    return tags;
});

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.tags = action.payload;
                state.error = '';
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.tags = [];
                state.error = action.error.message;
            });
    },
});

export default tagsSlice.reducer;