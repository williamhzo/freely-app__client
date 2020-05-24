import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import Badges from "../components/Badges";
import LinkIcon from "../components/LinkIcon";
import "../styles/Display.scss";
import "../styles/Buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faGlobeEurope,
  faCommentAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { withUser } from "../components/Auth/withUser";

class Profile extends Component {
  state = {};
  componentDidMount() {
    apiHandler
      .getUser("userName", this.props.match.params.username)
      .then((apiRes) => {
        if (apiRes.length > 0) {
          this.setState(apiRes[0]);
        } else {
          this.props.history.push("/error_404");
        }
      })
      .catch((err) => console.log(err));
  }
  parselink(link) {
    let regex = /^http/;
    if (!link.match(regex)) {
      return "http://" + link;
    } else {
      return link;
    }
  }
  componentDidUpdate() {
    // when you navigate from one profile to another, reset state
    if (this.props.match.params.username !== this.state.userName) {
      apiHandler
        .getUser("userName", this.props.match.params.username)
        .then((apiRes) => {
          if (apiRes.length > 0) {
            this.setState(apiRes[0]);
          } else {
            this.props.history.push("/error_404");
          }
        })
        .catch((err) => console.log(err));
    }
  }
  sendMessage = () => {
    apiHandler.getAllMessages(this.props.context.user._id).then((messages) => {
      // console.log(messages);
      let filtered = messages.filter((message) => {
        let recipients = [message.recipients[0]._id, message.recipients[1]._id];
        return (
          recipients.includes(this.state._id) &&
          recipients.includes(this.props.context.user._id)
        );
      });
      if (filtered.length > 0) {
        this.props.history.push(`/messages/` + filtered[0]._id);
      } else {
        apiHandler
          .createMessageThread(this.props.context.user._id, this.state._id)
          .then((apiRes) => {
            this.props.history.push(`/messages/` + apiRes._id);
          });
      }
    });
  };
  render() {
    return (
      <div className="display container">
        {this.state.userName && (
          <>
            {this.props.context.isLoggedIn && (
              <div className="profile__buttons">
                {this.props.context.user._id === this.state._id ? (
                  <button
                    className="btn btn__standard btn__blue btn__hover btn__active"
                    onClick={() => {
                      this.props.history.push(
                        "/" + this.state.userName + "/edit"
                      );
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={this.sendMessage}
                    className="btn btn__standard btn__green btn__hover btn__active"
                  >
                    Message
                  </button>
                )}
              </div>
            )}
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
              <Badges data={this.state.userCategory} label={"name"} />
            )}
            {this.state.title && (
              <div className="display__title">{this.state.title}</div>
            )}
            {this.state.socialLinks && (
              <div className="display__sociallinks">
                {this.state.socialLinks.map((link, index) => {
                  return (
                    <a
                      href={this.parselink(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                      className="display__sociallink"
                    >
                      <LinkIcon link={link} />
                    </a>
                  );
                })}
              </div>
            )}
            <ul className="display__bullets">
              {this.state.openToProjects && (
                <li className="display__bullet">
                  <span className="bulleticon">
                    <FontAwesomeIcon icon={faUserFriends} />
                  </span>
                  Open to projects
                </li>
              )}
              {this.state.remote && this.state.openToProjects && (
                <li className="display__bullet">
                  <span className="bulleticon">
                    <FontAwesomeIcon icon={faGlobeEurope} />
                  </span>
                  Open to remote projects
                </li>
              )}
              {this.state.location && (
                <li className="display__bullet">
                  <span className="bulleticon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  Based in {this.state.location || ""}
                </li>
              )}
              {this.state.preferredContact && (
                <li className="display__bullet">
                  <span className="bulleticon">
                    <FontAwesomeIcon icon={faCommentAlt} />
                  </span>
                  Preferred contact: {this.state.preferredContact}
                </li>
              )}
            </ul>
            {this.state.userSkills.length > 0 && (
              <Badges
                heading={"Skills"}
                data={this.state.userSkills}
                label={"name"}
                className="display__fullwidth"
              />
            )}
            {this.state.bio && (
              <>
                <h2 className="display__heading">About me</h2>
                <div className="display__bio">{this.state.bio}</div>
              </>
            )}
            {this.state.portfolio.length > 0 && (
              <>
                <h2 className="display__heading">Portfolio</h2>
                <div className="display__portfolio">
                  {this.state.portfolio.map((portfolioItem, index) => {
                    return (
                      <div key={index} className="display__portfolioitem">
                        <img
                          className="display__portfolioimage"
                          src={portfolioItem.image}
                          alt=""
                        />
                        <div className="display__portfoliotext">
                          <h3 className="display__portfoliotitle">
                            {portfolioItem.title}
                          </h3>
                          <div className="display__portfoliodescription">
                            {portfolioItem.description}
                          </div>
                          {portfolioItem.link && (
                            <div className="display__portfoliolink">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.parselink(portfolioItem.link)}
                              >
                                Link »
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {this.state.userCollab.length > 0 && (
              <div className="display__collabs">
                {console.log(this.state.userCollab)}
                <h2 className="display__heading">Projects</h2>
                {this.state.userCollab.map((collab, index) => {
                  return (
                    <Link to={`/collab/${collab._id}`}>
                      <div key={index} className="display__collabcard">
                        <img
                          src={collab.image}
                          alt=""
                          className="display__collabcardimage"
                        />
                        <h3 className="display__collabcardtitle">
                          {collab.title}
                        </h3>
                        <p className="display__collabcarddescription">
                          {collab.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withUser(Profile);
