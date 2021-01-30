import React from "react";

export function Filter({ handleChangeSearch }) {
    return(
        <form className="users__form">
            <label className="users__input">
                Поиск пользователя:
                <input
                    className="user__search"
                    type="text"
                    onInput={handleChangeSearch}
                    autoFocus={true}
                />
            </label>
        </form>
    )
}