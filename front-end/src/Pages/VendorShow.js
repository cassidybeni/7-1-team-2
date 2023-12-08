import api from "../util/apiCalls";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useNavigate } from "react";
import VendorReviews from "../Components/VendorShow/VendorReviews";
import VendorShowInfo from "../Components/VendorShow/VendorShowInfo";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";

export default function VendorShow({ user_id }) {
  const [business, setbusiness] = useState({
    photos: [],
    categories: [{ title: "" }],
    location: { display_address: [] },
  });

  const [reviews, setReviews] = useState([
    {
      user: { image_url: "", name: "" },
    },
  ]);

  const { provider_id, category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await api.getVendor(provider_id);
      const reviewData = await api.getReviews(provider_id);
      if (data && reviewData) {
        setReviews(reviewData);
        setbusiness(data);
      }
    })();
    
    return () => {
      setReviews([
        {
          user: { image_url: "", name: "" },
        },
      ]);
      setbusiness({
        photos: [],
        categories: [{ title: "" }],
        location: { display_address: [] },
      });
    };
  }, [provider_id]);

  const goBack = () => {
    navigate(-1)
  };

  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => goBack()}
      >
        {" "}
        &#x21e6; Back to {CategorySwitch(category)}
      </button>

      <div id="vendor-showpage" className="page">
        {business.photos[0] ? (
          <>
            <VendorShowInfo
              business={business}
              user_id={user_id}
              category={category}
            />
            <VendorReviews reviews={reviews} />{" "}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
