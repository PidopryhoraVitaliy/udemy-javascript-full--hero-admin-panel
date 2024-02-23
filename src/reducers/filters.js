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

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error',
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
            }
        default: return state
    }
}

export default filters;