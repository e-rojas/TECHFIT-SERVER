const express = require('express');
const router = express.Router();
const dbHelpers = require('../helpers/dbHelpers');

module.exports = (dbHelpers) => {
  //Base of these routes is /api/user-drinks/

  router.post('/', (req, res) => {
    const { id, action, drinkType } = req.query;

    //Check for current day in calendar
    dbHelpers
      .getCurrentDay()
      .then((dayResults) => {
        if (dayResults.rows.length !== 0) {
          const dateId = dayResults.rows[0].id;
          //Update count as request by user
          dbHelpers
            .updateCount(id, dateId, action, drinkType)
            .then((updateResults) => {
              //Count has been updated successfully
              //State change will be dispatched by Client-side
              res.status(200).send();
            })
            .catch((e) => {
              res.status(500).send();
            })
        } else if (dayResults.rows.length === 0) {
          //Create date in calendar table
          dbHelpers.insertDate()
            .then((results) => {
              //get the ID of the current day
              dbHelpers
                .getCurrentDay()
                .then((newDayResults) => {
                  const newDateId = newDayResults.rows[0].id;
                  //Initialize drink_tracking row for this date and user
                  dbHelpers
                    .initializeCount(id, newDateId)
                    .then((results) => {
                      //Update count as requested by user
                      dbHelpers
                        .updateCount(id, newDateId, action, drinkType)
                        .then((updateResults) => {
                          res.status(200).send();
                        })
                        .catch((e) => {
                          res.status(500).send();
                        })
                    })
                    .catch((e) => {
                      res.status(500).send();
                    })
                  })
                })
            .catch((e) => {
              res.status(500).send();
              })
          
        .catch((e) => {
          res.status(500).send();
        })
      }
    })
  });

  router.get('/', (req, res) => {
    const { id } = req.query;

    dbHelpers
      .getDrinksTracking(id)
      .then((results) => {
        if(results.rows.length === 0) {
          dbHelpers.insertDate()
            .then((results) => {
              //get the ID of the current day
              dbHelpers
                .getCurrentDay()
                .then((newDayResults) => {
                  const newDateId = newDayResults.rows[0].id;
                  //Initialize drink_tracking row for this date and user
                  dbHelpers
                    .initializeCount(id, newDateId)
                    .then((results) => {
                      //Update count as requested by user
                      dbHelpers
                        .updateCount(id, newDateId, action, drinkType)
                        .then((updateResults) => {
                          res.status(200).send();
                        })
                        .catch((e) => {
                          res.status(500).send();
                        })
                    })
                    .catch((e) => {
                      res.status(500).send();
                    })
                  })
                })
        } else {
          res
            .json(results)
            .status(200)
        }

      })
      .catch((e) => {
        res
          .json(e)
          .status(500);
      })
  })

  router.get('/chart', (req, res) => {
    const { id } = req.query;

    dbHelpers
      .getDrinksChart(id)
      .then((results) => {
        res
          .json(results)
          .status(200);
      })
      .catch((e) => {
        res
          .json(e)
          .status(500);
      })
  })

  return router;
};