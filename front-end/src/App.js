import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import useGeoLocation from "./hooks/useGeoLocation";

function App() {
  const location = useGeoLocation();

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/dashboard/:user_id">
          <Dashboard />
        </Route>

        <Route path="/event/:user_id/:event_id">
          <Event />
        </Route>

        <Route path="/vendor/:category/:provider_id">
          <VendorShow />
        </Route>

        <Route path="/favorites/:user_id">
          <Favorites />
        </Route>
        
        <Route path="/vendors/:category">
          <VendorIndex location={location}/>
        </Route>

        <Route path="/booked/:user_id/:event_id">
          <Booked />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
