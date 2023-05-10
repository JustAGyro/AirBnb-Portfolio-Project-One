import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createASpot } from '../../store/spot';
import { Redirect, useHistory } from 'react-router-dom';
import { createAnImage } from '../../store/spot';
import './CreateSpotForm.css';

const SpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let hasErrors = false;

  //State for fields
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
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
  const [priceError, setPriceError] = useState('');
  const [reqPreview, setReqPreview] = useState('');
  const [imagePreError, setImagePreError] = useState('');
  const [image1Error, setImage1Error] = useState('');
  const [image2Error, setImage2Error] = useState('');
  const [image3Error, setImage3Error] = useState('');
  const [image4Error, setImage4Error] = useState('');

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updateImage1 = (e) => setImage1(e.target.value);
  const updateImage2 = (e) => setImage2(e.target.value);
  const updateImage3 = (e) => setImage3(e.target.value);
  const updateImage4 = (e) => setImage4(e.target.value);

  //Price has update and error in one
  const updatePrice = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
  };

  useEffect(() => {
    if (country !== '') {
      setCountryError('');
      hasErrors = false;
    }
    if (address !== '') {
      setAddressError('');
      hasErrors = false;
    }
    if (city !== '') {
      setCityError('');
      hasErrors = false;
    }
    if (state !== '') {
      setStateError('');
      hasErrors = false;
    }
    if (description.length > 29) {
      setDescriptionError('');
      hasErrors = false;
    }
    if (name !== '') {
      setNameError('');
      hasErrors = false;
    }
    if (price !== '') {
      setPriceError('');
      hasErrors = false;
    }
    if (previewImage !== '') {
      setReqPreview('');
      hasErrors = false;
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
    if (price.trim() === '') {
      setPriceError('Price is required');
      hasErrors = true;
    }

    //Preview image / image errors
    if (previewImage.trim() === '') {
      setReqPreview('Preview Image URL is required');
      hasErrors = true;
    }
    if (!/\.(png|jpe?g)$/i.test(previewImage)) {
      if (previewImage !== '') {
        setImagePreError('Image file must be in PNG, JPEG, or JPG format.');
        hasErrors = true;
      }
    }

    //Image errors
    if (!/\.(png|jpe?g)$/i.test(image1)) {
      if (image1 !== '') {
        setImage1Error('Image file must be in PNG, JPEG, or JPG format.');
        hasErrors = true;
      }
    }

    if (!/\.(png|jpe?g)$/i.test(image2)) {
      if (image2 !== '') {
        setImage2Error('Image file must be in PNG, JPEG, or JPG format.');
        hasErrors = true;
      }
    }

    if (!/\.(png|jpe?g)$/i.test(image3)) {
      if (image3 !== '') {
        setImage3Error('Image file must be in PNG, JPEG, or JPG format.');
        hasErrors = true;
      }
    }

    if (!/\.(png|jpe?g)$/i.test(image4)) {
      if (image4 !== '') {
        setImage4Error('Image file must be in PNG, JPEG, or JPG format.');
        hasErrors = true;
      }
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

    let createdSpot;
    createdSpot = await dispatch(createASpot(payload));

    let newSpotId = createdSpot.id;

    const imagePreviewPayload = {
      url: previewImage,
      spotId: newSpotId,
      preview: true,
    };

    const image1Payload = {
      url: image1,
      spotId: newSpotId,
      preview: false,
    };

    const image2Payload = {
      url: image2,
      spotId: newSpotId,
      preview: false,
    };

    const image3Payload = {
      url: image3,
      spotId: newSpotId,
      preview: false,
    };

    const image4Payload = {
      url: image4,
      spotId: newSpotId,
      preview: false,
    };

    if (image1 !== '') {
      const createdImage1 = await dispatch(
        createAnImage(image1Payload, createdSpot.id)
      );
    }

    if (image2 !== '') {
      const createdImage1 = await dispatch(
        createAnImage(image2Payload, createdSpot.id)
      );
    }

    if (image3 !== '') {
      const createdImage1 = await dispatch(
        createAnImage(image3Payload, createdSpot.id)
      );
    }

    if (image4 !== '') {
      const createdImage1 = await dispatch(
        createAnImage(image4Payload, createdSpot.id)
      );
    }

    let createdImages;
    createdImages = await dispatch(
      createAnImage(imagePreviewPayload, createdSpot.id)
    );

    if (createdSpot) {
      history.push(`/api/spots/${createdSpot.id}`);
    }
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
        <div className="priceheader">
          <p className="pricefield">Set a base price for your spot</p>
          <p className="pricefield1">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
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
        <div className="imageheader">
          <p className="imagefield">Liven up your spot with photos</p>
          <p className="imagefield1">
            Submit a link to at least one photo to publish your spot.
          </p>
        </div>
        <input
          className="inputfield"
          type="text"
          placeholder="Preview Image URL"
          value={previewImage}
          onChange={updatePreviewImage}
        />
        <p className="fieldname">
          {reqPreview && (
            <p id="previewfielderror" className="error">
              {reqPreview}
            </p>
          )}
          {imagePreError && (
            <p id="preview1fielderror" className="error">
              {imagePreError}
            </p>
          )}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image1}
          onChange={updateImage1}
        />
        <p className="fieldname">
          {image1Error && (
            <p id="imagefielderror" className="error">
              {image1Error}
            </p>
          )}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image2}
          onChange={updateImage2}
        />
        <p className="fieldname">
          {image2Error && (
            <p id="imagefielderror" className="error">
              {image2Error}
            </p>
          )}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image3}
          onChange={updateImage3}
        />
        <p className="fieldname">
          {image3Error && (
            <p id="imagefielderror" className="error">
              {image3Error}
            </p>
          )}
        </p>
        <input
          className="inputfield"
          type="text"
          placeholder="Image URL"
          value={image4}
          onChange={updateImage4}
        />
        <p className="fieldname">
          {image4Error && (
            <p id="imagefielderror" className="error">
              {image4Error}
            </p>
          )}
        </p>
        <button className="submitspotbutton" type="submit">
          Create new Spot
        </button>
      </form>
    </section>
  );
};

export default SpotForm;
