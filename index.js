const Joi = require("joi");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const courses = [ 
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Henlo World');
});

app.get('/api/courses' , (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(2).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('That course was not found.');
    res.send(course);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));