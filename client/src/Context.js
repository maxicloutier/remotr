import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [candidates, setCandidates] = useState(null);

  useEffect(() => {
    fetch("/candidates")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.log(error, "Something went wrong");
      });
  }, []);

  return (
    <Context.Provider
      value={{ currentUser, setCurrentUser, candidates, setCandidates }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
