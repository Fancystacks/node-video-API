const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Couldnt connect to mongoDB'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Express.js course',
        author: 'Fancy Stacks',
        tags: ['express', 'backend'],
        isPublished: true
    });
    
    // create course, save and display result
    const result = await course.save();
    console.log(result);
}

createCourse();