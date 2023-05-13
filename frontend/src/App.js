import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SpotDetail from './components/SpotDetail';
import CreateSpotForm from './components/CreateSpotForm';
import SpotCurrentUser from './components/SpotCurrentUser';
import UpdateSpot from './components/UpdateSpot';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {' '}
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/spots/current">
            <SpotCurrentUser />
          </Route>
          <Route path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
