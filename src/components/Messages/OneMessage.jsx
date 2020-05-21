import React, { Component } from "react";

export default class OneMessage extends Component {
  render() {
    const message = this.props.message;
    const time = new Date(message.time);
    const user = this.props.user;
    const own = this.props.message.author === user._id;
    const readableDate =
      "" +
      time.getHours() +
      ":" +
      (time.getMinutes() < 10 ? "0" : "") +
      time.getMinutes() +
      " " +
      time.getDay() +
      "/" +
      time.getMonth() +
      "/" +
      time.getFullYear();
    return (
      <div className={"message__onemessage " + (own ? "sent" : "received")}>
        <div className="message__time">{readableDate}</div>
        <div className="message__content">{message.content}</div>
      </div>
    );
  }
}
