import React, { useState, useEffect } from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { VendorMenu } from "../NavBar/VendorMenu";
import breakdance from "../../assets/breakdance.gif";

const API = process.env.REACT_APP_API;

export default function FavoriteList({ user_id }) {
  const [favoriteVendors, setFavoriteVendors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterClicked, setFilterClicked] = useState({
    clicked: false,
    category: "",
  });

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API}/favorites/${user_id}`)
        .then(
          (res) => {
            setFavoriteVendors(res.data.message);
          },
          (e) => {
            console.error(e);
          }
        )
        .catch((e) => {
          console.error(e);
        });
    }
    return () => {
      setFavoriteVendors([]);
    };
  }, [user_id]);

  const deleteFav = (name) => {
    try {
      axios.delete(`${API}/favorites/${user_id}/${name}`).then((res) => {
        const faveCopy = [...favoriteVendors];
        const index = faveCopy.findIndex(
          (vendor) => vendor.vendor_name === name
        );
        faveCopy.splice(index, 1);
        setFavoriteVendors(faveCopy);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const filterFavorites = (category, title) => {
    let results = favoriteVendors.filter(
      (vendor) => vendor.vendor_category === category
    );

    setFiltered(results);
    setFilterClicked({ ...filterClicked, clicked: true, category: title });
  };

  const vendorList = () => {
    if (!filterClicked.clicked) {
      return (
        <ul
          className={`ven-ul ${
            favoriteVendors.length === 2 ? "two-ul" : null
          } ${favoriteVendors.length === 1 ? "one-ul" : null}`}
        >
          {favoriteVendors.map((vendor) => {
            return (
              <Favorite
                vendors={favoriteVendors}
                vendor={vendor}
                user_id={user_id}
                key={vendor.vendor_id}
                deleteFav={deleteFav}
              />
            );
          })}
        </ul>
      );
    } else if (filtered.length >= 1) {
      return (
        <ul
          className={`ven-ul ${filtered.length === 2 ? "two-ul" : null} ${
            filtered.length === 1 ? "one-ul" : null
          }`}
        >
          {filtered.map((vendor) => {
            return (
              <Favorite
                vendors={filtered}
                vendor={vendor}
                key={vendor.vendor_id}
                deleteFav={deleteFav}
              />
            );
          })}
        </ul>
      );
    } else {
      return (
        <>
          {" "}
          <h2 className="none">
            No {filterClicked.category} saved to your favorites ...{" "}
          </h2>{" "}
          <p className="yet">( yet ! )</p>
          <img
            src="https://media.giphy.com/media/JKNWxtuhgr9JZgzz5k/giphy.gif"
            alt="breakdance"
          />{" "}
        </>
      );
    }
  };

  return (
    <>
      <div className="filter">
        <ul className="browse-ul">
          <li className="browse-li" onClick={() => setFilterClicked(false)}>
            {" "}
            View all{" "}
          </li>

          {VendorMenu.map((vendor) => {
            return (
              <li
                className="browse-li"
                onClick={() => filterFavorites(vendor.category, vendor.title)}
                key={vendor.title}
              >
                {vendor.title}
              </li>
            );
          })}
        </ul>

        <ul className="dropdown-content">
          {VendorMenu.map((vendor) => {
            return (
              <li
                onClick={() => filterFavorites(vendor.category, vendor.title)}
                key={vendor.title}
              >
                {vendor.title}
              </li>
            );
          })}
          <li onClick={() => setFilterClicked(false)}> View all </li>
        </ul>
      </div>

      <div className="fave-page-div">
        {favoriteVendors.length > 0 && user_id ? (
          vendorList()
        ) : (
          <>
            <h2 className="none">No saved favorites ... </h2>{" "}
            <p className="yet">( yet ! )</p>
            <img src={breakdance} alt="breakdance" />
          </>
        )}
      </div>
    </>
  );
}
