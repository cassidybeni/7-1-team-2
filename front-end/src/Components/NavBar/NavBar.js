import React, { useState, useContext, useEffect } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../../Providers/UserProvider";

export default function NavBar() {
  const [vendorClicked, setVendorClicked] = useState(false);
  const { currentUser, setCurrentUser, userSignOut } = useContext(UserContext);
  const navigate = useNavigate();
  const handleVendorClick = () => {
    setVendorClicked(!vendorClicked);
  };
  const closeNav = () => {
    setVendorClicked(false);
  };

  const accountMenu = [
    {
      title: "Dashboard",
      url: `/dashboard`,
      cName: "pg-buttons nav-but",
    },
    {
      title: "My Favorites",
      url: `/favorites`,
      cName: "pg-buttons nav-but",
    },
  ];

  const handleSignOut = async () => {
    try {
      await userSignOut();
      setCurrentUser(null);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className="NavBarItems drop">
      <Link to="/" className="navbar-logo">
        <h1> Event(ful) &#127881;</h1>
      </Link>

      <ul className="accountNav">
        <li className="accountLinks" onClick={handleVendorClick}>
          <span className="pg-buttons nav-but">
            Vendors {vendorClicked ? <> &#x2191; </> : <>&#x2193;</>}
          </span>
        </li>
        {accountMenu.map((item, index) => {
          return (
            <li className="accountLinks" key={index} onClick={closeNav}>
              <Link to={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
        <li className="accountLinks" onClick={handleSignOut}>
          {" "}
          <span className="pg-buttons nav-but logout">Logout</span>
        </li>
      </ul>

      <ul className={vendorClicked ? "nav-menu active" : "nav-menu"}>
        {VendorMenu.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName} onClick={closeNav}>
                {item.title}{" "}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
