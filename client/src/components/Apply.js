import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const Apply = ({ jobId }) => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  
  fetch(`/job/${jobId}/application`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        alert("Application successfully sent!").then(() => history.push("/me"));
      } else {
        alert(
          "Something went wrong. Please make sure that all fields are filled in."
        );
      }
    });

  return null;
};

export default Apply;
