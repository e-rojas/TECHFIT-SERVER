const express = require('express');
const router = express.Router();
const dbHelpers = require('../helpers/dbHelpers');

module.exports = (dbHelpers) => {
  //Base of these routes is /api/user-drinks/

  router.post('/', (req, res) => {
    const query = req.query;

    dbHelpers
      .updateDrinksTracking(query)
      .then((results) => {
        res
          .json(results)
          .status(200)
      })
      .catch((e) => {
        console.log(e)
        res.status(500)
      })

  })

  router.get('/', (req, res) => {
    const { id } = req.query;

    dbHelpers
      .getDrinksTracking(id)
      .then((results) => {
        res
          .json(results)
          .status(200)
      })
      .catch((e) => console.log(e))
  })
  return router;
};