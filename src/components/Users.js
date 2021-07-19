import React,{useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../actions";

import {store} from "../index";


export default function Users(){
  const dispatch = useDispatch();
   
  const items = useSelector(state => state.items.length > 0 && state.items[0].hasOwnProperty('users') ? state.items[0]["users"] : [] );//[0]["users"]
     
    

  const removeItemFromList = (index,id) => {
    dispatch(actionCreators.removeItem(index));
    userDelete(id);
  };
  
  
  async function userDelete (id) {
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

  async function userSearch (userName) {
  
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

  return (

<div>

<h3>User search ...</h3>

<TextField id="userName" label="" placeholder="Type username .."/>
<br></br>
<Button variant="contained" color="primary" onClick={() => userSearch(document.getElementById('userName').value)}>Search</Button>

<hr />

<h2>Users</h2>
<ul>
{items.map((item, index) => {
  return (  
  <li key={index}>
     {index} <Button variant="contained" color="secondary" onClick={() => removeItemFromList(index,item._id)}>Delete</Button> {item.userName}
   </li>
  )
})}
</ul>
</div>
  );
}
