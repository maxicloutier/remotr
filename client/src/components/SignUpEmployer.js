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

  let readyToSubmit = false;

  const history = useHistory();

  const handleSubmitEmployer = (ev) => {
    ev.preventDefault();
    ev.stopPropagation(); // Do I need this one?

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
    </div>
  );
};

export default SignUpEmployer;
