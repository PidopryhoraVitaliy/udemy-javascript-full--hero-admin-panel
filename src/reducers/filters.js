const initialFilters = [
    { name: "all", label: "Все", className: "btn-outline-dark" },
    { name: "fire", label: "Огонь", className: "btn-danger" },
    { name: "water", label: "Вода", className: "btn-primary" },
    { name: "wind", label: "Ветер", className: "btn-success" },
    { name: "earth", label: "Земля", className: "btn-secondary" }
]

const initialState = {
    activeFilter: 'all',
    filters: initialFilters
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            }
        case 'FILTERS_CHANGE_ACTIVE':
            return {
                ...state,
                activeFilter: action.payload,
            }
        default: return state
    }
}

export default filters;