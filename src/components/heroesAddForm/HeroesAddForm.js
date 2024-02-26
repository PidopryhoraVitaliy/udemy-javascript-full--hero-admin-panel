import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { heroesAdded, heroesAdding, heroesAddingClearError, heroesAddingError, heroesAddingErrorData } from "../../slices/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import { selectAll } from "../../slices/filtersSlice";
import store from "../../store"
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {

    const filters = selectAll(store.getState());

    const [createHero, { isLoading, isError }] = useCreateHeroMutation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('empty');

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    }

    const addHeroe = (e) => {
        e.preventDefault();
        const hero = { id: uuidv4(), name, description, element };
        createHero(hero).unwrap();
        setName('');
        setDescription('');
        setElement('empty');
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
                disabled={isLoading}>
                Создать
            </button>

            {isError
                ? <div>server error</div>
                : null}
        </form>
    )
}

export default HeroesAddForm;