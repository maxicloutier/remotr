import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const Jobs = () => {
  const [jobList, setJobList] = useState(null);

  let percentage;

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobList(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return (
    <Wrapper>
      <PageTitle>Remote Jobs</PageTitle>
      {jobList ? (
        <JobsContainer>
          {jobList.map((job) => {
            return (
              <StyledJob to={`/job/${job._id}`} key={job._id}>
                <LogoContainer>
                  {job.company_logo_url ? (
                    <Logo src={job.company_logo_url} alt="Company Logo" />
                  ) : (
                    <Logo src="/assets/employers/alt-logo.jpeg" alt="Logo" />
                  )}
                </LogoContainer>
                <TitleContainer>
                  <p>{job.company_name}</p>
                  <p>{job.title}</p>
                  <p>{job.candidate_required_location}</p>
                </TitleContainer>
                <DetailContainer>
                  <p>{job.category}</p>
                  <p>{job.salary}</p>
                  {job.exclusivity ? (
                    <p>{job.exclusivity}</p>
                  ) : (
                    <p>Job from Remotive.io</p>
                  )}
                </DetailContainer>
              </StyledJob>
            );
          })}
        </JobsContainer>
      ) : (
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
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
`;

const PageTitle = styled.h1`
  width: 100vw;
  text-align: center;
`;

const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  width: 100%;
`;

const StyledJob = styled(Link)`
  width: 80%;
  min-height: 100px;
  margin: 10px;
  padding: 10px;
  border: black solid 1px;
  border-radius: 10px;
  display: flex;
  text-decoration: none;
  justify-self: center;
`;

const Logo = styled.img`
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
`;

const LogoContainer = styled.div`
  width: 20%;
`;

const TitleContainer = styled.div`
  width: 50%;
`;

const DetailContainer = styled.div`
  width: 30%;
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

export default Jobs;
