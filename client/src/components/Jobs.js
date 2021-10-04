import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Jobs = () => {
  const [jobList, setJobList] = useState(null);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobList(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default Jobs;
