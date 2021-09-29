import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <SiteNameDiv>
        <SiteNameLink to="/" exact="true">
          <SiteName>remotr</SiteName>
        </SiteNameLink>
      </SiteNameDiv>
      <NavDiv>
        <NavBar>
          <StyledLink to="/" exact="true">
            HOME
          </StyledLink>
          <StyledLink to="/jobs">REMOTE JOBS</StyledLink>
          <StyledLink to="/lifestyle">LIFESTYLE</StyledLink>
          <StyledLink to="/community">COMMUNITY</StyledLink>
          <StyledLink to="/creator">CREATOR</StyledLink>
          {!currentUser ? (
            <>
              <StyledLink to="/signin">SIGN IN</StyledLink>
              <StyledLink to="/signup">SIGN UP</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/postajob">POST A JOB</StyledLink>
              <MeLinkDiv>
                <StyledLink to="/me">
                  <ProfilePicture
                    src="/assets/maxime.png"
                    alt="User profile picture"
                  />
                  <Me>ME</Me>
                </StyledLink>
              </MeLinkDiv>
            </>
          )}
        </NavBar>
      </NavDiv>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100vw;
  display: flex;
  background-color: black;
  min-height: 75px;
  position: relative;
`;

const SiteNameDiv = styled.div`
  position: relative;
  width: 250px;
`;

const SiteNameLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 35px;
`;

const SiteName = styled.h1``;

const NavDiv = styled.div`
  width: 100%;
  position: relative;
`;

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

const MeLinkDiv = styled.div`
  position: relative;
  width: 75px;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  right: 0%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const Me = styled.p`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 0%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

export default Header;