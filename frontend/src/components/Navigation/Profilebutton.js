import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Profilebutton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu ? (
        <div className="dropdown-container">
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className="loggedin-menu">
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    {user.username}
                  </li>
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    {user.firstName} {user.lastName}
                  </li>
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    {user.email}
                  </li>
                  <li style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}>
                    <button
                      style={{ fontSize: '1.2rem', margin: '0', padding: '0' }}
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
