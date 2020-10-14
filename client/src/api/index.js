import axios from "axios";
import baseURL from "./config.js";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

//console.log(baseURL);

const token = window.localStorage.getItem("token");
let t = token ? token.substring(0, 15) : null;

//console.log("TOKEN", t, "NODE_ENV", process.env.NODE_ENV);

let resetHead = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
};

const API = axios.create({
  withCredentials: true,
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

const actions = {
  getUser: async () => {
    return await API.get(`/user`, resetHead());
  },
  signUp: async (user) => {
    let res = await API.post("/signup", user, resetHead());
    window.localStorage.setItem("token", res?.data?.token);
    return res;
  },
  logIn: async (user) => {
    let res = await API.post("/login", user, resetHead());
    window.localStorage.setItem("token", res?.data?.token);
    return res;
  },
  logOut: async () => {
    window.localStorage.removeItem("token");
    return await API.get("/logout", resetHead());
  },
  createClass: async (data) => {
    return await API.post("/createClass", data, resetHead());
  },

  getAllClasses: async () => {
    return await API.get("/getAllClasses");
  },
  setClass: async (data) => {
    return await API.post("/addClass", data, resetHead());
  },
  addProject: async (data) => {
    return await API.post("/newProject", data, resetHead());
  },
  editProject: async (data) => {
    return await API.post("/formUpdate", data, resetHead());
  },
  getStudentList: async (data) => {
    return await API.post("/getStudentList", data, resetHead());
  },
  getEditProject: async (data) => {
    return await API.post("/getEditProject", data, resetHead());
  },
  getStudentProject: async () => {
    return await API.get("/getStudentProjects", resetHead());
  },
  deleteProject: async (data) => {
    return await API.post("/deleteProject", data, resetHead());
  },
  getAllClassProjects: async (data) => {
    return await API.post("/getAllClassProjects", data, resetHead());
  },
  deleteFavorites: async (data) => {
    return await API.post("/deleteFavorites", data, resetHead());
  },
  deleteFavoritesArchive: async (data) => {
    return await API.post("/deleteFavoritesArchive", data, resetHead());
  },
  addFavorites: async (data) => {
    return await API.post("/addFavorites", data, resetHead());
  },
  getAllFavoriteProjects: async (data) => {
    return await API.post("/getAllFavoriteProjects", data, resetHead());
  },
};

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error?.response?.data);
    if (error?.response?.data.name !== "JsonWebTokenError")
      NotificationManager.error(String(error?.response?.data.message));
    else NotificationManager.error("Please signup or login");
  }
);

export default actions;
