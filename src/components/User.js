import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export class User extends React.Component {

loginUserName = null;
password=null;

newUserName = "";
nuPassword ="";

registrationStatus = null;

constructor() {
    super();
    this.state = {
      name: "React-bootstrap key enter event",
      loginUserName:null,
      users: []
    };

    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  
onBlur(event) {

  if (event.target.id === 'newUserName')
  {
     this.newUserName = event.target.value; 
  }

   if (event.target.id === 'nuPassword')
   {
     this.nuPassword = event.target.value; 
   }
 
   if (event.target.id === 'loginUserName')
   {
      this.loginUserName = event.target.value; 
   }
 
   if (event.target.id === 'password')
   {
      this.password = event.target.value; 
   }
  

}

//Chat users 
loadUsers = () => {
 let users = [];
 fetch('/user/getUsers')
 .then(response => response.json())
 .then(data => {
    this.setState({ users: data["users"] })
    console.log('loadUsres state.data :' + JSON.stringify(this.state.users));
  })
  .catch((error) => {
    console.log(error)
  });

}

login = async () => {
     
      if (this.loginUserName !== undefined && this.password !== undefined)
      {
        const data = { userName: this.loginUserName,password:this.password };
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        };

        fetch('/user/login',requestOptions).then(async response => { 
               let data = await response.json() 
               

               if (response.status === 401) {
                 console.log('login user not authorized !');
                 this.setState({ loginUserName: '' }) 
                 alert('Login : user not authorize !');
                 return ;
             
               } 
               else
               {

               console.log('login response data(userName)' + JSON.stringify(data));   
               this.setState({ loginUserName: data })
               this.loginUserName = null;
               this.password = null;
               this.props.parentCallback(data);
               //event.preventDefault();
               }
         
           })
           .catch((error) => {
            console.log(error)
          });
      }
      else
      {

        alert('User and password must be filled ! ');
      }
     
}

findIndex = (id) => {
      return this.state.users.findIndex(item => {
        return item._id === id
      })
}
  
userDelete = async (id) => {

    if (id !== undefined)
    {

      console.log('Delete user id :' + id)
      var index = this.findIndex(id);
      this.state.users.splice(index, 1);
      this.setState({ users: this.state.users })

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

  //New User Registration 
  onClick(){
  
    if (this.newUserName !== undefined && this.nuPassword !== undefined ) {
      console.log('New user , password => ' + this.newUserName + ',' + this.nuPassword);
      this.setState({ userName: this.newUserName , nuPassword: this.nuPassword });
      this.props.onNewUser(this.state.userName,this.state.nuPassword);
      
      this.loginUserName = this.newUserName;
      this.password = this.nuPassword;
      
   
      this.login();
      
      if (this.state.loginUserName !== null && this.state.loginUserName !== undefined )
      {
        this.registrationStatus = "OK";

      }
      else
      {
        this.registrationStatus = "FAILED";

      }
    }

  }

render() {
    const { newUserName,nuPassword,loginUserName,password } = this.state;

    return (
      <div className="User">
        <Divider />
        <section className="LoginUserSection">
        <div className="LoginUser">
        <h3>Login ..</h3>

          <br></br>

          <TextField id="loginUserName" label="" placeholder="Login user name ..maccabi"  onBlur={this.onBlur}/>
          <TextField id="password" label="password" type="password" placeholder="Password ..maccabi" onBlur={this.onBlur} />
          
          <br></br>
          <br></br>
        
          <Button variant="contained" color="primary" onClick={this.login}>Login</Button>
          <hr />
        </div>
        </section>

        <section className="NewUserSection">
        <h3>Registration ..</h3>
        <div className="NewUser">
      
          <TextField id="newUserName" label="New User Name" placeholder="New user name .." onBlur={this.onBlur}/>
          
          <TextField id="nuPassword" label="Password" type="password" placeholder="Password .." onBlur={this.onBlur}/>
          <br></br>
          <br></br>
        
          <Button variant="contained" color="primary" onClick={this.onClick}>Register</Button>
          <hr />
          <Divider />

        </div>
        </section>
  
       </div>



    );
}

}

