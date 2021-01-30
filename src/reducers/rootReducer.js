import {combineReducers} from "redux";
import tokenReducer from "./tokenReducer";
import usersReducer from "./usersReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers( {
    token: tokenReducer,
    users: usersReducer,
    contact: contactReducer,
})

export default rootReducer;