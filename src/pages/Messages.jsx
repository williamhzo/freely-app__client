import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { withUser } from "../components/Auth/withUser";
import MessageCard from "../components/Messages/MessageCard";
import apiHandler from "../api/apiHandler";
import "../styles/Messages.scss";

class Messages extends Component {
  state = {
    newMessage: undefined,
    messages: [],
    users: [],
    currentUser: undefined,
  };

  componentDidMount() {
    apiHandler.isLoggedIn().then((apiRes) => {
      this.setState({ currentUser: apiRes }, () => {
        apiHandler
          .getAllMessages(this.state.currentUser._id)
          .then((apiRes) => {
            this.setState({ messages: apiRes });
          })
          .catch((err) => console.log(err));
      });
    });
    apiHandler.getUsers().then((apiRes) => {
      this.setState({ users: apiRes });
    });
  }

  handleUserChange = (e, value) => {
    this.setState({ newMessage: value });
  };

  handleCreate = () => {
    if (!this.state.newMessage) {
      return;
    }
    this.state.messages.forEach((message) => {
      if (
        message.recipients[0]._id === this.state.newMessage._id ||
        message.recipients[1]._id === this.state.newMessage._id
      ) {
        this.props.history.push("/messages/" + message._id);
        return;
      }
    });
    apiHandler
      .createMessageThread(
        this.state.currentUser._id,
        this.state.newMessage._id
      )
      .then((apiRes) => {
        this.props.history.push("/messages/" + apiRes._id);
      });
  };

  render() {
    return (
      <div className="messages container">
        <div className="messages__new">
          <p className="messages__to">To:</p>
          <Autocomplete
            onChange={this.handleUserChange}
            id="tags-outlined"
            options={this.state.users}
            value={this.state.newMessage}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
          <button
            className="messages__createbutton edit__button"
            onClick={this.handleCreate}
          >
            New
          </button>
        </div>
        <div className="messages__list">
          {this.state.messages ? (
            this.state.messages.map((message, index) => {
              if (message.messages.length > 1) {
                return (
                  <MessageCard
                    message={message}
                    user={this.state.currentUser}
                  />
                );
              }
              return null;
            })
          ) : (
            <p>No messages to display</p>
          )}
        </div>
      </div>
    );
  }
}

export default withUser(Messages);
