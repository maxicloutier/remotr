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
        setEmployer(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return null;
};

export default PublicEmployerProfile;
