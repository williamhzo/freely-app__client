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
    correspondent: undefined,
    recipients: undefined,
  };
  sendMessage = () => {
    if (!this.state.newMessage) {
      return;
    }
    const message = {
      time: Date.now(),
      author: this.props.context.user,
      content: this.state.newMessage,
    };
    apiHandler
      .sendOneMessage(this.props.match.params.id, message)
      .then((apiRes) =>
        this.setState({ messages: apiRes.messages, newMessage: "" })
      )
      .catch((err) => console.log(err));
  };
  componentDidMount = () => {
    setInterval(this.checkMessage, 1000);
  };

  // Check messages

  checkMessage = () => {
    apiHandler.getOneMessage(this.props.match.params.id).then((apiRes) =>
      this.setState(
        {
          messages: apiRes.messages,
          recipients: apiRes.recipients,
        },
        () => {
          apiHandler.isLoggedIn().then((apiRes) => {
            this.setState({ user: apiRes }, () => {
              if (this.state.recipients && this.state.user) {
                this.state.recipients[0]._id === this.state.user._id
                  ? this.setState({ recipient: this.state.recipients[1] })
                  : this.setState({ recipient: this.state.recipients[0] });
              }
              if (
                this.state.user._id !==
                this.state.messages[this.state.messages.length - 1].author
              ) {
                apiHandler.markAsRead(this.props.match.params.id);
              }
            });
          });
        }
      )
    );
  };

  updateScroll() {
    let element = document.querySelector(".message__scrollcontainer");
    element.scrollTop = element.scrollHeight;
  }
  componentDidUpdate = () => {
    this.updateScroll();
  };
  render() {
    return (
      <div className="message container">
        <div className="message__header">
          <a className="message__back" href="/messages">
            « Back
          </a>
          <span className="message__recipient">
            {!!this.state.recipient && (
              <img
                className="message__avatar"
                src={this.state.recipient.profilePicture}
                alt=""
              />
            )}
            {!!this.state.recipient && this.state.recipient.name}
          </span>
          <span className="message__back message__hidden">« Back</span>
        </div>
        <div className="message__scrollcontainer">
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
        </div>
        <div className="message__compose">
          <div className="message__textcontainer">
            <TextareaAutosize
              placeholder={"New Message"}
              value={this.state.newMessage}
              onChange={(e) => {
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
