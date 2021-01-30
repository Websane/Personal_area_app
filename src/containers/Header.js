import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";

import {AuthButton} from "../components/AuthButton";
import {tokenDelete} from "../actions/tokenActions";

export function Header() {
    const token = localStorage.getItem('token');

    const usersError = useSelector(state => state.users.errorMessage);
    const contactError = useSelector(state => state.contact.errorMessage);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleClick() {
        history.push('/')
    }

    function handleClickOut() {
        //убираем токен из хранилища
        dispatch(tokenDelete(''));
        history.push('/')
    }

    return(
        <header className="header">
            <div className="header__container container">
                <div className="header__content">
                    <span className="header__logo">TEST APP</span>
                    <AuthButton
                        handleClick={handleClick}
                        handleClickOut={handleClickOut}
                        token={token}
                        usersError={usersError}
                        contactError={contactError}
                    />
                </div>
            </div>
        </header>
    )
}