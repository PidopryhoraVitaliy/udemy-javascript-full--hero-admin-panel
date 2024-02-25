
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { filtersChangeActiveFilter, selectAll } from "../../slices/filtersSlice";
import store from "../../store";

const HeroesFilters = () => {
    // const { activeFilter, filters } = useSelector(state => state.filters);
    const { activeFilter } = useSelector(state => state.filters);
    // const filters = useSelector(selectAll);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    const changeActiveFilter = (name) => {
        dispatch(filtersChangeActiveFilter(name));
    }

    const buttons = filters.map((filter) => {
        let className = 'btn ' + filter.className;
        if (filter.name === activeFilter) {
            className += ' active';
        }
        return <button
            key={filter.name}
            className={className}
            onClick={() => changeActiveFilter(filter.name)}>
            {filter.label}
        </button>
    });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;