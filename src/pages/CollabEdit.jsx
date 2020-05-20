import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import '../styles/Display.scss';
import '../styles/Edit.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize } from '@material-ui/core';
import { objectToFormData } from 'object-to-formdata';

/*

To Do:
- Remove creator from list of contributors

*/

export default class CollabEdit extends Component {
  state = {
    categoryOptions: [],
    skillOptions: [],
    saved: true,
    title: '',
    creator: '',
    contributors: [],
    allUsers: [],
    description: '',
    skillsNeeded: [],
    categoryNeeded: [],
    image: '',
    open: false,
  };
  componentDidMount() {
    apiHandler.getCollab(this.props.match.params.id).then((apiRes) => {
      this.setState(apiRes);
    });
    apiHandler.getCategories().then((apiRes) => {
      this.setState({ categoryOptions: apiRes });
    });
    apiHandler.getSkills().then((apiRes) => {
      this.setState({ skillOptions: apiRes });
    });
    apiHandler.getUsers().then((apiRes) => {
      this.setState({ allUsers: apiRes });
    });
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ saved: false });
    if (e.target.name === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ temporaryPicture: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ image: e.target.files[0] });
    }
    console.log(this.state.contributors);
    console.log(this.state.allUsers);
    console.log(this.state.skillOptions);
    console.log(this.state.skillsNeeded);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let collab = { ...this.state };
    delete collab.saved;
    delete collab.skillOptions;
    delete collab.categoryOptions;
    delete collab.temporaryPicture;
    delete collab._id;
    delete collab.allUsers;
    if (collab.contributors) {
      collab.contributors = JSON.stringify(collab.contributors);
    }
    if (collab.skillsNeeded) {
      collab.skillsNeeded = JSON.stringify(collab.skillsNeeded);
    }
    if (collab.categoryNeeded) {
      collab.categoryNeeded = JSON.stringify(collab.categoryNeeded);
    }
    const formData = objectToFormData(collab);
    apiHandler.patchCollab(this.state._id, formData).then((apiRes) => {
      this.setState({ apiRes });
      this.setState({ saved: true });
    });
  };
  handleCategoryChange = (e, value) => {
    this.setState({ categoriesNeeded: value, saved: false });
  };
  handleSkillChange = (e, value) => {
    this.setState({ skillsNeeded: value, saved: false });
  };
  handleUserChange = (e, value) => {
    this.setState({ contributors: value, saved: false });
  };
  render() {
    // console.log(this.props.match.params.username);
    return (
      <form
        onChange={this.handleFormChange}
        onSubmit={this.handleFormSubmit}
        className="display--collab"
      >
        <label htmlFor="image">
          <div
            className="display__collabimagebox"
            style={{
              backgroundImage:
                'url(' +
                (this.state.temporaryPicture || this.state.image) +
                ')',
            }}
          >
            <input
              type="file"
              name="image"
              id="image"
              className="input--hidden"
            />
            {/* <img
              className="display__picture"
              src={this.state.temporaryPicture || this.state.image}
              alt=""
            /> */}
          </div>
        </label>
        <div className="container display display__collabbody">
          <button
            className={
              this.state.saved
                ? 'edit__button collabbutton saved'
                : 'edit__button collabbutton unsaved'
            }
          >
            {this.state.saved ? 'Saved' : 'Save'}
          </button>
          <h2 className="display__collabtitle">
            <TextareaAutosize
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              maxLength={280}
              placeholder="Title"
            />
          </h2>

          <h3 className="display__heading">Description</h3>
          <TextareaAutosize
            type="description"
            name="description"
            id="description"
            value={this.state.description}
            className="display__description"
            placeholder="Description"
          />

          <div className="display__multiselect">
            <h3 className="display__heading">Roles Needed</h3>
            <Autocomplete
              multiple
              onChange={this.handleCategoryChange}
              limitTags={5}
              id="tags-outlined"
              options={this.state.categoryOptions}
              value={this.state.categoryNeeded}
              getOptionLabel={(option) => option.name} // specify what property to use
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="display__multiselect">
            <h3 className="display__heading">Skills Needed</h3>
            <Autocomplete
              multiple
              // limitTags={5}
              onChange={this.handleSkillChange}
              id="tags-outlined"
              options={this.state.skillOptions}
              value={this.state.skillsNeeded}
              getOptionLabel={(option) => option.name} // specify what property to use
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="display__multiselect">
            <h3 className="display__heading">Contributors</h3>
            <Autocomplete
              multiple
              // limitTags={5}
              onChange={this.handleUserChange}
              id="tags-outlined"
              options={this.state.allUsers}
              value={this.state.contributors}
              getOptionLabel={(option) => option.name} // specify what property to use
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <ul className="display__bullets">
            <li className="display__bullet">
              <select id="open" value={this.state.open} name="open">
                <option value={true}>Open to collaborators</option>
                <option value={false}>
                  Not open to collaborators right now
                </option>
              </select>
            </li>
            <li className="display__bullet">
              Created by {this.state.creator.name}
            </li>
            <li className="display__bullet">
              Preferred method of contact for {this.state.creator.name}:{' '}
              {this.state.creator.preferredContact}
            </li>
          </ul>

          {this.state.userCollab && (
            <div className="display__collabs">
              <h2 className="display__heading">Collabs</h2>
              {this.state.userCollab.map((collab) => {
                return (
                  <div className="display__collab">
                    <img
                      src={collab.image}
                      alt=""
                      className="display__collabimage"
                    />
                    <h3 className="display__collabtitle">{collab.title}</h3>
                    <p className="display__collabdescription">
                      {collab.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </form>
    );
  }
}
