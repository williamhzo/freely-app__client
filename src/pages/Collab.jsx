import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import "../styles/Display.scss";
import Badges from "../components/Badges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faUserLock,
  faPenFancy,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { withUser } from "../components/Auth/withUser";

class Collab extends Component {
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
    apiHandler.getCollab(this.props.match.params.id).then((apiRes) => {
      this.setState(apiRes);
    });
  }

  render() {
    return (
      <div className="display--collab">
        {this.state.image && (
          <div
            className="display__collabimagebox"
            style={{ backgroundImage: "url(" + this.state.image + ")" }}
          ></div>
        )}
        <div className="container display display__collabbody">
          {this.props.context.user &&
            this.props.context.user._id === this.state.creator._id && (
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
            )}
          <h2 className="display__collabtitle">{this.state.title}</h2>
          <h3 className="display__heading">Description</h3>
          <div className="display__description">{this.state.description}</div>
          <ul className="display__bullets">
            <li className="display__bullet">
              {this.state.open ? (
                <>
                  <FontAwesomeIcon icon={faUserFriends} /> This project is
                  seeking collaborators
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserLock} />
                  This project is not seeking collaborators
                </>
              )}
            </li>
            <li className="display__bullet">
              <FontAwesomeIcon icon={faPenFancy} />
              Created by{" "}
              <a href={"/" + this.state.creator.userName}>
                {this.state.creator.name}
              </a>
            </li>
            <li className="display__bullet">
              <FontAwesomeIcon icon={faCommentAlt} />
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

export default withUser(Collab);
