import { 
    UPDATE, 
    LOADING, 
    ERROR, 
    COMMENTS_LOADING, 
    COMMENTS_ERROR,
    COMMENTS_UPDATE
} from '../types/postsTypes';

const INITIAL_STATE = {
    posts: [],
    loading: false,
    error: '',
    comments_loading: false,
    comments_error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
         case UPDATE:
            return {
                ...state,
                 posts: action.payload,
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
 
        case COMMENTS_UPDATE:
            return {
                ...state,
                 posts: action.payload,
                 comments_loading: false,
                 comments_error: ''
                }; 

        case COMMENTS_LOADING:  
            return{ ...state, comments_loading: true };
           
        case COMMENTS_ERROR:
            return{ ...state, 
                comments_error: action.payload,
                comments_loading: false
            };              


        default: return state;
    };
};

