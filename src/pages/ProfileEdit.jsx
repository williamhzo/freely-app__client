import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/ProfileEdit.scss";
// import TagAutocomplete from "../components/TagAutocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core";
import { objectToFormData } from "object-to-formdata";

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
    let user = { ...this.state };
    console.log(user);
    delete user.saved;
    delete user.skillOptions;
    delete user.categoryOptions;
    delete user._id;
    const formData = objectToFormData(user);
    apiHandler.patchUser(this.state._id, formData).then((apiRes) => {
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
/*


LOOKING FOR PROJECTS?
PREFERED CONTACT?
IF IS CREATOR OF COLLAB, SAY SO


  "private": false,
{
  "userCollab": [
    {
      "contributors": [
        "5ebe6ec22fa92012124eec13",
        "5ebe6ec22fa92012124eec13",
        "5ebe6ec22fa92012124eec02"
      ],
      "skillsNeeded": [
        "5ebe6df7ac961e11d7dc4e02",
        "5ebe6df7ac961e11d7dc4f19",
        "5ebe6df7ac961e11d7dc4dc0"
      ],
      "categoryNeeded": [
        "5ebe6eb26f5abf1203e7e710"
      ],
      "image": "https://images.unsplash.com/photo-1487014679447-9f8336841d58?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
      "_id": "5ebe763d13e90113badd185a",
      "title": "Straighten your pope hat",
      "description": "I'm sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in.",
      "open": true,
      "creator": "5ebe6ec22fa92012124eec13",
      "__v": 0
    }
  ],
}

*/
