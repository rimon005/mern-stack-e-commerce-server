const express = require("express")
const app = express();
const mongodb = require("mongodb")

const port = process.env.PORT || 5000;

app.listen(port ,() => {
    console.log('backend server is running');
})