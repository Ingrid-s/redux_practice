import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const Comments = (props) => {

    if(props.comments_error) {
        return <Fatal mensaje={ props.comments_error } />
    }

    if (props.comments_loading && !props.comments.length){
        return <Spinner />
    }
    
    const putComments = () => (
        props.comments.map((comment)=> (
            <li key={comment.id}>
                <b>
                    <u>
                        { comment.email}
                    </u>
                </b>
               <br />
               <br />
                { comment.body }
            </li>
        ))
    )
    return (
        <ul>
           {putComments()}
        </ul>
    );
};

const mapStateToProps = ({ postsReducer }) => postsReducer;

export default connect(mapStateToProps)(Comments);