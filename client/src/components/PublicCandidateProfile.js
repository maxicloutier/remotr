import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const PublicCandidateProfile = () => {
  const [candidate, setCandidate] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/candidate/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  if (!candidate) {
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
        <img src={candidate.picture} alt="User profile picture" />;
      </div>
      <div>
        <h2>{candidate.name}</h2>
        <p>{candidate.pronouns}</p>
        <p>Username: {candidate._id}</p>
        <p>{candidate.title}</p>
        <p>Member Since: {candidate.member_since}</p>
      </div>

      <p>Location: {candidate.location}</p>
      <p>UTC Time Zone: {candidate.timezone}</p>
      <p>Languages: {candidate.languages}</p>

      <div>
        <h3>Contact Information</h3>
        <p>{candidate.email}</p>
        <p>{candidate.phone}</p>
      </div>

      <div>
        <h3>About Me</h3>
        <p>{candidate.about}</p>
      </div>

      <div>
        <h3>My Skills</h3>
        <p>{candidate.skills}</p>
      </div>

      <div>
        <h3>Current Employment</h3>
        <p>
          {candidate.position} @ {candidate.employer}
        </p>
      </div>

      <div>
        <h3>Most Relevant or Latest Degree/Training</h3>
        <p>{candidate.degree}</p>
        <p>{candidate.school}</p>
        <p>{candidate.degree_duration}</p>
      </div>

      <div>
        <h3>What I’m Looking For</h3>
        <p>{candidate.looking}</p>
      </div>

      <div>
        <h3>Social</h3>

        <a href={candidate.linkedin}>
          <img src="/assets/social/linkedin-logo.png" alt="LinkedIn logo" />
        </a>

        <a href={candidate.instagram}>
          <img src="/assets/social/instagram-logo.jpeg" alt="Instagram logo" />
        </a>
      </div>

      <div>
        <h3>What I’m Looking For</h3>
        <p>{candidate.looking}</p>
      </div>

      <div>
        <h3>My Hobbies</h3>
        <p>{candidate.hobbies}</p>
      </div>
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

export default PublicCandidateProfile;
