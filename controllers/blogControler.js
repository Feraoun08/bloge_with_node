const Blog = require('../models/blog');

const blog_index =(req,res) => {
    Blog.find()
    .then(result => {
      res.render('index', {
        title: 'All blogs',
        blogs: result
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving blogs');
    });
}

const blog_details =(req,res)=>{
    const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports={
  blog_index,blog_details
}