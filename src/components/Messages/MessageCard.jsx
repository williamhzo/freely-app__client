import React, { Component } from 'react';

export default class MessageCard extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  truncateMessage(message, length) {
    if (message.length > length) {
      return message.substring(0, length) + '...';
    } else return message;
  }
  render() {
    const { recipients, unread, messages, _id } = this.props.message;
    const user = this.props.user;
    const lastMessage = messages.length > 1 && messages[messages.length - 1];
    const correspondent =
      recipients[0]._id === user._id ? recipients[1] : recipients[0];
    return (
      <a href={'/messages/' + _id} className="messages__onemessage">
        <img
          src={correspondent.profilePicture}
          className="messages__avatar"
          alt=""
        />
        <div className="messages__info">
          <div className="messages__correspondent">{correspondent.name}</div>
          {!!lastMessage && (
            <div className="messages__lastmessage">
              {console.log(lastMessage.author)}
              {lastMessage.author === user._id
                ? 'You: '
                : correspondent.name + ': '}
              {this.truncateMessage(lastMessage.content, 100)}
            </div>
          )}
        </div>
      </a>
    );
  }
}
