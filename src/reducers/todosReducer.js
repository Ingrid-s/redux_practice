import { BRING_ALL_TODOS, LOADING, ERROR } from '../types/todosTypes';
const INITIAL_STATE = {
    todos: {},
    loading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BRING_ALL_TODOS:
            return {
                ...state,
                 todos: action.payload,
                 loading: false,
                 error: ''
                };
        case LOADING:  
            return{ ...state, loading: true };
           
        case ERROR:
            return{ ...state, 
                error: action.payload,
                loading: false
            };    

        default: return state;
    };
};

