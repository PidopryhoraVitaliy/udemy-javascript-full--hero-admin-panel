import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { fetchFilters } from '../../actions';

const App = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
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