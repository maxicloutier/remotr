import React from "react";
import styled from "styled-components";
import PublicCandidateProfile from "./PublicCandidateProfile";
import PublicEmployerProfile from "./PublicEmployerProfile";

const PublicProfile = () => {
  return (
    <div>
      {usertype === "candidate" ? ( // NEED HELP
        <PublicCandidateProfile />
      ) : (
        <PublicEmployerProfile />
      )}
    </div>
  );
};

export default PublicProfile;
