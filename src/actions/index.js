export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}


export const heroesDeleting = () => {
    return {
        type: 'HEROES_DELETING'
    }
}
export const heroesDeleted = (heroesId) => {
    return {
        type: 'HEROES_DELETED',
        payload: heroesId
    }
}
export const heroesDeletingError = () => {
    return {
        type: 'HEROES_DELETING_ERROR'
    }
}

export const heroesAdding = () => {
    return {
        type: 'HEROES_ADDING'
    }
}
export const heroesAdded = (heroes) => {
    return {
        type: 'HEROES_ADDED',
        payload: heroes
    }
}
export const heroesAddingError = () => {
    return {
        type: 'HEROES_ADDING_ERROR'
    }
}
export const heroesAddingErrorData = () => {
    return {
        type: 'HEROES_ADDING_ERROR_DATA'
    }
}
export const heroesAddingClearError = () => {
    return {
        type: 'HEROES_ADDING_CLEAR_ERROR'
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersChangeActiveFilter = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}
// export const filtersChangeActiveFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTERS_CHANGE_ACTIVE',
//             payload: filter
//         })
//     }, 500);
// }
export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}
