require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dns = require('dns');
const blogRoutes = require('./routes/blogRoutes');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => res.redirect('/blogs'));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.use(blogRoutes);
app.use((req, res) => res.status(404).render('404', { title: '404' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection failed:', err));
