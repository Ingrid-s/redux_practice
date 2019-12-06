import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from '../General/Fatal';
import Table from './Table';

import * as userActions from "../../actions/userActions";

class Users extends Component {
  ///Fetch con Fetch, movimos el llamado a userActions
  /*componentDidMount() {
        this.fetchUsers();
      }
      fetchUsers = async () => {
        const resultFetchUsers = await fetch('https://jsonplaceholder.typicode.com/users');

        let data = await resultFetchUsers.json();
        this.setState({users: data});
      }
      */
  //dentro del component DidMount, llamamos al action create (userActions)
  //por medio de la funcion que ahí definimos

  async componentDidMount() {
    if(!this.props.users.length){
       this.props.fetchAll();
    }
  }

  renderContent = () => {
    if (this.props.loading) {
      return <Spinner />;
    }
    
    if (this.props.error) {
			return <Fatal mensaje={ this.props.error } />;
		}

    return <Table />;
  };
  render (){
    //console.log(this.state.users);
    //console.log(this.props);
    //console.log(this.props.loading);
    //console.log(this.props.error);
    return (
      <div>
        <h1>Usuarios</h1>
        { this.renderContent() }
      </div>
    );
  }
};


const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
} 


export default connect(mapStateToProps, userActions)(Users);
