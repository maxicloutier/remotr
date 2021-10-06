import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import MyCandidateProfile from "./MyCandidateProfile";
import MyEmployerProfile from "./MyEmployerProfile";
import { useHistory } from "react-router";

const MyProfile = () => {
  const { currentUser } = useContext(Context);

  const history = useHistory();

  console.log(currentUser)

  return (
    <div>
      {currentUser.usertype === "candidate" && <MyCandidateProfile />}
      {currentUser.usertype === "employer" && <MyEmployerProfile />}
    </div>
  );
};

export default MyProfile;
