import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ViewApplication = () => {
  const [application, setApplication] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/application/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default ViewApplication;
