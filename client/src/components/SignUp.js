import React, { useState } from "react";
import styled from "styled-components";
import SignUpCandidate from "./SignUpCandidate";
import SignUpEmployer from "./SignUpEmployer";

const SignUp = () => {
  const [usertype, setUserType] = useState(null);

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <p>Complete this form to sign up for Remotr!</p>
        <p>Select a user type</p>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setUserType("candidate");
          }}
        >
          I am a Candidate
        </button>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setUserType("employer");
          }}
        >
          I am an Employer
        </button>
      </div>
      <div>
        {usertype === "candidate" && <SignUpCandidate usertype={usertype} />}
        {usertype === "employer" && <SignUpEmployer usertype={usertype} />}
      </div>
    </>
  );
};

export default SignUp;
