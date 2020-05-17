import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/ProfileEdit.scss";

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

export default class Profile extends Component {
  state = {};
  componentDidMount() {
    apiHandler
      .getUser("userName", this.props.match.params.username)
      .then((apiRes) => {
        this.setState(apiRes[0]);
      });
  }

  render() {
    // console.log(this.props.match.params.username);
    return (
      <div className="profile container">
        {this.state.profilePicture && (
          <div className="profile__avatarbox">
            <img
              className="profile__picture"
              src={this.state.profilePicture}
              alt=""
            />
          </div>
        )}
        <h2 className="profile__name">{this.state.name}</h2>
        {this.state.userCategory && (
          <div className="profile__categories">
            {this.state.userCategory.map((category) => (
              <li className="profile__category badge">{category.name}</li>
            ))}
          </div>
        )}
        {this.state.title && (
          <div className="profile__title">{this.state.title}</div>
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
          </div>
        )}
        <ul className="profile__bullets">
          {this.state.location && (
            <li className="profile__bullet">
              Based in {this.state.location || ""}
            </li>
          )}
          <li className="profile__bullet">
            {this.state.remote
              ? "Open to remote collabs"
              : "Not open to remote collabs"}
          </li>
          {this.state.contact && (
            <li className="profile__bullet">Preferred method of contact:</li>
          )}
        </ul>
        {this.state.userSkills && (
          <>
            <h2 className="profile__heading">Skills</h2>
            <ul className="profile__skills">
              {this.state.userSkills.map((skill) => (
                <li className="profile__skill badge">{skill.name}</li>
              ))}
            </ul>
          </>
        )}
        {this.state.bio && (
          <>
            <h2 className="profile__heading">About</h2>
            <div className="profile__bio">{this.state.bio}</div>
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
      </div>
    );
  }
}
