'use strict';

// // Require MongoClient and access the database with the `uri` saved in the `.env` file.
// const { MongoClient } = require('mongodb');
// require('dotenv').config();
// const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Import the needed node_modules
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))
  .use(express.json())

  // Nothing to modify above this line
  // ---------------------------------
  // Add new endpoints here 👇

  // Add new endpoints here 👆
  // ---------------------------------
  // Nothing to modify below this line

  // This is our catch all endpoint
  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      error: 'Something went wrong',
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));

// const setup = async () => {
//   // Create new client
//   const client = await new MongoClient(MONGO_URI, options);

//   // Connect to client
//   await client.connect();
//   console.log('Connected');

//   // Connect to database
//   const db = client.db('');

//   // Node spins up our server and sets it to listen on port 8000
//   app.listen(8000, () => {
//     console.log(`Listening on port 8000`);
//     app.locals.db = db;
//   });
// };

// setup();
