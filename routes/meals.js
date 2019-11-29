var express = require("express");
var router = express.Router();

module.exports = (dbHelpers) => {
    router.get('/', function (req, res) {
        console.log('hello',req.body.user_id)
        dbHelpers
        .getRecipes(req.body.user_id)
          .then(result => {
          res.send(result.rows)
        })
    })
    
    return router;
}
