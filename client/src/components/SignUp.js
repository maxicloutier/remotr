import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignUp = () => {
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
    usertype: "",
    confirm_password: "",
  };

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
    usertype: "",
    confirm_password: "",
  };

  const [candidateFormData, setCandidateFormData] = useState(
    initialStateCandidate
  );
  const [employerFormData, setEmployerFormData] =
    useState(initialStateEmployer);

  const [usertype, setUserType] = useState(null);

  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSubmitCandidate = () => {
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

    let readyToSubmit = false;

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
          alert(
            "Something went wrong. Please try again with a different username and/or email."
          );
        }
      });
  };

  return null;
};

export default SignUp;
