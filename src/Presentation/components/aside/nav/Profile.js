import React from 'react';

export default function Profile() {
  return (
  <div>
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" alt="User_Image" className="img-circle elevation-2" />
      </div>
      <div className="info">
        <a href="/#" className="d-block">Dimas D Robayo M</a>
      </div>
    </div>
  </div>);
}
