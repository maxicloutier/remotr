import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

import { useHistory } from "react-router-dom";

const PostJob = () => {
  const { currentUser } = useContext(Context);

  // const initialState = {
  //   company_name: currentUser.name,
  //   company_logo_url: currentUser.logo,
  //   title: "",
  //   category: "",
  //   candidate_required_location: "",
  //   description: "",
  //   salary: "",
  //   job_type: "",
  //   employerId: currentUser._id,
  // };

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

  let readyToSubmit = false;

  const history = useHistory();

  const handleSubmitJob = (ev) => {
    ev.preventDefault();
    ev.stopPropagation(); // Do I need this one?

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

    if (formData.description.length < 700) {
      alert(
        "Please make sure that your job description is at least 700 characters long. Include context, about the job, responsibilities, qualifications, etc."
      );
    }

    if (
      formData.company_name !== "" &&
      formData.company_logo_url !== "" &&
      formData.title !== "" &&
      formData.category !== "" &&
      formData.candidate_required_location !== "" &&
      formData.description !== "" &&
      formData.job_type !== "" &&
      formData.employerId !== ""
    ) {
      readyToSubmit = true;
    } else {
      alert("Please make sure that all required fields are filled in.");
    }

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
          alert("Something went wrong.");
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
    <div>
      <form onSubmit={handleSubmitJob}>
        <img src={currentUser.logo} alt="Company Logo" />
        <p>{currentUser.name}</p>

        <label for="title">Job Title</label>
        <input
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

        <label for="category">Category</label>
        <input
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

        <label for="candidate_required_location">
          Candidate Required Location
        </label>
        <input
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

        <label for="description">Detailed Job Description</label>
        <textarea
          placeholder="Include an introduction of the job and its context, and make sure to describe the responsibilities and qualifications needed. The job description must be at least 700 characters long, but shouldn't be too long either."
          name="description"
          onChange={(ev) => {
            setFormData({
              ...formData,
              description: ev.target.value,
            });
          }}
        ></textarea>

        <label for="salary">Salary</label>
        <input
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

        <label for="job_type">Job Type</label>
        <select
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
        </select>

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

export default PostJob;
