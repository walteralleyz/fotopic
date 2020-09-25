import * as actions from '../actions/actiontypes';

export default (state = [], action) => {
    switch (action.type) {
        case actions.ADD_ITEM:
            return [
                ...state,
                action.item
            ];

        case actions.REMOVE_ITEM:
            return state.filter((item, i) => i !== +action.id);

        default:
            return state;
    }
};