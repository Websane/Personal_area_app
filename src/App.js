import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";

import {Header} from "./containers/Header";
import {AuthForm} from './containers/AuthForm';
import {UsersList} from "./containers/UsersList";

import { hot } from 'react-hot-loader/root';

import './style.css';

let App = () => {
    return (
        <Router>
            <Route path="/" exact component={AuthForm} />
            <Route path="/private">
                <Header />
                <UsersList />
            </Route>
        </Router>
    );
}

export default hot(App);