import * as actions from '../actions/actiontypes';

export default (state = { logged: false }, action) => {
    switch (action.type) {
        case actions.TOGGLE_LOGGED:
            return {
                ...state,
                logged: action.logged
            };
        default:
            return state;
    }
};