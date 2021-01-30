import React from "react";

export function AuthButton({ handleClickOut, handleClick, token, usersError, contactError }) {
    let text
    let handle
    let label

    if (token && !usersError && !contactError) {
        text = 'Выйти';
        handle = handleClickOut;
        label = 'кнопка отмены авторизации';
    } else {
        text = 'Авторизация';
        handle = handleClick
        label = 'кнопка входа в форму авторизации';
    }
        return (
            <button
                className="header__button btn"
                onClick={handle}
                aria-label={label}
            >
                {text}
            </button>
        )
}