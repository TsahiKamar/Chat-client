
//Port 3000
//npm start

import Button from '@material-ui/core/Button';
import React from 'react';
import { ChannelList } from './ChannelList';
import { User } from './User';
import { Users } from './Users';
import AddItem from  '../components/AddItem';

//Redux
import {store} from "../index";
import { useState, useEffect } from "react";


import './chat.scss';
import { MessagesPanel } from './MessagesPanel';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

const CurrentUserContext = React.createContext('currentUser');//Global

export class Chat extends React.Component {
    
 
    state = {
        channels: null,
        socket: null,
        channel: null,
        items:[],
        currentUser:null,
        loginDisplay:{ display: "block",margin:'auto',width:'20%','maxWidth':'20%'},
        display: { display: "none" }
    }
    socket;

    componentDidMount() {
        console.log('Chat componentDidMount'); 
        this.loadChannels();
        this.configureSocket();

    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    //Chat channels 
    loadChannels = async () => {
        fetch('/chat/getChannels').then(async response => { 
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }


  
    handleNewUser = (newUserName, password) => {
         
        this.socket.emit('new user', { userName:newUserName, password:password });
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', id, ack => {
        });
      
    }

    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.state.currentUser, id: Date.now() });//senderName: this.socket.id
    }

    
     handleCallback = (childData) =>{
    
         this.setState({currentUser: childData}) 
         this.setState({display: { display: "block",width:'60%',height:'40%'}})
         this.setState({loginDisplay: { display: "none"}})
     }

    
    disconnect = () => {
        this.socket.disconnect();
        this.setState({loginDisplay:{ display: "block",margin:'auto',width:'20%','maxWidth':'20%'}})
        this.setState({display: { display: "none" }})
    }

    render() {
        const {currentUser} = this.state;

        return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
            <div className='chat-app'>

                <div style={this.state.display} >
                <h2>Welcome {this.state.currentUser}</h2>
                <Button color="primary" onClick={this.disconnect}>Logout [{this.state.currentUser}]</Button>
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect}  />
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} /> 
                
                </div>

                <div style={this.state.loginDisplay}>
                <User onNewUser={this.handleNewUser} items={this.state.items} parentCallback={this.handleCallback} />
                </div>
                <div style={this.state.display} ><Users /></div>
 
               
            </div>
            </CurrentUserContext.Provider>
        );
    }
}



