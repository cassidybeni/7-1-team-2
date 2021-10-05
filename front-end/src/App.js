import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./Providers/UserProvider";
import { apiURL } from "./util/apiURL";
import useGeoLocation from "./hooks/useGeoLocation";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import SignIn from "./Pages/SignIn.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import EditBooked from "./Pages/EditBooked.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import NavBar from "./Components/NavBar/NavBar.js";
import NewEventForm from "./Pages/NewEventForm.js";
import EditFormPage from "./Pages/EditFormPage.js";
import EventCheckboxPg from "./Pages/EventCheckboxPg";
import FourOFour from "./Pages/FourOFour";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";


const API = apiURL();

function App() {
  const loggedInUser = useContext(UserContext);
  const [user_id, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(false)
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const location = useGeoLocation();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (location.coordinates) {
      setLat(location.coordinates.latitude);
      setLng(location.coordinates.longitude);
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const email = loggedInUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          setUserId(checkUser.data.payload.user_id);
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [loggedInUser])

  useEffect(() => {
    if (user_id) {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      })};
  }, [user_id, updateEvent]);

  const deleteEvent = async (event_id) => {
    try {
      await axios.delete(`${API}/events/${user_id}/${event_id}`).then((res) => {
        const eventsCopy = [...events];
        const index = eventsCopy.findIndex(
          (event) => event.event_id === event_id
        );
        eventsCopy.splice(index, 1);
        setEvents(eventsCopy);
      });
    } catch (error) {
      console.error(error);
    }
  }; 

 
  return (
    <div className="site">
      {/* <UserProvider> */}
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            
            <Landing />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/dashboard/new_event/checklist/:id">
            <NavBar />
            <EventCheckboxPg />
          </Route>

          <Route path="/dashboard/new_event">
            <NavBar />
            <NewEventForm />
          </Route>

          <Route path="/dashboard/:event_id/edit">
            <NavBar />
            <EditFormPage setUpdateEvent={setUpdateEvent} />
          </Route>

          <Route path="/dashboard">
            <NavBar />
            <Dashboard user_id={user_id} deleteEvent={deleteEvent} events={events} />
          </Route>

          <Route path="/task/:category/:event_id/:task_id">
            <NavBar />
            <EditBooked lat={lat} lng={lng} formatter={formatter} />
          </Route>

          <Route path="/event/:event_id">
            <NavBar />
            <Event formatter={formatter} />
          </Route>

          <Route path="/vendor/:category/:provider_id">
            <NavBar />
            <VendorShow />
          </Route>

          <Route path="/favorites">
            <NavBar />
            <Favorites />
          </Route>

          <Route path="/vendors/:category">
            <NavBar />
            <VendorIndex location={location} />
          </Route>

          <Route path="/booked/:event_id/:event_name">
            <NavBar />
            <Booked />
          </Route>

          <Route path="*">
            <FourOFour />
          </Route>
        </Switch>
      </Router>
      {/* </UserProvider> */}
    </div>
  );
}

export default App;
