import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorIndex/VendorList";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";
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

export default function VendorIndex({ lat, lng, city }) {
  const [vendors, setVendors] = useState([]);
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    try{
      axios.get(
        `${proxy}/${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
        config()
      )
      .then(res => { 
        const {data} = res
        if (data.businesses){
          setVendors(data.businesses)
        }
        setSearched(true)
      })
      
    } catch (e) {
      return console.warn(e);
    }

    // return () => {
    //   setVendors([])
    //   setSearched(false)
    // }

  }, [category, lng, lat]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await api.getVendorsZip(category, zip);
    if (data[0].id) {
      setVendors(data);
    }
    setSearched(true);
  };

  const vendorsList = () => {
    let result = "";
    if (!lat && !searched) {
      result = (
        <>
          {" "}
          <h2>
            Input zip code above to search for {CategorySwitch(category)} in
            your area.
          </h2>
          <Loading />{" "}
        </>
      );
    } else if (searched && !vendors[0]) {
      result = (
        <h2>
          Unfortunately, we could not find any vendors in this area. Please try
          another zip code.{" "}
        </h2>
      );
    } else if (lat && !vendors[0]) {
      result = <Loading />;
    } else {
      result = <VendorList vendors={vendors} category={category} />;
    }
    return result;
  };

  return (
    <div className="page indexpg-container">
      <div>
        {category ? (
          <h1 className="flex-row pg-head"> {CategorySwitch(category)} </h1>
        ) : null}
       <p> ( near {searched && zip ? zip : city} ) </p>
        <form onSubmit={handleSubmit} id="zip-form">
          <input
            className="three-d pg-input"
            type="text"
            placeholder="5 Digit Zip Code"
            onChange={handleZipChange}
            value={zip}
            id="zip-search"
            required
            pattern="[0-9]{5}"
          />
          <button type="submit" className="pg-buttons">
            Search
          </button>
        </form>
      </div>
      {vendorsList()}
    </div>
  );
}
