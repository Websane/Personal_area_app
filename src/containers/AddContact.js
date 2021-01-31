import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doActionContact} from "../actions/contactActions";

export function AddContact(props) {
    const ref = useRef(null);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const contactStatus = useSelector(state => state.contact.status);

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    //обрабатываем событие клика вне формы
    useEffect(() => {
       function handleClick(ev) {
           if (!ref.current?.contains(ev.target))
           props.onClose();
       }
       document.addEventListener('click', handleClick);
       return () => {
           document.removeEventListener('click', handleClick);
       }
    }, []);
    //обрабатываем изменения в полях ввода
    const handleChangeName = (ev) => {
        setName(ev.target.value);
    }
    const handleChangeSurname = (ev) => {
        setSurname(ev.target.value);
    }
    const handleChangeEmail = (ev) => {
        setEmail(ev.target.value);
    }
    //обрабатываем отправку формы
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const data = [{
            name: name + ' ' + surname,
            email: email
        }, token, props.user.id];
        if (props.textButton !== 'Редактировать') {
            dispatch(doActionContact(data, 'POST'));
        } else {
            dispatch(doActionContact(data, 'PUT'));
        }
    }
    //следим за статусом действия с контактами
    useEffect(() => {
        if (contactStatus === 'success' || contactStatus === 'error') {
            props.onClose();
        }
    }, [contactStatus]);
    //обрабатываем данные при редактировании
    useEffect(() => {
        if (props.textButton === 'Редактировать') {
            const fullName = props.user.name;
            const arr = fullName.split(' ');
            setName(arr[0]);
            setSurname(arr[1]);
            setEmail(props.user.email);
        }
    }, []);

    return (
        <form className="add__form" ref={ref} onSubmit={handleSubmit}>
            <label className="add__label">
                <span className="add__text">Имя:</span>
                <input
                    type="text"
                    value={name}
                    className="add__name"
                    onInput={handleChangeName}
                    required={true}
                />
            </label>
            <label className="add__label">
                <span className="add__text">Фамилия:</span>
                <input
                    type="text"
                    value={surname}
                    className="add__name"
                    onInput={handleChangeSurname}
                    required={true}
                />
            </label>
            <label className="add__label">
                <span className="add__text">Email:</span>
                <input
                    type="email"
                    value={email}
                    className="add__email"
                    onInput={handleChangeEmail}
                    required={true}
                />
            </label>
            <button className="add__button btn" type="submit">{props.textButton}</button>
        </form>
    );
}