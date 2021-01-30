import React from "react";

export function List({ data, handleOnClick }) {
    return(
        <ol className="users__list">
            {data.map((item, i) =>
            <li className="users__item" key={i}>
                <span className="users__name">{item.name}</span>
                <span className="users__email">{item.email}</span>
                <button
                    className="users__edit users__btn btn"
                    onClick={handleOnClick}
                    id={item.id}
                >
                    Edit
                </button>
                <button
                    className="users__remove users__btn btn"
                    onClick={handleOnClick}
                    id={item.id}
                >
                    Del
                </button>
            </li>
            )}
        </ol>
    )
}