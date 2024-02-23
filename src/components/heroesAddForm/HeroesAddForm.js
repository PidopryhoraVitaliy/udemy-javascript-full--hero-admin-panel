

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { heroesAdded, heroesAdding, heroesAddingClearError, heroesAddingError, heroesAddingErrorData } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {

    const { filters } = useSelector(state => state.filters);
    const { heroesAddingStatus } = useSelector(state => state.heroes);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('empty');

    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleInputChange = (e, setter) => {
        dispatch(heroesAddingClearError())
        setter(e.target.value);
    }

    const clearForm = () => {
        setName('');
        setDescription('');
        setElement('empty');
    }

    const addHeroe = (e) => {
        e.preventDefault();
        if (!name || !description || element === 'empty') {
            dispatch(heroesAddingErrorData())
            return;
        }
        dispatch(heroesAdding());
        const heroe = { id: uuidv4(), name, description, element };
        request("http://localhost:3001/heroes/", 'POST', JSON.stringify(heroe))
            .then((data) => {
                clearForm();
                dispatch(heroesAdded(data))
            })
            .catch(() => dispatch(heroesAddingError()))
    }

    const elements = filters.map((filter) => {
        if (filter.name === 'all') {
            return <option key="empty" value="empty">Я владею элементом...</option>
        } else {
            return <option key={filter.name} value={filter.name}>{filter.label}</option>
        }
    });

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={addHeroe}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => handleInputChange(e, setName)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={description}
                    onChange={(e) => handleInputChange(e, setDescription)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={(e) => handleInputChange(e, setElement)}>
                    {elements}
                    {/* <option value="empty">Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit"
                className="btn btn-primary"
                disabled={heroesAddingStatus !== 'idle'}>
                Создать
            </button>

            {heroesAddingStatus === 'error'
                ? <div>server error</div>
                : null}
            {heroesAddingStatus === 'error_data'
                ? <div>check input data</div>
                : null}
        </form>
    )
}

export default HeroesAddForm;