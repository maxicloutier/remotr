import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const MyCandidateProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const handleSignOut = () => {
    setCurrentUser(null).then(() => history.push("/"));
  };

  return null;
};

export default MyCandidateProfile;
