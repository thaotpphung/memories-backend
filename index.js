import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send("Hello to memories API");
});

const dbURL = process.env.MONGODB_URI || "mongodb://127.0.0.1/react-stockapp"

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Connected to DB! " + dbURL)
}).catch(err => {
  console.log(err.message);
});

let port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Stock App Server Has Started! " + port);
});

