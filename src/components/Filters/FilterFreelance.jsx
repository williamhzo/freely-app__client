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

    // this.setState({ freelancers: [...this.props.freelancers] });
  }

  // componentDidUpdate(prevState) {
  //   if(prevState.)
  //   this.handleFreelancersUpdate();
  // }

  handleCityChange = (e, value) => {
    this.setState({ filterCity: value });
    this.handleFreelancersUpdate();
  };

  handleCategoryChange = (e, value) => {
    this.setState({ filterCategory: value });
    this.handleFreelancersUpdate();
  };

  handleSkillChange = (e, value) => {
    this.setState({ filterSkill: value });
    this.handleFreelancersUpdate();
  };

  handleFreelancersUpdate = () => {
    let filteredFreelancers = [...this.props.freelancers];
    if (this.state.filterCity.length > 0) {
      filteredFreelancers = filteredFreelancers.filter((user) =>
        user.location.includes(this.state.filterCity[0])
      );
    }

    if (this.state.filterCategory.length > 0) {
      this.state.filterCategory.forEach((category) => {
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
    }

    if (this.state.filterSkill.length > 0)
      this.state.filterSkill.forEach((skill) => {
        filteredFreelancers = filteredFreelancers.filter((user) =>
          user.userSkills.includes(skill)
        );
      });
    console.log(filteredFreelancers);
    return filteredFreelancers;
  };

  render() {
    // console.log('handleFreelancersUpdate() output:', this.handleFreelancersUpdate());
    this.props.updateFreelancersFeed(this.handleFreelancersUpdate());

    return (
      <form className="filter" action="">
        <div className="filter__group">
          <div className="filter__label">Pick a location</div>
          <Autocomplete
            className="filter__input"
            //remove to make location unique
            // multiple
            free
            solo
            size="small"
            // onInputChange={this.handleFreelancersUpdate}
            // onSelect={this.handleFreelancersUpdate}
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
            // onSelect={this.handleFreelancersUpdate}
            onChange={this.handleCategoryChange}
            limitTags={3}
            id="tags-outlined"
            options={this.state.categoriesUsed}
            // defaultValue="search"
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
            // onSelect={this.handleFreelancersUpdate}
            onChange={this.handleSkillChange}
            limitTags={3}
            id="tags-outlined"
            options={this.state.skillsUsed}
            // defaultValue="search"
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
