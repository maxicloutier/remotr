import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allJobs, setAllJobs] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [employers, setEmployers] = useState(null);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setAllJobs(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  useEffect(() => {
    fetch("/candidates")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  useEffect(() => {
    fetch("/employers")
      .then((res) => res.json())
      .then((data) => {
        setEmployers(data.data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        candidates,
        setCandidates,
        employers,
        setEmployers,
        allJobs,
        setAllJobs,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
