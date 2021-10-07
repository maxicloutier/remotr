import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const MyCandidateProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);
  const [jobApplications, setJobApplications] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`/me/${currentUser._id}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setJobApplications(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
    currentUser = null;
    history.push("/");
  };

  if (!currentUser) {
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
              <Picture src={currentUser.picture} alt="User profile picture" />
            </div>

            <CandidateName>
              {currentUser.name} <span>{currentUser.pronouns}</span>
            </CandidateName>
            <ProfileTitle>{currentUser.title}</ProfileTitle>
            <TextBody style={{ fontSize: "14px" }}>
              Member Since {currentUser.member_since}
            </TextBody>

            <Details>
              <TextBody style={{ fontWeight: "bold" }}>
                {currentUser.location}
              </TextBody>

              <TextBody>{currentUser.timezone}</TextBody>
              <TextBody>Languages: {currentUser.languages}</TextBody>
              <TextBody>Username: {currentUser._id}</TextBody>
            </Details>
            <div>
              <ContactTitle>Contact Information</ContactTitle>
              <TextBody>{currentUser.email}</TextBody>
              <TextBody>{currentUser.phone}</TextBody>
            </div>

            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </SideBar>
          <CandidateDetails>
            <div>
              <ContentTitles>About Me</ContentTitles>
              <TextBody>{currentUser.about}</TextBody>
            </div>

            <div>
              <ContentTitles>My Skills</ContentTitles>
              <TextBody>{currentUser.skills}</TextBody>
            </div>

            <div>
              <ContentTitles>Current Employment</ContentTitles>
              <TextBody>
                {currentUser.position} @ {currentUser.employer}
              </TextBody>
            </div>

            <div>
              <ContentTitles>
                Most Relevant or Latest Degree/Training
              </ContentTitles>
              <TextBody>{currentUser.degree}</TextBody>
              <TextBody>{currentUser.school}</TextBody>
              <TextBody>{currentUser.degree_duration}</TextBody>
            </div>

            <div>
              <ContentTitles>What I’m Looking For</ContentTitles>
              <TextBody>{currentUser.looking}</TextBody>
            </div>

            <div>
              <ContentTitles>Social</ContentTitles>

              <a href={currentUser.linkedin} target="_blank">
                <SocialLogo
                  src="/assets/social/linkedin-logo.png"
                  alt="LinkedIn logo"
                />
              </a>

              <a href={currentUser.instagram} target="_blank">
                <SocialLogo
                  src="/assets/social/instagram-logo.jpeg"
                  alt="Instagram logo"
                />
              </a>
            </div>

            <div>
              <ContentTitles>My Hobbies</ContentTitles>
              <TextBody>{currentUser.hobbies}</TextBody>
            </div>
          </CandidateDetails>
        </ProfileContainer>

        <div>
          <ContentTitles>My Job Applications on Remotr</ContentTitles>
          <div>
            {jobApplications ? (
              jobApplications.map((application) => {
                return (
                  <Link
                    to={`/application/${application._id}`}
                    key={application._id}
                  >
                    <img
                      src={application.company_logo_url}
                      alt="Company logo"
                    />
                    <p>{application.company_name}</p>
                    <p>{application.title}</p>
                    <p>{application.date}</p>
                  </Link>
                );
              })
            ) : (
              <TextBody>
                You haven't applied on any jobs on Remotr yet.
              </TextBody>
            )}
          </div>
        </div>
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
  font-weight: 500;
  font-size: 22px;
`;

const CandidateName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #004ddb;
  line-height: 1.3;
  margin-top: 15px;

  span {
    color: black;
    font-size: 14px;
  }
`;

const Details = styled.div`
  margin: 10px 0 10px 0;
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
  border: solid gainsboro 1px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  padding: 20px;
  padding: 20px;
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
  &:hover,
  &:active {
    @include transition(all 0.2s ease-in-out);
    text-decoration: none;
    background: darken(#8be5b1, 15%);
  }
`;
const SignOutButton = styled.button`
  padding: 12px 20px;
  width: fit-content;
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

export default MyCandidateProfile;
