"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
app.post("/data", function (req, res) {
    var _a = req.body, name = _a.name, age = _a.age;
    res.json({ name: name, age: age });
});
app.delete("/data/:id", function (req, res) {
    var id = req.params.id;
    res.json({ message: "Data with ID ".concat(id, " deleted") });
});
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
