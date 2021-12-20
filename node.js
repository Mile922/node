const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910627');
app.use('/',express.static('public'))
app.listen(10627)