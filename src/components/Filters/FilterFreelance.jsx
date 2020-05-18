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
    this.setState({ filterCity: [...this.state.filterCity, value] });
  };

  handleCategoryChange = (e, value) => {
    this.setState({ filterCategory: [...this.state.filterCategory, value] });
  };

  handleSkillChange = (e, value) => {
    this.setState({ filterSkill: [...this.state.filterSkill, value] });
  };

  render() {
    // console.log(apiHandler.filterUsedSkills());
    console.log(this.state.categoriesUsed);
    // console.log(this.props.freelancers);
    return (
      <form className="filter" action="">
        <div className="filter__group">
          <div className="filter__label">Pick a location</div>
          <Autocomplete
            className="filter__input"
            multiple
            onChange={this.handleCityChange}
            limitTags={3}
            id="tags-outlined"
            options={this.state.citiesUsed}
            // defaultValue="search"
            getOptionLabel={(option) => option.name} // specify what property to use
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="filter__group">
          <div className="filter__label">Category</div>
          <Autocomplete
            className="filter__input"
            name="toto"
            multiple
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
