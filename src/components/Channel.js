
import React from 'react';


export class Channel extends React.Component {
    channelColor =  {'background-color': 'white'}

    click = () => {
        this.props.onClick(this.props.id);
        this.channelColor =  {'background-color': 'green'}

    }

    render() {
        return (

            <div className='channel-item' onClick={this.click}>
                <div style={this.channelColor}>{this.props.name}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}