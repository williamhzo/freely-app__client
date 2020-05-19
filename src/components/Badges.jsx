import React, { Component } from "react";

// note: "linked" property only works for users right now

export default class Badges extends Component {
  render() {
    const { heading, data, label, className, linked } = this.props;
    return (
      <div className={className}>
        <h3 className="display__heading">{heading}</h3>
        <ul className="display__badgelist">
          {data.map((item) =>
            linked ? (
              <li className="display__badge">
                <a href={"/" + item["userName"]}>{item[label]}</a>
              </li>
            ) : (
              <li className="display__badge">{item[label]}</li>
            )
          )}
        </ul>
      </div>
    );
  }
}
