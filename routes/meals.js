var express = require("express");
var router = express.Router();

module.exports = (dbHelpers) => {
        //get all user saved recipes
    router.get('/', function (req, res) {
        console.log('hello',req.body.user_id)
        dbHelpers
        .getRecipes(req.body.user_id)
          .then(result => {
          res.send(result.rows)
        })
    })

    //add saved meals to user
    router.post('/', function (req, res) {
        dbHelpers
            .addRecipe(req.body)
            .then(result => {
                res.sendStatus(200).res.message({message:'Succesfully submitted!!'})
        })
    })

    
    return router;
}
