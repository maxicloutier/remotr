import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

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

  let readyToSubmit = false;

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

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      alert("Please enter a valid email address.");
    }

    if (formData.letter.length < 50) {
      alert(
        "Please make sure that your application message is at least 50 characters long."
      );
    }

    if (readyToSubmit === false) {
      alert("Please make sure that all required fields are filled in.");
    }

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
          alert(
            "Something went wrong. Please make sure that all fields are filled in."
          );
        }
      });
  };

  // useEffect(() => {
  //   if (!formData) {
  //     // bouncer pattern
  //     return;
  //   }
  //   if (
  //     formData.company_name !== "" &&
  //     formData.employerId !== "" &&
  //     formData.title !== "" &&
  //     formData.candidate_required_location !== "" &&
  //     candidatePicture !== "" &&
  //     formData.name !== "" &&
  //     formData.candidateId !== "" &&
  //     formData.email !== "" &&
  //     formData.phone !== "" &&
  //     formData.candidateLocation !== "" &&
  //     formData.languages !== "" &&
  //     formData.profile !== "" &&
  //     formData.letter !== "" &&
  //     formData.resume !== ""
  //   ) {
  //     readyToSubmit = true;
  //   }
  // }, [formData]);

  // if (!currentUser) {
  //   return (
  //     <Loading>
  //       <ProgressBarContainer>
  //         <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
  //           {(percentage) => (
  //             <CircularProgressbarWithChildren value={percentage}>
  //               <img
  //                 style={{ width: 80, marginTop: -5 }}
  //                 src="/assets/other/doge.png"
  //                 alt="doge"
  //               />
  //               <div style={{ fontSize: 20 }}>
  //                 <strong>{percentage}</strong> mate
  //               </div>
  //             </CircularProgressbarWithChildren>
  //           )}
  //         </ChangingProgressProvider>
  //       </ProgressBarContainer>
  //     </Loading>
  //   );
  // }

  return (
    <div>
      <form onSubmit={handleApply}>
        <img src={company_logo_url} alt="Company Logo" />
        <p>{company_name}</p>
        <p>{title}</p>
        <p>{candidate_required_location}</p>

        <label for="name">Name</label>
        <input type="text" value={name} name="name" disabled />

        <label for="candidateId">Username</label>
        <input type="text" value={candidateId} name="candidateId" disabled />

        <label for="email">Email</label>
        <input
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

        <label for="phone">Phone Number</label>
        <input
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

        <label for="candidateLocation">Current Location</label>
        <input
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

        <label for="languages">Languages</label>
        <input
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

        <label for="profile">Link to Your Profile</label>
        <input type="url" value={profile} name="profile" disabled />

        <label for="letter">Application Message</label>
        <textarea
          placeholder="Introduce yourself and explain your motivation for this job to the employer. Must be at least 50 characters long."
          name="letter"
          onChange={(ev) => {
            setFormData({
              ...formData,
              letter: ev.target.value,
            });
          }}
        ></textarea>

        <label for="resume">Link to Your Resume</label>
        <input
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

export default Apply;
