const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'action'},
    {id: 4, name: 'romance'}
]

router.get('/api/genres', (req, res) => {
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

module.exports = router;