import React, { useContext, useState } from "react";
import styled from "styled-components";
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
    ev.stopPropagation(); // Do I need this one?

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
    <div>
      <form onSubmit={handleSubmitCandidate}>
        <label for="_id">Username</label>
        <input
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

        <label for="email">Email</label>
        <input
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

        <label for="password">Password</label>
        <input
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

        <label for="confirm_password">Confirm Password</label>
        <input
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

        <label for="picture">Link to Your Profile Picture</label>
        <input
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

        <label for="name">Full Name</label>
        <input
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

        <label for="pronouns">Pronouns</label>
        <select
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
        </select>

        <label for="location">Current Location</label>
        <input
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

        <label for="timezone">Time Zone</label>
        <select
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
        </select>

        <label for="phone">Phone Number</label>
        <input
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

        <label for="languages">Languages</label>
        <input
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

        <label for="title">Profile Headline</label>
        <input
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

        <label for="about">Tell Us About Yourself</label>
        <textarea
          placeholder="Who are you? Professionally and personally. Here is the place to introduce yourself in a unique way to employers!"
          name="about"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              about: ev.target.value,
            });
          }}
        ></textarea>

        <label for="skills">List Your Main Skills Here</label>
        <input
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

        <label for="looking">What Are You Looking For?</label>
        <textarea
          placeholder="What kind of opportunities are you looking for or interested in? What's important to you in a job?"
          name="looking"
          onChange={(ev) => {
            setCandidateFormData({
              ...candidateFormData,
              looking: ev.target.value,
            });
          }}
        ></textarea>

        <label for="position">Current Position</label>
        <input
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

        <label for="employer">Current Employer</label>
        <input
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

        <label for="degree">Most Relevant or Latest Degree/Training</label>
        <input
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

        <label for="school">Educational Institution</label>
        <input
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

        <label for="degree_duration">Degree Duration</label>
        <input
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

        <label for="hobbies">Hobbies</label>
        <input
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

        <label for="linkedin">Link Your LinkedIn Profile Here</label>
        <input
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

        <label for="instagram">Link Your Instagram Profile Here</label>
        <input
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

        <div>
          <div>
            <button type="reset">Clear</button>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitCandidate}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpCandidate;
