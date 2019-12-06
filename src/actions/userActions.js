
import axios from 'axios';
import { BRING_ALL, LOADING, ERROR } from '../types/usersTypes';
//esta es la función que llamamos en el componente Users en el componentDidMount
export const fetchAll = () => async(dispatch) => {
    //Fetch con Axios
    dispatch({
        type: LOADING
    });

    try {
        const fetchUsers =  await axios.get('https://jsonplaceholder.typicode.com/users');
        //console.log('fetchUsers: ', fetchUsers.data);
        dispatch({
            type: BRING_ALL,
            payload: fetchUsers.data

            })
    }
    catch (error) {
        //console.log('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Ups, info about users is not available, please try again later.'
        });
    }
}