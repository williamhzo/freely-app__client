import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import Badges from "../components/Badges";
import "../styles/Display.scss";

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
      <div className="display container">
        {this.state.profilePicture && (
          <div className="display__avatarbox">
            <img
              className="display__picture"
              src={this.state.profilePicture}
              alt=""
            />
          </div>
        )}
        <h2 className="display__name">{this.state.name}</h2>
        {this.state.userCategory && (
          <div className="display__categories">
            {this.state.userCategory.map((category) => (
              <li className="display__category badge">{category.name}</li>
            ))}
          </div>
        )}
        {this.state.title && (
          <div className="display__title">{this.state.title}</div>
        )}
        {this.state.socialLinks && (
          <div className="display__sociallinks">
            {this.state.socialLinks.map((link) => {
              return (
                <a href={link} className="display__sociallink">
                  {checkLink(link)}
                </a>
              );
            })}
          </div>
        )}
        <ul className="display__bullets">
          {this.state.location && (
            <li className="display__bullet">
              Based in {this.state.location || ""}
            </li>
          )}
          <li className="display__bullet">
            {this.state.remote
              ? "Open to remote collabs"
              : "Not open to remote collabs"}
          </li>
          {this.state.contact && (
            <li className="display__bullet">Preferred method of contact:</li>
          )}
        </ul>
        {this.state.userSkills && (
          <Badges
            heading={"Skills"}
            data={this.state.userSkills}
            label={"name"}
            className="display__fullwidth"
          />
        )}
        {this.state.bio && (
          <>
            <h3 className="display__heading">About</h3>
            <div className="display__bio">{this.state.bio}</div>
          </>
        )}
        {this.state.portfolio && (
          <>
            <h3 className="display__heading">Portfolio</h3>
            <div className="display__portfolio">
              {this.state.portfolio.map((portfolioItem) => {
                return (
                  <div className="display__portfolioitem">
                    <img
                      className="display__portfolioimage"
                      src={portfolioItem.image}
                      alt=""
                    />
                    <h3 className="display__portfoliotitle">
                      {portfolioItem.title}
                    </h3>
                    <div className="display__portfoliodescription">
                      {portfolioItem.description}
                    </div>
                    {portfolioItem.link && (
                      <div className="display__portfoliolink">
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
          <div className="display__collabs">
            <h3 className="display__heading">Collabs</h3>
            {this.state.userCollab.map((collab) => {
              return (
                <div className="display__collabcard">
                  <img
                    src={collab.image}
                    alt=""
                    className="display__collabcardimage"
                  />
                  <h3 className="display__collabcardtitle">{collab.title}</h3>
                  <p className="display__collabcarddescription">
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
