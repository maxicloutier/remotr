import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PublicCandidateProfile = () => {
  const [candidate, setCandidate] = useState(null);

  const { _id } = useParams;

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

export default PublicCandidateProfile;
