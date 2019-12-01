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
                res.sendStatus(200).res.message({message:'Workout out Saved'})
        })
    })

    
    return router;
}
