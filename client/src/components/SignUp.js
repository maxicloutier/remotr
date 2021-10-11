import React, { useState } from "react";
import styled from "styled-components";
import SignUpCandidate from "./SignUpCandidate";
import SignUpEmployer from "./SignUpEmployer";

const SignUp = () => {
  const [usertype, setUserType] = useState(null);

  return (
    <Wrapper>
      <SignUpHead>
        <PageTitle>Sign Up</PageTitle>
        <Paragraph>Complete this form to sign up for Remotr!</Paragraph>
        <Paragraph style={{ marginTop: "30px" }}>Select a user type</Paragraph>
        <ButtonContainer>
          <CandidateButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setUserType("candidate");
            }}
          >
            I am a Candidate
          </CandidateButton>
          <EmployerButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setUserType("employer");
            }}
          >
            I am an Employer
          </EmployerButton>
        </ButtonContainer>
      </SignUpHead>
      <div>
        {usertype === "candidate" && <SignUpCandidate usertype={usertype} />}
        {usertype === "employer" && <SignUpEmployer usertype={usertype} />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  width: 100vw;
`;

const SignUpHead = styled.div``;

const PageTitle = styled.h1`
  width: 100vw;
  text-align: center;
  margin-bottom: 20px;
  color: #004ddb;
`;

const Paragraph = styled.div`
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 51%;
  margin: 0 auto;
  justify-content: space-between;
`;

const CandidateButton = styled.button`
  padding: 15px 20px;
  width: 48%;
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
  font-size: 18px;
  margin-top: 20px;
  border: solid 3px white;

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

  &:focus {
    border: solid 3px #004ddb;
  }
`;

const EmployerButton = styled.button`
  padding: 15px 20px;
  width: 48%;
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
  font-size: 18px;
  margin-top: 20px;
  border: solid 3px white;

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

  &:focus {
    border: solid 3px #004ddb;
  }
`;

export default SignUp;
