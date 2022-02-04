let baseURL;
// const AWS_SERVER = '18.207.246.162'
if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_API) {
    baseURL = `${process.env.REACT_APP_API}/api`; //Netlify
  } else {
    baseURL = `/api`; //Heroku or 5000
  }
} else {
  const Server = 'localhost';
  baseURL = `http://${Server}:5000/api`; //http://localhost:5000/apihttps://ironfolio.herokuapp.com/api
}
// baseURL = `https://pacific-river-72403.herokuapp.com/api`;

export default baseURL;
