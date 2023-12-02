import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const proxy = "https://event-ful.adaptable.app";
const yelpBase = "https://api.yelp.com/v3/businesses";

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      withCredentials: true,
    },
  };
};

const getVendorsZip = async (category, zip) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/search?term=${category}&location=${zip}&category=${category}&radius=16093`,
      config()
    );
    return data.businesses;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendorsLongLag = async (lng, lat, category) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
      config()
    );
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendor = async (id) => {
  try {
    const { data } = await axios.get(`${proxy}/${yelpBase}/${id}`, config());
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getReviews = async (id) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/${id}/reviews`,
      config()
    );
    return data.reviews;
  } catch (e) {
    return console.warn(e);
  }
};

const api = {
  getVendorsZip,
  getVendorsLongLag,
  getVendor,
  getReviews,
};

export default api;
