import React, { useState } from 'react';
import './LandingPage.css';
import { ReactComponent as Ironhack } from './Ironhack.svg';
import { ReactComponent as Loader } from './loader.svg';
import GoogleAuthLogin from '../components/auth/GoogleAuthLogin';
import { NotificationContainer } from 'react-notifications';
import Typography from '@material-ui/core/Typography';

const LandingPage = ({ user, setUser, history }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="landingPage">
      <Ironhack className="logo" />
      <Typography variant="h2" className="name" gutterBottom>
        Ironfolio
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!user && (
            <GoogleAuthLogin
              setUser={setUser}
              setLoading={setLoading}
              history={history}
            />
          )}
        </>
      )}
      <NotificationContainer />
    </div>
  );
};

export default LandingPage;
