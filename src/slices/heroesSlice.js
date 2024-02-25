import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes")
    },
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // ADD
        heroesAdding: state => { state.heroesAddingStatus = 'loading' },
        heroesAdded: (state, action) => {
            state.heroesAddingStatus = 'idle';
            heroesAdapter.setOne(state, action.payload);
        },
        heroesAddingError: state => { state.heroesAddingStatus = 'error'; },
        heroesAddingErrorData: state => { state.heroesAddingStatus = 'error_data'; },
        heroesAddingClearError: state => { state.heroesAddingStatus = 'idle'; },
        // DELETE
        heroesDeleting: state => { state.heroesDeletingStatus = 'loading' },
        heroesDeleted: (state, action) => {
            state.heroesDeletingStatus = 'idle';
            heroesAdapter.removeOne(state, action.payload);
        },
        heroesDeletingError: state => { state.heroesDeletingStatus = 'error' },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
    }
})

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filtredHeroesSelector = createSelector(
    state => state.filters.activeFilter,
    selectAll,
    (activeFilter, heroes) => {
        return (activeFilter === 'all') ? heroes : heroes.filter(h => h.element === activeFilter)
    }
);

export const {
    // heroesFetching, heroesFetched, heroesFetchingError,
    heroesAdding, heroesAdded, heroesAddingError, heroesAddingErrorData, heroesAddingClearError,
    heroesDeleting, heroesDeleted, heroesDeletingError
} = heroesSlice.actions

export default heroesSlice.reducer