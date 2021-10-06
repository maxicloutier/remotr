import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "./Context";

const Header = () => {
  const { currentUser } = useContext(Context);

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
          <StyledLink to="/community">COMMUNITY</StyledLink>
          <StyledLink to="/creator">CREATOR</StyledLink>
          {!currentUser ? (
            <>
              <StyledLink to="/signin">SIGN IN</StyledLink>
              <StyledLink to="/signup">SIGN UP</StyledLink>
            </>
          ) : (
            <>
              {currentUser.usertype === "employer" && (
                <StyledLink to="/postajob">POST A JOB</StyledLink>
              )}
              <MeLinkDiv>
                <StyledLink to={`/me/${currentUser._id}`}>
                  {currentUser.usertype === "candidate" && (
                    <ProfilePicture
                      src={currentUser.picture}
                      alt="User profile picture"
                    />
                  )}
                  {currentUser.usertype === "employer" && (
                    <ProfilePicture
                      src={currentUser.logo}
                      alt="User profile picture"
                    />
                  )}
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
  /* position: relative; */
  position: sticky;
  top: 0;
  border-bottom: solid 4px lightseagreen;
  z-index: 100;
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
  width: 80px;
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
