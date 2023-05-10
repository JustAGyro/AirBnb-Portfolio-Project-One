// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  //Login Error
  const [disabled, setDisabled] = useState(0);

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setDisabled(0);
    } else {
      setDisabled(1);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setCredential('DemoChampion');
    setPassword('password');
    dispatch(
      sessionActions.login({ credential: 'DemoChampion', password: 'password' })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="form-container">
        <h1>Log In</h1>
        {errors.credential && <p>{errors.credential}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <div className="loginbutton-container">
            <button
              className={disabled === 0 ? 'disabledloginbutton' : 'loginbutton'}
              type="submit"
              disabled={disabled === 0}
            >
              Log In
            </button>
            <button className="demo-button" onClick={handleDemoLogin}>
              Login as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
