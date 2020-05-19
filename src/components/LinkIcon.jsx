import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faLinkedin,
  faDribbbleSquare,
  faEtsy,
  faFlickr,
  faGoodreads,
  faDev,
  faGithubSquare,
  faMedium,
  faPatreon,
  faPaypal,
  faPeriscope,
  faPinterestSquare,
  faProductHunt,
  faRedditSquare,
  faSoundcloud,
  faSpotify,
  faVimeo,
  faWordpressSimple,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

const checkLink = (link) => {
  link = link.toLowerCase();
  let icon = <FontAwesomeIcon icon={faLink} />;
  if (link.match(/facebook.com/)) {
    icon = <FontAwesomeIcon icon={faFacebookSquare} />;
  } else if (link.match(/twitter.com/)) {
    icon = <FontAwesomeIcon icon={faTwitterSquare} />;
  } else if (link.match(/linkedin.com/)) {
    icon = <FontAwesomeIcon icon={faLinkedin} />;
  } else if (link.match(/instagram.com/)) {
    icon = <FontAwesomeIcon icon={faInstagramSquare} />;
  } else if (link.match(/dribble/)) {
    icon = <FontAwesomeIcon icon={faDribbbleSquare} />;
  } else if (link.match(/etsy.com/)) {
    icon = <FontAwesomeIcon icon={faEtsy} />;
  } else if (link.match(/flickr.com/)) {
    icon = <FontAwesomeIcon icon={faFlickr} />;
  } else if (link.match(/goodreads.com/)) {
    icon = <FontAwesomeIcon icon={faGoodreads} />;
  } else if (link.match(/dev.to/)) {
    icon = <FontAwesomeIcon icon={faDev} />;
  } else if (link.match(/github.com/)) {
    icon = <FontAwesomeIcon icon={faGithubSquare} />;
  } else if (link.match(/medium.com/)) {
    icon = <FontAwesomeIcon icon={faMedium} />;
  } else if (link.match(/patreon.com/)) {
    icon = <FontAwesomeIcon icon={faPatreon} />;
  } else if (link.match(/paypal/)) {
    icon = <FontAwesomeIcon icon={faPaypal} />;
  } else if (link.match(/pscp.tv/)) {
    icon = <FontAwesomeIcon icon={faPeriscope} />;
  } else if (link.match(/pinterest.com/)) {
    icon = <FontAwesomeIcon icon={faPinterestSquare} />;
  } else if (link.match(/producthunt.com/)) {
    icon = <FontAwesomeIcon icon={faProductHunt} />;
  } else if (link.match(/reddit.com/)) {
    icon = <FontAwesomeIcon icon={faRedditSquare} />;
  } else if (link.match(/soundcloud.com/)) {
    icon = <FontAwesomeIcon icon={faSoundcloud} />;
  } else if (link.match(/spotify.com/)) {
    icon = <FontAwesomeIcon icon={faSpotify} />;
  } else if (link.match(/vimeo.com/)) {
    icon = <FontAwesomeIcon icon={faVimeo} />;
  } else if (link.match(/wordpress.com/)) {
    icon = <FontAwesomeIcon icon={faWordpressSimple} />;
  } else if (link.match(/youtube.com/)) {
    icon = <FontAwesomeIcon icon={faYoutubeSquare} />;
  }

  return icon;
};

export default class LinkIcon extends Component {
  render() {
    return checkLink(this.props.link);
  }
}
