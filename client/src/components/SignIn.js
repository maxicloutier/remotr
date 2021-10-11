import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const initialState = {
    usertype: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { currentUser, setCurrentUser } = useContext(Context);

  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const data = {
      usertype: formData.usertype,
      email: formData.email,
      password: formData.password,
    };

    fetch("/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCurrentUser(data.data);
          history.push("/");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  return (
    <div>
      <Video
        autoPlay
        playsInline
        loop
        muted
        width={"100%"}
        poster="/assets/design/sign-in-bg-3.png"
        src="/assets/design/sign-in-bg-3.mp4"
      />

      <SignInContainer>
        <LeftContainer>
          <PageTitle>Sign In</PageTitle>

          <Paragraph>
            Enter your information to sign in to your account.
          </Paragraph>
        </LeftContainer>

        <RightContainer>
          <Form onSubmit={handleSubmit}>
            <Label for="usertype">User Type</Label>
            <Select
              name="usertype"
              id="usertype"
              onChange={(ev) => {
                setFormData({ ...formData, usertype: ev.target.value });
              }}
            >
              <option value="" disabled selected>
                Select a user type
              </option>
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </Select>

            <Label for="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(ev) => {
                setFormData({ ...formData, email: ev.target.value });
              }}
            />

            <Label for="password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(ev) => {
                setFormData({ ...formData, password: ev.target.value });
              }}
            />

            <div>
              <SubmitButton type="submit">Confirm</SubmitButton>
            </div>
          </Form>
        </RightContainer>
      </SignInContainer>
    </div>
  );
};

const Video = styled.video`
  z-index: -1;
  object-fit: fill;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: auto;
  z-index: -1;
  opacity: 70%;
`;

const SignInContainer = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  position: absolute;
  top: 55%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const PageTitle = styled.h1`
  text-align: center;
  margin: 20px;
  color: #004ddb;
  font-size: 50px;
`;

const Paragraph = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh 2vw;
  height: 350px;
  width: 50%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #00ced1;
`;

const RightContainer = styled.div`
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: solid 3px #00ced1;
  padding: 2vh 2vw;
  height: 350px;
  width: 50%;
  background-color: white;
`;

const Form = styled.form`
  font-family: "Roboto", sans-serif;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-top: 15px;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Input = styled.input`
  height: 40px;
  font-size: 16px;
  padding: 6px;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: solid 1px;
`;

const Select = styled.select`
  height: 40px;
  font-size: 16px;
  padding: 6px;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: solid 1px;
`;

const SubmitButton = styled.button`
  padding: 11px 25px;
  width: 140px;
  font-weight: 600;
  color: white;
  display: inline-block;
  border-radius: 10px;
  text-transform: uppercase;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  border: none;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00ced1;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #004ddb;
    transition: all 0.3s;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
`;

export default SignIn;
