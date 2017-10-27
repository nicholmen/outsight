"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('email', '=', 'alice@alice')
      .then((results) => {
        req.session = results[0];
        res.redirect(`/api/users/${req.session.id}/resources`);
    });
  });

  router.get("/login", (req, res) => {
    knex
      .select('email', 'password')
      .from("users")
      .then((results) => {
        res.json(results);
    });

  });

  router.post("/register", (req, res) => {
    const { name, email, password} = req.body;
    if (!name | !email | !password) {
      res.status().send("something wasnt entered");
    }

    knex.insert({name: 'shane', email: 'shane@shane', password: 'shane'})
      .into('users')
      .then(function(err, result) {
        process.exit();
      });
    res.redirect(`/api/users/${req.session.id}/resources`);
  });

  router.post("/login", (req, res) => {
    req.session = req.body.data;
    res.redirect(`/api/users/${req.session.id}/resources`);
  });

  router.post("/logout", (req, res) => {
    req.session.user_id = null
    res.redirect(`/api/users/login`);
  });

  router.get("/:user_id/resources", (req, res) => {
    knex('resources').select('resources.title', 'resources.link', 'resources.description')
      .leftJoin("res_likes", 'resources.id', 'res_likes.res_id')
      .where('user_id', '=', req.session.id)
      .orWhere('creator_id', '=', req.session.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/users/:user_id/resources/new", (req, res) => {
    knex
      .select('id')
      .from('resources')
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/resources", (req, res) => {
    knex.insert({title: 'Title doozey', link: 'www.googl.com', description: 'description new'})
      .into('resources')
      .then(function(err, result) {
    });
  });

  router.get("/resources/:res_id/show", (req, res) => {
    Promise.all([knex
      .select('resources.title', 'resources.link', 'resources.description')
      .from('resources')
      .where('id', req.params.res_id),
      knex
      .count('res_likes.user_id')
      .from('resources')
      .join('res_likes', 'resources.id', 'res_likes.res_id')
      .where('resources.id', req.params.res_id),
      knex
      .select('comment')
      .from('resources')
      .join('res_comments', 'resources.id', 'res_comments.res_id')
      .where('resources.id', req.params.res_id),
      knex
      .select('tag_name')
      .from('resources')
      .join('res_tags', 'resources.id', 'res_tags.res_id')
      .where('resources.id', req.params.res_id),
      knex
      .avg('res_ratings.rating')
      .from('resources')
      .join('res_ratings', 'resources.id', 'res_ratings.res_id')
      .where('resources.id', req.params.res_id)
    ]).then((resources) => {
      res.json(resources);
    })
  });

  router.get("/users/:user_id/edit", (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('id', req.session.id)
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/users/", (req, res) => {

    knex('users').update({name: req.body.name});

  });






  router.post("/resources/:id/like", (req, res) => {
    const resourceID = req.params.id;
    knex('res_likes')
    .where({
      user_id: 1,
      res_id: resourceID
    })
    .first()
    .then((found) => {
      if(found) {
        res.send(304);
      } else {
        knex('res_likes')
          .insert({res_id: resourceID, user_id: 1})
          .catch(err => console.log('error caught'))
          .then((results) => {
            res.send(201);
          });
      }
    })
  });

  router.delete("/resources/:id/like", (req, res) => {
    const resourceID = req.params.id;
    knex('res_likes')
      .where({res_id: resourceID, user_id: 1})
      .del()
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.send(200);
      });
  });

  router.post("/resources/:resources_id/comment", (req, res) => {
    // knex.insert({name: 'hjhg', email: 'hhj', password: '' })
    //   .into('users')
    //   .then(function(err, result) {

    // });
  });

  router.put("/resources/:id/rate", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });


  return router;
}