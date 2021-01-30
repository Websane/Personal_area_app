import React from "react";

export function AuthButton({ handleClickOut, handleClick, usersError, contactError, tokenStatus, token }) {
    const data = {
        text: 'Выйти',
        handle: handleClickOut,
        label: 'кнопка отмены авторизации'
    }

    if (usersError && contactError || tokenStatus === 'init' && !token) {
        data.text = 'Авторизация';
        data.handle = handleClick;
        data.label = 'кнопка входа в форму авторизации';
    }

    return (
        <button
            className="header__button btn"
            onClick={data.handle}
            aria-label={data.label}
        >
            {data.text}
        </button>
    )
}