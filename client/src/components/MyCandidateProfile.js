import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const MyCandidateProfile = () => {
  const { currentUser } = useContext(Context);

  const history = useHistory();

  const handleSignOut = () => {
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <div>
      <div>
        <img src={currentUser.picture} alt="User profile picture" />;
      </div>
      <div>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.pronouns}</p>
        <p>{currentUser._id}</p>
        <p>{currentUser.title}</p>
        <p>{currentUser.location}</p>
        <p>{currentUser.timezone}</p>
        <p>{currentUser.member_since}</p>
      </div>
      <div>
        <h3>Contact Information</h3>
        <p>{currentUser.email}</p>
        <p>{currentUser.phone}</p>
      </div>

      <div>
        <h3>Social</h3>

        <a href={currentUser.linkedin}>
          <img src="/assets/social/linkedin-logo.png" alt="LinkedIn logo" />
        </a>

        <a href={currentUser.instagram}>
          <img src="/assets/social/instagram-logo.jpeg" alt="Instagram logo" />
        </a>

        <p>{currentUser.email}</p>
        <p>{currentUser.phone}</p>
      </div>
    </div>
  );
};

export default MyCandidateProfile;
