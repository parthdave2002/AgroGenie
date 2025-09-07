import axios from "axios";
import Cookies from "js-cookie";

// default
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    return Promise.reject(error?.response.data ? error?.response.data : error);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

class APIClient {
  /* Fetches data from given url */
  get = (url, params ) => {
    let response;

    let paramKeys = [];

    if(params){
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key])
        return paramKeys;
    });
    
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
        response = axios.get(`${url}`, params);
    }

    return response;
  }

  /* post given data to url */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /* Updates data */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /* Delete data*/
  delete = (url,params) => {
    let response;
    let paramKeys = [];

    if(params){
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key])
        return paramKeys;
    });
    
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.delete(`${url}?${queryString}`);
    } else {
        response = axios.delete(`${url}`);
    }

    return response;
  };

  postMultipart = async (url, body) => {
    try {   
      const token = Cookies.get("token");
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error:", error);
  
      if (error?.response?.status === 401) {
        Cookies.remove("token");
        Cookies.remove("username");
        window.location.replace("/");
        toast.error("Token expired");
      }
  
      throw error;
    }
  };


  putMultipart = async (url, body) => {
    try {   
      const token = Cookies.get("token");
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error:", error);
  
      if (error?.response?.status === 401) {
        Cookies.remove("token");
        Cookies.remove("username");
        window.location.replace("/");
        toast.error("Token expired");
      }
  
      throw error;
    }
  };
}
const getLoggedinUser = () => {
  const user = Cookies.get("token");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };