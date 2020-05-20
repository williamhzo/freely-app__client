import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";
import "../styles/Edit.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";
import Error from "../components/Error";
import { withUser } from "../components/Auth/withUser";

class CollabNew extends Component {
  state = {
    categoryOptions: [],
    skillOptions: [],
    saved: true,
    title: "",
    creator: "",
    contributors: [],
    allUsers: [],
    description: "",
    skillsNeeded: [],
    categoryNeeded: [],
    image: "",
    open: false,
    error: undefined,
  };
  componentDidMount() {
    apiHandler.getCategories().then((apiRes) => {
      this.setState({ categoryOptions: apiRes });
    });
    apiHandler.getSkills().then((apiRes) => {
      this.setState({ skillOptions: apiRes });
    });
    apiHandler.getUsers().then((apiRes) => {
      this.setState({ allUsers: apiRes });
    });
  }
  handleFormChange = (e) => {
    if (e.target.name === "image") {
      if (e.target.files[0].size > 750000) {
        this.setState({ error: "Maximum file size: 750kb" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ temporaryPicture: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ image: e.target.files[0], saved: false });
    } else {
      this.setState({ [e.target.name]: e.target.value, saved: false });
    }
  };
  handleError = (error) => {
    this.setState({ error: undefined });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title) {
      this.setState({ error: "Please enter a title." });
      return;
    }
    if (!this.state.description) {
      this.setState({ error: "Please enter a description." });
      return;
    }
    let collab = { ...this.state };
    collab.creator = this.props.context.user._id;
    delete collab.saved;
    delete collab.skillOptions;
    delete collab.categoryOptions;
    delete collab.temporaryPicture;
    delete collab._id;
    delete collab.allUsers;
    if (collab.contributors) {
      collab.contributors = JSON.stringify(collab.contributors);
    }
    if (collab.skillsNeeded) {
      collab.skillsNeeded = JSON.stringify(collab.skillsNeeded);
    }
    if (collab.categoryNeeded) {
      collab.categoryNeeded = JSON.stringify(collab.categoryNeeded);
    }
    const formData = objectToFormData(collab);
    apiHandler.postCollab(formData).then((apiRes) => {
      // console.log(apiRes);
      this.props.history.push("/collab/" + apiRes._id);
      this.setState({ apiRes });
      this.setState({ saved: true });
    });
  };
  handleCategoryChange = (e, value) => {
    this.setState({ categoryNeeded: value, saved: false });
  };
  handleSkillChange = (e, value) => {
    this.setState({ skillsNeeded: value, saved: false });
  };
  handleUserChange = (e, value) => {
    this.setState({ contributors: value, saved: false });
  };
  render() {
    // console.log(this.props.match.params.username);
    return (
      <>
        <form
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
          className="display--collab"
        >
          <label htmlFor="image">
            <div
              className="display__collabimagebox"
              style={{
                backgroundImage:
                  "url(" +
                  (this.state.temporaryPicture ||
                    "https://images.unsplash.com/photo-1566041510632-30055e21a9cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9") +
                  ")",
              }}
            >
              <input
                type="file"
                name="image"
                id="image"
                className="input--hidden"
              />
            </div>
          </label>
          <div className="container display display__collabbody">
            <button
              className={
                this.state.saved
                  ? "edit__button collabbutton saved"
                  : "edit__button collabbutton unsaved"
              }
            >
              {this.state.saved ? "Saved" : "Save"}
            </button>
            <h2 className="display__collabtitle">
              <TextareaAutosize
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                maxLength={280}
                placeholder="Title"
              />
            </h2>

            <h3 className="display__heading">Description</h3>
            <TextareaAutosize
              type="description"
              name="description"
              id="description"
              value={this.state.description}
              className="display__description"
              placeholder="Description"
            />

            <div className="display__multiselect">
              <h3 className="display__heading">Roles Needed</h3>
              <Autocomplete
                multiple
                onChange={this.handleCategoryChange}
                limitTags={5}
                id="tags-outlined"
                options={this.state.categoryOptions}
                value={this.state.categoryNeeded}
                getOptionLabel={(option) => option.name} // specify what property to use
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="display__multiselect">
              <h3 className="display__heading">Skills Needed</h3>
              <Autocomplete
                multiple
                // limitTags={5}
                onChange={this.handleSkillChange}
                id="tags-outlined"
                options={this.state.skillOptions}
                value={this.state.skillsNeeded}
                getOptionLabel={(option) => option.name} // specify what property to use
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="display__multiselect">
              <h3 className="display__heading">Contributors</h3>
              <Autocomplete
                multiple
                // limitTags={5}
                onChange={this.handleUserChange}
                id="tags-outlined"
                options={this.state.allUsers}
                value={this.state.contributors}
                getOptionLabel={(option) => option.name} // specify what property to use
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <ul className="display__bullets">
              <li className="display__bullet">
                <select id="open" value={this.state.open} name="open">
                  <option value={true}>Open to collaborators</option>
                  <option value={false}>
                    Not open to collaborators right now
                  </option>
                </select>
              </li>
              <li className="display__bullet">
                Preferred method of contact:{" "}
                <input
                  type="text"
                  name="preferredContact"
                  id="preferredContact"
                  value={this.state.preferredContact}
                />
              </li>
            </ul>
          </div>
        </form>
        {!!this.state.error && (
          <Error error={this.state.error} handleError={this.handleError} />
        )}
      </>
    );
  }
}

export default withUser(CollabNew);
