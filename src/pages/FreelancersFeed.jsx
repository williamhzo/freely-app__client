import React from 'react';
import Tabs from '../components/Nav/Tabs';
import FreelancerCard from '../components/FreelancerCard';
import FilterFreelance from '../components/FilterFreelance';
import apiHandler from '../api/apiHandler';

import '../styles/FeedPage.scss';

class ProfilesFeed extends React.Component {
  state = {
    freelancers: [],
  };

  componentDidMount() {
    apiHandler
      .getFreelancers()
      .then((apiRes) => this.setState({ freelancers: apiRes }))
      .catch((err) => console.log(err));
  }

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
        <FilterFreelance />
        {this.state.freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} freelancer={freelancer} />
        ))}
      </div>
    );
  }
}

export default ProfilesFeed;
