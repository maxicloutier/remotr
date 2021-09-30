"use strict";

// const { v4: uuidv4 } = require("uuid");
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
const getJobById = async (req, res) => {};

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
const getCandidateById = async (req, res) => {};

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
const getEmployerById = async (req, res) => {};

// Update information for a specific employer.
const updateEmployer = async (req, res) => {};

// Handler for candidates and employers to sign in.
const handleSignIn = async (req, res) => {};

// Handler for candidates and employers to sign up.
const handleSignUp = async (req, res) => {};

// Handler for candidates and employers to sign out.
const handleSignOut = async (req, res) => {};

// Handler for an employer to post a job.
const postJob = async (req, res) => {};

// Handler for an employer to update a job post.
const updateJob = async (req, res) => {};

// Handler for a candidate to send a job application.
const sendApplication = async (req, res) => {};

// Get a list of all a candidate's job applications.
const getApplications = async (req, res) => {};

// Get a candidate's specific job application.
const getApplicationById = async (req, res) => {};

module.exports = { getJobs, getCandidates };
