import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const PostJob = () => {
  fetch("/job", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        alert("Job successfully posted!").then(() => history.push("/me"));
      } else {
        alert(
          "Something went wrong. Please make sure that all fields are filled in."
        );
      }
    });

  return null;
};

export default PostJob;
