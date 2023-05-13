import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from 'react-router-dom';
import './Profilebutton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current === null) return;
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
  const ulId = 'signed' + (user ? '-in' : '-out');
  return (
    <>
      <button className="profile-button-user" onClick={openMenu}>
        <i id="menu-icon" class="fa-solid fa-bars"></i>
        <i id="icon" className="fa-solid fa-dragon"></i>
      </button>
      {showMenu ? (
        <div className="dropdown-container">
          <ul id={ulId} className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className="loggedin-menu">
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    Hello, {user.firstName}
                  </li>
                  <li
                    style={{
                      fontSize: '1.2rem',
                      margin: '0',
                      padding: '0',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {user.email}
                  </li>
                  <NavLink exact to="/spots/current">
                    <li
                      style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}
                    >
                      Manage Spots
                    </li>
                  </NavLink>
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    Manage Reviews
                  </li>
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    <button
                      style={{
                        textDecoration: 'none',
                        fontSize: '1rem',
                        margin: '0',
                        padding: '4px',
                        border: '2px solid black',
                        backgroundColor: 'orangered',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                      }}
                      onClick={logout}
                    >
                      Log Out
                    </button>
                  </li>
                </div>
              </>
            ) : (
              <>
                <div className="buttons">
                  <div className="button1">
                    <OpenModalMenuItem
                      itemText="Log In"
                      onItemClick={closeMenu}
                      modalComponent={<LoginFormModal />}
                    />
                  </div>
                  <div className="button2">
                    <OpenModalMenuItem
                      itemText="Sign Up"
                      onItemClick={closeMenu}
                      modalComponent={<SignupFormModal />}
                    />
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default ProfileButton;
