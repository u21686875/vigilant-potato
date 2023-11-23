"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var app = (0, _express["default"])();
app.use(_express["default"]["static"]("public"));

var http = require("http").Server(app);

var io = require("socket.io")(http);

http.listen(3000, function () {
  console.log("Listening on localhost:3000");
});

var _require = require("mongodb"),
    MongoClient = _require.MongoClient;

var uri = "mongodb+srv://u21649988:jlIC38ctO2U1zken@cluster0.c97pkq8.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(uri);

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var database, classes, query, options, cursor, allValues;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return client.connect();

          case 3:
            database = client.db('DBExample');
            classes = database.collection('classes');
            query = {};
            options = {
              projection: {
                "name": 1,
                "code": 1,
                "_id": 0
              }
            };
            cursor = classes.find(query, options);
            _context2.next = 10;
            return cursor.count();

          case 10:
            _context2.t0 = _context2.sent;

            if (!(_context2.t0 === 0)) {
              _context2.next = 13;
              break;
            }

            console.log("No documents found!");

          case 13:
            _context2.next = 15;
            return cursor.toArray();

          case 15:
            allValues = _context2.sent;
            console.log(allValues);
            io.on("connection", function (socket) {
              socket.emit("classes", allValues);
              socket.on("code", function (data) {
                return onModuleClick(data, socket);
              });
            });

          case 18:
            _context2.prev = 18;
            _context2.next = 21;
            return client.close();

          case 21:
            return _context2.finish(18);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0,, 18, 22]]);
  }));
  return _run.apply(this, arguments);
}

run()["catch"](console.dir);

var onModuleClick = function onModuleClick(code, socket) {
  console.log(code);

  function run() {
    return _run2.apply(this, arguments);
  }

  function _run2() {
    _run2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var database, users, query, cursor, allValues;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return client.connect();

            case 3:
              database = client.db('DBExample');
              users = database.collection('users');
              query = {
                "$and": [{
                  "enrolled": {
                    "$all": [code]
                  }
                }, {
                  "position": "student"
                }]
              };
              cursor = users.find(query);
              _context.next = 9;
              return cursor.count();

            case 9:
              _context.t0 = _context.sent;

              if (!(_context.t0 === 0)) {
                _context.next = 13;
                break;
              }

              console.log("No students found!");
              socket.emit("students", []);

            case 13:
              _context.next = 15;
              return cursor.toArray();

            case 15:
              allValues = _context.sent;
              console.log(allValues);
              socket.emit("students", allValues);

            case 18:
              _context.prev = 18;
              _context.next = 21;
              return client.close();

            case 21:
              return _context.finish(18);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0,, 18, 22]]);
    }));
    return _run2.apply(this, arguments);
  }

  run()["catch"](console.dir);
};