import React, { Component } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

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
  };
  render() {
    return (
      <div className="message">
        <a href="/messages">Back</a>
        <div className="message__thread">
          {this.state.messages &&
            this.state.messages.map((message) => {
              return (
                <div className="message__onemessage">
                  <div className="message__time">{message.time}</div>
                  <div className="message__content">{message.content}</div>
                </div>
              );
            })}
        </div>
        <TextareaAutosize
          placeholder={"New Message"}
          value={this.state.newMessage}
          onChange={(e) => {
            console.log(this.state);
            this.setState({ newMessage: e.target.value });
          }}
        />
        <button onClick={this.sendMessage}>Send</button>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
      </div>
    );
  }
}

export default withUser(Message);
