import React, { useState, useEffect } from "react";
import styled from "styled-components";

const JobDashboard = () => {
  const [jobApplications, setJobApplications] = useState(null);

  useEffect(() => {
    fetch("/job-applications")
      .then((res) => res.json())
      .then((data) => {
        setJobApplications(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default JobDashboard;
