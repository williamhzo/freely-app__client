import React from "react";
import Tabs from "../components/Nav/Tabs";
import apiHandler from "../api/apiHandler";
import FilterCollab from "../components/Filters/FilterCollab";
import CollabCard from "../components/Cards/CollabCard";

import "../styles/FeedPage.scss";

class CollabsFeed extends React.Component {
  state = {
    collabs: [],
    filteredCollabs: [],
  };

  componentDidMount() {
    apiHandler
      .getCollabs()
      .then((apiRes) =>
        this.setState({ collabs: apiRes, filteredCollabs: apiRes })
      )
      .catch((err) => console.log(err));
  }

  updateCollabsFeed = (filteredArray) => {
    this.setState({ filteredCollabs: filteredArray });
  };

  render() {
    return (
      <div className="feed-container">
        <Tabs />

        {!this.state.collabs && (
          <h2>
            Sorry, no collaborations found{" "}
            <span role="img" aria-label="confused-face-emoji">
              😕
            </span>
          </h2>
        )}

        <FilterCollab
          collabs={this.state.collabs}
          updateCollabsFeed={this.updateCollabsFeed}
        />

        {this.state.filteredCollabs.map((collab, index) => (
          <CollabCard key={index} collab={collab} />
        ))}
      </div>
    );
  }
}

export default CollabsFeed;
