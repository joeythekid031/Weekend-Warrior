const Router = require('express').Router;
const { Post } = require('../../models');

const postRoutes = Router();

// Get all posts
postRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbPosts = await Post.findAll();
    res.json(dbPosts);
  })

  // Create post
  .post(async (req, res) => {
    const dbPost = await Post.create(req.body);
    res.json(dbPost);
  });

// Delete an post by id
postRoutes
  .route('/:id')
  .put(async (_req, res) => {
    res.status(501).end();
  })
  .delete(async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };
    const dbPost = await Post.destroy(options);
    res.json(dbPost);
  });

module.exports = postRoutes;
