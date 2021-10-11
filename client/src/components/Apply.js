import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const Apply = ({
  jobId,
  company_name,
  employerId,
  company_logo_url,
  title,
  candidate_required_location,
}) => {
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      // bouncer pattern
      return;
    }
    const initialState = {
      company_name: company_name,
      employerId: employerId,
      company_logo_url: company_logo_url,
      title: title,
      jobId: jobId,
      candidate_required_location: candidate_required_location,
      candidatePicture: currentUser.picture,
      name: currentUser.name,
      candidateId: currentUser._id,
      email: currentUser.email,
      phone: currentUser.phone,
      candidateLocation: currentUser.location,
      languages: currentUser.languages,
      profile: `/candidate/${currentUser._id}`,
      letter: "",
      resume: "",
    };
    setFormData(initialState);
  }, [currentUser]);

  const {
    name,
    candidateId,
    email,
    phone,
    candidateLocation,
    languages,
    profile,
  } = formData || {};

  const history = useHistory();

  const handleApply = () => {
    const data = {
      company_name: company_name,
      employerId: employerId,
      company_logo_url: company_logo_url,
      title: title,
      jobId: jobId,
      candidate_required_location: candidate_required_location,
      candidatePicture: currentUser.picture,
      name: currentUser.name,
      candidateId: currentUser._id,
      email: formData.email,
      phone: formData.phone,
      candidateLocation: formData.candidateLocation,
      languages: formData.languages,
      profile: `/candidate/${currentUser._id}`,
      letter: formData.letter,
      resume: formData.resume,
    };

    fetch(`/job/${jobId}/application`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert("Application successfully sent!");
          history.push(`/me/${candidateId}`);
        } else {
          alert(`${data.error}`);
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleApply}>
        <JobInfo>
          <>
            <CompanyLogo src={company_logo_url} alt="Company Logo" />
          </>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CompanyName>{company_name}</CompanyName>
            <JobTitle>{title}</JobTitle>
            <Location>{candidate_required_location}</Location>
          </div>
        </JobInfo>
        <Label for="name">Name</Label>
        <Input type="text" value={name} name="name" disabled />

        <Label for="candidateId">Username</Label>
        <Input type="text" value={candidateId} name="candidateId" disabled />

        <Label for="email">Email</Label>
        <Input
          type="email"
          value={email}
          name="email"
          onChange={(ev) => {
            setFormData({
              ...formData,
              email: ev.target.value,
            });
          }}
        />

        <Label for="phone">Phone Number</Label>
        <Input
          type="tel"
          value={phone}
          name="phone"
          onChange={(ev) => {
            setFormData({
              ...formData,
              phone: ev.target.value,
            });
          }}
        />

        <Label for="candidateLocation">Current Location</Label>
        <Input
          type="text"
          value={candidateLocation}
          name="candidateLocation"
          onChange={(ev) => {
            setFormData({
              ...formData,
              candidateLocation: ev.target.value,
            });
          }}
        />

        <Label for="languages">Languages</Label>
        <Input
          type="text"
          value={languages}
          name="languages"
          onChange={(ev) => {
            setFormData({
              ...formData,
              languages: ev.target.value,
            });
          }}
        />

        <Label for="profile">Link to Your Profile</Label>
        <Input type="url" value={profile} name="profile" disabled />

        <Label for="letter">Application Message</Label>
        <TextArea
          placeholder="Introduce yourself and explain your motivation for this job to the employer. Must be at least 50 characters long."
          name="letter"
          onChange={(ev) => {
            setFormData({
              ...formData,
              letter: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="resume">Link to Your Resume</Label>
        <Input
          type="url"
          placeholder="This can be a Google Drive or LinkedIn link, etc."
          name="resume"
          onChange={(ev) => {
            setFormData({
              ...formData,
              resume: ev.target.value,
            });
          }}
        />
        <ButtonContainer>
          <div>
            <ClearButton type="reset">Clear</ClearButton>
          </div>
          <div>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CompanyLogo = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  margin-right: 20px;
`;

const JobInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const CompanyName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.5;
`;

const JobTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.5;
  color: #00ced1;
`;

const Location = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
`;

const Form = styled.form`
  font-family: "Roboto", sans-serif;
  text-align: left;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Label = styled.label`
  margin-top: 15px;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Input = styled.input`
  height: 40px;
  font-size: 16px;
  padding: 6px;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: solid 1px;
`;

const TextArea = styled.textarea`
  height: 120px;
  font-size: 16px;
  padding: 6px;
  font-family: "Roboto", sans-serif;
  resize: none;
  border-radius: 5px;
  border: solid 1px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 51%;
  margin: 0 auto;
  justify-content: space-evenly;
`;

const ClearButton = styled.button`
  padding: 8px 22px;
  width: 175px;
  font-weight: 600;
  color: #00ced1;
  display: inline-block;
  border-radius: 10px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  border: solid 3px #00ced1;
`;

const SubmitButton = styled.button`
  padding: 11px 25px;
  width: 175px;
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
  border: none;

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

export default Apply;
