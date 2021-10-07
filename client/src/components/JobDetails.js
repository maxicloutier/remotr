import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Context";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";
import Apply from "./Apply";

const JobDetails = () => {
  const { currentUser } = useContext(Context);

  const [jobDescription, setJobDescription] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/job/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobDescription(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  console.log(jobDescription);

  const handleSaveApplication = () => {
    const data = {
      company_name: jobDescription.company_name,
      company_logo_url: jobDescription.company_logo_url,
      title: jobDescription.title,
      jobId: jobDescription._id,
      candidate_required_location: jobDescription.candidate_required_location,
      candidatePicture: currentUser.picture,
      name: currentUser.name,
      candidateId: currentUser._id,
      email: currentUser.email,
      phone: currentUser.phone,
      candidateLocation: currentUser.location,
      languages: currentUser.languages,
      profile: `/candidate/${currentUser._id}`,
    };

    fetch(`/job/${jobDescription._id}/externalApplication`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert("Application successfully saved on your profile!");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  if (!jobDescription) {
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
      <div>
        {jobDescription.company_logo_url ? (
          <img src={jobDescription.company_logo_url} alt="Company Logo" />
        ) : (
          <img src="/assets/employers/alt-logo.jpeg" alt="Logo" />
        )}
        <p>{jobDescription.company_name}</p>
        <p>{jobDescription.title}</p>
        <p>{jobDescription.candidate_required_location}</p>

        <p>{jobDescription.category}</p>
        <p>{jobDescription.salary}</p>
        <p>{jobDescription.job_type}</p>
        <p>{jobDescription.publication_date}</p>

        {jobDescription.exclusivity ? (
          <p>{jobDescription.exclusivity}</p>
        ) : (
          <p>Job from Remotive.io</p>
        )}

        <div>{jobDescription.description}</div>

        <div>
          {jobDescription.exclusivity ? (
            <div>
              <button>
                <Apply
                  jobId={jobDescription._id}
                  company_name={jobDescription.company_name}
                  employerId={jobDescription.employerId}
                  company_logo_url={jobDescription.company_logo_url}
                  title={jobDescription.title}
                  candidate_required_location={
                    jobDescription.candidate_required_location
                  }
                />
              </button>
            </div>
          ) : (
            <div>
              <div>
                <button onClick={handleSaveApplication}>
                  Save to the List of Jobs I’ve Applied for on My Profile
                </button>
              </div>
              <div>
                <button>
                  <a href={jobDescription.url} target="_blank">
                    Apply Externally
                  </a>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgressBarContainer = styled.div`
  max-width: 200px;
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

export default JobDetails;
