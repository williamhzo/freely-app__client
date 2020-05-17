import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";

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
    console.log(this.props.match.params.id);
    apiHandler.getCollab(this.props.match.params.id).then((apiRes) => {
      this.setState(apiRes);
    });
  }

  render() {
    // console.log(this.props.match.params.username);
    return (
      <div
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
        {this.state.image && (
          <div className="profile__avatarbox">
            <img className="profile__picture" src={this.state.image} alt="" />
          </div>
        )}
        <h2 className="profile__collabtitle">{this.state.title}</h2>

        <h3 className="profile__heading">Description</h3>
        <div className="profile__description">{this.state.description}</div>
        <div className="profile__collabroles">
          <h3 className="profile__header">Roles Needed</h3>
          <div className="profile__categories">
            {this.state.categoryNeeded.map((category) => (
              <li className="profile__category badge">{category.name}</li>
            ))}
          </div>
        </div>
        <div className="profile__skillsneeded">
          <h3 className="profile__heading">Skills Needed</h3>
          <div className="profile__categories">
            {this.state.skillsNeeded.map((skill) => (
              <li className="profile__category badge">{skill.name}</li>
            ))}
          </div>
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
          <li className="profile__bullet">Preferred method of contact: </li>
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
      </div>
    );
  }
}
