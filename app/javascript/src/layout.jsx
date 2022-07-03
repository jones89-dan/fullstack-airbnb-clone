// layout.js
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { logOut, authenticate, getCurrentUser } from './utils/requests'

const Layout = (props) => {

  const state = {
    userID: undefined,
  }

  const [currentUser, setCurrentUser] = useState("");
  const [currentUserID, setUserID] = useState("");

	const handleLogout = function () {
		getCurrentUser(function (response) {
			setCurrentUser(response.username);
		})

		logOut(function (response) {
			if (response.success == true) {
				window.location.replace('/login');
			};
		});
	};

  const getUserID = function () {
    authenticate(function (response) {
      setUserID(response.id)
      console.log(response.id);
      window.location.replace('/user/' + response.id);

		})
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/createProperty">Add Property</a>
              </li>
              <li className="nav-item">
		            <a className="nav-link" onClick={handleLogout}>Logout</a>
	            </li>
              <li className="nav-item">
		            <a className="nav-link" href="/login">Login</a>
	            </li>
              <li className="nav-item">
		            <a className="nav-link" onClick={getUserID}>Account</a>
	            </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
