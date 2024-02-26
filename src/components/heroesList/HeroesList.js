import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
import { useDeleteHeroMutation, useGetHeroesQuery } from '../../api/apiSlice';

const HeroesList = () => {

    const { data: heroes = [], isLoading, isFetching, isError } = useGetHeroesQuery('');
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filtredHeroes = useMemo(() => {
        const filtredHeroes = heroes.slice();
        return (activeFilter === 'all') ? filtredHeroes : filtredHeroes.filter(h => h.element === activeFilter)
    }, [heroes, activeFilter]);

    const [deleteHero] = useDeleteHeroMutation();

    const onDelete = useCallback((id) => {
        deleteHero(id);
    }, []);

    if (isLoading || isFetching) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            // return <HeroesListItem key={id} {...props} deleteHero={() => onDelete(id)} />
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} deleteHero={() => onDelete(id)} />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filtredHeroes);
    return (
        // <ul>
        //     {elements}
        // </ul>
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;