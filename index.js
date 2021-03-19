const Joi = require("joi");
const debug = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const logger = require('./logger');
const morgan = require('morgan');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan is now enabled...');
}

// DB logger
debug('Connected to the database...');

app.use(logger);

const genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'action'},
    {id: 4, name: 'romance'}
]

app.get('/', (req, res) => {
    res.render('index.pug', {title: 'My express app', message: 'Henlo'});
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Sorry, that genre wasnt found');

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Sorry, that genre wasnt found');
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Sorry, that genre wasnt found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const courses = [ 
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));