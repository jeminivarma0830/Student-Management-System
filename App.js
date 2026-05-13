const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    email: String,
    course: String,
    attendance: Number,
    marks: Number
});

const Student = mongoose.model('Student', StudentSchema);

// Add Student
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

// Get All Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// Update Student
app.put('/students/:id', async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(updated);
});

// Delete Student
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send('Student Deleted');
});

app.listen(5000, () => {
    console.log('Server Running on Port 5000');
});