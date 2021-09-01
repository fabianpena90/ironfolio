let baseURL;
if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_API) {
    baseURL = `http://44.192.254.67:5000/api`; //Netlify
  } else {
    baseURL = `/api`; //Heroku or 5000
  }
} else {
  baseURL = `http://44.192.254.67:5000/api`; //http://localhost:5000/apihttps://ironfolio.herokuapp.com/api
}
// baseURL = `https://pacific-river-72403.herokuapp.com/api`;

export default baseURL;
