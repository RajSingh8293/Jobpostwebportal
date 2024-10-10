import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import dotenv from "dotenv";
// dotenv.config();
// or
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5500;

// app.use(cors());
const corsOptions = {
  // origin: ["http://localhost:5178"],
  origin: ["https://jobpostwebportal-frontedn.vercel.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("./public"));

// routes
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import connectDb from "./db/conn.js";

app.get("/", (req, res) => {
  res.send("Job Portal Web!");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", jobRouter);
app.use("/api/v1", applicationRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
