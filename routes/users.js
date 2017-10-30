"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

// COMPLETED register
  router.post("/register", (req, res) => {
    let errorMessage = [];
    // const { name, email, password} = req.body;
    const name = '';
    const email = '';
    const password = 'ben';
    if (!name) {
      errorMessage.push('Name Required');
    }
    if (!email) {
      errorMessage.push('Email Required');
    }
    if (!password) {
     errorMessage.push('Password Required');
    }
    if (errorMessage.length <= 0) {
      knex('users')
        .where({
          email: email
        })
        .first()
        .then ((found) => {
          if (found) {
            res.status(409).send("User already exists");
          } else {
            knex('users')
            .insert({name, email, password})
            .catch(err => console.log('error caught'))
            .then((results) => {
              res.status(201).send("User created");
            });
          }
        })
    } else {
      res.status(400).send(errorMessage);
    }
  });
// COMPLETED login
  router.post("/login", (req, res) => {

    // const { email, password } = req.body;
    const email = "alice@alice";
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
        res.status(200).json(found.id);
      } else {
        res.status(200).send({
          error: 'Credentials Invalid.'
        });
      }
    })
  });
// COMPLETED logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).send();
  });
// COMPLETED home page
  router.get("/:user_id/resources", (req, res) => {
    knex('resources').select('resources.title', 'resources.link', 'resources.description', 'resources.id', 'res_likes.user_id')
      .leftJoin("res_likes", 'resources.id', 'res_likes.res_id')
      .where('user_id', '=', req.session.id)
      .orWhere('creator_id', '=', req.session.id)
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.json(results);
      });
  });
// COMPLETED add new resource
  router.post("/resources", (req, res) => {
    const {title, link, description} = req.body;
    const creator_id = 1; // TODO should be req.sesssion.id;
    knex.insert({title, link, description, creator_id})
      .into('resources')
      .catch(err => console.log('error caught'))
      .then(function(err, result) {
        res.send(201);
    });
  });
// COMPLETED show resource page
  router.get("/resources/:res_id/show", (req, res) => {
    Promise.all([knex
      .select('resources.title', 'resources.link', 'resources.description', 'resources.id')
      .from('resources')
      .where('id', req.params.res_id),
      knex
      .select('res_likes.user_id')
      .from('resources')
      .join('res_likes', 'resources.id', 'res_likes.res_id')
      .where('resources.id', req.params.res_id),
      knex
      .select('comment', 'users.name')
      .from('resources')
      .join('res_comments', 'resources.id', 'res_comments.res_id')
      .join('users','res_comments.user_id ', 'users.id')
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
// COMPLETED edit user page
  router.get("/users/:user_id/edit", (req, res) => {
    knex
      .select('name', 'email')
      .from('users')
      .where('id', req.session.id)
      .catch(err => console.log('error caught', err))
      .then((results) => {
        res.json(results);
    });
  });
// COMPLETED update user
  router.put("/users/", (req, res) => {
    const user_id = 1; // TODO change to req.session.id;
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
// COMPLETED like
  router.post("/resources/:id/like", (req, res) => {
    const resourceID = req.params.id;
    const user_id = 1 // TODO change to req.session.id
    knex('res_likes')
    .where({
      user_id: user_id,
      res_id: resourceID
    })
    .first()
    .then((found) => {
      if(found) {
        res.send(304);
      } else {
        knex('res_likes')
          .insert({res_id: resourceID, user_id: user_id})
          .catch(err => console.log('error caught'))
          .then((results) => {
            res.send(201);
          });
      }
    })
  });
// COMPLETED delete like
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
// COMPLETED comment
  router.post("/resources/:id/comment", (req, res) => {
    const res_id = req.params.id;
    const user_id = 1 // TODO change to req.session.id
    const comment = req.body.comment;
    knex('res_comments')
    .insert({res_id, user_id, comment})
      .catch(err => console.log('error caught'))
      .then((results) => {
        res.send(201);
      });
  });

  router.get("/resource/:id/rate", (req, res) => {
    knex('res_ratings')
      .select('rating')
      .where({
        user_id:req.session.id,
        res_id:req.params.id
      })
      .then((found) => {
        res.json(found)
      })
  })
// COMPLETED rating
  router.post("/resources/:id/rate", (req, res) => {
    const rating = req.body.rating;
    const user_id = req.session.id;
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
// COMPLETED search
  router.get("/resources/search", (req, res) => {
    const searchTerm = `%${req.query.search}%`
    knex('resources')
      .distinct('resources.id', 'resources.title')
      .select()
      .leftJoin('res_tags', 'resources.id', 'res_tags.res_id')
      .where(knex.raw('upper(title) like upper(?)', searchTerm))
      .orWhere(knex.raw('upper(tag_name) like upper(?)', searchTerm))
      .orderBy('resources.title', 'asc', 'tag_name', 'asc')
      .then((found) => {
        res.status(200).json(found);
      })
  });
  return router;
}
