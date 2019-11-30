var express = require("express");
var router = express.Router();

module.exports = (dbHelpers) => {

  //show workouts in database

        //get all user saved Workouts
    router.get('/', function (req, res) {
        console.log('saved workout', req.body.user_id)
        dbHelpers
        .getWorkouts(req.body.user_id)
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
