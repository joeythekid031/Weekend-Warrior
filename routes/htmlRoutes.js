const Router = require('express').Router;
const db = require('../models');

const htmlRoutes = new Router();

// htmlRoutes.get('/', async (req, res) => {
//   const dbExamples = await db.Example.findAll({});

//   res.render('index', {
//     msg: 'Welcome!',
//     examples: dbExamples
//   });
// });

// // Load example page and pass in an example by id
// htmlRoutes.get('/example/:id', async (req, res) => {
//   const options = {
//     where: {
//       id: req.params.id
//     }
//   };

//   const dbExample = await db.Example.findOne(options);

//   res.render('example', {
//     example: dbExample
//   });
// });

module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  app.get('/registration', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/registration-page.html'));
  });

  app.get('/adventure', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/adventure.html'));
  });

  app.get('/epic', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/epic.html'));
  });
};

// Render 404 page for any unmatched routes
htmlRoutes.get('*', async (req, res) => {
  res.render('404');
});

module.exports = htmlRoutes;
