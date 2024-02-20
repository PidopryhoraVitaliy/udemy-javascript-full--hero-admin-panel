const initialFilters = [
    { name: "all", label: "Все", className: "btn-outline-dark" },
    { name: "fire", label: "Огонь", className: "btn-danger" },
    { name: "water", label: "Вода", className: "btn-primary" },
    { name: "wind", label: "Ветер", className: "btn-success" },
    { name: "earth", label: "Земля", className: "btn-secondary" }
]

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
    activeFilter: 'all',
    filters: initialFilters
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'HEROES_DELETING':
            return {
                ...state,
                heroesDeletingStatus: 'loading'
            }
        case 'HEROES_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesDeletingStatus: 'idle'
            }
        case 'HEROES_DELETING_ERROR':
            return {
                ...state,
                heroesDeletingStatus: 'error'
            }

        case 'HEROES_ADDING':
            return {
                ...state,
                heroesAddingStatus: 'loading'
            }
        case 'HEROES_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesAddingStatus: 'idle'
            }
        case 'HEROES_ADDING_ERROR':
            return {
                ...state,
                heroesAddingStatus: 'error'
            }
        case 'HEROES_ADDING_ERROR_DATA':
            return {
                ...state,
                heroesAddingStatus: 'error_data'
            }
        case 'HEROES_ADDING_CLEAR_ERROR':
            return {
                ...state,
                heroesAddingStatus: 'idle'
            }

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

export default reducer;