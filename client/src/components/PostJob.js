import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

import { useHistory } from "react-router-dom";

const PostJob = () => {
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      // bouncer pattern
      return;
    }
    const initialState = {
      company_name: currentUser.name,
      company_logo_url: currentUser.logo,
      title: "",
      category: "",
      candidate_required_location: "",
      description: "",
      salary: "",
      job_type: "",
      employerId: currentUser._id,
    };
    setFormData(initialState);
  }, [currentUser]);

  const { employerId } = formData || {};

  const history = useHistory();

  const handleSubmitJob = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = {
      company_name: currentUser.name,
      company_logo_url: currentUser.logo,
      title: formData.title,
      category: formData.category,
      candidate_required_location: formData.candidate_required_location,
      description: formData.description,
      salary: formData.salary,
      job_type: formData.job_type,
      employerId: currentUser._id,
    };

    fetch("/job", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert("Job successfully posted!");
          history.push(`/me/${employerId}`);
        } else {
          alert(`${data.error}`);
        }
      });
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
      <Form onSubmit={handleSubmitJob}>
        <TopContainer>
          <Logo src={currentUser.logo} alt="Company Logo" />
          <CompanyName>Post a New {currentUser.name} Job</CompanyName>
        </TopContainer>

        <Label for="title">Job Title</Label>
        <Input
          type="text"
          placeholder="Job Title"
          name="title"
          onChange={(ev) => {
            setFormData({
              ...formData,
              title: ev.target.value,
            });
          }}
        />

        <Label for="category">Category</Label>
        <Input
          type="text"
          placeholder="Category"
          name="category"
          onChange={(ev) => {
            setFormData({
              ...formData,
              category: ev.target.value,
            });
          }}
        />

        <Label for="candidate_required_location">
          Candidate Required Location
        </Label>
        <Input
          type="text"
          placeholder="Candidate Required Location"
          name="candidate_required_location"
          onChange={(ev) => {
            setFormData({
              ...formData,
              candidate_required_location: ev.target.value,
            });
          }}
        />

        <Label for="description">Detailed Job Description</Label>
        <TextArea
          placeholder="Include an introduction of the job and its context, and make sure to describe the responsibilities and qualifications needed. The job description must be at least 700 characters long, but shouldn't be too long either."
          name="description"
          onChange={(ev) => {
            setFormData({
              ...formData,
              description: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="salary">Salary</Label>
        <Input
          type="text"
          placeholder="Salary"
          name="salary"
          onChange={(ev) => {
            setFormData({
              ...formData,
              salary: ev.target.value,
            });
          }}
        />

        <Label for="job_type">Job Type</Label>
        <Select
          name="job_type"
          onChange={(ev) => {
            setFormData({
              ...formData,
              job_type: ev.target.value,
            });
          }}
        >
          <option value="" disabled selected>
            Select job type
          </option>
          <option value="Regular Full-Time">Regular Full-Time</option>
          <option value="Regular Part-Time">Regular Part-Time</option>
          <option value="Temporary Full-Time">Temporary Full-Time</option>
          <option value="Temporary Part-Time">Temporary Part-Time</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
          <option value="Consultant">Consultant</option>
          <option value="Occasional / On Call">Occasional/On Call</option>
          <option value="Seasonal">Seasonal</option>
          <option value="Independent Contractor">Independent Contractor</option>
          <option value="Other">Other</option>
        </Select>

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

const Form = styled.form`
  font-family: "Roboto", sans-serif;
  text-align: left;
  width: 70%;
  background: #fff;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 auto;
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

const Select = styled.select`
  height: 40px;
  font-size: 16px;
  padding: 6px;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: solid 1px;
`;

const TextArea = styled.textarea`
  height: 500px;
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
  width: 150px;
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
  width: 150px;
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

const TopContainer = styled.div`
  display: flex;
  justify-self: center;
`;

const Logo = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
`;

const CompanyName = styled.h1`
  font-family: "Poppins", sans-serif;
  color: #004ddb;
  font-weight: 600;
  font-size: 30px;
  align-self: center;
  margin-left: 10px;
`;

export default PostJob;
