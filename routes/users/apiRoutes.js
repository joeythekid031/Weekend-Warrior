const Router = require('express').Router;
const { User } = require('../../models');

const userRoutes = Router();

// Get all users
userRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbUsers = await User.findAll();
    res.json(dbUsers);
  })

  .post(async (req, res) => {
    const dbUser = await User.create(req.body);
    res.json(dbUser);
  });

// Delete an user by id
userRoutes
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
    const dbUser = await User.destroy(options);
    res.json(dbUser);
  });

module.exports = userRoutes;
