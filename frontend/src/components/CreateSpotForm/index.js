import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createASpot } from '../../store/spot';
import { Redirect, useHistory } from 'react-router-dom';
import { createAnImage } from '../../store/spot';
import './CreateSpotForm.css';

const SpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //State for fields
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [previewImage, setPreviewImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  //State for errors
  const [countryError, setCountryError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(parseFloat(e.target.value));
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updateImage1 = (e) => setImage1(e.target.value);
  const updateImage2 = (e) => setImage2(e.target.value);
  const updateImage3 = (e) => setImage3(e.target.value);
  const updateImage4 = (e) => setImage4(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Errors
    let hasErrors = false;

    //Country error
    if (country.trim() === '') {
      setCountryError('Country is required');
      console.log('do we even do this?');
      hasErrors = true;
    }
    //Address error
    if (address.trim() === '') {
      setAddressError('Address is required');
      hasErrors = true;
    }
    //City error
    if (city.trim() === '') {
      setCityError('City is required');
      hasErrors = true;
    }
    //State error
    if (state.trim() === '') {
      setStateError('State is required');
      hasErrors = true;
    }
    //Name error
    if (name.trim() === '') {
      setNameError('Name is required');
      hasErrors = true;
    }

    if (description.length < 30) {
      setDescriptionError('Description must be at least 30 characters');
      hasErrors = true;
    } else {
      setDescriptionError('');
    }

    if (hasErrors) {
      return; // do not submit the form if there are errors
    }

    //onSubmit portion if form is correct / error free
    const payload = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    const imagePayload = {
      previewImage,
      image1,
      image2,
      image3,
      image4,
    };

    let createdSpot;
    createdSpot = await dispatch(createASpot(payload));

    let createdImages;
    createdImages = await dispatch(createAnImage(imagePayload, createdSpot.id));

    if (createdSpot) {
      history.push(`/api/spots/${createdSpot.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className="new-form-holder">
      <div className="form-header">
        <p className="formheadertext1">Create a new Spot</p>
        <p className="formheadertext">Where's your place located?</p>
        <p className="formheadertext">
          Guests will only get your exact address once they booked a
          reservation.
        </p>
      </div>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <p className="fieldname">
          Country
          {countryError && <span className="error"> {countryError}</span>}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
        />
        <p className="fieldname">
          Address
          {addressError && <span className="error"> {addressError}</span>}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={updateAddress}
        />
        <div class="citystatefields">
          <div class="citylabel">
            <div class="labelcity">
              <p className="fieldname">
                City
                {cityError && <span className="error"> {cityError}</span>}
              </p>
            </div>
          </div>
          <div class="cityinput">
            <input
              className="cityinputfield"
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity}
            />
            <span class="comma">,</span>
          </div>
          <div class="stateinput">
            <input
              className="stateinputfield"
              type="text"
              placeholder="State"
              value={state}
              onChange={updateState}
            />
          </div>
          <div class="statelabel">
            <div class="label">
              <p className="fieldname">
                State
                {stateError && <span className="error"> {stateError}</span>}
              </p>
            </div>
          </div>
        </div>
        <div className="descriptionheader">
          <p className="descriptionfield">Descibe your place to guests</p>
          <p className="descriptionfield1">
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
        </div>
        <textarea
          className="inputfielddesc"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
        <p id="descfielderror" className="fieldname">
          {descriptionError && (
            <span className="error"> {descriptionError}</span>
          )}
        </p>
        <div className="nameheader">
          <p className="namefield">Create a title for your spot</p>
          <p className="namefield1">
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
        </div>
        <input
          className="inputfield"
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={updateName}
        />
        {nameError && (
          <p id="nameerror" className="error">
            {nameError}
          </p>
        )}
        <p className="fieldname">Country</p>
        <input
          className="inputfieldprice"
          type="number"
          placeholder="Price per night (USD)"
          value={price}
          onChange={updatePrice}
        />
        <input
          className="inputfield"
          type="text"
          placeholder="Preview Image URL"
          value={previewImage}
          onChange={updatePreviewImage}
        />
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image1}
          onChange={updateImage1}
        />
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image2}
          onChange={updateImage2}
        />
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image3}
          onChange={updateImage3}
        />
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image4}
          onChange={updateImage4}
        />
        <button className="submitspotbutton" type="submit">
          Create new Spot
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default SpotForm;
