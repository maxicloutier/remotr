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

// Get all jobs posted by a specific employer.
const getEmployerJobs = async (req, res) => {
  const { _id } = req.params;
  try {
    const allEmployerJobs = await req.app.locals.db
      .collection("jobs")
      .find({ employerId: _id })
      .toArray();

    res.status(200).json({
      status: 200,
      message: "Success",
      id: _id,
      data: allEmployerJobs,
    });
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

// Handler for candidates and employers to sign in.
const handleSignIn = async (req, res) => {
  const { email, password, usertype } = req.body;

  if (usertype !== "" && email !== "" && password !== "") {
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
  } else {
    res.status(400).json({
      status: 400,
      error: "Please make sure that all required fields are filled in.",
    });
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

    if (_id.length < 4) {
      res.status(400).json({
        status: 400,
        error: "Your username must be at least 4 characters long.",
      });
    } else if (!email.includes("@") || !email.includes(".")) {
      res
        .status(400)
        .json({ status: 400, error: "Please enter a valid email address." });
    } else if (
      !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ||
      !confirm_password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ) {
      res.status(400).json({
        status: 400,
        error:
          "Please make sure your password contains at least 8 characters including letters and numbers.",
      });
    } else if (password !== confirm_password) {
      res.status(400).json({
        status: 400,
        error: "Please make sure your password match.",
      });
    } else if (about.length < 300) {
      res.status(400).json({
        status: 400,
        error:
          "Please make sure your About section is at least 300 characters long.",
      });
    } else if (
      _id === "" &&
      email === "" &&
      password === "" &&
      name === "" &&
      about === "" &&
      degree === "" &&
      degree_duration === "" &&
      employer === "" &&
      hobbies === "" &&
      languages === "" &&
      location === "" &&
      phone === "" &&
      position === "" &&
      school === "" &&
      skills === "" &&
      timezone === "" &&
      title === "" &&
      looking === "" &&
      picture === "" &&
      usertype === "" &&
      confirm_password === ""
    ) {
      res.status(400).json({
        status: 400,
        error: "Please make sure that all required fields are filled in.",
      });
    } else {
      try {
        const foundUsername = await req.app.locals.db
          .collection("candidates")
          .findOne({ _id });

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
            instagram: instagram,
            linkedin: linkedin,
            usertype: usertype,
            confirm_password: confirm_password,
          };

          await req.app.locals.db
            .collection("candidates")
            .insertOne(newCandidate);

          res
            .status(201)
            .json({ status: 201, message: "Success", data: newCandidate });
        }
      } catch (error) {
        res.status(400).json({ status: 400, error: "Something went wrong" });
      }
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

    if (_id.length < 4) {
      res.status(400).json({
        status: 400,
        error: "Your username must be at least 4 characters long.",
      });
    } else if (!email.includes("@") || !email.includes(".")) {
      res
        .status(400)
        .json({ status: 400, error: "Please enter a valid email address." });
    } else if (
      !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ||
      !confirm_password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ) {
      res.status(400).json({
        status: 400,
        error:
          "Please make sure your password contains at least 8 characters including letters and numbers.",
      });
    } else if (password !== confirm_password) {
      res.status(400).json({
        status: 400,
        error: "Please make sure your password match.",
      });
    } else if (about.length < 300) {
      res.status(400).json({
        status: 400,
        error:
          "Please make sure your About section is at least 300 characters long.",
      });
    } else if (
      _id === "" &&
      name === "" &&
      slogan === "" &&
      industry === "" &&
      location === "" &&
      employees === "" &&
      about === "" &&
      website === "" &&
      type === "" &&
      founded === "" &&
      specialties === "" &&
      logo === "" &&
      benefits === "" &&
      email === "" &&
      password === "" &&
      usertype === "" &&
      confirm_password === ""
    ) {
      res.status(400).json({
        status: 400,
        error: "Please make sure that all required fields are filled in.",
      });
    } else {
      try {
        const foundUsername = await req.app.locals.db
          .collection("employers")
          .findOne({ _id });

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
            benefits: benefits,
            email: email,
            password: password,
            usertype: usertype,
            confirm_password: confirm_password,
          };

          await req.app.locals.db
            .collection("employers")
            .insertOne(newEmployer);

          res
            .status(201)
            .json({ status: 201, message: "Success", data: newEmployer });
        }
      } catch (error) {
        res.status(400).json({ status: 400, error: "Something went wrong" });
      }
    }
  } else {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Handler for an employer to post a job.
const postJob = async (req, res) => {
  const {
    company_name,
    company_logo_url,
    title,
    category,
    candidate_required_location,
    description,
    salary,
    job_type,
    employerId,
  } = req.body;

  if (
    company_name !== "" &&
    company_logo_url !== "" &&
    title !== "" &&
    category !== "" &&
    candidate_required_location !== "" &&
    description.length >= 700 &&
    job_type !== "" &&
    employerId !== ""
  ) {
    try {
      const newJob = {
        _id: uuidv4(),
        publication_date: moment().format("MMMM Do YYYY"),
        company_name: company_name,
        employerId: employerId,
        company_logo_url: company_logo_url,
        title: title,
        category: category,
        candidate_required_location: candidate_required_location,
        description: description,
        salary: salary,
        job_type: job_type,
        exclusivity: "Remotr Employer Member",
      };

      await req.app.locals.db.collection("jobs").insertOne(newJob);

      res.status(201).json({ status: 201, message: "Success", data: newJob });
    } catch (error) {
      res.status(400).json({ status: 400, error: "Something went wrong" });
    }
  } else {
    res.status(400).json({
      status: 400,
      error:
        "Please make sure that all required fields are filled in and that your job description is at least 700 characters long. The detailed job description should include context about the job, responsibilities, qualifications, etc.",
    });
  }
};

// Handler for a candidate to send a job application directly through the Remotr website.
const sendApplication = async (req, res) => {
  const {
    company_name,
    employerId,
    company_logo_url,
    title,
    candidate_required_location,
    candidatePicture,
    name,
    candidateId,
    email,
    phone,
    candidateLocation,
    languages,
    profile,
    letter,
    resume,
  } = req.body;

  const { jobId } = req.params;

  if (!email.includes("@") || !email.includes(".")) {
    res
      .status(400)
      .json({ status: 400, error: "Please enter a valid email address." });
  } else if (letter.length < 50) {
    res.status(400).json({
      status: 400,
      error:
        "Please make sure that your application message is at least 50 characters long.",
    });
  } else if (
    company_name === "" &&
    employerId === "" &&
    title === "" &&
    candidate_required_location === "" &&
    candidatePicture === "" &&
    name === "" &&
    candidateId === "" &&
    email === "" &&
    phone === "" &&
    candidateLocation === "" &&
    languages === "" &&
    profile === "" &&
    letter === "" &&
    resume === ""
  ) {
    res.status(400).json({
      status: 400,
      error: "Please make sure that all required fields are filled in.",
    });
  } else {
    try {
      const newApplication = {
        _id: uuidv4(),
        date: moment().format("MMMM Do YYYY, h:mm a"),
        company_name: company_name,
        employerId: employerId,
        company_logo_url: company_logo_url,
        title: title,
        jobId: jobId,
        candidate_required_location: candidate_required_location,
        candidatePicture: candidatePicture,
        name: name,
        candidateId: candidateId,
        email: email,
        phone: phone,
        candidateLocation: candidateLocation,
        languages: languages,
        profile: profile,
        letter: letter,
        resume: resume,
        via: "Applied directly on Remotr!",
      };

      await req.app.locals.db
        .collection("applications")
        .insertOne(newApplication);

      res
        .status(201)
        .json({ status: 201, message: "Success", data: newApplication });
    } catch (error) {
      res.status(400).json({ status: 400, error: "Something went wrong" });
    }
  }
};

// Handler for a candidate to save an external job post from Remotive to their Remotr profile's applications section.
const saveApplication = async (req, res) => {
  const {
    company_name,
    company_logo_url,
    title,
    jobId,
    candidate_required_location,
    candidatePicture,
    name,
    candidateId,
    email,
    phone,
    candidateLocation,
    languages,
    profile,
  } = req.body;

  if (
    candidatePicture === "" &&
    name === "" &&
    candidateId === "" &&
    email === "" &&
    phone === "" &&
    candidateLocation === "" &&
    languages === "" &&
    profile === ""
  ) {
    res.status(400).json({
      status: 400,
      error: "You must have a user account and be online to apply for a job.",
    });
  } else if (
    company_name === "" &&
    company_logo_url === "" &&
    title === "" &&
    jobId === "" &&
    candidate_required_location === ""
  ) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  } else {
    try {
      const newApplication = {
        _id: uuidv4(),
        date: moment().format("MMMM Do YYYY, h:mm a"),
        company_name: company_name,
        company_logo_url: company_logo_url,
        title: title,
        jobId: jobId,
        candidate_required_location: candidate_required_location,
        candidatePicture: candidatePicture,
        name: name,
        candidateId: candidateId,
        email: email,
        phone: phone,
        candidateLocation: candidateLocation,
        languages: languages,
        profile: profile,
        via: "Applied externally on Remotive.io",
      };

      await req.app.locals.db
        .collection("applications")
        .insertOne(newApplication);

      res
        .status(201)
        .json({ status: 201, message: "Success", data: newApplication });
    } catch (error) {
      res.status(400).json({ status: 400, error: "Something went wrong" });
    }
  }
};

// Get a list of all a candidate's job applications.
const getCandidateApplications = async (req, res) => {
  const { _id } = req.params;

  try {
    const allApplications = await req.app.locals.db
      .collection("applications")
      .find({ candidateId: _id })
      .toArray();

    res
      .status(200)
      .json({ status: 200, message: "Success", data: allApplications });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get a list of all applications for a given job.
const getJobApplications = async (req, res) => {
  const { _id } = req.params;

  try {
    const allApplications = await req.app.locals.db
      .collection("applications")
      .find({ jobId: _id })
      .toArray();

    res
      .status(200)
      .json({ status: 200, message: "Success", data: allApplications });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

// Get a candidate's specific job application.
const getApplicationById = async (req, res) => {
  const { _id } = req.params;
  try {
    const oneApplication = await req.app.locals.db
      .collection("applications")
      .findOne({ _id: _id });

    res
      .status(200)
      .json({ status: 200, message: "Success", id: _id, data: oneApplication });
  } catch (error) {
    res.status(400).json({ status: 400, error: "Something went wrong" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  getEmployerJobs,
  getCandidates,
  getCandidateById,
  getEmployers,
  getEmployerById,
  handleSignIn,
  handleSignUp,
  postJob,
  sendApplication,
  saveApplication,
  getCandidateApplications,
  getJobApplications,
  getApplicationById,
};
