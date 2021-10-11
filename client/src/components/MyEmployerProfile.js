import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const MyEmployerProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);
  const [jobs, setJobs] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`/me/${currentUser._id}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
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
              <Picture src={currentUser.logo} alt="User profile picture" />
            </div>

            <EmployerName>{currentUser.name}</EmployerName>

            <TextBody>{currentUser.industry}</TextBody>

            <Slogan>{currentUser.slogan}</Slogan>

            <Details>
              <TextBody style={{ fontWeight: "bold" }}>
                {currentUser.location}
              </TextBody>

              <TextBody>Type: {currentUser.type}</TextBody>

              <TextBody>Founded: {currentUser.founded}</TextBody>

              <TextBody>Number of Employees: {currentUser.employees}</TextBody>

              <Website href={currentUser.website} target="_blank">
                Website
              </Website>
            </Details>

            <div>
              <ContactTitle>Account Information</ContactTitle>
              <TextBody>Username: {currentUser._id}</TextBody>
              <TextBody>Email: {currentUser.email}</TextBody>
            </div>

            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </SideBar>

          <EmployerDetails>
            <div>
              <ContentTitles>About {currentUser.name} </ContentTitles>
              <TextBody>{currentUser.about}</TextBody>
            </div>

            <div>
              <ContentTitles>Specialties</ContentTitles>
              <TextBody>{currentUser.specialties}</TextBody>
            </div>

            <div>
              <ContentTitles>Employee Benefits</ContentTitles>
              <TextBody>{currentUser.benefits}</TextBody>
            </div>
          </EmployerDetails>
        </ProfileContainer>

        <div>
          <ContentTitles>My Jobs Posted on Remotr</ContentTitles>
          <div>
            {jobs ? (
              jobs.map((job) => {
                return (
                  <JobContainer>
                    <JobsLinks to={`/jobdashboard/${job._id}`} key={job._id}>
                      <JobTitle>{job.title}</JobTitle>
                      <p>{job.candidate_required_location}</p>
                      <p>Posted {job.publication_date}</p>
                    </JobsLinks>
                  </JobContainer>
                );
              })
            ) : (
              <p>You haven't posted any jobs on Remotr yet.</p>
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

const Slogan = styled.p`
  color: #00ced1;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  margin-top: 20px;
`;

const EmployerName = styled.p`
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

const EmployerDetails = styled.div`
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
  object-fit: contain;
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

const Website = styled.a`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: #00ced1;
`;

const SignOutButton = styled.button`
  padding: 12px 20px;
  width: 175px;
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

const JobContainer = styled.div`
  border-top: solid 2px #00ced1;
  margin: 20px 0 20px 0;
  padding-top: 10px;
`;

const JobsLinks = styled(Link)`
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: black;
`;

const JobTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
`;

const ContactTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #004ddb;
  line-height: 1.5;
  margin-top: 20px;
`;

export default MyEmployerProfile;
