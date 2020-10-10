const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Trello Clone MongoDB database connection established successfully');
});

const listRouter = require('./routes/list.route');
const boardRouter = require('./routes/board.route');

app.use('/list', listRouter);
app.use('/board', boardRouter);

app.listen(port, () => {
  console.log(`Trello Clone Local Server is running on port: ${port}`);
});
