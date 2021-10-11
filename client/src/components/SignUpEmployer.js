import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignUpEmployer = ({ usertype }) => {
  const initialStateEmployer = {
    _id: "",
    name: "",
    slogan: "",
    industry: "",
    location: "",
    employees: "",
    about: "",
    website: "",
    type: "",
    founded: "",
    specialties: "",
    logo: "",
    benefits: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [employerFormData, setEmployerFormData] =
    useState(initialStateEmployer);

  const { setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSubmitEmployer = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = {
      _id: employerFormData._id,
      name: employerFormData.name,
      slogan: employerFormData.slogan,
      industry: employerFormData.industry,
      location: employerFormData.location,
      employees: employerFormData.employees,
      about: employerFormData.about,
      website: employerFormData.website,
      type: employerFormData.type,
      founded: employerFormData.founded,
      specialties: employerFormData.specialties,
      logo: employerFormData.logo,
      benefits: employerFormData.benefits,
      email: employerFormData.email,
      password: employerFormData.password,
      usertype: usertype,
      confirm_password: employerFormData.confirm_password,
    };

    fetch("/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setCurrentUser(data.data);
          history.push("/");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmitEmployer}>
        <FormTitle>Employer Form</FormTitle>

        <Label for="_id">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          name="_id"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              _id: ev.target.value,
            });
          }}
        />

        <Label for="name">Company Name</Label>
        <Input
          type="text"
          placeholder="Company name"
          name="name"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              name: ev.target.value,
            });
          }}
        />

        <Label for="logo">Link to Your Company Logo</Label>
        <Input
          type="url"
          placeholder="Add link here"
          name="logo"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              logo: ev.target.value,
            });
          }}
        />

        <Label for="website">Company Website</Label>
        <Input
          type="url"
          placeholder="Add link here"
          name="website"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              website: ev.target.value,
            });
          }}
        />

        <Label for="email">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              email: ev.target.value,
            });
          }}
        />

        <Label for="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              password: ev.target.value,
            });
          }}
        />

        <Label for="confirm_password">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm password"
          name="confirm_password"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              confirm_password: ev.target.value,
            });
          }}
        />

        <Label for="slogan">Company Slogan or Profile Headline</Label>
        <Input
          type="text"
          placeholder="Slogan/headline"
          name="slogan"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              slogan: ev.target.value,
            });
          }}
        />

        <Label for="about">About Your Company</Label>
        <TextArea
          placeholder="Introduce your company to potential candidates. What is your mission, your vision, your goals, your remote philosophy? Why are you a great employer?"
          name="about"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              about: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="industry">Industry</Label>
        <Input
          type="text"
          placeholder="Industry"
          name="industry"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              industry: ev.target.value,
            });
          }}
        />

        <Label for="employees">Number of Employees</Label>
        <Input
          type="text"
          placeholder="This can be an approximate number"
          name="employees"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              employees: ev.target.value,
            });
          }}
        />

        <Label for="location">Location</Label>
        <Input
          type="text"
          placeholder="Headquarters, main locations, etc."
          name="location"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              location: ev.target.value,
            });
          }}
        />

        <Label for="founded">When Was Your Company Founded?</Label>
        <Input
          type="text"
          placeholder="Year of foundation"
          name="founded"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              founded: ev.target.value,
            });
          }}
        />

        <Label for="type">Company Type</Label>
        <Select
          name="type"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              type: ev.target.value,
            });
          }}
        >
          <option value="" disabled selected>
            Select type
          </option>
          <option value="Public Company">Public Company</option>
          <option value="Private Company">Private Company</option>
          <option value="Partnership">Partnership</option>
          <option value="Limited Liability Company">
            Limited Liability Company
          </option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="Cooperative">Cooperative</option>
          <option value="Other">Other</option>
        </Select>

        <Label for="specialties">Specialties</Label>
        <TextArea
          placeholder="List your company's specialties"
          name="specialties"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              specialties: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="benefits">
          List a Few of Your Employee Benefits and Perks
        </Label>
        <Input
          type="text"
          placeholder="Benefits and perks"
          name="benefits"
          onChange={(ev) => {
            setEmployerFormData({
              ...employerFormData,
              benefits: ev.target.value,
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
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  font-family: "Roboto", sans-serif;
  text-align: left;
  width: 51%;
  background: #fff;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 auto;
`;

const FormTitle = styled.p`
  font-family: "Poppins", sans-serif;
  color: #004ddb;
  font-weight: 600;
  font-size: 20px;
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
  width: 125px;
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
  width: 125px;
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

export default SignUpEmployer;
