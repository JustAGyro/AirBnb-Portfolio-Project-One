import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createASpot } from '../../store/spot';
import { Redirect, useHistory } from 'react-router-dom';
import { createAnImage } from '../../store/spot';

const SpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updateImage1 = (e) => setImage1(e.target.value);
  const updateImage2 = (e) => setImage2(e.target.value);
  const updateImage3 = (e) => setImage3(e.target.value);
  const updateImage4 = (e) => setImage4(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // let createdImages;
    // createdImages = await dispatch(createAnImage(imagePayload, createdSpot.id));

    if (createdSpot) {
      history.push(`/api/spots/${createdSpot.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className="new-form-holder">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <input
          className="location"
          type="text"
          placeholder="Country"
          required
          value={country}
          onChange={updateCountry}
        />
        <input
          className="street"
          type="text"
          placeholder="Street Address"
          required
          value={address}
          onChange={updateAddress}
        />
        <input
          className="city"
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity}
        />
        <input
          className="state"
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState}
        />
        <input
          className="desc"
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription}
        />
        <input
          type="text"
          placeholder="Name of your spot"
          required
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Price per night (USD)"
          required
          value={price}
          onChange={updatePrice}
        />
        <input
          type="text"
          placeholder="Preview Image URL"
          required
          value={previewImage}
          onChange={updatePreviewImage}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image1}
          onChange={updateImage1}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image2}
          onChange={updateImage2}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image3}
          onChange={updateImage3}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image4}
          onChange={updateImage4}
        />
        <button type="submit">Create new Spot</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default SpotForm;
