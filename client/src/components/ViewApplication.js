import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const ViewApplication = () => {
  const [application, setApplication] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/application/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return (
    <div>
      <img src={application.company_logo_url} alt="Company Logo" />

      <p>{application.company_name}</p>
      <p>{application.employerId}</p>

      <p>{application.title}</p>
      <p>{application.candidate_required_location}</p>
      <Link to={`/job/${application.jobId}`}>Job Details</Link>
      <Link to={application.profile}>Candidate Profile</Link>

      <p>{application.name}</p>
      <p>Username: {application.candidateId}</p>
      <p>{application.email}</p>
      <p>{application.phone}</p>
      <p>{application.candidateLocation}</p>
      <p>{application.languages}</p>

      <p>{application.letter}</p>
      <p>{application.resume}</p>

      <p>{application.date}</p>
    </div>
  );
};

export default ViewApplication;
