"use strict";

const { v4: uuidv4 } = require("uuid");
// const request = require("request");

// Get the list of all the jobs from the APIs and website, that were stored in MongoDB.
const getJobs = async (req, res) => {
  try {
    const allJobs = await req.app.locals.db.collection("jobs").find().toArray();
    res.status(200).json({ status: 200, message: "Success", data: allJobs });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get the details/description for a specific job.
const getJobById = async (req, res) => {
  const { _id } = req.params;
  try {
    const oneJob = await req.app.locals.db.collection("jobs").findOne({ _id });
    res
      .status(200)
      .json({ status: 200, message: "Success", id: _id, data: oneJob });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get a list of all the candidates user type (job seekers).
const getCandidates = async (req, res) => {
  try {
    const allCandidates = await req.app.locals.db
      .collection("candidates")
      .find()
      .toArray();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: allCandidates });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get information for a specific candidate.
const getCandidateById = async (req, res) => {
  const { _id } = req.params;
  try {
    const oneCandidate = await req.app.locals.db
      .collection("candidates")
      .findOne({ _id });
    res
      .status(200)
      .json({ status: 200, message: "Success", id: _id, data: oneCandidate });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Update information for a specific candidate.
const updateCandidate = async (req, res) => {};

// Get a list of all the employers user type (companies).
const getEmployers = async (req, res) => {
  try {
    const allEmployers = await req.app.locals.db
      .collection("employers")
      .find()
      .toArray();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: allEmployers });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get information for a specific employer.
const getEmployerById = async (req, res) => {
  const { _id } = req.params;
  try {
    const oneEmployer = await req.app.locals.db
      .collection("employers")
      .findOne({ _id });
    res
      .status(200)
      .json({ status: 200, message: "Success", id: _id, data: oneEmployer });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Update information for a specific employer.
const updateEmployer = async (req, res) => {};

// Handler for candidates and employers to sign in.
const handleSignIn = async (req, res) => {
  const { email, password, usertype } = req.body;

  if (usertype === "candidate") {
    try {
      const foundUser = await req.app.locals.db
        .collection("candidates")
        .findOne({ email });

      if (foundUser && foundUser.password === password) {
        res
          .status(200)
          .json({ status: 200, message: "Success", data: foundUser });
      } else {
        res.status(400).json({
          status: 400,
          error: "User not found or wrong combination of email and password",
        });
      }
    } catch (error) {
      res.status(400).json({ status: 400, error: "Something went wrong" });
    }
  } else if (usertype === "employer") {
    try {
      const foundUser = await req.app.locals.db
        .collection("employers")
        .findOne({ email });

      if (foundUser && foundUser.password === password) {
        res
          .status(200)
          .json({ status: 200, message: "Success", data: foundUser });
      } else {
        res.status(400).json({
          status: 400,
          error: "User not found or wrong combination of email and password",
        });
      }
    } catch (error) {
      res.status(400).json({ status: 400, error: "Something went wrong" });
    }
  } else {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for candidates and employers to sign up.
const handleSignUp = async (req, res) => {
  const { username, email, usertype } = req.body;

  if (usertype === "candidate") {
    const foundUsername = await req.app.locals.db
      .collection("candidates")
      .findOne({ username });

    const foundEmail = await req.app.locals.db
      .collection("candidates")
      .findOne({ email });

    if (foundUsername || foundEmail) {
      res
        .status(400)
        .json({ status: 400, error: "Username or email already exists" });
    } else {
      const newCandidate = await req.app.locals.db
        .collection("candidates")
        .insertOne({ _id: username }, req.body);
      res
        .status(201)
        .json({ status: 201, message: "Success", data: newCandidate });
    }
  } else if (usertype === "employer") {
    const foundUsername = await req.app.locals.db
      .collection("employers")
      .findOne({ username });

    const foundEmail = await req.app.locals.db
      .collection("employers")
      .findOne({ email });

    if (foundUsername || foundEmail) {
      res
        .status(400)
        .json({ status: 400, error: "Username or email already exists" });
    } else {
      const newEmployer = await req.app.locals.db
        .collection("employers")
        .insertOne({ _id: username }, req.body);
      res
        .status(201)
        .json({ status: 201, message: "Success", data: newEmployer });
    }
  } else {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for candidates and employers to sign out.
const handleSignOut = async (req, res) => {};

// Handler for an employer to post a job.
const postJob = async (req, res) => {
  try {
    const newJob = await req.app.locals.db
      .collection("jobs")
      .insertOne({ _id: uuidv4() }, req.body);
    res.status(201).json({ status: 201, message: "Success", data: newJob });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for an employer to update a job post.
const updateJob = async (req, res) => {};

// Handler for a candidate to send a job application.
const sendApplication = async (req, res) => {};

// Get a list of all a candidate's job applications.
const getApplications = async (req, res) => {};

// Get a candidate's specific job application.
const getApplicationById = async (req, res) => {};

module.exports = {
  getJobs,
  getJobById,
  getCandidates,
  getCandidateById,
  getEmployers,
  getEmployerById,
  handleSignIn,
  handleSignUp,
  postJob,
};
