import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  fetch("/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        setCurrentUser(data.data).then(() => history.push("/"));
      } else {
        alert("User not found or wrong combination of email and password.");
      }
    });

  return null;
};

export default SignIn;
