"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('email', '=', 'joao@joao')
      .then((results) => {
        req.session = results[0];
        res.redirect(`/api/users/${req.session.id}/resources`);
    });
  });


// login, NEEDS
//  Users
//    name
//    email
//    password
  router.get("/login", (req, res) => {

    knex
      .select("*")
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


// homepage, NEEDS
//   Resources:
//     Title
//     link
//     descritpion
//   Likes
//   Ratings
//     rating

  router.get("/:user_id/resources", (req, res) => {
    // we have his ID
    // res.json(req.params.id);
//     select * from resources join res_likes on (resources.id=res_likes.res_id)
// where user_id = 4;
  const stuff = {};
  knex('resources').select('resources.title', 'resources.link', 'resources.descritpion')
    .join("res_likes", 'resources.id', '=', 'res_likes.res_id')
    .where('user_id', '=', req.session.id)
    .then((results) => {
      res.json(results);
    });



    // knex
    //   .select("*")
    //   .from("resources")
    //   .where('creator_id', '=', req.session.id)
    //   .then((results) => {
    //     res.json(results);
    // });




  });

// new link, NEEDS
  router.get("/users/:user_id/resources/new", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/resources", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

// needs single RESOURCE with the current id/name, LIKES, COMMENTS, RATING
  router.get("/resources/:res_id/show", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.get("/users/:user_id/edit", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
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