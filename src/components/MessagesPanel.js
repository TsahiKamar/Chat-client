
import React from 'react';
import { Message } from './Message';

export class MessagesPanel extends React.Component {
    state = { msg: '' }

    constructor() {
        super();
      }  

    send = () => {
        if (this.state.msg && this.state.msg !== '') {
            this.props.onSendMessage(this.props.channel.id,this.state.msg);//this.props..channel.id
            this.setState({ msg: '' });
        }
    }

    handleInput = e => {
        this.setState({ msg: e.target.value });
    }

    render() {

        let list = <div className="no-content-message">Yet No Messages !</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
        }
        return (
            <div className='messages-panel'>
                <div className="meesages-list">{list}</div>
                {this.props.channel &&
                    <div className="messages-input">
                        <input type="text" onChange={this.handleInput} value={this.state.msg} />
                        <button onClick={this.send} >Send</button>
                    </div>
                }
            </div>);
    }

}