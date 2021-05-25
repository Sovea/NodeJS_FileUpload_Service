var express = require('express');
var https = require('https');
var fs = require('fs');
var cors = require('cors');
var filesRouter = require('./routes/files');
var cookieParser = require('cookie-parser');
var app = express();
const options = {
   key: fs.readFileSync('./assets/keys/server.key'),
   cert: fs.readFileSync('./assets/keys/server.cert')
};
var httpsServer = https.createServer(options, app);

app.use(cookieParser('#12Ac_'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
   credentials: true,
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "Access-Control-Allow-Origin": "*",
   "preflightContinue": false,
   "optionsSuccessStatus": 204,
   exposedHeaders: ["Authorization", "authorization"]
}));

// app.use(express.static(__dirname + "/public", { index: "login.html" }));// default page

app.use('/files', filesRouter);

function isEmptyObject(obj) {
   var name;

   for (name in obj) {
      return false;
   }
   return true;
}

httpsServer.listen(8999, () => {
   console.log('Server Listening at 8999......');
});

module.exports = app
