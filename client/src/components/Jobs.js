import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const Jobs = () => {
  const { allJobs } = useContext(Context);
  const [userSearch, setUserSearch] = useState("");

  if (!allJobs) {
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

  let filteredJobs = allJobs;

  if (userSearch.length > 1) {
    filteredJobs = allJobs.filter((job) => {
      return job.title.toLowerCase().includes(userSearch.toLowerCase());
    });
  }

  return (
    <Wrapper>
      <PageTitle>Remote Jobs</PageTitle>

      <SearchContainer>
        <InputField
          type="text"
          placeholder="Search by job title 🧑🏽‍💻🌎"
          onFocus={(ev) => (ev.target.placeholder = "")}
          onBlur={(ev) =>
            (ev.target.placeholder = "Search by job title🧑🏽‍💻🌎")
          }
          value={userSearch}
          onChange={(ev) => setUserSearch(ev.target.value)}
        />
      </SearchContainer>
      <JobsContainer>
        {filteredJobs.map((job) => {
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
                <Company>{job.company_name.toUpperCase()}</Company>
                <JobTitle>{job.title}</JobTitle>
                <JobLocation>📍{job.candidate_required_location}</JobLocation>
              </TitleContainer>
              <DetailContainer>
                <JobCategory>{job.category}</JobCategory>
                {job.salary && <JobSalary>{job.salary}</JobSalary>}
                {job.exclusivity ? (
                  <Via>{job.exclusivity}</Via>
                ) : (
                  <Via>Job from Remotive.io</Via>
                )}
              </DetailContainer>
            </StyledJob>
          );
        })}
      </JobsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  width: 100vw;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #004ddb;
`;

const SearchContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  border: #989898 1px solid;
  width: 30%;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
  font-family: "Poppins";
`;

const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  width: 100%;
`;

const StyledJob = styled(Link)`
  width: 90%;
  min-height: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  text-decoration: none;
  color: #100c08;
  justify-self: center;
  position: relative;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const LogoContainer = styled.div`
  width: 100px;
  align-self: center;
  margin-right: 5px;
`;

const Logo = styled.img`
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  margin: 5px;
`;

const TitleContainer = styled.div`
  width: 60%;
  align-self: center;
  margin: 10px 5px;
`;

const Company = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 17px;
  color: #004ddb;
  line-height: 1;
`;

const JobTitle = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 1;
`;

const JobLocation = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1;
`;

const DetailContainer = styled.div`
  min-width: 40%;
  margin: 10px 5px;
  align-self: center;
`;

const JobCategory = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #00ced1;
  margin-bottom: 15px;
  line-height: 1;
`;

const JobSalary = styled.p`
  font-family: "Roboto", sans-serif;
  line-height: 1;
  font-weight: 500;
  font-size: 18px;
`;

const Via = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin-top: 15px;
  line-height: 1;
  font-size: 16px;
`;

const ProgressBarContainer = styled.div`
  max-width: 200px;
  margin: 5px;
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
