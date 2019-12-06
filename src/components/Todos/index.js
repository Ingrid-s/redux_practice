import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as todosActions from '../../actions/todosActions';

class Todos extends Component {

    componentDidMount(){
        this.props.fetchAllTodos();
    }

    showContent = () => {
        const { todos, loading, error } = this.props;
        
        if (loading){
            return <Spinner />;
        }

        if (error) {
            return <Fatal mensaje= {error} />;
        }

        return Object.keys(todos).map((user_id) => (
            <div key={user_id}>
                <h2> User {user_id} </h2>
                <div className='todos_container'>
                    { this.putTodos(user_id) }
                </div>
            </div>
        ));

    };

    putTodos = (user_id) => {
        const { todos } = this.props;
        const by_user = {
            ...todos[user_id]
        };
    }
    render() {
        console.log(this.props);
        return (
            <div>
                { this.showContent()}
            </div>
        );
    }
}

const mapStateToProps = ( { todosReducer }) => todosReducer


export default connect(mapStateToProps, todosActions)(Todos);