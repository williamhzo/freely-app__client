import React, { Component } from 'react';
import axios from 'axios';

class CityAutoComplete extends Component {
  state = {
    search: '',
    results: [],
    isLoading: false,
  };

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
      isLoading: true,
    });

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);

    // Launch a new request in 1000ms (1s) => Avoids excessive requests to the end point.
    this.timeoutId = setTimeout(() => {
      // this.state.search.length > 2 && this.performSearch();
      this.performSearch();
    }, 1000);
  };

  performSearch = () => {
    if (this.state.search === '') {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?limit=3&types=place&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
      .then((response) => {
        this.setState({
          results: response.data.features,
          isLoading: false,
        });
      })
      .catch((err) => console.log('epic fail: ' + err));
  };

  handleItemClicked = (place) => {
    this.setState({
      search: place.place_name,
      results: [],
    });
    this.props.onSelect(place);
  };

  render() {
    console.log(this.state.results);
    return (
      <>
        <input
          // className="input"
          type="text"
          name="location"
          // value={this.state.search}
          id="location"
          value={this.props.userLocation || ''}
          onChange={this.handleSearchChange}
          placeholder="Enter an address"
        />
        <ul className="CityAutoComplete-results">
          {this.state.results.map((place) => (
            <li
              key={place.id}
              className="CityAutoComplete-items"
              onClick={() => this.handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {this.state.isLoading && (
            <li className="CityAutoComplete-items">Let me think...</li>
          )}
        </ul>
      </>
    );
  }
}

export default CityAutoComplete;
