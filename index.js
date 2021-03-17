const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Henlo World');
});

app.get('/api/courses' , (req, res) => {
    res.send([1 , 2 , 3]);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));