import React from 'react';
import './GoogleBtn.css';
import actions from '../../api/index';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (props) => {
  const onSuccessResponse = async (response) => {
    props.setLoading(true);
    const { tokenId } = response;

    await actions
      .logIn({ tokenId })
      .then((user) => {
        props.setLoading(false);
        props.setUser({ ...user?.data.user });
      })
      .catch((response) => {
        console.error(response);
        props.setLoading(false);
        props.history.push('/');
      });
  };
  const onFailureResponse = () => {
    props.history.push('/');
  };
  return (
    <GoogleLogin
      className="loginBtn"
      clientId={process.env.REACT_APP_GOOGLEID}
      buttonText="Sign in with Google"
      onSuccess={onSuccessResponse}
      onFailure={onFailureResponse}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default responseGoogle;
