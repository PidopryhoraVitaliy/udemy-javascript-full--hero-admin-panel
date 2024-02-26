import { configureStore } from '@reduxjs/toolkit';
import heroes from '../slices/heroesSlice';
import filters from '../slices/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

const store = configureStore({
    reducer: { heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;