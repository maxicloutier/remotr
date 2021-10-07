import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Context } from "./Context";
import { GiPalmTree } from "react-icons/gi";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSignOut = () => {
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <Wrapper>
      <SiteNameDiv>
        <SiteNameLink to="/" exact="true">
          <SiteName>
            <GiPalmTree />
            remotr
          </SiteName>
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

              <SignOutButton onClick={handleSignOut}>SIGN OUT</SignOutButton>
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
  background-color: #100c08;
  min-height: 80px;
  position: sticky;
  top: 0;
  border-bottom: solid 4px #00ced1;
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

const SiteName = styled.h1`
  display: flex;
  font-family: "Poppins", sans-serif;
  font-size: 45px;
  font-weight: 500;
  align-items: center;
`;

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
  font-weight: 600;
  font-size: 19px;
  font-family: "Poppins", sans-serif;
`;

const SignOutButton = styled.button`
  color: white;
  font-weight: 600;
  font-size: 19px;
  font-family: "Poppins", sans-serif;
  background: transparent;
  border: none;
  cursor: pointer;
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
  font-size: 19px;
  font-weight: 600;
`;

export default Header;
