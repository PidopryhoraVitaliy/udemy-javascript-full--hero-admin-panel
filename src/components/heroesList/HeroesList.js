import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { createSelector } from 'reselect'
// import { createSelector } from '@reduxjs/toolkit'

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// import { fetchHeroes } from '../../actions';
import { fetchHeroes, filtredHeroesSelector } from '../../slices/heroesSlice';
import { heroesDeleting, heroesDeleted, heroesDeletingError } from '../../slices/heroesSlice';

import './heroesList.scss';

const HeroesList = () => {
    const filtredHeroes = useSelector(filtredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback((id) => {
        dispatch(heroesDeleting());
        request("http://localhost:3001/heroes/" + id, 'DELETE')
            .then(() => dispatch(heroesDeleted(id)))
            .catch(() => dispatch(heroesDeletingError()))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} deleteHero={() => deleteHero(id)} />
            // return (
            //     <CSSTransition
            //         key={id}
            //         timeout={1000}
            //         classNames="hero">
            //         <HeroesListItem  {...props} deleteHero={() => deleteHero(id)} />
            //     </CSSTransition>
            // )
        })
    }

    const elements = renderHeroesList(filtredHeroes);
    return (
        <ul>
            {elements}
        </ul>
        // <TransitionGroup component="ul">
        //     {elements}
        // </TransitionGroup>
    )
}

export default HeroesList;