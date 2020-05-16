import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/ProfileEdit.scss";
// import TagAutocomplete from "../components/TagAutocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

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
  }

  render() {
    // console.log(this.props.match.params.username);
    return (
      <form className="profile container">
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
        <h2 className="profile__name">{this.state.name}</h2>
        {this.state.userCategory && (
          <div className="profile__categories">
            <Autocomplete
              multiple
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
          <div className="profile__title">{this.state.title}</div>
        )}
        {this.state.socialLinks && (
          <div className="profile__sociallinks">
            {this.state.socialLinks.map((link) => {
              // ADD SCRIPT TO FORMAT LINKS 👈
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
          {this.state.location && (
            <li className="profile__bullet">Based in {this.state.location}</li>
          )}
          {this.state.remote && (
            <li className="profile__bullet">Open to remote collaboration</li>
          )}
          <li className="profile__bullet">Preferred method of contact: ____</li>
        </ul>
        {this.state.userSkills && (
          <div className="profile__skills">
            <h2 className="profile__heading">Skills</h2>
            {this.state.userSkills.map((skill) => {
              return <div className="profile__skill">{skill.name}</div>;
            })}
          </div>
        )}
        {this.state.bio && (
          <>
            <h2 className="profile__heading">About</h2>
            <div className="profile__bio">{this.state.bio}</div>
          </>
        )}
        {this.state.portfolio && (
          <div className="profile__portfolio">
            {this.state.portfolio.map((portfolioItem) => {
              return (
                <div className="profile__portfolioitem">
                  <img
                    className="profile__portfolioimage"
                    src={portfolioItem.image}
                    alt=""
                  />
                  <div className="profile__portfoliotitle">
                    {portfolioItem.title}
                  </div>
                  <div className="profile__portfoliodescription">
                    {portfolioItem.description}
                  </div>
                  <div className="profile__portfoliolink">
                    {portfolioItem.link}
                  </div>
                </div>
              );
            })}
          </div>
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
