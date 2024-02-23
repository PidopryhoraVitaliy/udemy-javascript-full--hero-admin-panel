import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetched, heroesFetching, heroesFetchingError,
    heroesAdding, heroesAdded, heroesAddingError, heroesAddingErrorData,
    heroesDeleted, heroesDeleting, heroesDeletingError
} from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
}

const heroes = createReducer(initialState, {
    // FETCH
    [heroesFetching]: state => { state.heroesLoadingStatus = 'loading' },
    [heroesFetched]: (state, action) => {
        state.heroesLoadingStatus = 'idle';
        state.heroes = action.payload;
    },
    [heroesFetchingError]: state => { state.heroesLoadingStatus = 'error' },
    // ADD
    [heroesAdding]: state => { state.heroesAddingStatus = 'loading' },
    [heroesAdded]: (state, action) => {
        state.heroesAddingStatus = 'idle';
        state.heroes.push(action.payload);
    },
    [heroesAddingError]: state => { state.heroesAddingStatus = 'error'; },
    [heroesAddingErrorData]: state => { state.heroesAddingStatus = 'error_data'; },
    // DELETE
    [heroesDeleting]: state => { state.heroesDeletingStatus = 'loading' },
    [heroesDeleted]: (state, action) => {
        state.heroesDeletingStatus = 'idle';
        state.heroes = state.heroes.filter(item => item.id !== action.payload);
    },
    [heroesDeletingError]: state => { state.heroesDeletingStatus = 'error' },
},
    [],
    // DEFAULT
    state => state
);

// const heroes = createReducer(initialState, builder => {
//     builder
//         // FETCH
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading'
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         })
//         // ADD
//         .addCase(heroesAdding, state => {
//             state.heroesAddingStatus = 'loading';
//         })
//         .addCase(heroesAdded, (state, action) => {
//             state.heroesAddingStatus = 'idle';
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroesAddingError, state => {
//             state.heroesAddingStatus = 'error';
//         })
//         .addCase(heroesAddingErrorData, state => {
//             state.heroesAddingStatus = 'error_data';
//         })
//         // DELETE
//         .addCase(heroesDeleting, state => {
//             state.heroesDeletingStatus = 'loading'
//         })
//         .addCase(heroesDeleted, (state, action) => {
//             state.heroesDeletingStatus = 'idle';
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addCase(heroesDeletingError, state => {
//             state.heroesDeletingStatus = 'error';
//         })
//         // DEFAULT
//         .addDefaultCase(() => { });
// });

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }

//         case 'HEROES_DELETING':
//             return {
//                 ...state,
//                 heroesDeletingStatus: 'loading'
//             }
//         case 'HEROES_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//                 heroesDeletingStatus: 'idle'
//             }
//         case 'HEROES_DELETING_ERROR':
//             return {
//                 ...state,
//                 heroesDeletingStatus: 'error'
//             }

//         case 'HEROES_ADDING':
//             return {
//                 ...state,
//                 heroesAddingStatus: 'loading'
//             }
//         case 'HEROES_ADDED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 heroesAddingStatus: 'idle'
//             }
//         case 'HEROES_ADDING_ERROR':
//             return {
//                 ...state,
//                 heroesAddingStatus: 'error'
//             }
//         case 'HEROES_ADDING_ERROR_DATA':
//             return {
//                 ...state,
//                 heroesAddingStatus: 'error_data'
//             }
//         case 'HEROES_ADDING_CLEAR_ERROR':
//             return {
//                 ...state,
//                 heroesAddingStatus: 'idle'
//             }
//         default: return state
//     }
// }

export default heroes;