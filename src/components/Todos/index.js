import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as todosActions from '../../actions/todosActions';

class Todos extends Component {

    componentDidMount(){
        if(!Object.keys(this.props.todos).length)
        this.props.fetchAllTodos();
        
    }

    componentDidUpdate(){
        const { todos, loading, fetchAllTodos } = this.props;

        if(!Object.keys(todos).length && !loading) {
        fetchAllTodos();
        //console.log(this.props);
        }
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
        const { todos, changeCheck, remove } = this.props;
        const by_user = {
            ...todos[user_id]
        };

        return Object.keys(by_user).map((todo_id) => (
            <div key={todo_id} className='todos'>
                <input 
                    type="checkbox" 
                    defaultChecked = {by_user[todo_id].completed}
                    onChange={() => changeCheck(user_id, todo_id)}
                />
                {
                    by_user[todo_id].title
                }
                <span className='icons_container'>
                    <span className="m_left">
                        <Link to={`/todos/save${user_id}/${todo_id}`}>
                            <i className="edit-solid icon" ></i>
                        </Link>
                    </span> 
                    <span className="m_left" onClick={ () => remove(todo_id) }>
                        <i className="trash icon" ></i>
                    </span>
                </span>
                    
            </div>
        ));
    };

    render() {
       // console.log(this.props.todos);
        return (
            <div>
                <button>
                    <Link to='/todos/save'>
                        Add
                    </Link>
                </button>
                { this.showContent()}
            </div>
        );
    }
}

const mapStateToProps = ( { todosReducer }) => todosReducer


export default connect(mapStateToProps, todosActions)(Todos);