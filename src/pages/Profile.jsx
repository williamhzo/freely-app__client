import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import Badges from '../components/Badges';
import LinkIcon from '../components/LinkIcon';
import '../styles/Display.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faGlobeEurope,
  faCommentAlt,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

export default class Profile extends Component {
  state = {};
  componentDidMount() {
    apiHandler
      .getUser('userName', this.props.match.params.username)
      .then((apiRes) => {
        this.setState(apiRes[0]);
      });
  }

  render() {
    // console.log(this.props.match.params.username);
    return (
      <div className="display container">
        {this.state.profilePicture && (
          <div className="display__avatarbox">
            <img
              className="display__picture"
              src={this.state.profilePicture}
              alt=""
            />
          </div>
        )}
        <h2 className="display__name">{this.state.name}</h2>
        {this.state.userCategory && (
          <Badges data={this.state.userCategory} label={'name'} />
        )}
        {this.state.title && (
          <div className="display__title">{this.state.title}</div>
        )}
        {this.state.socialLinks && (
          <div className="display__sociallinks">
            {this.state.socialLinks.map((link, index) => {
              return (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="display__sociallink"
                >
                  <LinkIcon link={link} />
                </a>
              );
            })}
          </div>
        )}
        <ul className="display__bullets">
          {this.state.openToProjects && (
            <li className="display__bullet">
              <span className="bulleticon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              Open to collaborations
            </li>
          )}
          {this.state.remote && this.state.openToProjects && (
            <li className="display__bullet">
              <span className="bulleticon">
                <FontAwesomeIcon icon={faGlobeEurope} />
              </span>
              Open to remote collabs
            </li>
          )}
          {this.state.location && (
            <li className="display__bullet">
              <span className="bulleticon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </span>
              Based in {this.state.location || ''}
            </li>
          )}
          {this.state.preferredContact && (
            <li className="display__bullet">
              <span className="bulleticon">
                <FontAwesomeIcon icon={faCommentAlt} />
              </span>
              Preferred contact: {this.state.preferredContact}
            </li>
          )}
        </ul>
        {this.state.userSkills && (
          <Badges
            heading={'Skills'}
            data={this.state.userSkills}
            label={'name'}
            className="display__fullwidth"
          />
        )}
        {this.state.bio && (
          <>
            <h2 className="display__heading">About</h2>
            <div className="display__bio">{this.state.bio}</div>
          </>
        )}
        {this.state.portfolio && (
          <>
            <h2 className="display__heading">Portfolio</h2>
            <div className="display__portfolio">
              {this.state.portfolio.map((portfolioItem, index) => {
                return (
                  <div key={index} className="display__portfolioitem">
                    <img
                      className="display__portfolioimage"
                      src={portfolioItem.image}
                      alt=""
                    />
                    <div className="display__portfoliotext">
                      <h3 className="display__portfoliotitle">
                        {portfolioItem.title}
                      </h3>
                      <div className="display__portfoliodescription">
                        {portfolioItem.description}
                      </div>
                      {portfolioItem.link && (
                        <div className="display__portfoliolink">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={portfolioItem.link}
                          >
                            Link »
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {this.state.userCollab && (
          <div className="display__collabs">
            <h2 className="display__heading">Collabs</h2>
            {this.state.userCollab.map((collab, index) => {
              return (
                <div key={index} className="display__collabcard">
                  <img
                    src={collab.image}
                    alt=""
                    className="display__collabcardimage"
                  />
                  <h3 className="display__collabcardtitle">{collab.title}</h3>
                  <p className="display__collabcarddescription">
                    {collab.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
