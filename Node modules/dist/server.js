"use strict";

var fs = require('fs');
var socketIO = require('socket.io')(server); // 'server' should be your HTTP or HTTPS server instance

var app = express();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express["static"]("public"));

// Function to read the file and extract the data
var readDocument = function readDocument(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        // Assuming the document is JSON and contains an array of objects
        var parsedData = JSON.parse(data);
        // Use map to transform the array without using loops or forEach
        var extractedData = parsedData.map(function (_ref) {
          var name = _ref.name,
            surname = _ref.surname,
            results = _ref.results;
          return {
            name: name,
            surname: surname,
            results: results
          };
        });
        resolve(extractedData);
      }
    });
  });
};

// Function to send data to React components via Socket.IO
var sendDataToReactComponents = function sendDataToReactComponents(data) {
  socketIO.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('data', data);
  });
};

// Usage
var filePath = "academicRecord.json"; // Replace with the path to your document

readDocument(filePath).then(function (extractedData) {
  sendDataToReactComponents(extractedData);
})["catch"](function (err) {
  console.error('Error reading document:', err);
});

//PORT TO LISTEN TO
app.listen(1337, function () {
  console.log("Listening on localhost:1337");
});