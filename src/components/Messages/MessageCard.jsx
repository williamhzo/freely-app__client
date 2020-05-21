import React, { Component } from "react";

export default class MessageCard extends Component {
  state = {
    unread: null,
  };
  componentDidMount() {
    console.log(this.props);
  }
  truncateMessage(message, length) {
    if (message.length > length) {
      return message.substring(0, length) + "...";
    } else return message;
  }
  componentDidMount = () => {
    this.setState({ ...this.props.message, user: this.props.user }, () => {
      if (this.state.messages.length > 1) {
        this.setState(
          {
            lastMessage: this.state.messages[this.state.messages.length - 1],
            correspondent:
              this.state.recipients[0]._id === this.state.user._id
                ? this.state.recipients[1]
                : this.state.recipients[0],
          },
          () => {
            if (this.state.lastMessage.author !== this.state.user._id) {
              console.log("dont Match");
              console.log(this.state);
              if (this.state.unread) {
                this.setState({ unread: true });
              }
            } else {
              this.setState({ unread: false });
            }
          }
        );
      }
      console.log(this.state);
    });
  };

  render() {
    return (
      <a href={"/messages/" + this.state._id} className="messages__onemessage">
        {!!this.state.correspondent && (
          <>
            <img
              src={this.state.correspondent.profilePicture}
              className="messages__avatar"
              alt=""
            />
            <div className="messages__info">
              <div className="messages__header">
                <div className="messages__correspondent">
                  {this.state.correspondent.name}
                </div>
                {this.state.unread && (
                  <div className="messages__notification"></div>
                )}
              </div>
              {!!this.state.lastMessage && (
                <div className="messages__lastmessage">
                  {console.log(this.state.lastMessage.author)}
                  {this.state.lastMessage.author === this.state.user._id
                    ? "You: "
                    : this.state.correspondent.name + ": "}
                  {this.truncateMessage(this.state.lastMessage.content, 100)}
                </div>
              )}
            </div>
          </>
        )}
      </a>
    );
  }
}
