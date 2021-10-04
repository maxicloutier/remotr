"use strict";

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
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
const updateCandidate = async (req, res) => {
  const { _id } = req.params;
  const query = { _id };
  const newValues = { $set: { ...req.body } };

  try {
    const updatedCandidate = await req.app.locals.db
      .collection("candidates")
      .updateOne(query, newValues);
    res.status(200).json({
      status: 200,
      message: "Success",
      id: _id,
      data: updatedCandidate,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

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
const updateEmployer = async (req, res) => {
  const { _id } = req.params;
  const query = { _id };
  const newValues = { $set: { ...req.body } };

  try {
    const updatedEmployer = await req.app.locals.db
      .collection("employers")
      .updateOne(query, newValues);
    res.status(200).json({
      status: 200,
      message: "Success",
      id: _id,
      data: updatedEmployer,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

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
  const { usertype } = req.body;

  if (usertype === "candidate") {
    const {
      _id,
      email,
      password,
      name,
      about,
      degree,
      degree_duration,
      employer,
      hobbies,
      languages,
      location,
      phone,
      position,
      pronouns,
      school,
      skills,
      timezone,
      title,
      looking,
      picture,
      instagram,
      linkedin,
      usertype,
      confirm_password,
    } = req.body;

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
      const newCandidate = {
        _id: _id,
        email: email,
        password: password,
        name: name,
        about: about,
        degree: degree,
        degree_duration: degree_duration,
        employer: employer,
        hobbies: hobbies,
        languages: languages,
        location: location,
        member_since: moment().format("MMMM YYYY"),
        phone: phone,
        position: position,
        pronouns: pronouns,
        school: school,
        skills: skills,
        timezone: timezone,
        title: title,
        looking: looking,
        picture: picture,
        applications: [],
        instagram: instagram,
        linkedin: linkedin,
        usertype: usertype,
        confirm_password: confirm_password,
      };

      await req.app.locals.db.collection("candidates").insertOne(newCandidate);
      res
        .status(201)
        .json({ status: 201, message: "Success", data: newCandidate });
    }
  } else if (usertype === "employer") {
    const {
      _id,
      name,
      slogan,
      industry,
      location,
      employees,
      about,
      website,
      type,
      founded,
      specialties,
      logo,
      benefits,
      email,
      password,
      usertype,
      confirm_password,
    } = req.body;

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
      const newEmployer = {
        _id: _id,
        name: name,
        slogan: slogan,
        industry: industry,
        location: location,
        employees: employees,
        about: about,
        website: website,
        type: type,
        founded: founded,
        specialties: specialties,
        logo: logo,
        jobs: [],
        benefits: benefits,
        email: email,
        password: password,
        usertype: usertype,
        confirm_password: confirm_password,
      };

      await req.app.locals.db.collection("employers").insertOne(newEmployer);
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
  const {
    company,
    logo,
    position,
    category,
    location,
    description,
    responsibilities,
    qualifications,
    apply,
  } = req.body;

  try {
    const newJob = {
      _id: uuidv4(),
      date: moment().format("MMMM Do YYYY"),
      company: company,
      logo: logo,
      position: position,
      category: category,
      location: location,
      description: description,
      responsibilities: responsibilities,
      qualifications: qualifications,
      apply: apply,
      applications: [],
    };

    await req.app.locals.db.collection("jobs").insertOne(newJob);
    res.status(201).json({ status: 201, message: "Success", data: newJob });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for an employer to update a job post.
const updateJob = async (req, res) => {
  const { _id } = req.params;
  const query = { _id };
  const newValues = { $set: { ...req.body } };

  try {
    const updatedJob = await req.app.locals.db
      .collection("jobs")
      .updateOne(query, newValues);
    res.status(200).json({
      status: 200,
      message: "Success",
      id: _id,
      data: updatedJob,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for a candidate to send a job application.
const sendApplication = async (req, res) => {
  const {
    company,
    logo,
    position,
    jobLocation,
    name,
    email,
    phone,
    candidateLocation,
    languages,
    profile,
    letter,
    resume,
  } = req.body;

  const newApplication = {
    _id: uuidv4(),
    date: moment().format("MMMM Do YYYY, h:mm a"),
    company: company,
    logo: logo,
    position: position,
    jobLocation: jobLocation,
    name: name,
    email: email,
    phone: phone,
    candidateLocation: candidateLocation,
    languages: languages,
    profile: profile,
    letter: letter,
    resume: resume,
  };

  await req.app.locals.db.collection("jobs").insertOne(newApplication); // NOT RIGHT, TO REVIEW
  res
    .status(201)
    .json({ status: 201, message: "Success", data: newApplication });
};

// Get a list of all a candidate's job applications.
const getApplications = async (req, res) => {};

// Get a candidate's specific job application.
const getApplicationById = async (req, res) => {};

module.exports = {
  getJobs,
  getJobById,
  getCandidates,
  getCandidateById,
  updateCandidate,
  getEmployers,
  getEmployerById,
  updateEmployer,
  handleSignIn,
  handleSignUp,
  handleSignOut,
  postJob,
  updateJob,
  sendApplication,
  getApplications,
  getApplicationById,
};
