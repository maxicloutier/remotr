import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [employers, setEmployers] = useState(null);

  useEffect(() => {
    fetch("/candidates")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error(error, "Something went wrong");
      });
  }, []);

  useEffect(() => {
    fetch("/employers")
      .then((res) => res.json())
      .then((data) => {
        setEmployers(data);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
