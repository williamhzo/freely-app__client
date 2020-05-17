import React from 'react';

const CollabCard = ({ collab }) => {
  const styleCollabPic = {
    backgroundImage: `url('${collab.image}')`,
  };
  return (
    <div className="card">
      <div style={styleCollabPic} className="card__aside"></div>
      <div className="card__body">
        <h3 className="card__title">{collab.title}</h3>
        <p className="card__copy">{collab.description}</p>
        <p className="card__copy">
          {collab.open
            ? 'Accepting coworkers!'
            : 'This project team is complete.'}
        </p>
      </div>
    </div>
  );
};

export default CollabCard;

// "contributors": [{
//     "$oid": "5ebe711a3862d0186662867d"
// }],
// "skillsNeeded": [{
//     "$oid": "5ebe6fb83d3c4d18255f6d1f"
// }, {
//     "$oid": "5ebe6fea3d3c4d18255fc047"
// }, {
//     "$oid": "5ebe6fc53d3c4d18255f83c4"
// }],
// "categoryNeeded": [{
//     "$oid": "5ebe7103d29493185af2e650"
// }, {
//     "$oid": "5ebe7103d29493185af2e657"
// }],
// "image": "https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
// "title": "Cool Idea",
// "description": "Yeah, I do that with my stupidness",
// "open": true,
// "creator": {
//     "$oid": "5ebe711a3862d01866628674"
// },
// "__v": 0
