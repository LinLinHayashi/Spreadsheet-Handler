import express from "express";
// import dotenv from "dotenv";
import {uploadFile, downloadFile} from "./controllers/file.controller.js";
import multer from 'multer';

// dotenv.config();

const app = express();
app.use(express.json());

app.listen(8086, () => {
    console.log("Server is running on port 8086!");
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){ // "cb" refers to a callback function. 
        cb(null, "./api/files"); // The path here sees "Spreadsheet-Handler" as the root.
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({storage});

app.post("/api/upload", upload.single("file"), uploadFile);
app.get("/api/download/:filename", downloadFile);

// The middleware for error handling.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false, // If there is an error, "success" will be set to false.
      statusCode,
      message,
    });
  });