import React,{useState } from "react";
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../store/actions";

import {store} from "../index";
import { initializeUsers } from '../store/reducer';


export class Users extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    items: []
  };
}

componentDidMount() {
    this.loadUsers();//Init store & local state
}

    //Chat users 
    loadUsers = async () => {

      fetch('/user/getUsers').then(async response => { 
          let data = await response.json();
          console.log('?chat getUsers data.users' + JSON.stringify(data.users));

          store.dispatch(initializeUsers(data["users"])) //INIT STORE DATA
          this.setState({ items: data.users }); 
   
      })
}

 removeItemFromList = (index,id) => {
    this.userDelete(id);
    store.dispatch(actionCreators.deleteItem(index)); 
    this.loadUsers();//List Refresh 
};
  
  userDelete = async (id) => {

    if (id !== undefined)
    {

    console.log('Delete user id :' + id)

    fetch('/user/deleteUser/' + id,{
      method: 'DELETE',
    })
    .then(async response => { 
      let data = await response.json() 
   
  })
  .catch((error) => {
    console.log(error)
  });

  }

  }   

  userSearch = async (userName) => {

    fetch('/user/getUser/' + userName,{
      method: 'GET',
    })
    .then(async response => { 
      let data = await response.json() 
      alert('Search result :' + JSON.stringify(data));
  })
  .catch((error) => {
    console.log(error)
  });

  }

  render() {

  return (

<div>

<h3>User search ...</h3>

<TextField id="userName" label="" placeholder="Type username .."/>
<br></br>
<Button variant="contained" color="primary" onClick={() => this.userSearch(document.getElementById('userName').value)}>Search</Button>

<hr />

<h2>Users</h2>
<ul>
{this.state.items.map((item, index) => {
  return (  
  <li key={index}>
     <Button variant="contained" color="secondary" onClick={() => this.removeItemFromList(index,item._id)}>Delete</Button> {item.userName}
   </li>
  )
})}
</ul>
</div>
  );
}

}


 const mapStateToProps = function(state) {
    return {
      items: state.items[0] //INITIAL_STATE
    }
  }
  connect(mapStateToProps)(Users);
  

 const mapDispatchToProps = dispatch => {
     return {
          deleteItem : item => dispatch(actionCreators.deleteItem(item))
 };
 };

 export default connect(
        null,
        mapDispatchToProps
      )(Users);
  
