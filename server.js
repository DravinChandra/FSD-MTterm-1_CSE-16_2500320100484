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


app.put("/api/students/:id", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.send("Student not found");
    }

    students[index] = {
        ...students[index],
        ...req.body
    };

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.send("Student updated successfully!");
});

app.delete("/api/students/:id", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    const id = parseInt(req.params.id);

    const newStudents = students.filter(student => student.id !== id);

    if (students.length === newStudents.length) {
        return res.send("Student not found");
    }

    fs.writeFileSync("students.json", JSON.stringify(newStudents, null, 2));

    res.send("Student deleted successfully!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});