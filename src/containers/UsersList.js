import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Filter} from "../components/Filter";
import {List} from "../components/List";
import {Error} from "../components/Error";
import {Loading} from "../components/Loading";
import {getUsers} from "../actions/listUsersActions";
import {AddContact} from "./AddContact";
import {contactDischarge, deleteContact} from "../actions/contactActions";

export function UsersList() {
    //проверка элемента на использование
    const [touched, setTouched] = useState(false);
    //данные списка
    const [filterUsers, setFilterUsers] = useState([]);

    const [isAddContactOpened, setIsAddContactOpened] = useState(false);

    const contactStatus = useSelector(state => state.contact.status);
    const contactError = useSelector(state => state.contact.errorMessage);

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const users = useSelector(state => state.users.list);
    const usersStatus = useSelector(state => state.users.status);
    const usersError = useSelector(state => state.users.errorMessage);

    const [textButton, setTextButton] = useState('Добавить');
    const [user, setUser] = useState({});

    useEffect(() => {
        if ((token && usersStatus === 'init') || contactStatus === 'success') {
            dispatch(getUsers(token));
            dispatch(contactDischarge());
            setTouched(false);
        }
    }, [token, dispatch, usersStatus, contactStatus]);
    //обработчик поля поиска пользователя
    const handleChangeSearch = (ev) => {
        setTouched(true);
        setFilterUsers(users);
        let value = ev.target.value;
        let reg = new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'), 'i');
        let filterData = users.filter(item => reg.test(item.name));
        setFilterUsers(filterData);
    }

    const handleOnClick = (ev) => {
        if (ev.target.textContent !== 'Del') {
            setIsAddContactOpened(!isAddContactOpened);
        }
        if (ev.target.textContent !== 'Add') {
            const id = Number(ev.target.id);
            const user = users.find(item => item.id === id);
            setUser(user);
        }
        if (ev.target.textContent === 'Edit') {
            setTextButton('Редактировать');
        }
        if (ev.target.textContent === 'Del') {
            const data = {
                token,
                id: ev.target.id,
            }
            const sureDel = confirm('Вы действительно хотите удалить пользователя? Отменить действие будет невозможно');
            if (sureDel) {
                dispatch(deleteContact(data));
            }
        }
    }

    const handleCloseClick = () => {
        setIsAddContactOpened(false);
        setTextButton('Добавить');
    }

    //сбрасываем статус добавления контакта при каждом закрытии окна
    useEffect(() => {
        if (isAddContactOpened === false) {
            dispatch(contactDischarge());
        }
    }, [isAddContactOpened]);

    useEffect(() => {
        const text = 'Access token not provided'
        if(contactError === text || usersError === text) {
            alert('Срок действия авторизации закончен, авторизуйтесь снова')
        }
    }, [contactError, usersError])

    return(
        <main className="main">
            <section className="users">
                <div className="users__container container">
                    <div className="users__content">
                        {token && usersStatus === 'success' &&
                            <>
                                <h2 className="users__title">Добро пожаловать в личный кабинет</h2>
                                <Filter handleChangeSearch={handleChangeSearch} />
                                <div className="users__add add">
                                    <span className="add__descr">Добавить контакт: </span>
                                    <button className="add__btn btn" onClick={handleOnClick}>Add</button>
                                </div>
                            </>
                        }
                        {isAddContactOpened &&
                            <AddContact
                                onClose={handleCloseClick}
                                textButton={textButton}
                                user={user}
                            />
                        }
                        {!token &&
                        <>
                            <h2 className="users__title">Для доступа к личному кабинету необходимо авторизоваться</h2>
                        </>
                        }
                        {usersStatus === 'loading' && <Loading />}
                        {usersStatus === 'error' && <Error error={usersError} />}
                        {contactStatus === 'error' && <Error error={contactError} />}

                        {!touched && token && !usersError && !contactError && <List data={users} handleOnClick={handleOnClick} />}
                        {touched && token && !usersError && !contactError && <List data={filterUsers} handleOnClick={handleOnClick} />}
                    </div>
                </div>
            </section>
        </main>
    )
}