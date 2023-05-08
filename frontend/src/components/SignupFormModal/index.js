import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(0);
  const { closeModal } = useModal();

  useEffect(() => {
    if (
      username.length < 1 ||
      firstName.length < 1 ||
      lastName.length < 1 ||
      password.length < 1 ||
      email.length < 1 ||
      confirmPassword.length < 1
    ) {
      setDisabled(0);
    } else {
      setDisabled(1);
    }
  }, [username, firstName, lastName, password, email, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        'Confirm Password field must be the same as the Password field',
    });
  };

  return (
    <>
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p>{errors.username}</p>}
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p>{errors.password}</p>}
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <div className="signupbutton-container">
            <button
              className={
                disabled === 0 ? 'disabledsignupbutton' : 'signupbutton'
              }
              type="submit"
              disabled={disabled === 0}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
