
import axios from 'axios';
import { BRING_ALL_TODOS, LOADING, ERROR } from '../types/todosTypes';

export const fetchAllTodos = () => async(dispatch) => {
    dispatch({
        type: LOADING
    });

    try {
        const response =  await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        const todos = {};
            response.data.map((todo) => (
                todos[todo.userId] = {
                    ...todos[todo.userId],
                    [todo.id]: {
                        ...todo
                    }
                }

            ))
        
        dispatch({
            type: BRING_ALL_TODOS,
            payload: todos

            })
    }
    catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Ups, info about To dos is not available, please try again later.'
        });
    }
}