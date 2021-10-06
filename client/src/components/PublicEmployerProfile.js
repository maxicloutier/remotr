import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PublicEmployerProfile = () => {
  const [employer, setEmployer] = useState(null);

  const { _id } = useParams;

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

      <button onClick={handleSignOut}>Sign Out</button>

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

      {/* <div>
        <h3>My Jobs Posted on Remotr</h3>
        <div>
          {jobs ? (
            jobs.map((job) => {
              return (
                <Link to={`/jobdashboard/:${job._id}`} key={job._id}>
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
      </div> */}
    </div>
  );
};

export default PublicEmployerProfile;
