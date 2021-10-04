import React, { useState, useEffect } from "react";
import styled from "styled-components";

const JobDashboard = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    fetch("/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default JobDashboard;
