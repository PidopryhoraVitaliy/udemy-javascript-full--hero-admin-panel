import { createSlice } from '@reduxjs/toolkit'

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

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => { state.filtersLoadingStatus = 'loading' },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersChangeActiveFilter: (state, action) => { state.activeFilter = action.payload },
        filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
    },
})

export const { filtersFetching, filtersFetched, filtersChangeActiveFilter, filtersFetchingError } = filtersSlice.actions;
export default filtersSlice.reducer