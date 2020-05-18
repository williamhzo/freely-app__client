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
  } else if (link.match(/^$/)) {
    icon = "➕";
  }
  return icon;
};

export default class ProfileEdit extends Component {
  state = {
    categoryOptions: [],
    saved: true,
    usernameAvailable: true,
    newPortfolio: {},
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
    if (!this.state.usernameAvailable) {
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
    console.log(this.state.portfolio);
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

  handleFormChange = (e) => {
    if (e.target.name === "social") {
      this.setState({
        socialLinks: [...document.querySelectorAll(".social--link")].map(
          (item) => item.value
        ),
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ saved: false });
      if (e.target.name == "profilePicture") {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ temporaryPicture: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
        if (e.target.name === "profilePicture") {
          this.setState({ profilePicture: e.target.files[0] });
        }
      }
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
      console.log("image");
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
    console.log("Handle image");
    // let key = "portfolio" + index;
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
    this.setState({
      socialLinks: this.state.socialLinks.concat([this.state.addSocial]),
      saved: false,
      addSocial: "",
    });
  };

  handleRemoveSocial = (index) => {
    this.setState({
      socialLinks: this.state.socialLinks.filter(
        (item, i) => i !== index && item
      ),
      saved: false,
    });
  };

  render() {
    return (
      <>
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
            <div className="profile__avatarbox edit">
              <label htmlFor="profilePicture">
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  className="input--hidden"
                  accept=".png, .jpg, .jpeg"
                />
                <img
                  className="profile__picture"
                  src={this.state.temporaryPicture || this.state.profilePicture}
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
            <div className="profile__social--edit">
              {this.state.socialLinks.map((link, index) => {
                return (
                  <label htmlFor={"social" + index}>
                    {checkLink(link)}
                    <input
                      className="social--link"
                      type="text"
                      name={"social"}
                      id={"social" + index}
                      value={link}
                    />
                    <button onClick={() => this.handleRemoveSocial(index)}>
                      ❌
                    </button>
                  </label>
                );
              })}
              <label htmlFor={"socialπ"}>
                {checkLink("")}
                <input
                  className="social--link"
                  type="text"
                  name="addSocial"
                  id={"socialπ"}
                  value={this.state.addSocial}
                />
                <button onClick={this.handleAddSocial}>✅</button>
              </label>
            </div>
          )}
          <div className="profile__bullets">
            <h3>Key Points</h3>
            <ul>
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
            <h3>Personal Info</h3>
            <ul>
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
                {this.state.usernameAvailable ? "✔︎" : "✖︎"}
              </li>
              <li className="profile__bullet">
                Phone Number:{" "}
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  spellcheck="false"
                  value={this.state.phone}
                />
              </li>
              <li className="profile__bullet">
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
        </form>
        {this.state.portfolio && (
          <>
            <div className="profile__portfolio container">
              <h2 className="profile__heading">Portfolio</h2>
              {this.state.portfolio.map((portfolioItem, index) => {
                return (
                  <form
                    className="profile__portfolioitem"
                    onChange={(event) => this.handlePortfolio(index, event)}
                  >
                    <label htmlFor={"image" + index}>
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
                      <img
                        className="profile__portfolioimage"
                        src={
                          portfolioItem.temporaryPicture || portfolioItem.image
                        }
                        alt=""
                      />
                    </label>
                    <h3 className="profile__portfoliotitle">
                      <input
                        type="text"
                        name={"title"}
                        id={"title"}
                        value={portfolioItem.title}
                      />
                    </h3>
                    <TextareaAutosize
                      name="description"
                      id="description"
                      value={portfolioItem.description}
                      className="profile__portfoliodescription"
                      placeholder="Intro"
                    />
                    <div className="profile__portfoliolink">
                      <input
                        type="text"
                        name={"link"}
                        id={"link"}
                        value={portfolioItem.link}
                      />
                    </div>
                    <button onClick={() => this.handleRemovePortfolio(index)}>
                      ❌
                    </button>
                  </form>
                );
              })}
              {this.state.portfolio.length < 3 && (
                <form
                  className="profile__portfolioitem"
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
                    <img
                      className="profile__portfolioimage"
                      src={
                        this.state.newPortfolio.temporaryPicture ||
                        "https://images.unsplash.com/photo-1566041510632-30055e21a9cf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9"
                      }
                      alt=""
                    />
                  </label>
                  <h3 className="profile__portfoliotitle">
                    <input
                      type="text"
                      name={"title"}
                      id={"title"}
                      value={this.state.newPortfolio.title}
                      placeholder="Portfolio Item Title"
                    />
                  </h3>
                  <TextareaAutosize
                    name="description"
                    id="description"
                    value={this.state.newPortfolio.description}
                    className="profile__portfoliodescription"
                    placeholder="Describe your project..."
                  />
                  <div className="profile__portfoliolink">
                    <input
                      type="text"
                      name={"link"}
                      id={"link"}
                      value={this.state.newPortfolio.link}
                      placeholder="A link to your project"
                    />
                  </div>
                  <button>Add</button>
                </form>
              )}
            </div>
          </>
        )}
        {this.state.userCollab && (
          <h2 className="heading container">Collaborations</h2>
        )}
        {this.state.userCollab &&
          this.state.userCollab.map((collab) => {
            return (
              <Link className="card container" to={`/collab/${collab._id}`}>
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
      </>
    );
  }
}
