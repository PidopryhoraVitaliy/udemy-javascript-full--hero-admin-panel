import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect'

import { fetchHeroes } from '../../actions';
import { heroesDeleting, heroesDeleted, heroesDeletingError } from '../../slices/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filtredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes,
        (activeFilter, heroes) => {
            return (activeFilter === 'all') ? heroes : heroes.filter(h => h.element === activeFilter)
        }
    );
    const filtredHeroes = useSelector(filtredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback((id) => {
        dispatch(heroesDeleting());
        request("http://localhost:3001/heroes/" + id, 'DELETE')
            .then(() => dispatch(heroesDeleted(id)))
            .catch(() => dispatch(heroesDeletingError()))
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