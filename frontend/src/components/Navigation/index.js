// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './Profilebutton';
import './Navigation.css';
import Logo from './Logo';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <Logo />
        </NavLink>
      </li>
      {isLoaded && (
        <>
          <li>
            <NavLink exact to="/api/spots/new" className="create-spot-btn">
              Create a New Spot
            </NavLink>
          </li>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
