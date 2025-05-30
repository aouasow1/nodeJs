const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to Mongodb
const dbURI = 'mongodb+srv://netninjas:1234tests@nodetuts.eujtpxa.mongodb.net/?retryWrites=true&w=majority&appName=Nodetuts';
mongoose.connect(dbURI)
    .then((result) =>  app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//middlewares & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>');
    res.render('about', {title: 'About'});
});
//blog routes
app.use('/blogs', blogRoutes)

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})
