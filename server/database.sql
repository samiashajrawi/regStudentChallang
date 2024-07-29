CREATE DATABASE students_db;
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  first_name character varying(60) NOT NULL CHECK (first_name <> ''),
  last_name character varying(60) NOT NULL CHECK (last_name <> ''),
  check_in_time TIMESTAMP DEFAULT current_timestamp
);