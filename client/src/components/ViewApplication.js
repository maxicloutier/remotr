import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const ViewApplication = () => {
  const [application, setApplication] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/application/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!application) {
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
      <img src={application.company_logo_url} alt="Company Logo" />

      <p>{application.company_name}</p>
      <p>{application.employerId}</p>

      <p>{application.title}</p>
      <p>{application.candidate_required_location}</p>
      <Link to={`/job/${application.jobId}`}>Job Details</Link>
      <Link to={application.profile}>Candidate Profile</Link>

      <img src={application.candidatePicture} alt="Candidate Picture" />
      <p>{application.name}</p>
      <p>Username: {application.candidateId}</p>
      <p>{application.email}</p>
      <p>{application.phone}</p>
      <p>{application.candidateLocation}</p>
      <p>{application.languages}</p>

      <p>{application.letter}</p>
      <p>{application.resume}</p>

      <p>{application.date}</p>
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

export default ViewApplication;
