import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const ViewApplication = () => {
  const [application, setApplication] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/application/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!application) {
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
      <JobInfo>
        <LogoContainer>
          <CompanyLogo src={application.company_logo_url} alt="Company Logo" />
        </LogoContainer>

        <CompanyInfoContainer>
          <CompanyName>{application.company_name}</CompanyName>
          <JobTitle>{application.title}</JobTitle>
          <TextBody>{application.candidate_required_location}</TextBody>
          <Links to={`/job/${application.jobId}`}>Job Details</Links>
        </CompanyInfoContainer>
      </JobInfo>

      <ApplicationDetails>
        <CandidateTopContainer>
          <CandidatePictureContainer>
            <CandidatePicture
              src={application.candidatePicture}
              alt="Candidate Picture"
            />
          </CandidatePictureContainer>

          <CandidateInfoContainer>
            <CandidateName>{application.name}</CandidateName>
            <TextBody>
              <b>Username:</b> {application.candidateId}
            </TextBody>
            <TextBody>
              <b>Email:</b> {application.email}
            </TextBody>
            <TextBody>
              <b>Phone:</b> {application.phone}
            </TextBody>
            <TextBody>
              <b>Current Location:</b> {application.candidateLocation}
            </TextBody>
            <TextBody>
              <b>Languages:</b> {application.languages}
            </TextBody>
            <Links to={application.profile}>Candidate Profile</Links>
          </CandidateInfoContainer>
        </CandidateTopContainer>

        <CandidateBottomContainer>
          <ContentTitles>Application Message</ContentTitles>
          <ApplicationTextBody>{application.letter}</ApplicationTextBody>
          <ApplicationTextBody>
            <b>Link to Resume: </b>
            <ResumeLink href={application.resume} target="_blank">
              {application.resume}
            </ResumeLink>
          </ApplicationTextBody>
          <ApplicationTextBody>Applied {application.date}</ApplicationTextBody>
        </CandidateBottomContainer>
      </ApplicationDetails>
    </Wrapper>
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

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const JobInfo = styled.div`
  display: flex;
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  width: 70%;
  padding: 1rem;
  margin: 20px auto;
`;

const LogoContainer = styled.div`
  margin: 10px;
`;

const CompanyInfoContainer = styled.div`
  margin: 10px;
  align-self: center;
`;

const CompanyName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #004ddb;
  line-height: 1.5;
`;

const JobTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.5;
  color: #00ced1;
`;

const Links = styled(Link)`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: #00ced1;
`;

const ResumeLink = styled.a`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: #00ced1;
`;

const ApplicationDetails = styled.div`
  display: flex;
  flex-direction: column;
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  width: 70%;
  padding: 1rem;
  margin: 20px auto;
`;

const CandidateTopContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const CandidateBottomContainer = styled.div`
  margin: 10px;
`;

const CandidatePictureContainer = styled.div`
  margin: 10px;
`;

const CandidateInfoContainer = styled.div`
  margin: 10px;
`;

const CompanyLogo = styled.img`
  width: 170px;
  height: 170px;
  object-fit: contain;
  align-self: center;
`;

const TextBody = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
`;

const ApplicationTextBody = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  margin: 15px 10px;
`;

const CandidatePicture = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const CandidateName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #004ddb;
  line-height: 1.5;
`;

const ContentTitles = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #004ddb;
  line-height: 1;
  margin: 10px;
`;

export default ViewApplication;
