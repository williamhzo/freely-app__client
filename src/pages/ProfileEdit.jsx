import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import UserContext from "../components/Auth/UserContext";
import "../styles/Display.scss";
import "../styles/Edit.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";
import CityAutoComplete from "../components/CityAutoComplete";
import LinkIcon from "../components/LinkIcon";
import Error from "../components/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faPlusCircle,
  faMinusCircle,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

/*

username available?

*/

export default class ProfileEdit extends Component {
  state = {
    saved: true,
    usernameAvailable: true,
    newPortfolio: {},
    error: undefined,
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ error: "Please enter your name." });
      return;
    }
    if (!this.state.usernameAvailable) {
      this.setState({
        error:
          "Username is either invalid or unavailable. Usernames can by 3–10 characters and use letters, numbers, and underscores",
      });
      return;
    }
    if (
      this.state.email &&
      !this.state.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,10}$/)
    ) {
      this.setState({ error: "Please enter a valid address." });
      return;
    }
    let user = { ...this.state };
    delete user.saved;
    delete user.skillOptions;
    delete user.categoryOptions;
    delete user._id;
    delete user.addSocial;
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
    // console.log(this.state.portfolio);
    apiHandler.patchUser(this.state._id, formData).then((apiRes) => {
      if (apiRes.userName !== this.props.match.params.username) {
        this.context.updateContext();
        this.props.history.push("/" + apiRes.userName + "/edit");
      }
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
    if (
      !e.target.value.match(/^[a-zA-Z0-9_]{3,15}$/) ||
      e.target.value.match(
        /^(about|user|collab|collabs|messages|message|edit|login|signup|freely)$/i
      )
    ) {
      this.setState({ usernameAvailable: false });
      return;
    }
    apiHandler.getUser("userName", e.target.value).then((apiRes) => {
      if (apiRes.length > 0) {
        if (apiRes[0]._id !== this.state._id) {
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
  handleError = (error) => {
    this.setState({ error: undefined });
  };
  handleFormChange = (e) => {
    if (e.target.name === "social") {
      this.setState({
        socialLinks: [...document.querySelectorAll("[name='social']")].map(
          (item) => item.value
        ),
      });
      this.setState({ saved: false });
    } else if (e.target.name === "profilePicture") {
      if (e.target.files[0].size > 750000) {
        this.setState({ error: "Maximum file size: 750kb" });
        return;
      } else {
        this.setState({ profilePicture: e.target.files[0] });
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({
            temporaryPicture: reader.result,
          });
        };
        reader.readAsDataURL(e.target.files[0]);
        this.setState({ saved: false });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ saved: false });
    }
  };

  handlePortfolio = (index, event) => {
    this.setState({ saved: false });
    if (event.target.name !== "image") {
      const portfolio = [...this.state.portfolio];
      portfolio[index][event.target.name] = event.target.value;
      this.setState({ portfolio: portfolio });
    }
  };

  handleNewPortfolio = (e) => {
    const newPortfolio = { ...this.state.newPortfolio };
    if (e.target.name === "image") {
      if (e.target.files[0].size > 750000) {
        console.log("Big image");
        this.setState({ error: "Maximum file size: 750kb" });
        return;
      }
      newPortfolio.image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        newPortfolio.temporaryPicture = reader.result;
        this.setState({ newPortfolio: newPortfolio });
        console.log(newPortfolio);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      newPortfolio[e.target.name] = e.target.value;
      this.setState({ newPortfolio: newPortfolio });
    }
  };

  handleAddPortfolio = (e) => {
    e.preventDefault();
    if (
      !{ ...this.state.newPortfolio }.title ||
      !{ ...this.state.newPortfolio }.description ||
      !{ ...this.state.newPortfolio }.link
    ) {
      this.setState({ error: "Please fill out all fields." });
      return;
    }
    this.setState({
      ["portfolio" + this.state.portfolio.length]: this.state.newPortfolio
        .image,
    });
    this.setState({
      portfolio: this.state.portfolio.concat([this.state.newPortfolio]),
      saved: false,
      newPortfolio: {
        image: "",
        title: "",
        description: "",
        link: "",
      },
    });
  };

  handleRemovePortfolio = (index) => {
    this.setState({
      portfolio: this.state.portfolio.filter((item, i) => i !== index && item),
      saved: false,
    });
  };

  handlePortfolioImage = (index, event) => {
    this.setState({ ["portfolio" + index]: event.target.files[0] });
    const portfolio = [...this.state.portfolio];
    const reader = new FileReader();
    reader.onload = () => {
      portfolio[index].temporaryPicture = reader.result;
      this.setState({ portfolio: portfolio });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  handleAddSocial = (e) => {
    e.preventDefault();
    if (this.state.addSocial) {
      this.setState({
        socialLinks: this.state.socialLinks.concat([this.state.addSocial]),
        saved: false,
        addSocial: "",
      });
    }
  };

  handleRemoveSocial = (index) => {
    this.setState({
      socialLinks: this.state.socialLinks.filter(
        (item, i) => i !== index && item
      ),
      saved: false,
    });
  };

  static contextType = UserContext;

  render() {
    if (
      !this.context.user ||
      this.context.user.userName !== this.props.match.params.username
    ) {
      return <Redirect to="/error_404" />;
    }
    return (
      <>
        <form
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
          className="display container"
        >
          <div className="profile__buttons">
            <button
              className={
                this.state.saved
                  ? "btn btn__standard btn__blue btn__inactive"
                  : this.state.usernameAvailable &&
                    this.state.userName &&
                    this.state.email
                  ? "btn btn__standard btn__green btn__hover"
                  : "btn btn__standard btn__orange btn__inactive"
              }
            >
              {this.state.saved ? "Saved" : "Save"}
            </button>
          </div>
          <label htmlFor="profilePicture" className="edit__imageinput">
            <div
              className="display__imagediv display__avatarbox edit__imageedit"
              style={{
                backgroundImage: `url("${
                  this.state.temporaryPicture || this.state.profilePicture
                }")`,
              }}
            >
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="input--hidden"
                accept=".png, .jpg, .jpeg"
              />
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </label>
          <h2 className="display__name">
            <input
              type="text"
              spellcheck="false"
              name="name"
              id="name"
              placeholder="Name"
              value={this.state.name}
            />
          </h2>
          {/* <p>Choose a category:</p> */}
          {console.log(this.state.userCategory)}
          {this.state.categoryOptions && (
            <div className="display__categories">
              <Autocomplete
                multiple
                // label="Category"
                style={{ width: 250 }}
                onChange={this.handleCategoryChange}
                limitTags={3}
                id="tags-outlined"
                options={this.state.categoryOptions}
                value={this.state.userCategory}
                getOptionLabel={(option) => option.name} // specify what property to use
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          )}
          <TextareaAutosize
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            className="display__title"
            maxLength={280}
            placeholder="Intro"
          />
          <div className="display__editsocial">
            {this.state.socialLinks &&
              this.state.socialLinks.map((link, index) => {
                return (
                  <label
                    className="display__editsociallink"
                    htmlFor={"social" + index}
                  >
                    <LinkIcon link={link} />
                    <input
                      type="text"
                      name={"social"}
                      id={"social" + index}
                      value={link}
                      spellcheck="false"
                    />
                    <FontAwesomeIcon
                      onClick={() => this.handleRemoveSocial(index)}
                      icon={faMinusCircle}
                    />
                  </label>
                );
              })}
            <label htmlFor={"socialπ"} className="display__editsociallink">
              <LinkIcon link={""} />
              <input
                className="social--link"
                type="text"
                name="addSocial"
                placeholder="Link"
                id={"socialπ"}
                // if user clicks "enter"
                onKeyDown={(e) =>
                  e.keyCode === 13 ? this.handleAddSocial(e) : null
                }
                value={this.state.addSocial}
              />
              <FontAwesomeIcon
                onClick={this.handleAddSocial}
                icon={faPlusCircle}
              />
            </label>
          </div>
          <div className="display__bullets">
            <h3>Key Points</h3>
            <ul>
              <li className="display__bullet">
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
              <li className="display__bullet display__location">
                Based in
                <CityAutoComplete
                  onSelect={this.handlePlaceChange}
                  userLocation={this.state.location}
                />
              </li>
              <li className="display__bullet">
                <select id="remote" value={this.state.remote} name="remote">
                  <option value={true}>Open to remote collabs</option>
                  <option value={false}>Not open to remote collabs</option>
                </select>
              </li>
              <li className="display__bullet">
                Preferred method of contact:{" "}
                <input
                  type="text"
                  name="preferredContact"
                  id="preferredContact"
                  spellcheck="false"
                  value={this.state.preferredContact || ""}
                  placeholder="Contact"
                />
              </li>
            </ul>
            <h3>Personal Info</h3>
            <ul>
              <li className="display__bullet">
                Username:{" "}
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  spellcheck="false"
                  onChange={this.handleUsername}
                  value={this.state.userName}
                />
                {this.state.usernameAvailable ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <FontAwesomeIcon icon={faTimesCircle} />
                )}
              </li>
              <li className="display__bullet">
                Phone Number:{" "}
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  spellcheck="false"
                  value={this.state.phone}
                />
              </li>
              <li className="display__bullet">
                Email:{" "}
                <input
                  type="text"
                  name="email"
                  id="email"
                  spellcheck="false"
                  value={this.state.email}
                />
              </li>
            </ul>
          </div>
          <h2 className="display__heading">Skills</h2>
          {this.state.skillOptions && (
            <Autocomplete
              multiple
              limitTags={5}
              onChange={this.handleSkillChange}
              id="tags-outlined"
              options={this.state.skillOptions}
              value={this.state.userSkills}
              getOptionLabel={(option) => option.name} // specify what property to use
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          <h2 className="display__heading">About</h2>
          <TextareaAutosize
            type="bio"
            name="bio"
            id="bio"
            value={this.state.bio}
            className="display__bio"
            placeholder="Tell us about yourself..."
          />
        </form>
        <div className="display__portfolio container">
          <h2 className="display__heading">Portfolio</h2>

          {this.state.portfolio &&
            this.state.portfolio.map((portfolioItem, index) => {
              return (
                <form
                  className="display__portfolioitem"
                  onChange={(event) => this.handlePortfolio(index, event)}
                >
                  <label htmlFor={"image" + index} className="edit__imageinput">
                    <input
                      onChange={(event) =>
                        this.handlePortfolioImage(index, event)
                      }
                      type="file"
                      name="image"
                      id={"image" + index}
                      className="input--hidden"
                      accept=".png, .jpg, .jpeg"
                    />
                    <div
                      className="display__portfolioimage display__imagediv edit__imageedit"
                      style={{
                        backgroundImage: `url("${
                          portfolioItem.temporaryPicture || portfolioItem.image
                        }")`,
                      }}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </div>
                  </label>
                  <div className="display__portfoliotext">
                    <h3 className="display__portfoliotitle">
                      <input
                        type="text"
                        name={"title"}
                        id={"title"}
                        spellcheck="false"
                        value={portfolioItem.title}
                      />
                    </h3>
                    <TextareaAutosize
                      name="description"
                      id="description"
                      value={portfolioItem.description}
                      className="display__portfoliodescription"
                      placeholder="Intro"
                    />
                    <div className="display__portfoliolink">
                      <input
                        type="text"
                        name={"link"}
                        id={"link"}
                        spellcheck="false"
                        value={portfolioItem.link}
                      />
                      {!portfolioItem.temporaryPicture && !portfolioItem.image && (
                        <label htmlFor={"image" + index}>
                          <FontAwesomeIcon icon={faCamera} />
                        </label>
                      )}
                      <FontAwesomeIcon
                        onClick={() => this.handleRemovePortfolio(index)}
                        icon={faMinusCircle}
                      />
                    </div>
                  </div>
                </form>
              );
            })}
          {(!this.state.portfolio || this.state.portfolio.length < 3) && (
            <form
              className="display__portfolioitem"
              onChange={this.handleNewPortfolio}
              onSubmit={this.handleAddPortfolio}
            >
              <label htmlFor={"imageπ"}>
                <input
                  type="file"
                  name="image"
                  id={"imageπ"}
                  className="input--hidden"
                  accept=".png, .jpg, .jpeg"
                />
                <div
                  className="display__portfolioimage display__imagediv edit__imageedit"
                  style={{
                    backgroundImage: `url("${
                      this.state.newPortfolio.temporaryPicture ||
                      "https://images.unsplash.com/photo-1566041510632-30055e21a9cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9"
                    }")`,
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                {/* // <img
                //   className="display__portfolioimage"
                //   src={
                //     this.state.newPortfolio.temporaryPicture ||
                //     "https://images.unsplash.com/photo-1566041510632-30055e21a9cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9"
                //   }
                //   alt=""
                // /> */}
              </label>
              <div className="display__portfoliotext">
                <h3 className="display__portfoliotitle">
                  <input
                    type="text"
                    name={"title"}
                    id={"title"}
                    spellcheck="false"
                    value={this.state.newPortfolio.title}
                    placeholder="Portfolio Item Title"
                  />
                </h3>
                <TextareaAutosize
                  name="description"
                  id="description"
                  value={this.state.newPortfolio.description}
                  className="display__portfoliodescription"
                  placeholder="Describe your project..."
                />
                <div className="display__portfoliolink">
                  <input
                    type="text"
                    name={"link"}
                    spellcheck="false"
                    id={"link"}
                    value={this.state.newPortfolio.link}
                    placeholder="A link to your project"
                  />
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    onClick={this.handleAddPortfolio}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
        {!!this.state.error && (
          <Error error={this.state.error} handleError={this.handleError} />
        )}
      </>
    );
  }
}
