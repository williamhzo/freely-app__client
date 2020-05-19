import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";
import Badges from "../components/Badges";

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
        className="display--collab"
      >
        {this.state.image && (
          <div
            className="display__collabimagebox"
            style={{ backgroundImage: "url(" + this.state.image + ")" }}
          >
            {/* <img className="display__picture" src={this.state.image} alt="" /> */}
          </div>
        )}
        <div className="container display display__collabbody">
          <button
            className={"edit__button collabbutton"}
            onClick={() => {
              this.props.history.push(
                "/collab/" + this.props.match.params.id + "/edit"
              );
            }}
          >
            Edit
          </button>
          <h2 className="display__collabtitle">{this.state.title}</h2>

          <h3 className="display__heading">Description</h3>
          <div className="display__description">{this.state.description}</div>
          <ul className="display__bullets">
            <li className="display__bullet">
              {this.state.open
                ? "This project is seeking collaborators"
                : "This project is not seeking collaborators"}
            </li>
            <li className="display__bullet">
              Created by{" "}
              <a href={"/" + this.state.creator.userName}>
                {this.state.creator.name}
              </a>
            </li>
            <li className="display__bullet">
              Preferred method of contact: {this.state.creator.preferredContact}
            </li>
          </ul>
          <Badges
            heading={"Roles Needed"}
            data={this.state.categoryNeeded}
            label={"name"}
            className="display__fullwidth"
          />
          <Badges
            heading={"Skills Needed"}
            data={this.state.skillsNeeded}
            label={"name"}
            className="display__fullwidth"
          />
          <Badges
            heading={"Collaborators"}
            data={this.state.contributors}
            label={"name"}
            className="display__fullwidth"
            linked={true}
          />
        </div>
      </div>
    );
  }
}
