import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/ProfileEdit.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";

export default class CollabEdit extends Component {
  state = {
    categoryOptions: [],
    skillOptions: [],
    saved: true,
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
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
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ saved: false });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let collab = { ...this.state };
    delete collab.saved;
    delete collab.skillOptions;
    delete collab.categoryOptions;
    delete collab._id;
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
            this.state.saved
              ? "profile__button saved"
              : "profile__button unsaved"
          }
        >
          {this.state.saved ? "Saved" : "Save"}
        </button>
        {this.state.profilePicture && (
          <div className="profile__avatarbox">
            <label htmlFor="profilePicture">
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="input--hidden"
              />
              <img
                className="profile__picture"
                src={this.state.profilePicture}
                alt=""
              />
            </label>
          </div>
        )}
        <h2 className="profile__name">
          <TextareaAutosize
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            className="profile__title"
            maxLength={280}
            placeholder="Title"
          />
        </h2>
        {this.state.userCategory && (
          <div className="profile__categories">
            <Autocomplete
              multiple
              onChange={this.handleCategoryChange}
              limitTags={3}
              id="tags-outlined"
              options={this.state.categoryOptions}
              defaultValue={this.state.userCategory}
              getOptionLabel={(option) => option.name} // specify what property to use
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        )}

        <ul className="profile__bullets">
          <li className="profile__bullet">
            Based in
            <input
              type="text"
              name="location"
              id="location"
              value={this.state.location || ""}
              placeholder="Location"
            />
          </li>
          <li className="profile__bullet">
            <select id="remote" value={this.state.remote} name="remote">
              <option value={true}>Open to remote collabs</option>
              <option value={false}>Not open to remote collabs</option>
            </select>
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
        {this.state.userSkills && this.state.skillOptions && (
          <>
            <h2 className="profile__heading">Skills</h2>
            <div className="profile__skills">
              <Autocomplete
                multiple
                limitTags={5}
                onChange={this.handleSkillChange}
                id="tags-outlined"
                options={this.state.skillOptions}
                defaultValue={this.state.userSkills}
                getOptionLabel={(option) => option.name} // specify what property to use
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </>
        )}
        {this.state.bio && (
          <>
            <h2 className="profile__heading">About</h2>
            <TextareaAutosize
              type="bio"
              name="bio"
              id="bio"
              value={this.state.bio}
              className="profile__bio"
              placeholder="Intro"
            />
          </>
        )}
        {this.state.portfolio && (
          <>
            <h2 className="profile__heading">Portfolio</h2>
            <div className="profile__portfolio">
              {this.state.portfolio.map((portfolioItem) => {
                return (
                  <div className="profile__portfolioitem">
                    <img
                      className="profile__portfolioimage"
                      src={portfolioItem.image}
                      alt=""
                    />
                    <h3 className="profile__portfoliotitle">
                      {portfolioItem.title}
                    </h3>
                    <div className="profile__portfoliodescription">
                      {portfolioItem.description}
                    </div>
                    {portfolioItem.link && (
                      <div className="profile__portfoliolink">
                        <a href={portfolioItem.link}>Link »</a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
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
