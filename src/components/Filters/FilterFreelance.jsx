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

    // array concatenating filter parameters
    filterArray: [],

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
    this.updateFilterArray(this.filterCity);
  };

  handleCategoryChange = (e, value) => {
    this.setState({ filterCategory: [...this.state.filterCategory, value] });
    this.updateFilterArray(this.filterCategory);
  };

  handleSkillChange = (e, value) => {
    this.setState({ filterSkill: [...this.state.filterSkill, value] });
    this.updateFilterArray(this.filterSkill);
  };

  updateFilterArray = (newFilter) => {
    this.setState({ filterArray: [...this.state.filterArray, newFilter] });
    // this.props.updateFreelancers(this.filterArray);
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
            // onSelect={this.props.updateFreelancers}
            onChange={this.handleCategoryChange}
            limitTags={3}
            id="tags-outlined"
            options={this.state.categoriesUsed}
            // freeSolo=true
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
