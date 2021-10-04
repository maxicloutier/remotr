import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const [jobDescription, setJobDescription] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/job/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobDescription(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default JobDetails;
