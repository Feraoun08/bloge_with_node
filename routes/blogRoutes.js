const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogControler');

const router = express.Router();

router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

router.get('/blogs', blogController.blog_index);

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(() => res.redirect('/blogs'))
    .catch(() => res.status(400).render('create', { title: 'Create a new blog' }));
});

router.get('/blogs/:id', blogController.blog_details);

router.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ redirect: '/blogs' }))
    .catch(() => res.status(500).json({ error: 'Unable to delete note' }));
});

module.exports = router;
