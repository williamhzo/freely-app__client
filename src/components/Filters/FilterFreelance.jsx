import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class FilterFreelance extends Component {
  state = {
    // filter parameters from user input
    filterCity: [],
    filterCategory: [],
    filterSkill: [],

    // curated database provided for autocomplete
    categoriesUsed: [],
    skillsUsed: [],
    citiesUsed: [],

    //full list of freelancers
    filteredFreelancersArray: [],
  };

  componentDidMount() {
    apiHandler
      .filterUsedCategories()
      .then((res) => this.setState({ categoriesUsed: res }))
      .catch((err) => console.log(err));

    apiHandler
      .filterUsedSkills()
      .then((res) => this.setState({ skillsUsed: res }))
      .catch((err) => console.log(err));

    apiHandler
      .filterUsedCities()
      .then((res) => this.setState({ citiesUsed: res }))
      .catch((err) => console.log(err));
  }

  handleCityChange = (e, value) => {
    this.setState({ filterCity: value });
    this.handleFreelancersUpdate(
      value,
      this.state.filterCategory,
      this.state.filterSkill
    );
  };

  handleCategoryChange = (e, value) => {
    this.setState({ filterCategory: value });
    this.handleFreelancersUpdate(
      this.state.filterCity,
      value,
      this.state.filterSkill
    );
  };

  handleSkillChange = (e, value) => {
    this.setState({ filterSkill: value });
    this.handleFreelancersUpdate(
      this.state.filterCity,
      this.state.filterCategory,
      value
    );
  };

  handleFreelancersUpdate = (location, categories, skills) => {
    let filteredFreelancers = [...this.props.freelancers];
    if (location) {
      filteredFreelancers = filteredFreelancers.filter((user) =>
        user.location.includes(location)
      );
    }

    if (categories) {
      categories.forEach((category) => {
        filteredFreelancers = filteredFreelancers.filter(
          // (user) => user.userCategory[0]._id === category._id
          // (user) => user.userCategory.includes(category)
          (user) => {
            for (let i = 0; i < user.userCategory.length; i++) {
              return user.userCategory[i]._id === category._id;
            }
          }
          // }
        );
      });
      // return filteredFreelancers
      // this.props.updateFreelancersFeed(filteredFreelancers);
      // console.log(filteredFreelancers);
    }
    if (skills)
      skills.forEach((skill) => {
        filteredFreelancers = filteredFreelancers.filter((user) =>
          user.userSkills.includes(skill)
        );
      });
    this.props.updateFreelancersFeed(filteredFreelancers);
  };

  render() {
    return (
      <form className="filter" action="">
        <div className="filter__group">
          <div className="filter__label">Pick a location</div>
          <Autocomplete
            className="filter__input"
            onChange={this.handleCityChange}
            value={this.state.filterCity}
            limitTags={3}
            id="tags-outlined"
            options={this.state.citiesUsed}
            // defaultValue="search"
            getOptionLabel={(option) => option} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="filter__group">
          <div className="filter__label">Category</div>
          <Autocomplete
            className="filter__input"
            multiple
            onChange={this.handleCategoryChange}
            limitTags={3}
            id="tags-outlined"
            value={this.state.filterCategory}
            options={this.state.categoriesUsed}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="filter__group">
          <div className="filter__label">Skills</div>
          <Autocomplete
            className="filter__input"
            multiple
            onChange={this.handleSkillChange}
            value={this.state.filterSkill}
            limitTags={3}
            id="tags-outlined"
            options={this.state.skillsUsed}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </form>
    );
  }
}

export default FilterFreelance;
