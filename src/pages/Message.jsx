import React, { Component } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import OneMessage from "../components/Messages/OneMessage";
import "../styles/Message.scss";

class Message extends Component {
  state = {
    messages: [],
    newMessage: [],
  };
  sendMessage = () => {
    const message = {
      time: Date.now(),
      author: this.props.context.user,
      content: this.state.newMessage,
    };
    console.log(message);
    apiHandler
      .sendOneMessage(this.props.match.params.id, message)
      .then((apiRes) =>
        this.setState({ messages: apiRes.messages, newMessage: undefined })
      )
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    apiHandler
      .getOneMessage(this.props.match.params.id)
      .then((apiRes) => this.setState({ messages: apiRes.messages }));
    apiHandler.isLoggedIn().then((apiRes) => {
      this.setState({ user: apiRes });
    });
  };
  render() {
    return (
      <div className="message container">
        <a className="message__back" href="/messages">
          « Back
        </a>
        <div className="message__thread">
          {this.state.messages &&
            this.state.user &&
            this.state.messages.map(
              (message, index) =>
                index > 0 && (
                  <OneMessage message={message} user={this.state.user} />
                )
            )}
        </div>
        <div className="message__compose">
          <div className="message__textcontainer">
            <TextareaAutosize
              placeholder={"New Message"}
              value={this.state.newMessage}
              onChange={(e) => {
                console.log(this.state);
                this.setState({ newMessage: e.target.value });
              }}
            />
          </div>
          <button
            className="edit__button message__sendmessage"
            onClick={this.sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default withUser(Message);
