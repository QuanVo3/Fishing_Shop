const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const route = require("./Routes/Index");

const app = express();
const port = 5000;

dotEnv.config({ path: "./Config/.env" })


//Connect mongodb
mongoose
  .connect(process.env.DB_URL, () => console.log("connected"))
  .catch((err) => console.log(err));

app.use(morgan("common"));
app.use(bodyParser({ limit: "50mb" }));
app.use(cors());

//ROUTE
app.use("/api", route);

app.listen(port, () => console.log(`Listening on port ${port}`)); // Server is running?

// //User

// //Home page
// app.get('/', (req, res) => {
//   console.log('Home Page')
// })
// // //Search Bar

// app.get('/search',(req,res)=>{
//   console.log('Search')
// })

// // //Admin
// app.get('/adminLogin',(req,res)=>{
//   console.log('Login for admin')
// })
