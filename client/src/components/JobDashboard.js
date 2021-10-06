import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const JobDashboard = () => {
  const [jobApplications, setJobApplications] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/job/${_id}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setJobApplications(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default JobDashboard;
