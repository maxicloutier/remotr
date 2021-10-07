import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const initialState = {
    usertype: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation(); // Do I need this one?

    const data = {
      usertype: formData.usertype,
      email: formData.email,
      password: formData.password,
    };

    fetch("/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCurrentUser(data.data);
          history.push("/");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  return (
    <div>
      <h1>Sign In</h1>

      <p>Enter your information to sign in to your account.</p>

      <form onSubmit={handleSubmit}>
        <label for="usertype">User Type</label>
        <select
          name="usertype"
          id="usertype"
          onChange={(ev) => {
            setFormData({ ...formData, usertype: ev.target.value });
          }}
        >
          <option value="" disabled selected>
            Select a user type
          </option>
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(ev) => {
            setFormData({ ...formData, email: ev.target.value });
          }}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(ev) => {
            setFormData({ ...formData, password: ev.target.value });
          }}
        />

        <div>
          <button type="submit" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
