"use strict";

const request = require("request-promise");

const getJobsFromApi = async () => {
  return request("https://remoteok.io/api")
    .then((res) => JSON.parse(res))
    .then((parsedResponse) => {
      try {
        await req.app.locals.db
          .collection("jobsRemoteOk")
          .insertMany(parsedResponse);
        console.log("100 jobs transferred to MongoDB");
      } catch (error) {
        console.log(error, "Error. Job data not transferred.");
      }
      return parsedResponse;
    })
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};

// getJobsFromApi()
