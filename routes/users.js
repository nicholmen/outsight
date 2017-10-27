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
      .select('name', 'email', 'password')
      .from("users")
      .then((results) => {
        res.json(results);
    });

  });

  router.post("/register", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/login", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/logout", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
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
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.get("/resources/:res_id/show", (req, res) => {
    const doozy = {};
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
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/res/:id/like", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/res/:id/comment", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.put("/res/:id/rate", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.delete("/res/:id/like", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  return router;
}