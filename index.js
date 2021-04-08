const Joi = require("joi");
const debug = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const logger = require('./logger');
const morgan = require('morgan');
const helmet = require('helmet');
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const home = require('./routes/home');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan is now enabled...');
}

// DB logger
debug('Connected to the database...');

app.use(logger);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));