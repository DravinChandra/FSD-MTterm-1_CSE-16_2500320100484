import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.post("/api/students", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    students.push(req.body);

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.send("Student added successfully!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});