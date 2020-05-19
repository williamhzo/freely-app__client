import React, { Component } from 'react';
import Tabs from '../components/Nav/Tabs';
import FreelancerCard from '../components/Cards/FreelancerCard';
import FilterFreelance from '../components/Filters/FilterFreelance';
import apiHandler from '../api/apiHandler';

import '../styles/FeedPage.scss';

class FreelancersFeed extends Component {
  state = {
    freelancers: [],
    // filteredFreelancers: [],
  };

  componentDidMount() {
    apiHandler
      .getFreelancers()
      .then((apiRes) => this.setState({ freelancers: apiRes }))
      .catch((err) => console.log(err));
  }

  updateFreelancersFeed = (filteredArray) => {
    this.setState({ freelancers: filteredArray });
  };

  render() {
    return (
      <div className="feed-container">
        <Tabs />

        {!this.state.freelancers && (
          <h2>
            Sorry, no freelancers found{' '}
            <span role="img" aria-label="confused-face-emoji">
              😕
            </span>
          </h2>
        )}

        <FilterFreelance
          freelancers={this.state.freelancers}
          updateFreelancersFeed={this.updateFreelancersFeed}
        />

        {this.state.freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} freelancer={freelancer} />
        ))}
      </div>
    );
  }
}

export default FreelancersFeed;
