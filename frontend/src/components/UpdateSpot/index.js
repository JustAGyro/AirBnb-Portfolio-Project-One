import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createASpot } from '../../store/spot';
import { Redirect, useHistory } from 'react-router-dom';
import { getOneSpot, updateASpot } from '../../store/spot';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UpdateSpot.css';

const UpdateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  let hasErrors = false;
  const spot = useSelector((state) => state.spots[spotId]); // populate from Redux store

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, []);

  //State for fields
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  //State for errors
  const [countryError, setCountryError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);

  //Price has update and error in one
  const updatePrice = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
  };

  useEffect(() => {
    if (country !== '') {
      setCountryError('');
    }
    if (address !== '') {
      setAddressError('');
    }
    if (city !== '') {
      setCityError('');
    }
    if (state !== '') {
      setStateError('');
    }
    if (description.length > 29) {
      setDescriptionError('');
    }
    if (name !== '') {
      setNameError('');
    }
    if (price !== '') {
      setPriceError('');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Errors

    //Country error
    if (country.trim() === '') {
      setCountryError('Country is required');
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

    //Description error
    if (description.length < 30) {
      setDescriptionError('Description must be at least 30 characters');
      hasErrors = true;
    } else {
      setDescriptionError('');
    }

    //Name error
    if (price === '') {
      setPriceError('Price is required');
      hasErrors = true;
    }

    if (hasErrors) {
      return; // do not submit the form if there are errors
    }

    const priceToNumber = parseFloat(price);
    //onSubmit portion if form is correct / error free
    const payload = {
      country,
      address,
      city,
      state,
      description,
      name,
      price: priceToNumber,
    };

    const spotId = spot.id;

    let updatedSpot;
    updatedSpot = await dispatch(updateASpot(spotId, payload));

    history.push(`/spots/${spot.id}`);
  };

  return (
    <div>
      {spot && (
        <>
          <section className="new-form-holder">
            <div className="form-header">
              <p className="formheadertext1">Update your Spot</p>
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
                      {stateError && (
                        <span className="error"> {stateError}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="descriptionheader">
                <p className="descriptionfield">Descibe your place to guests</p>
                <p className="descriptionfield1">
                  Mention the best features of your space, any special amenities
                  like fast wifi or parking, and what you love about the
                  neighborhood.
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
                  Catch guests' attention with a spot title that highlights what
                  makes your place special.
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
              <div className="priceheader">
                <p className="pricefield">Set a base price for your spot</p>
                <p className="pricefield1">
                  Competitive pricing can help your listing stand out and rank
                  higher in search results.
                </p>
              </div>
              <input
                className="inputfield"
                type="text"
                placeholder="Price per night (USD)"
                value={price}
                onChange={updatePrice}
              />
              <p id="pricefielderror" className="fieldname">
                {priceError && <span className="error">{priceError}</span>}
              </p>
              <button className="submitspotbutton" type="submit">
                Update Spot
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default UpdateSpot;
