import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import MyCandidateProfile from "./MyCandidateProfile";
import MyEmployerProfile from "./MyEmployerProfile";

const MyProfile = () => {
  const { currentUser } = useContext(Context);

  return (
    <div>
      {currentUser.usertype === "candidate" && <MyCandidateProfile />}
      {currentUser.usertype === "employer" && <MyEmployerProfile />}
    </div>
  );
};

export default MyProfile;
