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
      <CandidateContainer>
        <H1>Remotr Candidates</H1>
        {candidates.map((candidate) => {
          return (
            <CandidateLink
              to={`/candidate/${candidate._id}`}
              key={candidate._id}
            >
              <CandidatePics src={candidate.picture} alt="Candidate Picture" />
              <DetailsContainer>
                <Name>{candidate.name}</Name>
                <Location>{candidate.location}</Location>
                <Username>Username: {candidate._id}</Username>
                <Headline>{candidate.title}</Headline>
              </DetailsContainer>
            </CandidateLink>
          );
        })}
      </CandidateContainer>
      <EmployerContainer>
        <H1>Remotr Employers</H1>
        {employers.map((employer) => {
          return (
            <EmployerLink to={`/employer/${employer._id}`} key={employer._id}>
              <CompanyLogos src={employer.logo} alt="Company Logo" />
              <DetailsContainer>
                <Name>{employer.name}</Name>
                <Location>{employer.location}</Location>
                <Username>Username: {employer._id}</Username>
                <Industry>{employer.industry}</Industry>
              </DetailsContainer>
            </EmployerLink>
          );
        })}
      </EmployerContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`;

const ProgressBarContainer = styled.div`
  max-width: 200px;
`;

const H1 = styled.h1`
  text-align: center;
  font-family: "Poppins", sans-serif;
  color: #004ddb;
  font-weight: 600;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px 0px 20px;
  text-align: left;
`;

const Name = styled.p`
  font-family: "Poppins", sans-serif;
  color: #004ddb;
  font-weight: 600;
  font-size: 20px;
`;

const Location = styled.p`
  font-weight: 600;
`;

const Username = styled.p``;

const Headline = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: #00ced1;
  font-weight: 500;
`;

const CandidateContainer = styled.div`
  width: 50%;
  border-right: solid 1px #e0e0e0;
  text-align: -webkit-center;
`;

const EmployerContainer = styled.div`
  width: 50%;
  border-left: solid 1px #e0e0e0;
  text-align: -webkit-center;
`;

const CandidateLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  margin: 30px;
  min-height: 200px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
`;

const Industry = styled.p`
  margin-top: 15px;
  font-size: 18px;
  color: #00ced1;
  font-weight: 500;
`;

const EmployerLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  margin: 30px;
  height: 200px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
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
  width: 160px;
  height: 160px;
  object-fit: cover;
  align-self: center;
`;

const CompanyLogos = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  align-self: center;
`;

export default Community;
