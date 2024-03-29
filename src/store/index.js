// https://github.com/reduxjs/cra-template-redux

import { configureStore } from '@reduxjs/toolkit';
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import reducer from '../reducers';
// import { thunk } from 'redux-thunk'
// import heroes from '../reducers/heroes';
// import filters from '../reducers/filters';
import heroes from '../slices/heroesSlice';
import filters from '../slices/filtersSlice';

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(
//         applyMiddleware(thunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({ type: action })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }
// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(
//         enhancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;