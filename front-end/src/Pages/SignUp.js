import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { userSignUp } from "../Services/Firebase";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.REACT_APP_API;

export default function SignUp() {
  const history = useHistory();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      let res = await userSignUp(input.userName, input.email, input.password);
      if (res === null) {
        const newUser = { email: input.email, password: input.password };
        let result = await axios.post(`${API}/users`, newUser);
        if (result.data.success) {
          history.push("/dashboard");
        } else {
          console.warn("could not add new user to backend database");
        }
      } else {
        toast.error("Please enter all required info", {
          toastId: "customId",
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Landing-Container">
      <div className="SignIn-Form ">
        <p> &nbsp; </p>
        <div className=" newForm three-d">
          &nbsp;
          <form onSubmit={handleSignUp}>
            <span className="SignIn-Labels">
              <label htmlFor="userName">Please Enter Your Name</label>
              <input
                type="text"
                id="userName"
                value={input.userName}
                onChange={handleChange}
                placeholder="Name"
              />{" "}
              <label htmlFor="Email">Please Enter your Email</label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <label htmlFor="PassWord">
                Select a Password (min 6 characters)
              </label>{" "}
              <input
                type="password"
                id="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Password"
              />{" "}
            </span>
            <button type="submit" className="Login SignUp pg-buttons">
              Sign Up
            </button>
          </form>
          <ToastContainer autoClose={false} position="center" />
        </div>
      </div>
    </div>
  );
}
