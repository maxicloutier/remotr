"use strict";

// const { v4: uuidv4 } = require("uuid");
const request = require("request");

const getJobsFromApi = (req, res) => {
  request(
    "https://remotive.io/api/remote-jobs?limit=100",
    async (error, response, body) => {
      // console.error("error:", error); // Print the error if one occurred

      // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

      // console.log("body:", body); // Print the HTML for the Google homepage.

      // res.json((body && JSON.parse(body)) || { message: "No body" });
      if (body) {
        console.log(body);
        const parsedBody = JSON.parse(body);
        console.log(Object.keys(parsedBody.jobs));
        res.json(parsedBody);
        res.status(200).json({ status: 200, message: "Success" });
        try {
          await req.app.locals.db
            .collection("jobs")
            .insertMany(parsedBody.jobs);
          console.log("100 jobs transferred to MongoDB");
        } catch (error) {
          console.log(error, "Error. Job data not transferred.");
        }
      } else {
        res.status(400).json({ status: 400, error: "No body" });
        console.log("No body");
      }
    }
  );
};

// getJobsFromApi();

// module.exports = { getJobsFromApi };
