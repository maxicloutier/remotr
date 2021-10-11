import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const PublicCandidateProfile = () => {
  const [candidate, setCandidate] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/candidate/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!candidate) {
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
        <ProfileContainer>
          <SideBar>
            <div>
              <Picture src={candidate.picture} alt="User profile picture" />
            </div>

            <CandidateName>
              {candidate.name} <span>{candidate.pronouns}</span>
            </CandidateName>
            <ProfileTitle>{candidate.title}</ProfileTitle>
            <TextBody style={{ fontSize: "14px" }}>
              Member Since {candidate.member_since}
            </TextBody>

            <Details>
              <TextBody style={{ fontWeight: "bold" }}>
                {candidate.location}
              </TextBody>

              <TextBody>{candidate.timezone}</TextBody>
              <TextBody>Languages: {candidate.languages}</TextBody>
              <TextBody>Username: {candidate._id}</TextBody>
            </Details>
            <div>
              <ContactTitle>Contact Information</ContactTitle>
              <TextBody>{candidate.email}</TextBody>
              <TextBody>{candidate.phone}</TextBody>
            </div>
          </SideBar>
          <CandidateDetails>
            <div>
              <ContentTitles>About Me</ContentTitles>
              <TextBody>{candidate.about}</TextBody>
            </div>

            <div>
              <ContentTitles>My Skills</ContentTitles>
              <TextBody>{candidate.skills}</TextBody>
            </div>

            <div>
              <ContentTitles>Current Employment</ContentTitles>
              <TextBody>
                {candidate.position} @ {candidate.employer}
              </TextBody>
            </div>

            <div>
              <ContentTitles>
                Most Relevant or Latest Degree/Training
              </ContentTitles>
              <TextBody>{candidate.degree}</TextBody>
              <TextBody>{candidate.school}</TextBody>
              <TextBody>{candidate.degree_duration}</TextBody>
            </div>

            <div>
              <ContentTitles>What I’m Looking For</ContentTitles>
              <TextBody>{candidate.looking}</TextBody>
            </div>

            <div>
              <ContentTitles>Social</ContentTitles>

              <a href={candidate.linkedin} target="_blank">
                <SocialLogo
                  src="/assets/social/linkedin-logo.png"
                  alt="LinkedIn logo"
                />
              </a>

              <a href={candidate.instagram} target="_blank">
                <SocialLogo
                  src="/assets/social/instagram-logo.jpeg"
                  alt="Instagram logo"
                />
              </a>
            </div>

            <div>
              <ContentTitles>My Hobbies</ContentTitles>
              <TextBody>{candidate.hobbies}</TextBody>
            </div>
          </CandidateDetails>
        </ProfileContainer>
      </SecondWrapper>
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

const ProfileTitle = styled.p`
  color: #00ced1;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  margin-top: 20px;
`;

const CandidateName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #004ddb;
  line-height: 1;
  margin-top: 15px;

  span {
    color: black;
    font-size: 14px;
  }
`;

const Details = styled.div`
  margin: 20px 0 20px 0;
`;

const ContentTitles = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #004ddb;
  line-height: 1;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const TextBody = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
`;

const CandidateDetails = styled.div`
  padding: 0 20px 20px 30px;
  height: auto;
  margin-top: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const Picture = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;

const SocialLogo = styled.img`
  width: 100px;
  margin: 5px 10px 0px 5px;
`;

const ContactTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #004ddb;
  line-height: 1.5;
  margin-top: 20px;
`;

const SideBar = styled.div`
  width: 500px;
  padding: 20px;
  height: auto;
  background: white;
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  margin-top: 20px;
`;

export default PublicCandidateProfile;
