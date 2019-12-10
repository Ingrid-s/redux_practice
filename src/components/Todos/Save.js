import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as todosActions from '../../actions/todosActions';


export class Save extends Component {
    componentDidMount (){
        const {
            match: { params: { user_id, todo_id} },
            todos,
            changeUserId,
            changeTitle,
            cleanForm,
        } = this.props;

        if(user_id && todo_id){
            const todo = todos[user_id][todo_id];
            changeUserId(todo.userId);
            changeTitle(todo.title)
        }
        else {
            cleanForm();
        }
    }
    changeUserId = (event) => {
        this.props.changeUserId(event.target.value);
        ///console.log(event.target.value)
    };

    changeTitle = (event) => {
        this.props.changeTitle(event.target.value);
        //console.log(event.target.value)
    };

    save = () => {
        const { 
            match: { params: { user_id, todo_id} },
            todos,
            title, 
            add,
            edit
        } = this.props;

        const new_todo = {
            userId: user_id,
            title: title,
            completed: false
        };

        if( user_id && todo_id){
            const todo = todos[user_id][todo_id];
            const todo_edited ={
                ...new_todo,
                completed: todo.completed,
                id: todo.id
            };
            edit(todo_edited);
        }
        else {
             add(new_todo);
        }

    }

    disable = () =>{
        const { user_id, title, loading } = this.props;
        if (loading) {
            return true;
        }
        if(!user_id || !title) {
            return true;
        }

        return false;
    };

    showAction = () => {
        const { error, loading } = this.props
        if(loading) {
            return <Spinner />;
        }
        if(error) {
            return <Fatal mensaje={error} />
        }
    };

    render() {
        return (
            <div>
                {
                    (this.props.return_index) ?
                    <Redirect to='/todos' />
                    : ''
                }
                <h1>Save to do</h1>
                User id: 
                <input 
                    type='number'
                    value= { this.props.user_id }
                    onChange={ this.changeUserId }
                    
                />
                <br /><br />
                Title:
                <input
                    value={ this.props.title }
                    onChange={ this.changeTitle }
                 />
                <br /><br />
                <button
                    onClick={ this.save }
                    disabled={this.disable()}
                >
                    Save
                </button>
                { this.showAction() }
            </div>
        );
    }
}

const mapStateToProps =({ todosReducer }) => todosReducer
export default connect(mapStateToProps, todosActions)(Save);