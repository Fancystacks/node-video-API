const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'action'},
    {id: 4, name: 'romance'}
]

router.get('/', (req, res) => {
    res.send('Henlo World');
});

router.get('/api/courses' , (req, res) => {
    res.send(courses);
});

router.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('That course was not found.');
});

router.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('That course was not found.');

    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

router.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('That course was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;