
import axios from 'axios';
import { 
    BRING_ALL_TODOS,
    LOADING,
    ERROR,
    CHANGE_USER_ID,
    CHANGE_TITLE,
    SAVE,
    UPDATE,
    CLEAN
  
} from '../types/todosTypes';

export const fetchAllTodos = () => async (dispatch) => {
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

            ));
        
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
};

export const changeUserId = (user_id) => (dispatch) => {
    dispatch({
        type: CHANGE_USER_ID,
        payload: user_id
    })
    
}

export const changeTitle = (title) => (dispatch) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    })
    
}

export const add = (new_todo) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
         await axios.post('https://jsonplaceholder.typicode.com/todos', new_todo);
        //console.log(response.data);
        dispatch({
            type: SAVE
        });
    }
    catch (error){
        //console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Please, try again later'
        });
    }
};

export const edit = (todo_edited) => async (dispatch) =>{
dispatch({
        type: LOADING
    })

    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo_edited.id}`, todo_edited);
        //console.log(response.data);
        dispatch({
            type: SAVE
        });
    }
    catch (error){
        //console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Please, try again later'
        });
    }
}

export const changeCheck = (user_id, todo_id) => (dispatch, getState) => {
    const { todos } = getState().todosReducer;
    const selected = todos[user_id][todo_id]; 

    const updated = {
        ...todos
    };
    updated[user_id] = {
        ...todos[user_id]
    };
    updated[user_id][todo_id] = {
        ...todos[user_id][todo_id],
        completed: !selected.completed
    };

    dispatch({
        type: UPDATE,
        payload: updated
    })

}

export const remove = (todo_id) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo_id}`);
        //console.log(response);

        dispatch({
            type: BRING_ALL_TODOS,
            payload: {}
        });

    }
    catch (error){
        //console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'This service is not available now'
        })
    }
}

export const cleanForm = () => (dispatch) => {
    dispatch({
        type: CLEAN
    })
}