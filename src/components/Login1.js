// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Divider from '@material-ui/core/Divider';



// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// export class Login extends React.Component { 
//   newUserName = "";
//   password ="";
  

//   onKeyUp=(event)=> {
 
   
//     if (event.target.id === 'userName')
//     {
//        this.newUserName = event.target.value; 
//     }
//     if (event.target.id === 'password')
//     {
//       this.password = event.target.value; 
//     }
   
//   }
  
//   onBlur=(event)=>{
  
//     if (event.target.id === 'userName')
//     {
//        this.newUserName = event.target.value; 
//     }
  
//      if (event.target.id === 'password')
//      {
//        this.password = event.target.value; 
//      }
   
//   }
  
//   onClick = (event) =>{
  
//     if (this.newUserName !== undefined && this.password !== undefined ) {
//       console.log('user , password => ' + this.newUserName + ',' + this.password);
//       this.setState({ userName: this.newUserName , password: this.password });
//       this.props.onNewUser(this.state.userName,this.state.password);
//     }
 

//   return (
//     <Card className="card">
//       <CardContent>
//         <Typography className="title" color="textSecondary" gutterBottom>
//           Login ..
//         </Typography>
//         <Typography variant="h5" component="h2">

//         <TextField id="userName" label="" placeholder="New user name .." onBlur={this.onBlur}/>
//         <TextField id="password" label="password" type="password" placeholder="Password .." onBlur={this.onBlur}/>

//         <Button variant="contained" color="primary" onClick={this.onClick}>Submit</Button>
//         <hr />
//         <span>New user name : {this.newUserName}</span>

//         <Divider />
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Go</Button>
//       </CardActions>
//     </Card>
//   );
// }
// }
