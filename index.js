const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/* configure body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require('./config/database-config');

/* connecting to the database */
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

/* listen for requests */
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', err);

  server.close(() => {
    process.exit(1);
  });
});
