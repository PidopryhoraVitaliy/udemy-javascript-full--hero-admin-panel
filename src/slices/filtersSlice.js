import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook';
import { useSelector } from 'react-redux';

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name,
});

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters")
    },
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChangeActiveFilter: (state, action) => { state.activeFilter = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
    }
})

export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);

export const { filtersChangeActiveFilter } = filtersSlice.actions;
export default filtersSlice.reducer