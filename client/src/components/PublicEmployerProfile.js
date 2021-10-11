import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const PublicEmployerProfile = () => {
  const [employer, setEmployer] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/employer/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployer(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!employer) {
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
              <Picture src={employer.logo} alt="User profile picture" />
            </div>

            <EmployerName>{employer.name}</EmployerName>

            <TextBody>{employer.industry}</TextBody>

            <Slogan>{employer.slogan}</Slogan>

            <Details>
              <TextBody style={{ fontWeight: "bold" }}>
                {employer.location}
              </TextBody>

              <TextBody>Type: {employer.type}</TextBody>

              <TextBody>Founded: {employer.founded}</TextBody>

              <TextBody>Number of Employees: {employer.employees}</TextBody>

              <Website href={employer.website} target="_blank">
                Website
              </Website>
            </Details>
          </SideBar>

          <EmployerDetails>
            <div>
              <ContentTitles>About {employer.name} </ContentTitles>
              <TextBody>{employer.about}</TextBody>
            </div>

            <div>
              <ContentTitles>Specialties</ContentTitles>
              <TextBody>{employer.specialties}</TextBody>
            </div>

            <div>
              <ContentTitles>Employee Benefits</ContentTitles>
              <TextBody>{employer.benefits}</TextBody>
            </div>
          </EmployerDetails>
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

export default PublicEmployerProfile;
