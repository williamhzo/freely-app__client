import React, { Component } from 'react';
import Tabs from '../components/Nav/Tabs';
import FreelancerCard from '../components/Cards/FreelancerCard';
import AboutUsCard from '../components/Cards/AboutUsCard';
import FilterFreelance from '../components/Filters/FilterFreelance';
import apiHandler from '../api/apiHandler';

import '../styles/FeedPage.scss';

class FreelancersFeed extends Component {
  state = {
    freelancers: [],
    filteredFreelancers: [],
  };

  componentDidMount() {
    apiHandler
      .getFreelancers()
      .then((apiRes) =>
        this.setState({ freelancers: apiRes, filteredFreelancers: apiRes })
      )
      .catch((err) => console.log(err));
  }

  updateFreelancersFeed = (filteredArray) => {
    this.setState({ filteredFreelancers: filteredArray });
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
        <div className="feed__card-wrapper">
          {this.state.filteredFreelancers.map((freelancer, index) => (
            <>
              {index === 3 && <AboutUsCard />}
              <FreelancerCard key={index} freelancer={freelancer} />
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default FreelancersFeed;
