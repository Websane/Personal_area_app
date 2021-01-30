import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useHistory, useLocation} from "react-router-dom";

import {Error} from "../components/Error";
import {Loading} from "../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {getToken, tokenDelete} from "../actions/tokenActions";
import {usersRemove} from "../actions/listUsersActions";

export function AuthForm () {
    const firstRender = useRef(true);
    //значения введенных логина и праоля
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    //проверка элемента на использование
    const [touched, setTouched] = useState(false);
    //валидация логина и пароля
    const [loginError, setLoginError] = useState('');
    const [passError, setPassError] = useState('');

    const tokenStatus = useSelector(state => state.token.status);
    const tokenError = useSelector(state => state.token.errorMessage);

    const usersStatus = useSelector(state => state.users.status);

    const location = useLocation();

    const dispatch = useDispatch();

    const history = useHistory();
    //обработчик изменений в поле логина
    const handleChangeLogin = (ev) => {
        setTouched(true);
        setLogin(ev.target.value);
    }
    //обработчик изменений в поле пароля
    const handleChangePass = (ev) => {
        setTouched(true);
        setPass(ev.target.value);
    }
    //валидация логина
    const validateLogin = useCallback(() =>{
        if (login.length < 2) return 'Введите минимум 2 символа';
        if (login.length > 25) return 'Слишком длинное имя';
        return '';
    }, [login]);
    //валидация пароля
    const validatePass = useCallback(() =>{
        if (pass.length < 5) return 'Введите минимум 5 символов';
        return '';
    }, [pass]);

    useEffect(() => {
        //не используем валидацию при первом рендере
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (login) {
            setLoginError(validateLogin());
        }
        if (pass) {
            setPassError(validatePass());
        }
    }, [login, pass, validateLogin, validatePass]);

    useEffect(() => {
        if (location.pathname === '/' && usersStatus === 'success') {
            dispatch(tokenDelete(''));
            dispatch(usersRemove([]));
        }
    }, [location, usersStatus, dispatch]);

    useEffect(() => {
        if (tokenStatus === 'error') {
            setLogin('');
            setPass('');
        } else if (tokenStatus === 'success' && usersStatus === 'init') {
            history.push('/private')
        }
    }, [tokenStatus, usersStatus, dispatch]);

    //обработчик отправки формы
    const handleSubmit = (ev) => {
        ev.preventDefault();
        //валидация
        setTouched(true);
        setLoginError(validateLogin());
        setPassError(validatePass());
        const loginValid = !validateLogin();
        const passValid = !validatePass();
        if (!loginValid || !passValid) return
        //отправка данных формы на сервер
        const data = {
            email: login,
            password: pass,
        }
        dispatch(getToken(data));
    }

    return (
        <section className="auth">
            <div className="container auth__container">
                <form className="auth__form" onSubmit={handleSubmit}>
                    <label className="auth__input">
                        Имя пользователя:
                        <input
                            className="auth__login input"
                            type="text"
                            value={login}
                            onInput={handleChangeLogin}
                            autoFocus={true}
                            aria-invalid={loginError ? 'true' : undefined}
                        />
                        {touched && loginError && <Error error={loginError} />}
                    </label>
                    <label className="auth__input">
                        Пароль:
                        <input
                            className="auth_password input"
                            type="password"
                            value={pass}
                            onInput={handleChangePass}
                            aria-invalid={passError ? 'true' : undefined}
                        />
                        {touched && passError && <Error error={passError} />}
                    </label>

                    {!tokenStatus !== 'loading' &&
                    <button
                        className="auth__button btn"
                        type="submit"
                        aria-label="кнопка отправки введенных данных"
                    >
                        Войти
                    </button>
                    }

                    {tokenStatus === 'loading' && <Loading />}

                    {tokenStatus === 'error' && <Error error={tokenError} />}
                </form>
            </div>
        </section>
    )
}