import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const PublicEmployerProfile = () => {
  const [employer, setEmployer] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    fetch(`/employer/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployer(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  console.log(employer);

  if (!employer) {
    return (
      <Loading>
        <ProgressBarContainer>
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
              <CircularProgressbarWithChildren value={percentage}>
                <img
                  style={{ width: 80, marginTop: -5 }}
                  src="/assets/other/doge.png"
                  alt="doge"
                />
                <div style={{ fontSize: 20 }}>
                  <strong>{percentage}</strong> mate
                </div>
              </CircularProgressbarWithChildren>
            )}
          </ChangingProgressProvider>
        </ProgressBarContainer>
      </Loading>
    );
  }

  return (
    <div>
      <div>
        <img src={employer.logo} alt="User profile picture" />;
      </div>
      <div>
        <h2>{employer.name}</h2>
        <p>{employer.slogan}</p>
        <p>{employer.industry}</p>
        <a href={employer.website}>Website</a>
        <p>Location: {employer.location}</p>
      </div>

      <p>Type: {employer.type}</p>
      <p>Founded: {employer.founded}</p>
      <p>Number of Employees: {employer.employees}</p>

      <div>
        <h3>Account Information</h3>
        <p>Email: {employer.email}</p>
        <p>Username: {employer._id}</p>
      </div>

      <div>
        <h3>About {employer.name}</h3>
        <p>{employer.about}</p>
      </div>

      <div>
        <h3>Specialties</h3>
        <p>{employer.specialties}</p>
      </div>

      <div>
        <h3>Employee Benefits</h3>
        <p>{employer.benefits}</p>
      </div>
    </div>
  );
};

const ProgressBarContainer = styled.div`
  max-width: 200px;
  margin-top: 30px;
`;

const Loading = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100vw;
  text-align: -webkit-center;
`;

export default PublicEmployerProfile;
