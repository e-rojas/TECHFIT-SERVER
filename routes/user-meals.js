var express = require("express");
var router = express.Router();

module.exports = (dbHelpers) => {

  //show workouts in database

        //get all user saved recipes
    router.get('/:id', function (req, res) {
        console.log('saved recipe', req.params)
        dbHelpers
        .getUserRecipes(req.params.id)
          .then(result => {
          res.send(result.rows)
        })
    })

    router.delete('/:id', function (req, res){
      console.log("delete2",req.body)
      dbHelpers
      .deleteRecipe(req.body.id)
        .then(result => {
          res.send(result.rows)
        })
    })

    
    return router;
}
