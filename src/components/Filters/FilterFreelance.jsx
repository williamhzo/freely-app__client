import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

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
    console.log(value);
    this.setState({ filterCity: value });
    this.handleFreelancersUpdate(
      value,
      this.state.filterCategory,
      this.state.filterSkill
    );
  };

  handleCategoryChange = (e, value) => {
    console.log(value);
    this.setState({ filterCategory: value });
    this.handleFreelancersUpdate(
      this.state.filterCity,
      value,
      this.state.filterSkill
    );
  };

  handleSkillChange = (e, value) => {
    console.log(value);
    this.setState({ filterSkill: value });
    this.handleFreelancersUpdate(
      this.state.filterCity,
      this.state.filterCategory,
      value
    );
  };

  handleFreelancersUpdate = (location, categories, skills) => {
    console.log(location, categories, skills);
    console.log("update");
    let filteredFreelancers = [...this.props.freelancers];
    if (location) {
      filteredFreelancers = filteredFreelancers.filter((user) =>
        user.location.includes(location[0])
      );
    }
    console.log("After location:");
    console.log(filteredFreelancers);

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

    console.log("After categories:");
    console.log(filteredFreelancers);

    if (skills)
      skills.forEach((skill) => {
        filteredFreelancers = filteredFreelancers.filter((user) =>
          user.userSkills.includes(skill)
        );
      });
    console.log(filteredFreelancers);
    this.props.updateFreelancersFeed(filteredFreelancers);
  };

  render() {
    console.log(this.state);
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
            value={this.state.filterCategory}
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
            value={this.state.filterSkill}
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
