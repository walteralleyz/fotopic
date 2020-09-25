import * as actions from './actiontypes';

export const toggleLogged = b => ({
    type: actions.TOGGLE_LOGGED,
    logged: b
});