import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const Community = () => {
  const { candidates, employers } = useContext(Context);

  if (!candidates || !employers) {
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
    <Wrapper>
      <div>
        {candidates.map((candidate) => {
          return (
            <Link to={`/candidate/${candidate._id}`} key={candidate._id}>
              <CandidatePics src={candidate.picture} alt="Candidate Picture" />
              <p>{candidate.name}</p>
              <p>{candidate.location}</p>
              <p>{candidate._id}</p>
              <p>{candidate.title}</p>
            </Link>
          );
        })}
      </div>
      <div>
        {employers.map((employer) => {
          return (
            <Link to={`/employer/${employer._id}`} key={employer._id}>
              <CompanyLogos src={employer.logo} alt="Company Logo" />
              <p>{employer.name}</p>
              <p>{employer.industry}</p>
              <p>{employer._id}</p>
              <p>{employer.location}</p>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const ProgressBarContainer = styled.div`
  max-width: 200px;
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

const CandidatePics = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const CompanyLogos = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
`;

export default Community;
