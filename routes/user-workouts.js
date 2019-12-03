var express = require("express");
var router = express.Router();

module.exports = (dbHelpers) => {

  //show workouts in database

        //get all user saved Workouts
    router.get('/:id', function (req, res) {
        console.log('saved workout', req.params)
        dbHelpers
        .getWorkouts(req.params.id)
          .then(result => {
          res.send(result.rows)
        })
    })

    //add saved Workout to user
    router.post('/', function (req, res) {
        console.log("DEBUG" , req.body)
        dbHelpers
            .addWorkout(req.body)
            .then(result => {
                res.status(200).send(result.rows[0])
        })
    })


    // delete user workouts
    router.delete('/:id', function (req, res){
        console.log("delete2",req.body)
        dbHelpers
        .deleteWorkout(req.body.id)
          .then(result => {
            res.send(result.rows)
          })
      })

    
    return router;
}
