import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const JobDashboard = () => {
  const [jobApplicants, setJobApplicants] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/job/${_id}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setJobApplicants(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!jobApplicants) {
    return (
      <Loading>
        <ProgressBarContainer>
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
              <CircularProgressbarWithChildren value={percentage}>
                <img
                  style={{ width: 80, marginTop: -5 }}
                  src="/assets/other/doge.png"
                  alt="doge"
                />
                <div style={{ fontSize: 20 }}>
                  <strong>{percentage}</strong> mate
                </div>
              </CircularProgressbarWithChildren>
            )}
          </ChangingProgressProvider>
        </ProgressBarContainer>
      </Loading>
    );
  }

  return (
    <div>
      {jobApplicants.map((jobApplicant) => {
        return (
          <div>
            {jobApplicant.name}
            {jobApplicant.profile}
            {jobApplicant.email}
            {jobApplicant.phone}
            {jobApplicant.candidateLocation}
            {jobApplicant.candidatePicture}
          </div>
        );
      })}
    </div>
  );
};

const ProgressBarContainer = styled.div`
  max-width: 200px;
  margin-top: 30px;
`;

const Loading = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100vw;
  text-align: -webkit-center;
`;

export default JobDashboard;
