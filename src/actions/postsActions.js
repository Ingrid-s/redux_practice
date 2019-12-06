import axios from 'axios';
import { 
    UPDATE, 
    LOADING, 
    ERROR, 
    COMMENTS_LOADING, 
    COMMENTS_ERROR,
    COMMENTS_UPDATE
} from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { BRING_ALL: USERS_BRING_ALL } = usersTypes;


export const fetchByUser = (key) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    });

    const { users } = getState().usersReducer;
    const { posts } = getState().postsReducer;
    const user_id = users[key].id;

    try {
        const fetchPost = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
        
        const newPosts = fetchPost.data.map((post) => ({
            ...post, 
            comments: [],
            open: false
        }));

        const posts_updated = [
            ...posts,
            newPosts
        ];

        dispatch({
            type: UPDATE,
            payload: posts_updated
        });

        const posts_key = posts_updated.length -1;
        const users_updated = [...users];
        users_updated[key] = {
            ...users[key], 
            posts_key
        }

        dispatch({
            type: USERS_BRING_ALL,
            payload: users_updated
        });
    }
    catch(error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Posts are not available, please try again later.'
        })
    }

}

export const openClose = (post_key, comments_key) => (dispatch, getState) =>{
    const { posts } = getState().postsReducer;
    const selected = posts[post_key][comments_key];

    const updated = {
        ...selected,
        open: !selected.open
    };

    const posts_updated = [...posts];
    posts_updated[post_key] = [
        ...posts[post_key]
    ];

    posts_updated[post_key][comments_key] = updated;

    dispatch ({
        type: UPDATE,
        payload: posts_updated
    });
}

export const fetchComents = (post_key, comments_key) => async(dispatch, getState) => {
    
    dispatch({
        type: COMMENTS_LOADING
    });

    const { posts } = getState().postsReducer;
    const selected = posts[post_key][comments_key];

    try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postid=${selected.id}`)
        
        const updated = {
            ...selected,
            comments: response.data
        };

        const posts_updated = [...posts];
        posts_updated[post_key] = [
            ...posts[post_key]
        ];

        posts_updated[post_key][comments_key] = updated;

        dispatch ({
            type: COMMENTS_UPDATE,
            payload: posts_updated
        });

    }
    catch(error){
        console.log(error.message);
        dispatch({
            type: COMMENTS_ERROR,
            payload: 'Comments are not available, please try again later.'
        });
    }
 
};