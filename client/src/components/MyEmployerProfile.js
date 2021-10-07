import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../progress-bar/ChangingProgressProvider";

const MyEmployerProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);
  const [jobs, setJobs] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`/me/${currentUser._id}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
    history.push("/");
  };

  if (!currentUser) {
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
        <img src={currentUser.logo} alt="User profile picture" />;
      </div>
      <div>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.slogan}</p>
        <p>{currentUser.industry}</p>
        <a href={currentUser.website} target="_blank">
          Website
        </a>
        <p>Location: {currentUser.location}</p>
      </div>

      <button onClick={handleSignOut}>Sign Out</button>

      <p>Type: {currentUser.type}</p>
      <p>Founded: {currentUser.founded}</p>
      <p>Number of Employees: {currentUser.employees}</p>

      <div>
        <h3>Account Information</h3>
        <p>Email: {currentUser.email}</p>
        <p>Username: {currentUser._id}</p>
      </div>

      <div>
        <h3>About {currentUser.name}</h3>
        <p>{currentUser.about}</p>
      </div>

      <div>
        <h3>Specialties</h3>
        <p>{currentUser.specialties}</p>
      </div>

      <div>
        <h3>Employee Benefits</h3>
        <p>{currentUser.benefits}</p>
      </div>

      <div>
        <h3>My Jobs Posted on Remotr</h3>
        <div>
          {jobs ? (
            jobs.map((job) => {
              return (
                <Link to={`/jobdashboard/${job._id}`} key={job._id}>
                  <p>{job.title}</p>
                  <p>{job.candidate_required_location}</p>
                  <p>{job.publication_date}</p>
                </Link>
              );
            })
          ) : (
            <p>You haven't posted any jobs on Remotr yet.</p>
          )}
        </div>
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

export default MyEmployerProfile;
