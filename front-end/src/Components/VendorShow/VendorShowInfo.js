import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Ratings from "react-ratings-declarative";
import { Carousel } from "react-responsive-carousel";

const parseNum = (str) => +str.replace(/[^.\d]/g, "");

const API = process.env.REACT_APP_API;

function VendorShowInfo({ business, user_id, category }) {
  const [favorite, setFavorite] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${API}/favorites/${user_id}`).then((res) => {
        let index = res.data.message.findIndex(
          (elem) => elem.vendor_name === business.name
        );
        if (index > -1) {
          setFavorite(true);
        }
      });
    } catch (e) {
      console.warn(e);
    }

    return () => {
      setFavorite(false);
    };
  }, [business.name, user_id]);

  const handleFav = () => {
    setFavorite(!favorite);
    if (!favorite === false) {
      try {
        axios
          .delete(`${API}/favorites/${user_id}/${business.name}`)
          .then((res) => setPressed(false));
      } catch (e) {
        console.warn(e);
      }
    } else {
      const loc = business.location.display_address.join(", ");

      const body = {
        vendor_name: business.name,
        vendor_address: loc,
        vendor_phone_number: parseNum(business.phone),
        vendor_id: business.id,
        vendor_image: business.photos[0],
        vendor_category: category,
        vendor_rating: business.rating,
      };
      try {
        axios
          .post(`${API}/favorites/${user_id}`, body)
          .then((res) => setPressed(true));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const heartColor = () => {
    let color = "";

    if (hover && !favorite) {
      color = "#666";
    } else if (favorite) {
      color = "white";
      color = "red";
    } else {
      color = "#aaa";
    }

    return color;
  };

  return (
    <>
      <span className="show-header drop">
        <span>
          <div className="like-div">
            <i
              className={`fas fa-heart fa-lg heart drop ${
                pressed ? "press" : null
              }`}
              onClick={handleFav}
              style={{ color: heartColor() }}
              onMouseEnter={() => setHover(!hover)}
              onMouseLeave={() => setHover(!hover)}
            ></i>
          </div>
          <h1>{business.name} </h1>
        </span>
      </span>
      <div className="flex-row show-header2 drop">
        <Ratings
          rating={business.rating}
          widgetRatedColors="#efcc00"
          widgetSpacings="5px"
          widgetEmptyColors="#aaa"
        >
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="35px" />
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="30px" />
        </Ratings>
      </div>
      <div className="ven-info page drop ">
        <div className="car-wrap">
          <Carousel showThumbs={false} autoPlay={true}>
            {business.photos.map((photo, i) => (
              <img src={photo} alt="service" className="vendor-imgs" key={i} />
            ))}
          </Carousel>
        </div>

        <div id="ven-info">
          <div className="flex-row">
            <p className="cat-title">( {business.categories[0].title} )</p>
          </div>
          <div>
            <h2> Contact Information </h2>
            <p>{business.price}</p>
            <p>{business.display_phone}</p>

            {business.location.display_address.map((point, i) => (
              <p key={i}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorShowInfo;
