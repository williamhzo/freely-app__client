import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

class FilterCollab extends Component {
  state = {
    filterdCity: [],
    filterCategory: [],
    filterSkill: [],

    categoryUsed: [],
    skillsUsed: [],
    citiesUsed: [],

    filteredCollabsArray: [],
  };

  componentDidMount() {
    apiHandler
      .filterUsedCategoriesCollabs()
      .then((res) => {
        this.setState({ categoriesUsed: res });
      })
      .catch((err) => console.log(err));

    apiHandler
      .filterUsedSkillsCollabs()
      .then((res) => this.setState({ skillsUsed: res }))
      .catch((err) => console.log(err));

    apiHandler
      .filterUsedCities()
      .then((res) => this.setState({ citiesUsed: res }))
      .catch((err) => console.log(err));
  }

  handleCityChange = (e, value) => {
    this.setState({ filterCity: value }, () => {
      this.handleCollabsUpdate(
        this.state.filterCity,
        this.state.filterCategory,
        this.state.filterSkill
      );
    });
  };

  handleCategoryChange = (e, value) => {
    this.setState({ filterCategory: value }, () => {
      this.handleCollabsUpdate(
        this.state.filterCity,
        this.state.filterCategory,
        this.state.filterSkill
      );
    });
  };

  handleSkillChange = (e, value) => {
    this.setState({ filterSkill: value }, () => {
      this.handleCollabsUpdate(
        this.state.filterCity,
        this.state.filterCategory,
        this.state.filterSkill
      );
    });
  };

  handleCollabsUpdate = (location, categories, skills) => {
    let filteredCollabs = [...this.props.collabs];

    if (location) {
      filteredCollabs = filteredCollabs.filter((collab) =>
        collab.creator.location.includes(location)
      );
    }

    if (categories) {
      categories.forEach((category) => {
        filteredCollabs = filteredCollabs.filter((collab) => {
          return collab.categoryNeeded.filter(
            (catNeeded) => catNeeded._id === category._id
          ).length > 0
            ? true
            : false;
        });
      });
    }

    if (skills) {
      skills.forEach((skill) => {
        filteredCollabs = filteredCollabs.filter((collab) => {
          return collab.skillsNeeded.filter(
            (skNeeded) => skNeeded._id === skill._id
          ).length > 0
            ? true
            : false;
        });
      });
    }

    this.props.updateCollabsFeed(filteredCollabs);
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
            options={this.state.citiesUsed || ""}
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
            options={this.state.categoriesUsed || ""}
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
            options={this.state.skillsUsed || ""}
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </form>
    );
  }
}

export default FilterCollab;
