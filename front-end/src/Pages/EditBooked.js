import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import CategorySwitch from "../Components/CategorySwitch";
import Vendor from "../Components/VendorIndex/Vendor";
import api from "../util/apiCalls";
import axios from "axios";
import Loading from "../Components/Loading";

const API = process.env.REACT_APP_API;

const parseNum = (str) => +str.replace(/[^.\d]/g, "");

function EditBooked({ lat, lng, formatter, user_id }) {
  const { event_id, category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const [cost, setCost] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [bookedStatus, setBookedStatus] = useState({});
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let vendorCategories = [];
    let booked = {};

    if (user_id) {
      try {
        axios
          .get(`${API}/checklist/${user_id}/${event_id}`)
          .then((response) => {
            const data = response.data.payload;
            vendorCategories = data.map((point) => {
              return {
                name: point.task_name,
                booked: point.is_completed,
                cost: point.task_cost,
                id: point.task_id,
              };
            });

            for (let category of vendorCategories) {
              booked[category.name] = category.booked;
            }

            setBookedStatus(booked);
          });
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      setBookedStatus({});
    };
  }, [event_id, user_id]);

  useEffect(() => {
    if (bookedStatus[category] === true) {
      try {
        axios
          .get(`${API}/booked/category/${category}/${user_id}/${event_id}`)
          .then((res) => {
            let result = res.data.payload;
            setSelected(true);
            setVendor({
              name: result.vendor_name,
              image_url: result.vendor_image,
              display_phone: result.vendor_phone_number,
              rating: result.rating,
            });
            setCost(result.amount);
          });
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      setVendor("");
      setCost(0);
    };
  }, [category, event_id, user_id, bookedStatus]);

  useEffect(() => {
    (async () => {
      if (!searched && lat && lng) {
        const data = await api.getVendorsLongLag(lng, lat, category);
        if (data.businesses[0].id) {
          setVendors(data.businesses);
        }
      }
    })();
  }, [category, lng, lat, searched]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleZipSubmit = async (e) => {
    e.preventDefault();
    const data = await api.getVendorsZip(category, zip);
    if (data[0].id) {
      setVendors(data);
    }
    setSearched(true);
    setSelected(false);
  };

  const handleFormChange = (e) => {
    setCost(e.target.value);
  };

  const handleCostSubmission = (e) => {
    e.preventDefault();
    let checklistBody = {
      task_cost: cost,
      task_name: category,
    };

    try {
      axios.put(`${API}/checklist/cost/${user_id}/${event_id}`, checklistBody);
    } catch (e) {
      console.error(e);
    }

    let bookedBody = {
      amount: cost,
      vendor_name: vendor.name,
    };

    try {
      axios.put(`${API}/booked/cost/${user_id}/${event_id}`, bookedBody);
    } catch (e) {
      console.error(e);
    }

    setShowForm(false);
  };

  const handleSelection = (selected) => {
    const loc = selected.location.display_address.join(", ");
    let bookedbody = {
      vendor_name: selected.name,
      vendor_address: loc,
      vendor_phone_number: parseNum(selected.phone),
      category: category,
      rating: selected.rating,
      vendor_image: selected.image_url,
      amount: 0
    };

    let checklistBody = {
      is_completed: true,
      task_name: category,
      task_cost: 0
    };

    if (!vendor) {
      try {
        axios
          .post(`${API}/booked/${user_id}/${event_id}`, bookedbody)
          .then((res) => {
            try {
              axios
                .put(`${API}/checklist/${user_id}/${event_id}`, checklistBody)
                .then((res) => {
                  setVendor(selected);
                  setVendors([]);
                  setSearched(false);
                  setSelected(true);
                });
            } catch (e) {
              console.error(e);
            }
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        axios
          .put(`${API}/booked/${user_id}/${event_id}`, bookedbody)
          .then((res) => {
            try {
              axios
                .put(`${API}/checklist/${user_id}/${event_id}`, checklistBody)
                .then((res) => {
                  setVendor(selected);
                  setVendors([]);
                  setSearched(false);
                  setSelected(true)
                  setCost(0)
                });
            } catch (e) {
              console.error(e);
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const vendorsShow = () => {
    if (vendors[0]) {
      return (
        <ul className="ven-ul">
          {vendors.map((vendor) => {
            return (
              <button onClick={() => handleSelection(vendor)} key={vendor.id}>
                <Vendor
                  vendor={vendor}
                  category={category}
                  selected={selected}
                />
              </button>
            );
          })}
        </ul>
      );
    } else {
      return <Loading />;
    }
  };

  const vendorShow = () => {
    return (
      <div className="single-ven">
        <Vendor vendor={vendor} category={category} selected={selected} />
        <div className="three-d ven-cost">
          <p>Cost: {formatter.format(cost)}</p>

          {showForm ? (
            form()
          ) : (
            <button className="pg-buttons" onClick={() => setShowForm(true)}>
              {cost ? <>Edit Cost</> : <>Add Cost</>}
            </button>
          )}
        </div>
      </div>
    );
  };

  const form = (e) => {
    return (
      <form onSubmit={handleCostSubmission} className="ven-cost">
        <input
          id={category}
          placeholder="cost"
          value={cost}
          onChange={(e) => handleFormChange(e)}
          type="number"
          min="0"
          step=".01"
        />
        <button type="submit" className="pg-buttons">
          Update
        </button>
      </form>
    );
  };

  const directions = () => {
    let direction = "";
    if ((!vendor && !searched && lat && lng) || searched) {
      direction = (
        <p className="directions">
          Browse below or search by zip code to select the vendor that you've
          booked
        </p>
      );
    } else if (vendor && !searched) {
      direction = (
        <>
          <p className="directions">
           ( If you have changed vendors, search by zip code above to select the
            vendor that you've booked ){" "}
          </p>
        </>
      );
    } else if (searched && !vendors) {
      direction = (
        <p className="directions">
          Unfortunately, we could not find any vendors in this area. Please try
          another zip code.{" "}
        </p>
      );
    } else if (!lng && !lat) {
      direction = (
        <p className="directions">
          Search by zip code above to select the vendor that you've booked
        </p>
      );
    }

    return direction;
  };

  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => history.goBack()}
      >
        {" "}
        &#x21e6; Back to Event
      </button>
      <div className="page indexpg-container">
        <h1>{CategorySwitch(category)}</h1>

        <form onSubmit={handleZipSubmit} id="zip-form">
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
        {directions()}
        {vendor && !searched ? vendorShow() : vendorsShow()}
      </div>
    </>
  );
}

export default EditBooked;
