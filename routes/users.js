"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


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

    // const { email, password } = req.body;
    const email = "alex@alex.alex";
    const password = "alice";
    knex('users')
    .where({
      email: email,
      password: password
    })
    .first()
    .then((found) => {
      if(found) {
        req.session.id = found.id;
        res.status(200).send(found.id);

      } else {
        res.status(200).send({
          error: 'Credentials Invalid.';
        });
      }
    })
  });

  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect(`/api/users/login`);
  });
// COMPLETED
  router.get("/:user_id/resources", (req, res) => {
    knex('resources').select('resources.title', 'resources.link', 'resources.description')
      .leftJoin("res_likes", 'resources.id', 'res_likes.res_id')
      .where('user_id', '=', req.session.id)
      .orWhere('creator_id', '=', req.session.id)
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.json(results);
      });
  });
// COMPLETED
  router.post("/resources", (req, res) => {
    // const {title, link, description} = req.body;
    const creator_id = 1; // TODO should be req.sesssion.id;
    const title = "title18";
    const link = "https://www.google.ca/maps";
    const description = "google maps such wow many cools";
    knex.insert({title, link, description, creator_id})
      .into('resources')
      .catch(err => console.log('error caught'))
      .then(function(err, result) {
        res.send(201);
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
    ])
    .catch(err => console.log('error caught'))
    .then((resources) => {
      res.json(resources);
    });
  });
// COMPLETED
  router.get("/users/:user_id/edit", (req, res) => {
    knex
      .select('name, email')
      .from('users')
      .where('id', req.session.id)
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.json(results);
    });
  });
// COMPLETED
  router.put("/users/", (req, res) => {
    const user_id = 99; // TODO change to req.session.id;
    // const { name, email } = req.body;
    const name = "alex";
    const email = "alex@alex.alex"
    let password = ''
    knex('users')
    .where({
      id: user_id,
    })
    .first()
    .then((results) => {
      if (results) {
        password = results[0].password;
        knex('users')
          .update({name, email, password})
          .where('id', user_id)
          .catch(err => console.log('error caught'))
          .then((results) => {
            res.send(200);
          })
      } else {
        res.send(404);
      }
    })
  });
// COMPLETED
  router.post("/resources/:id/like", (req, res) => {
    const resourceID = req.params.id;
    const fakeUser = 1 // TODO change to req.session.id
    knex('res_likes')
    .where({
      user_id: fakeUser,
      res_id: resourceID
    })
    .first()
    .then((found) => {
      if(found) {
        res.send(304);
      } else {
        knex('res_likes')
          .insert({res_id: resourceID, user_id: fakeUser})
          .catch(err => console.log('error caught'))
          .then((results) => {
            res.send(201);
          });
      }
    })
  });
// COMPLETED
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
// COMPLETED
  router.post("/resources/:id/comment", (req, res) => {
    const res_id = req.params.id;
    const user_id = 1 // TODO change to req.session.id
    const comment = 'NO WAY this thing is so nifty!' // TODO change to req.body.comment
    knex('res_comments')
    .insert({res_id, user_id, comment})
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.send(201);
      });
  });
// COMPLETED
  router.post("/resources/:id/rate", (req, res) => {
    const rating = 3; // TODO change to req.body.rating
    const user_id = 7 // TODO change to req.session.id
    const res_id = req.params.id;
    knex('res_ratings')
    .where({
      user_id: user_id,
      res_id: res_id
    })
    .first()
    .then((found) => {
      if(found) {
        knex('res_ratings')
        .where({
          user_id: user_id,
          res_id: res_id
        })
        .update({
          rating: rating
        })
        .catch(err => console.log('error caught'))
        .then((results) => {
          res.send(200);
        });
      } else {
        knex('res_ratings')
        .insert({res_id, user_id, rating})
        .catch(err => console.log('error caught'))
        .then((results) => {
          res.send(201);
        });
      }
    })
  });

  return router;
}