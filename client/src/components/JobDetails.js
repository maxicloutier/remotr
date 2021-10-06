import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const [jobDescription, setJobDescription] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/job/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobDescription(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return (
    <div>
      {jobDescription &&
        jobDescription.map((element) => {
          return (
            <div key={element._id}>
              {element.company_logo_url ? (
                <img src={element.company_logo_url} alt="Company Logo" />
              ) : (
                <img src="/assets/employers/alt-logo.jpeg" alt="Logo" />
              )}
              <p>{element.company_name}</p>
              <p>{element.title}</p>
              <p>{element.candidate_required_location}</p>

              <p>{element.category}</p>
              <p>{element.salary}</p>
              <p>{element.job_type}</p>
              <p>{element.publication_date}</p>

              {element.exclusivity ? (
                <p>{element.exclusivity}</p>
              ) : (
                <p>Job from Remotive.io</p>
              )}

              <div>{element.description}</div>

              <div>
                {element.exclusivity ? (
                  <button>
                    <Link to={`/job/${element._id}/application`}>Apply</Link>
                  </button>
                ) : (
                  <button>
                    <a href={element.url}>Apply</a>
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default JobDetails;
