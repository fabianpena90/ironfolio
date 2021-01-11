import React from "react";
import "./GoogleBtn.css";
import actions from "../../api/index";
import { GoogleLogin } from "react-google-login";
import loader from "./loader.gif";

const responseGoogle = (props) => {

  const onResponse = (response) => {
    props.setLoading(true);
    //console.log(response);
    const user = {
      ...response.profileObj,
      password: response.profileObj?.googleId,
    };
    actions
      .logIn(user)
      .then((user) => {
        props.setLoading(false);
        props.setUser({ ...user?.data });
      })
      .catch((response) => console.error(response));
  };
  return (
    props.loading? <img src={loader} alt="Loading..." />  : <GoogleLogin
      className="loginBtn"
      clientId={process.env.REACT_APP_GOOGLEID}
      buttonText="Sign in with Google"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={"single_host_origin"}
      />
  );
};

export default responseGoogle;
