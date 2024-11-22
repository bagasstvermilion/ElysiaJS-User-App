"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
app.post("/data", function (req, res) {
  var _a = req.body,
    name = _a.name,
    age = _a.age;
  res.json({ name: name, age: age });
});
var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});
