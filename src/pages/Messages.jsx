import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

class Messages extends Component {
  state = {
    newMessage: undefined,
    messages: [],
    users: [],
  };

  componentDidMount() {
    apiHandler.getUsers().then((apiRes) => {
      this.setState({ users: apiRes });
    });
    apiHandler
      .getAllMessages(this.props.context.user._id)
      .then((apiRes) => console.log(apiRes));
  }

  handleUserChange = (e, value) => {
    this.setState({ newMessage: value });
  };

  handleCreate = () => {
    console.log(this.props.context.user);
    console.log(this.state.newMessage);
    apiHandler
      .createMessageThread(
        this.props.context.user._id,
        this.state.newMessage._id
      )
      .then((apiRes) => {
        console.log(apiRes);
        this.props.history.push("/messages/" + apiRes._id);
      });
  };

  render() {
    return (
      <div className="messages">
        <div className="messages__new">
          To:
          <Autocomplete
            onChange={this.handleUserChange}
            id="tags-outlined"
            options={this.state.users}
            value={this.state.newMessage}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <button onClick={this.handleCreate}>Create</button>
        <div className="messages__list"></div>
      </div>
    );
  }
}

export default withUser(Messages);
