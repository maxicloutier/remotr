import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PublicCandidateProfile = () => {
  const [candidate, setCandidate] = useState(null);

  const { _id } = useParams;

  useEffect(() => {
    fetch(`/candidate/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default PublicCandidateProfile;
