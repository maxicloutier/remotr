import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const MyEmployerProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const handleSignOut = () => {
    setCurrentUser(null);
    history.push("/");
  };

  return null;
};

export default MyEmployerProfile;
