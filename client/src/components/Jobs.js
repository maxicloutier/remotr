import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Jobs = () => {
  const [jobList, setJobList] = useState(null);
  const [status, setStatus] = useState("loading");

  // useEffect(() => {
  //   fetch("/jobs/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return null;
};

export default Jobs;
