import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";
import "../styles/Edit.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";
import CityAutoComplete from "../components/CityAutoComplete";
import CollabCard from "../components/Cards/CollabCard";
import Axios from "axios";

const checkLink = (link) => {
  let icon = "🌐";
  if (link.match(/facebook.com/)) {
    icon = "📘";
  } else if (link.match(/twitter.com/)) {
    icon = "🐦";
  } else if (link.match(/linkedin.com/)) {
    icon = "ℹ️";
  } else if (link.match(/instagram.com/)) {
    icon = "📷";
  }
  return icon;
};

export default class ProfileEdit extends Component {
  state = {
    categoryOptions: [],
    saved: true,
    usernameAvailable: true,
  };
  componentDidMount() {
    apiHandler
      .getUser("userName", this.props.match.params.username)
      .then((apiRes) => {
        this.setState(apiRes[0]);
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
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.state.usernameAvailable) {
      return;
    }
    let user = { ...this.state };
    delete user.saved;
    delete user.skillOptions;
    delete user.categoryOptions;
    delete user._id;
    if (user.portfolio) {
      user.portfolio = JSON.stringify(user.portfolio);
    }
    if (user.userCategory) {
      user.userCategory = JSON.stringify(user.userCategory);
    }
    if (user.userSkills) {
      user.userSkills = JSON.stringify(user.userSkills);
    }
    if (user.userCollab) {
      user.userCollab = JSON.stringify(user.userCollab);
    }
    const formData = objectToFormData(user);
    apiHandler.patchUser(this.state._id, formData).then((apiRes) => {
      this.setState({ apiRes });
      this.setState({ saved: true });
    });
  };
  handleCategoryChange = (e, value) => {
    this.setState({ userCategory: value, saved: false });
  };
  handleSkillChange = (e, value) => {
    this.setState({ userSkills: value, saved: false });
  };
  handleUsername = (e) => {
    apiHandler.getUser("userName", e.target.value).then((apiRes) => {
      if (apiRes.length > 0) {
        if (apiRes[0]._id != this.state._id) {
          this.setState({ usernameAvailable: false });
        } else {
          this.setState({ usernameAvailable: true });
        }
      } else {
        this.setState({ usernameAvailable: true });
      }
    });
  };

  handlePlaceChange = (place) => {
    this.setState({ location: place.place_name, saved: false });
  };

  render() {
    return (
      <form
        onChange={this.handleFormChange}
        onSubmit={this.handleFormSubmit}
        className="profile container"
      >
        <button
          className={
            this.state.saved
              ? "edit__button saved"
              : this.state.usernameAvailable
              ? "edit__button unsaved"
              : "edit__button invalid"
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
          <input type="text" name="name" id="name" value={this.state.name} />
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
        {this.state.title && (
          <TextareaAutosize
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            className="profile__title"
            maxLength={280}
            placeholder="Intro"
          />
        )}
        {this.state.socialLinks && (
          <div className="profile__sociallinks">
            {this.state.socialLinks.map((link) => {
              return (
                <a href={link} className="profile__sociallink">
                  {checkLink(link)}
                </a>
              );
            })}
            <span className="edit--container">
              <span className="edit--right">edit</span>
            </span>
          </div>
        )}
        <ul className="profile__bullets">
          <li className="profile__bullet">
            Username:{" "}
            <input
              type="text"
              name="userName"
              id="userName"
              spellcheck="false"
              onChange={this.handleUsername}
              value={this.state.userName}
            />
            {!this.state.saved && (this.state.usernameAvailable ? "✅" : "❌")}
          </li>
          <li className="profile__bullet">
            <select
              id="openToProjects"
              value={this.state.openToProjects}
              name="openToProjects"
            >
              <option value={true}>Open to collaborations</option>
              <option value={false}>
                Not open to collaborations right now
              </option>
            </select>
          </li>
          <li className="profile__bullet">
            Based in
            <CityAutoComplete
              onSelect={this.handlePlaceChange}
              userLocation={this.state.location}
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
              name="preferredContact"
              id="preferredContact"
              value={this.state.preferredContact || ""}
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
        {this.state.userCollab &&
          this.state.userCollab.map((collab) => {
            return (
              <Link className="card" to={`/collab/${collab._id}`}>
                <div
                  style={{ backgroundImage: `url(${collab.image})` }}
                  className="card__aside"
                ></div>
                <div className="card__body">
                  <p className="card__copy">
                    {this.state.name}{" "}
                    {this.state._id == collab.creator
                      ? `created`
                      : `collaborated on`}
                    :
                  </p>
                  <h3 className="card__title">{collab.title}</h3>
                  <p className="card__copy">{collab.description}</p>
                  <p className="card__copy">
                    {collab.open
                      ? "Accepting coworkers!"
                      : "This project team is complete."}
                  </p>
                </div>
              </Link>
            );
          })}
      </form>
    );
  }
}
