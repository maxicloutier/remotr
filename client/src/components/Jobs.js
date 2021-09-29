import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Jobs = () => {
  const [jobList, setJobList] = useState(null);
  const [status, setStatus] = useState('loading');

  // useEffect(() => {
  //   fetch('https://remotive.io/api/remote-jobs?limit=5')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  useEffect(() => {
    fetch('https://remoteok.io/api')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return null;
};

export default Jobs;
