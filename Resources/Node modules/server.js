const fs = require('fs');
const { Server } = require('socket.io'); // 'server' should be your HTTP or HTTPS server instance

const app = express();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("public"));

// Function to read the file and extract the data
const readDocument = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Assuming the document is JSON and contains an array of objects
                const parsedData = JSON.parse(data);
                // Use map to transform the array without using loops or forEach
                const extractedData = parsedData.map(({ name, surname, results }) => ({ name, surname, results }));
                resolve(extractedData);
            }
        });
    });
};

// Function to send data to React components via Socket.IO
const sendDataToReactComponents = (data) => {
    socketIO.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit('data', data);
    });
};

// Usage
const filePath = `academicRecord.json`; // Replace with the path to your document

readDocument(filePath)
    .then((extractedData) => {
        sendDataToReactComponents(extractedData);
    })
    .catch((err) => {
        console.error('Error reading document:', err);
    });

//PORT TO LISTEN TO
app.listen(1337, () => {
    console.log("Listening on localhost:1337");
});
