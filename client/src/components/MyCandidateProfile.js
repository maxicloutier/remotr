import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

const MyCandidateProfile = () => {
  const { currentUser, setCurrentUser } = useContext(Context);
  const [jobApplications, setJobApplications] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`/me/${currentUser._id}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setJobApplications(data.data);
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

  return (
    <div>
      <div>
        <img src={currentUser.picture} alt="User profile picture" />;
      </div>
      <div>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.pronouns}</p>
        <p>Username: {currentUser._id}</p>
        <p>{currentUser.title}</p>
        <p>Member Since: {currentUser.member_since}</p>
      </div>

      <button onClick={handleSignOut}>Sign Out</button>

      <p>Location: {currentUser.location}</p>
      <p>UTC Time Zone: {currentUser.timezone}</p>
      <p>Languages: {currentUser.languages}</p>

      <div>
        <h3>Contact Information</h3>
        <p>{currentUser.email}</p>
        <p>{currentUser.phone}</p>
      </div>

      <div>
        <h3>About Me</h3>
        <p>{currentUser.about}</p>
      </div>

      <div>
        <h3>My Skills</h3>
        <p>{currentUser.skills}</p>
      </div>

      <div>
        <h3>Current Employment</h3>
        <p>
          {currentUser.position} @ {currentUser.employer}
        </p>
      </div>

      <div>
        <h3>Most Relevant or Latest Degree/Training</h3>
        <p>{currentUser.degree}</p>
        <p>{currentUser.school}</p>
        <p>{currentUser.degree_duration}</p>
      </div>

      <div>
        <h3>What I’m Looking For</h3>
        <p>{currentUser.looking}</p>
      </div>

      <div>
        <h3>Social</h3>

        <a href={currentUser.linkedin}>
          <img src="/assets/social/linkedin-logo.png" alt="LinkedIn logo" />
        </a>

        <a href={currentUser.instagram}>
          <img src="/assets/social/instagram-logo.jpeg" alt="Instagram logo" />
        </a>
      </div>

      <div>
        <h3>What I’m Looking For</h3>
        <p>{currentUser.looking}</p>
      </div>

      <div>
        <h3>My Hobbies</h3>
        <p>{currentUser.hobbies}</p>
      </div>

      <div>
        <h3>My Job Applications on Remotr</h3>
        <div>
          {jobApplications ? (
            jobApplications.map((application) => {
              return (
                <Link
                  to={`/application/${application._id}`}
                  key={application._id}
                >
                  <img src={application.company_logo_url} alt="Company logo" />
                  <p>{application.company_name}</p>
                  <p>{application.title}</p>
                  <p>{application.date}</p>
                </Link>
              );
            })
          ) : (
            <p>You haven't applied on any jobs on Remotr yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCandidateProfile;
