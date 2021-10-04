import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  fetch("/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        setCurrentUser(data.data).then(() => history.push("/"));
      } else {
        alert(
          "Something went wrong. Please try again with a different username and/or email."
        );
      }
    });

  return null;
};

export default SignUp;
