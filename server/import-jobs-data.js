const { v4: uuidv4 } = require("uuid");

// Require MongoClient and access the database with the `uri` saved in the `.env` file.
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const importJobs = async () => {
  // Create new client
  const client = await new MongoClient(MONGO_URI, options);

  // Connect to client
  await client.connect();
  console.log("Connected");

  // Connect to database
  const db = client.db("remotr");

  const data = require("./data/jobs-data.json");

  const formattedJobs = data.jobs.map((e) => {
    return { ...e, _id: uuidv4() };
  });

  await db.collection("jobs").insertMany(formattedJobs);

  console.log("Jobs transferred to MongoDB");
};

importJobs();
