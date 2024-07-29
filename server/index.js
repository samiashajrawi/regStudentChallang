const express = require('express')
const cors = require('cors')
const pool = require("./db");
const app = express()

//Middelware
app.use(cors())
app.use(express.json())



//create a student

app.post("/students", async (req, res) => {
    try {
      const { first_name, last_name, check_in_time } = req.body;
    const newStudent = await pool.query(
      "INSERT INTO students (first_name, last_name, check_in_time) VALUES($1, $2, $3) RETURNING *",
      [first_name, last_name, new Date(new Date(check_in_time).toISOString())]
    );

    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get students

app.get("/index", async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");

    res.json(students.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a student

app.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await pool.query("SELECT * FROM students WHERE student_id = $1", [
      id
    ]);

    res.json(students.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


app.listen(8000, () => {
    console.log("server runing on port 8000")
})

