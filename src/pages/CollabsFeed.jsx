import React from 'react';
import Tabs from '../components/Nav/Tabs';
import apiHandler from '../api/apiHandler';
import FilterCollab from '../components/FilterCollab';
import CollabCard from '../components/CollabCard';

import '../styles/FeedPage.scss';

class CollabsFeed extends React.Component {
  state = {
    collabs: [],
  };

  componentDidMount() {
    apiHandler
      .getCollabs()
      .then((apiRes) => this.setState({ collabs: apiRes }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="feed-container">
        <Tabs />
        {!this.state.collabs && (
          <h2>
            Sorry, no collaborations found{' '}
            <span role="img" aria-label="confused-face-emoji">
              😕
            </span>
          </h2>
        )}
        <FilterCollab />
        {this.state.collabs.map((collab, index) => (
          <CollabCard key={index} collab={collab} />
        ))}
      </div>
    );
  }
}

export default CollabsFeed;
