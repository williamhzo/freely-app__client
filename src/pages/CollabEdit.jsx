import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";
import "../styles/Edit.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";

/*

Done: 
- Image (.image)
- Roles Needed not working (.categoryNeeded)

To Do:
- Open or closed (.open)
- Contributor multi-select (.contributors)
- Preferred method of contact (get from creator)
- Contributor handling. (Get all users with this collab, remove collab, then add) (.contributors)

*/

export default class CollabEdit extends Component {
  state = {
    categoryOptions: [],
    skillOptions: [],
    saved: true,
    title: "",
    creator: "",
    contributors: [],
    description: "",
    skillsNeeded: [],
    categoryNeeded: [],
    image: "",
    open: false,
  };
  componentDidMount() {
    apiHandler.getCollab(this.props.match.params.id).then((apiRes) => {
      this.setState(apiRes);
    });
    apiHandler.getCategories().then((apiRes) => {
      this.setState({ categoryOptions: apiRes });
    });
    apiHandler.getSkills().then((apiRes) => {
      this.setState({ skillOptions: apiRes });
    });
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ saved: false });
    if (e.target.name == "image") {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ temporaryPicture: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ image: e.target.files[0] });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let collab = { ...this.state };
    delete collab.saved;
    delete collab.skillOptions;
    delete collab.categoryOptions;
    delete collab.temporaryPicture;
    delete collab._id;
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
    apiHandler.patchCollab(this.state._id, formData).then((apiRes) => {
      this.setState({ apiRes });
      this.setState({ saved: true });
    });
  };
  handleCategoryChange = (e, value) => {
    this.setState({ categoryOptions: value });
  };
  handleSkillChange = (e, value) => {
    this.setState({ skillOptions: value });
  };
  render() {
    // console.log(this.props.match.params.username);
    return (
      <form
        onChange={this.handleFormChange}
        onSubmit={this.handleFormSubmit}
        className="profile container"
      >
        <button
          className={
            this.state.saved ? "edit__button saved" : "edit__button unsaved"
          }
        >
          {this.state.saved ? "Saved" : "Save"}
        </button>

        <div className="profile__avatarbox">
          <label htmlFor="image">
            <input
              type="file"
              name="image"
              id="image"
              className="input--hidden"
            />
            <img
              className="profile__picture"
              src={this.state.temporaryPicture || this.state.image}
              alt=""
            />
          </label>
        </div>

        <h2 className="profile__collabtitle">
          <TextareaAutosize
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            maxLength={280}
            placeholder="Title"
          />
        </h2>

        <h3 className="profile__heading">Description</h3>
        <TextareaAutosize
          type="description"
          name="description"
          id="description"
          value={this.state.description}
          className="profile__description"
          placeholder="Description"
        />

        <div className="profile__collabroles">
          <h3 className="profile__heading">Roles Needed</h3>
          <Autocomplete
            multiple
            onChange={this.handleCategoryChange}
            limitTags={5}
            id="tags-outlined"
            options={this.state.categoryOptions}
            defaultValue={this.state.categoryNeeded}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="profile__skillsneeded">
          <h3 className="profile__heading">Skills Needed</h3>
          <Autocomplete
            multiple
            limitTags={5}
            onChange={this.handleSkillChange}
            id="tags-outlined"
            options={this.state.skillOptions}
            defaultValue={this.state.skillsNeeded}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <ul className="profile__bullets">
          <li className="profile__bullet">
            {this.state.open
              ? "This project is seeking collaborators."
              : "This project is not seeking collaborators."}
          </li>
          <li className="profile__bullet">
            Created by {this.state.creator.name}
          </li>
          <li className="profile__bullet">
            Contributors:
            {this.state.contributors.map((contributor) => (
              <span className="profile__contributor">{contributor.name}, </span>
            ))}
          </li>
          <li className="profile__bullet">
            Preferred method of contact:{" "}
            <input
              type="text"
              name="contact"
              id="contact"
              value={this.state.contact || ""}
              placeholder="Contact"
            />
          </li>
        </ul>

        {this.state.userCollab && (
          <div className="profile__collabs">
            <h2 className="profile__heading">Collabs</h2>
            {this.state.userCollab.map((collab) => {
              return (
                <div className="profile__collab">
                  <img
                    src={collab.image}
                    alt=""
                    className="profile__collabimage"
                  />
                  <h3 className="profile__collabtitle">{collab.title}</h3>
                  <p className="profile__collabdescription">
                    {collab.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </form>
    );
  }
}
