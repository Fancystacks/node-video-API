const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));