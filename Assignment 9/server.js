import express from "express";
const app = express();
import fs from "fs";

app.use(express.static("public"));

const http = require("http").Server(app); 
const io = require("socket.io")(http);

http.listen(3000, () => {
    console.log("Listening on localhost:3000");
});

const { MongoClient } = require("mongodb");

// your mongodb details go here
const uri =
  "mongodb+srv://<username>:<password>@<clustername>.xxxxx.mongodb.net/DBExample?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('DBExample');
    const classes = database.collection('classes');

    let query = { };
    let options = {
        projection: {"name": 1,"code": 1,"_id": 0},
    };
    let cursor = classes.find(query, options);

    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }

    let allValues = await cursor.toArray();
    console.log(allValues);
    io.on("connection", socket => {
        socket.emit("classes", allValues);
        socket.on("code", data => onModuleClick(data, socket));
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const onModuleClick = (code, socket) => {
    console.log(code);
    async function run() {
        try {
          await client.connect();
      
          const database = client.db('DBExample');
          const users = database.collection('users');
      
          let query = {"$and":[ {"enrolled":{"$all":[code]}}, {"position":"student"} ]};
          let cursor = users.find(query);
      
          if ((await cursor.count()) === 0) {
              console.log("No students found!");
              socket.emit("students", []);
          }
      
          let allValues = await cursor.toArray();
          console.log(allValues);
          socket.emit("students", allValues);
        } finally {
          await client.close();
        }
    }
    run().catch(console.dir);
}