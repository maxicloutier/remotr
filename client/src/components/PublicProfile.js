import React from 'react';
import styled from 'styled-components';
import PublicCandidateProfile from './PublicCandidateProfile';
import PublicEmployerProfile from './PublicEmployerProfile';

const PublicProfile = () => {
  return (
    <div>
      <PublicCandidateProfile />
      <PublicEmployerProfile />
    </div>
  );
};

export default PublicProfile;
