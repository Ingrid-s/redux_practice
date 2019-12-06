import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import todosReducer from './todosReducer';

export default combineReducers({
    usersReducer,
    postsReducer,
    todosReducer
});