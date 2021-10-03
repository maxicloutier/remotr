"use strict";

// Require MongoClient and access the database with the `uri` saved in the `.env` file.
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Import the needed node_modules
const express = require("express");
const morgan = require("morgan");
const { getJobsFromApi } = require("./admin-handlers");
const {
  getJobs,
  getJobById,
  getCandidates,
  getCandidateById,
  getEmployers,
  getEmployerById,
  handleSignIn,
  handleSignUp,
  postJob,
} = require("./handlers");

const app = express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Nothing to modify above this line
  // ---------------------------------
  // Add new endpoints here 👇
  // .get("/jobs", getJobsFromApi)

  .get("/jobs", getJobs)
  .get("/job/:_id", getJobById)
  .get("/candidates", getCandidates)
  .get("/candidate/:_id", getCandidateById)
  .get("/employers", getEmployers)
  .get("employer/:_id", getEmployerById)
  .post("/signin", handleSignIn)
  .post("/signup", handleSignUp)
  .post("/job", postJob)

  // Add new endpoints here 👆
  // ---------------------------------
  // Nothing to modify below this line

  // This is our catch all endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      error: "Something went wrong",
    });
  });

const setup = async () => {
  // Create new client
  const client = await new MongoClient(MONGO_URI, options);

  // Connect to client
  await client.connect();
  console.log("Connected");

  // Connect to database
  const db = client.db("remotr");

  // Node spins up our server and sets it to listen on port 8000
  app.listen(8000, () => {
    console.log(`Listening on port 8000`);
    app.locals.db = db;
  });
};

setup();
