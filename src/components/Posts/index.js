import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as postsActions from "../../actions/postsActions";
import * as userActions from "../../actions/userActions";

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comments from './Comments';

const{ fetchAll: userFetchAll } = userActions;
const{ fetchByUser: postsfetchByUser,
 openClose,
 fetchComents
  } = postsActions;



class Posts extends Component {

    async componentDidMount() {
        const {
            userFetchAll,
            postsfetchByUser,
            match: { params: { key} }
        } = this.props;

        if (!this.props.usersReducer.users.length) {
            await userFetchAll();
        }
        if(this.props.usersReducer.error){
            return;
        }
        
        if (!('posts_key' in this.props.usersReducer.users[key])) {
			await postsfetchByUser(key);
		}

    }


    putUser = () => {
        const { 
            usersReducer, 
            match: { params: { key} },
        } = this.props;
        
        if(usersReducer.error) {
            return <Fatal mensaje={ usersReducer.error }/>
        }
        if(!usersReducer.users.length || usersReducer.loading){
            return <Spinner />
        }

        const name = usersReducer.users[key].name;

        return (
            <h1>
                    Publicaciones de { name }: 
            </h1>
        )
    }

    putPosts = () => {
        const {
            usersReducer,
            usersReducer: { users },
            postsReducer,
            postsReducer: { posts},
            match: { params: { key} }
        } = this.props;

        if(!users.length) return;

        if(usersReducer.error) return;

        if(postsReducer.loading) {
            return <Spinner />;
        }
        if (postsReducer.error) {
            return <Fatal message={postsReducer.error} />
        }
        if(!posts.length) return;

        if(!('posts_key' in users[key])) return;

        const { posts_key } = users[key];

        return this.showInfo(
            posts[posts_key],
            posts_key
        );
    };

    showInfo = (posts, post_key) => (
        posts.map((post, comments_key) => (
            <div 
                className='post'
                key={post.id}
                onClick={ 
                    () => this.showComments(post_key, comments_key, post.comments)}
            >
                <h2 className= 'post_title'> 
                    { post.title }
                </h2>
                <p>
                    { post.body }
                </p>
                { (post.open) ? <Comments comments={post.comments} />: ''}
            </div>
        ))
    );

    showComments = (post_key, comments_key, comments) => {
        this.props.openClose(post_key, comments_key);
        if (!comments.length){
            this.props.fetchComents(post_key, comments_key)
        }  
    };

    render() {
        console.log(this.props);
        return (
            <div>
               
                    {/* this.props.match.params.key */}
                    { this.putUser() }
                    { this.putPosts() }
            </div>
        );
    }
}

const mapStateToProps = ({ usersReducer, postsReducer} ) => {
    return {
        usersReducer,
        postsReducer
    };
};

const mapDispatchToProps = {
    userFetchAll,
    postsfetchByUser,
    openClose,
    fetchComents   
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);