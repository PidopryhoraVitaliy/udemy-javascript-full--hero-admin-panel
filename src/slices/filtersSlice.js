import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook';

const initialFilters = [
    { name: "all", label: "Все", className: "btn-outline-dark" },
    { name: "fire", label: "Огонь", className: "btn-danger" },
    { name: "water", label: "Вода", className: "btn-primary" },
    { name: "wind", label: "Ветер", className: "btn-success" },
    { name: "earth", label: "Земля", className: "btn-secondary" }
]

const initialState = {
    activeFilter: 'all',
    filters: initialFilters,
    filtersLoadingStatus: 'idle'
}

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
        // filtersFetching: state => { state.filtersLoadingStatus = 'loading' },
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle';
        //     state.filters = action.payload;
        // },
        // filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
        filtersChangeActiveFilter: (state, action) => { state.activeFilter = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
    }
})

export const { filtersChangeActiveFilter,
    // filtersFetching, filtersFetched, filtersFetchingError
} = filtersSlice.actions;
export default filtersSlice.reducer