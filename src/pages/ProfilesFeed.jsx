import React from 'react';
import Tabs from '../components/Tabs';
import FreelancerCard from '../components/FreelancerCard';
import apiHandler from '../api/apiHandler';

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
      <div>
        {!this.state.freelancers && (
          <h2>
            Sorry, no freelancers found{' '}
            <span role="img" aria-label="confused-face-emoji">
              😕
            </span>
          </h2>
        )}
        <Tabs />
        <form className="filter-group" action="">
          <label htmlFor="city">City</label>
          <input name="city" id="city" type="text" />
          <br></br>
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" />
        </form>
        {this.state.freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} freelancer={freelancer} />
        ))}
      </div>
    );
  }
}

export default ProfilesFeed;
