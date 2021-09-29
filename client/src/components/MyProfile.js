import React from 'react';
import styled from 'styled-components';
import MyCandidateProfile from './MyCandidateProfile';
import MyEmployerProfile from './MyEmployerProfile';

const MyProfile = () => {
  return (
    <div>
      <MyCandidateProfile />
      <MyEmployerProfile />
    </div>
  );
};

export default MyProfile;
