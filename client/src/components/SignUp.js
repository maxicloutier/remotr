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

    if (candidateFormData._id.length < 4) {
      alert("Your username must be at least 4 characters long.");
    }

    if (
      !candidateFormData.email.includes("@") ||
      !candidateFormData.email.includes(".")
    ) {
      alert("Please enter a valid email address.");
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (
      !candidateFormData.password.match(strongPassword) ||
      !candidateFormData.confirm_password.match(strongPassword)
    ) {
      alert(
        "Please make sure your password contains at least 8 characters including letters and numbers."
      );
    }

    if (candidateFormData.password !== candidateFormData.confirm_password) {
      alert("Please make sure your password match.");
    }

    let readyToSubmit = false;

    if (
      candidateFormData._id !== "" &&
      candidateFormData.email !== "" &&
      candidateFormData.password !== "" &&
      candidateFormData.name !== "" &&
      candidateFormData.about !== "" &&
      candidateFormData.degree !== "" &&
      candidateFormData.degree_duration !== "" &&
      candidateFormData.employer !== "" &&
      candidateFormData.hobbies !== "" &&
      candidateFormData.languages !== "" &&
      candidateFormData.location !== "" &&
      candidateFormData.phone !== "" &&
      candidateFormData.position !== "" &&
      candidateFormData.school !== "" &&
      candidateFormData.skills !== "" &&
      candidateFormData.timezone !== "" &&
      candidateFormData.title !== "" &&
      candidateFormData.looking !== "" &&
      candidateFormData.picture !== "" &&
      usertype !== "" &&
      candidateFormData.confirm_password !== ""
    ) {
      readyToSubmit = true;
    } else {
      alert("Please make sure that all required fields are filled in.");
    }

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

  const handleSubmitEmployer = () => {
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

    if (employerFormData._id.length < 4) {
      alert("Your username must be at least 4 characters long.");
    }

    if (
      !employerFormData.email.includes("@") ||
      !employerFormData.email.includes(".")
    ) {
      alert("Please enter a valid email address.");
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (
      !employerFormData.password.match(strongPassword) ||
      !employerFormData.confirm_password.match(strongPassword)
    ) {
      alert(
        "Please make sure your password contains at least 8 characters including letters and numbers."
      );
    }

    if (employerFormData.password !== employerFormData.confirm_password) {
      alert("Please make sure your password match.");
    }

    let readyToSubmit = false;

    if (
      employerFormData._id !== "" &&
      employerFormData.name !== "" &&
      employerFormData.slogan !== "" &&
      employerFormData.industry !== "" &&
      employerFormData.location !== "" &&
      employerFormData.employees !== "" &&
      employerFormData.about !== "" &&
      employerFormData.website !== "" &&
      employerFormData.type !== "" &&
      employerFormData.founded !== "" &&
      employerFormData.specialties !== "" &&
      employerFormData.logo !== "" &&
      employerFormData.benefits !== "" &&
      employerFormData.email !== "" &&
      employerFormData.password !== "" &&
      usertype !== "" &&
      employerFormData.confirm_password !== ""
    ) {
      readyToSubmit = true;
    } else {
      alert("Please make sure that all required fields are filled in.");
    }

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

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Complete this form to sign up for Remotr!</p>
      <p>Select a user type</p>
      <button onClick={setUserType("candidate")}>I am a Candidate</button>
      <button onClick={setUserType("employer")}>I am an Employer</button>
      <div>
        {usertype === "candidate" && (
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
              <button type="reset">Clear</button>
              {readyToSubmit ? (
                <button type="submit">Submit</button>
              ) : (
                <button type="submit" disabled>
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
        {usertype === "employer" && (
          <form onSubmit={handleSubmitEmployer}>
            <label for="_id">Username</label>
            <input
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

            <label for="name">Company Name</label>
            <input
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

            <label for="logo">Link to Your Company Logo</label>
            <input
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

            <label for="website">Company Website</label>
            <input
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

            <label for="email">Email</label>
            <input
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

            <label for="password">Password</label>
            <input
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

            <label for="confirm_password">Confirm Password</label>
            <input
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

            <label for="slogan">Company Slogan or Profile Headline</label>
            <input
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

            <label for="about">About Your Company</label>
            <textarea
              placeholder="Introduce your company to potential candidates. What is your mission, your vision, your goals, your remote philosophy? Why are you a great employer?"
              name="about"
              onChange={(ev) => {
                setEmployerFormData({
                  ...employerFormData,
                  about: ev.target.value,
                });
              }}
            ></textarea>

            <label for="industry">Industry</label>
            <input
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

            <label for="employees">Number of Employees</label>
            <input
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

            <label for="location">Location</label>
            <input
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

            <label for="founded">When Was Your Company Founded?</label>
            <input
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

            <label for="type">Company Type</label>
            <select
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
            </select>

            <label for="specialties">Specialties</label>
            <textarea
              placeholder="List your company's specialties"
              name="specialties"
              onChange={(ev) => {
                setEmployerFormData({
                  ...employerFormData,
                  specialties: ev.target.value,
                });
              }}
            ></textarea>

            <label for="benefits">
              List a Few of Your Employee Benefits and Perks
            </label>
            <input
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
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
