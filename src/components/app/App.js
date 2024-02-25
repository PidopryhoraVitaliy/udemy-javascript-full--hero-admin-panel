import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilters } from '../../slices/filtersSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddForm />
                    <HeroesFilters />
                </div>
            </div>
        </main>
    )
}

export default App;