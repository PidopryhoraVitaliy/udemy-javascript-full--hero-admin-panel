import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => { state.heroesLoadingStatus = 'error' },
        // ADD
        heroesAdding: state => { state.heroesAddingStatus = 'loading' },
        heroesAdded: (state, action) => {
            state.heroesAddingStatus = 'idle';
            state.heroes.push(action.payload);
        },
        heroesAddingError: state => { state.heroesAddingStatus = 'error'; },
        heroesAddingErrorData: state => { state.heroesAddingStatus = 'error_data'; },
        heroesAddingClearError: state => { state.heroesAddingStatus = 'idle'; },
        // DELETE
        heroesDeleting: state => { state.heroesDeletingStatus = 'loading' },
        heroesDeleted: (state, action) => {
            state.heroesDeletingStatus = 'idle';
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        },
        heroesDeletingError: state => { state.heroesDeletingStatus = 'error' },
    },
})

export const {
    heroesFetching, heroesFetched, heroesFetchingError,
    heroesAdding, heroesAdded, heroesAddingError, heroesAddingErrorData, heroesAddingClearError,
    heroesDeleting, heroesDeleted, heroesDeletingError
} = heroesSlice.actions

export default heroesSlice.reducer