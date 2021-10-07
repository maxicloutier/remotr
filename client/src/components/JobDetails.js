import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Context";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";
import Apply from "./Apply";

const JobDetails = () => {
  const { currentUser } = useContext(Context);

  const [jobDescription, setJobDescription] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/job/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobDescription(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  const handleSaveApplication = () => {
    const data = {
      company_name: jobDescription.company_name,
      company_logo_url: jobDescription.company_logo_url,
      title: jobDescription.title,
      jobId: jobDescription._id,
      candidate_required_location: jobDescription.candidate_required_location,
      candidatePicture: currentUser.picture,
      name: currentUser.name,
      candidateId: currentUser._id,
      email: currentUser.email,
      phone: currentUser.phone,
      candidateLocation: currentUser.location,
      languages: currentUser.languages,
      profile: `/candidate/${currentUser._id}`,
    };

    fetch(`/job/${jobDescription._id}/externalApplication`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert("Application successfully saved on your profile!");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  if (!jobDescription) {
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
      <SecondWrapper>
        <DescriptionHeader>
          <LogoContainer>
            {jobDescription.company_logo_url ? (
              <CompanyLogo
                src={jobDescription.company_logo_url}
                alt="Company Logo"
              />
            ) : (
              <CompanyLogo src="/assets/employers/alt-logo.jpeg" alt="Logo" />
            )}
          </LogoContainer>
          <JobSummary>
            <Company>{jobDescription.company_name}</Company>
            <JobColumns>
              <Position>
                <ContentTitles>Position</ContentTitles>
                <JobInfo>{jobDescription.title}</JobInfo>

                <ContentTitles>Category</ContentTitles>
                <JobInfo>{jobDescription.category}</JobInfo>

                <ContentTitles>Candidate Required Location</ContentTitles>
                <JobInfo>{jobDescription.candidate_required_location}</JobInfo>
              </Position>
              <Details>
                <ContentTitles>Approximate Salary</ContentTitles>
                <JobInfo>{jobDescription.salary}</JobInfo>

                <ContentTitles>Job Type</ContentTitles>
                <JobInfo>{jobDescription.job_type}</JobInfo>

                <ContentTitles>Publication Date</ContentTitles>
                <JobInfo>{jobDescription.publication_date}</JobInfo>

                {jobDescription.exclusivity ? (
                  <JobInfo>{jobDescription.exclusivity}</JobInfo>
                ) : (
                  <JobInfo style={{ marginTop: "30px", marginBottom: 0 }}>
                    Job from Remotive.io
                  </JobInfo>
                )}
              </Details>
            </JobColumns>
          </JobSummary>
        </DescriptionHeader>

        <SubTitles>Job Description</SubTitles>
        <JobDescription
          dangerouslySetInnerHTML={{
            __html: jobDescription.description,
          }}
        ></JobDescription>

        <SubTitles>Apply</SubTitles>
        <ApplyContainer>
          {currentUser ? (
            <div>
              {jobDescription.exclusivity ? (
                <div>
                  <button>
                    <Apply
                      jobId={jobDescription._id}
                      company_name={jobDescription.company_name}
                      employerId={jobDescription.employerId}
                      company_logo_url={jobDescription.company_logo_url}
                      title={jobDescription.title}
                      candidate_required_location={
                        jobDescription.candidate_required_location
                      }
                    />
                  </button>
                </div>
              ) : (
                <ButtonContainer>
                  <ApplyButtons>
                    <ExternalLink href={jobDescription.url} target="_blank">
                      Apply Externally
                    </ExternalLink>
                  </ApplyButtons>
                  <ApplyButtons>
                    <SaveJobButton onClick={handleSaveApplication}>
                      Save to the List of Jobs I’ve Applied for on My Profile
                    </SaveJobButton>
                  </ApplyButtons>
                </ButtonContainer>
              )}
            </div>
          ) : (
            <div>
              <div>
                <ExternalLink href={jobDescription.url} target="_blank">
                  Apply Externally
                </ExternalLink>
              </div>
              <Warning>
                You must be a candidate member and be signed in to apply for a
                job on Remotr or to save a Remotive job to your profile. Sign in
                (or up!) now! ⬆️
              </Warning>
            </div>
          )}
        </ApplyContainer>
      </SecondWrapper>
    </Wrapper>
  );
};

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

const Wrapper = styled.div`
  width: 100vw;
  margin: 0;
  height: auto;
  position: relative;
`;

const SecondWrapper = styled.div`
  width: 80%;
  margin: 0;
  text-align: left;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const DescriptionHeader = styled.div`
  display: flex;
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  width: 100%;
`;

const LogoContainer = styled.div`
  align-self: center;
  margin: 20px;
`;

const CompanyLogo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const Company = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 35px;
  width: 100%;
  margin-left: 30px;
`;

const JobSummary = styled.div`
  align-self: center;
`;

const JobColumns = styled.div`
  display: flex;
`;

const Position = styled.div`
  margin: 20px 30px;
`;

const Details = styled.div`
  margin: 20px 30px;
`;

const ContentTitles = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #004ddb;
  line-height: 1.3;
`;

const JobInfo = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  margin-bottom: 15px;
`;

const SubTitles = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #004ddb;
  line-height: 1.3;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const JobDescription = styled.div`
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  width: 100%;
  padding: 20px;
`;

const ApplyContainer = styled.div`
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  width: 100%;
  padding: 20px;
`;

const Warning = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const ExternalLink = styled.a`
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  display: inline-block;
  border-radius: 10px;
  text-transform: uppercase;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;


  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00ced1;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #004ddb;

    transition: all 0.3s;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
`;

const SaveJobButton = styled.button`
  padding: 12px 20px;
  width: 525px;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  display: inline-block;
  border-radius: 10px;
  text-transform: uppercase;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00ced1;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #004ddb;

    transition: all 0.3s;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ApplyButtons = styled.div`
  margin: 10px;
`;

export default JobDetails;
