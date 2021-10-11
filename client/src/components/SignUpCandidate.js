import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignUpCandidate = ({ usertype }) => {
  const initialStateCandidate = {
    _id: "",
    email: "",
    password: "",
    name: "",
    about: "",
    degree: "",
    degree_duration: "",
    employer: "",
    hobbies: "",
    languages: "",
    location: "",
    phone: "",
    position: "",
    pronouns: "",
    school: "",
    skills: "",
    timezone: "",
    title: "",
    looking: "",
    picture: "",
    instagram: "",
    linkedin: "",
    confirm_password: "",
  };

  const [candidateFormData, setCandidateFormData] = useState(
    initialStateCandidate
  );

  const { setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSubmitCandidate = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = {
      _id: candidateFormData._id,
      email: candidateFormData.email,
      password: candidateFormData.password,
      name: candidateFormData.name,
      about: candidateFormData.about,
      degree: candidateFormData.degree,
      degree_duration: candidateFormData.degree_duration,
      employer: candidateFormData.employer,
      hobbies: candidateFormData.hobbies,
      languages: candidateFormData.languages,
      location: candidateFormData.location,
      phone: candidateFormData.phone,
      position: candidateFormData.position,
      pronouns: candidateFormData.pronouns,
      school: candidateFormData.school,
      skills: candidateFormData.skills,
      timezone: candidateFormData.timezone,
      title: candidateFormData.title,
      looking: candidateFormData.looking,
      picture: candidateFormData.picture,
      instagram: candidateFormData.instagram,
      linkedin: candidateFormData.linkedin,
      usertype: usertype,
      confirm_password: candidateFormData.confirm_password,
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
      <Form onSubmit={handleSubmitCandidate}>
        <FormTitle>Candidate Form</FormTitle>

        <Label for="_id">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          name="_id"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              _id: ev.target.value,
            });
          }}
        />

        <Label for="email">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
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
            setCandidateFormData({
              ...candidateFormData,
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
            setCandidateFormData({
              ...candidateFormData,
              confirm_password: ev.target.value,
            });
          }}
        />

        <Label for="picture">Link to Your Profile Picture</Label>
        <Input
          type="url"
          placeholder="Add link here"
          name="picture"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              picture: ev.target.value,
            });
          }}
        />

        <Label for="name">Full Name</Label>
        <Input
          type="text"
          placeholder="Full name"
          name="name"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              name: ev.target.value,
            });
          }}
        />

        <Label for="pronouns">Pronouns</Label>
        <Select
          name="pronouns"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              pronouns: ev.target.value,
            });
          }}
        >
          <option value="" disabled selected>
            Optional
          </option>
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
          <option value="Ze/Hir">Ze/Hir</option>
          <option value="Ze/Zir">Ze/Zir</option>
          <option value="Xe/Xem">Xe/Xem</option>
          <option value="Other">Other</option>
          <option value="Prefer not to answer">Prefer not to answer</option>
        </Select>

        <Label for="location">Current Location</Label>
        <Input
          type="text"
          placeholder="Current location"
          name="location"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              location: ev.target.value,
            });
          }}
        />

        <Label for="timezone">Time Zone</Label>
        <Select
          name="timezone"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              timezone: ev.target.value,
            });
          }}
        >
          <option value="" disabled selected>
            Select your UTC
          </option>
          <option value="UTC -12 hours">UTC -12 hours</option>
          <option value="UTC -11 hours">UTC -11 hours</option>
          <option value="UTC -10 hours">UTC -10 hours</option>
          <option value="UTC -9 hours">UTC -9 hours</option>
          <option value="UTC -8 hours">UTC -8 hours</option>
          <option value="UTC -7 hours">UTC -7 hours</option>
          <option value="UTC -6 hours">UTC -6 hours</option>
          <option value="UTC -5 hours">UTC -5 hours</option>
          <option value="UTC -4 hours">UTC -4 hours</option>
          <option value="UTC -3 hours">UTC -3 hours</option>
          <option value="UTC -2 hours">UTC -2 hours</option>
          <option value="UTC -1 hours">UTC -1 hour</option>
          <option value="UTC +0 hours">UTC +0 hour</option>
          <option value="UTC +1 hours">UTC +1 hour</option>
          <option value="UTC +2 hours">UTC +2 hours</option>
          <option value="UTC +3 hours">UTC +3 hours</option>
          <option value="UTC +4 hours">UTC +4 hours</option>
          <option value="UTC +5 hours">UTC +5 hours</option>
          <option value="UTC +6 hours">UTC +6 hours</option>
          <option value="UTC +7 hours">UTC +7 hours</option>
          <option value="UTC +8 hours">UTC +8 hours</option>
          <option value="UTC +9 hours">UTC +9 hours</option>
          <option value="UTC +10 hours">UTC +10 hours</option>
          <option value="UTC +11 hours">UTC +11 hours</option>
          <option value="UTC +12 hours">UTC +12 hours</option>
        </Select>

        <Label for="phone">Phone Number</Label>
        <Input
          type="tel"
          placeholder="Phone number"
          name="phone"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              phone: ev.target.value,
            });
          }}
        />

        <Label for="languages">Languages</Label>
        <Input
          type="text"
          placeholder="What languages do you speak?"
          name="languages"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              languages: ev.target.value,
            });
          }}
        />

        <Label for="title">Profile Headline</Label>
        <Input
          type="text"
          placeholder="Profile headline"
          name="title"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              title: ev.target.value,
            });
          }}
        />

        <Label for="about">Tell Us About Yourself</Label>
        <TextArea
          placeholder="Who are you? Professionally and personally. Here is the place to introduce yourself in a unique way to employers!"
          name="about"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              about: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="skills">List Your Main Skills Here</Label>
        <Input
          type="text"
          placeholder="For example, Web Development, Social Media, Leadership..."
          name="skills"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              skills: ev.target.value,
            });
          }}
        />

        <Label for="looking">What Are You Looking For?</Label>
        <TextArea
          placeholder="What kind of opportunities are you looking for or interested in? What's important to you in a job?"
          name="looking"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              looking: ev.target.value,
            });
          }}
        ></TextArea>

        <Label for="position">Current Position</Label>
        <Input
          type="text"
          placeholder="If not applicable, write N/A"
          name="position"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              position: ev.target.value,
            });
          }}
        />

        <Label for="employer">Current Employer</Label>
        <Input
          type="text"
          placeholder="If not applicable, write N/A"
          name="employer"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              employer: ev.target.value,
            });
          }}
        />

        <Label for="degree">Most Relevant or Latest Degree/Training</Label>
        <Input
          type="text"
          placeholder="Degree/training"
          name="degree"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              degree: ev.target.value,
            });
          }}
        />

        <Label for="school">Educational Institution</Label>
        <Input
          type="text"
          placeholder="University, school, association, etc."
          name="school"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              school: ev.target.value,
            });
          }}
        />

        <Label for="degree_duration">Degree Duration</Label>
        <Input
          type="text"
          placeholder="Start and end of your degree"
          name="degree_duration"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              degree_duration: ev.target.value,
            });
          }}
        />

        <Label for="hobbies">Hobbies</Label>
        <Input
          type="text"
          placeholder="Life's not all about work! What do you enjoy to do for fun?"
          name="hobbies"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              hobbies: ev.target.value,
            });
          }}
        />

        <Label for="linkedin">Link Your LinkedIn Profile Here</Label>
        <Input
          type="url"
          placeholder="Optional, but recommended!"
          name="linkedin"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              linkedin: ev.target.value,
            });
          }}
        />

        <Label for="instagram">Link Your Instagram Profile Here</Label>
        <Input
          type="url"
          placeholder="Optional, but recommended!"
          name="instagram"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              instagram: ev.target.value,
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

export default SignUpCandidate;
