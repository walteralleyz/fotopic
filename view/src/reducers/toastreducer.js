import * as actions from '../actions/actiontypes';

export default (state = {status: '', text: ''}, action) => {
    switch (action.type) {
        case actions.TOAST_TEXT:
            return {
                ...state,
                text: action.text
            };

        case actions.TOAST_STATUS:
            return {
                ...state,
                status: action.status
            };

        default:
            return state;
    }
};