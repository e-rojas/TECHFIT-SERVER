var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = dbHelpers => {

  router.get('/user-info', function (req, res) {
    console.log('test')
    console.log(req.headers)
    const { authorization} = req.headers;
    const [bearer, token] = authorization.split(" ");
     //extracting the payload  example {userId: 1}
    const payload = jwt.verify(token, process.env.SECRET);
    console.log('after payload')

    dbHelpers
    .getUserById(payload.userID)
      .then(result => {
      res.send(result.rows[0])
    })
  })

  /* GET users listing. */
  router.get("/", function(req, res) {
    console.log("getting users");
    dbHelpers
      .getUsers()
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.get("/:id", function(req, res) {
    const id = parseInt(req.params.id);
    dbHelpers
      .getUserById(id)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.put("/:id", function(req, res) {
    const id = parseInt(req.params.id);
    console.log(req.body);
    const {first_name,last_name,email,password, age, bio, height, image_url, location, weight} = req.body;
   
    dbHelpers
      .updateUser(first_name,last_name,email,password, age, bio, height, image_url, location, weight, id)
      .then(result => {
        //if in query $2 RETURNING * use result.rows as an answer.
        res.status(200).send(`User modified with ID: ${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.post("/", function(req, res) {
    const { first_name, last_name, email, password } = req.body;

    dbHelpers
      .addUser(first_name, last_name, email, password)
      .then(result => {
        if (result.rows) {
          const userId = result.rows[0].id;
          const token = jwt.sign({ userId }, process.env.SECRET);
          res.status(200).json({
            message: "You are logged in!!",
            token: token
          });
        } else {
          res.status(200).json({
            message: result.message
          });
        }
        // console.log(result)
        // res.status(200).send({message:'Signup Successfuly ',token:token})
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.post("/login", function(request, response) {
    const { email, password } = request.body;
    dbHelpers.loginUser(email).then(res => {
      if (res.rowCount === 1) {
        bcrypt.compare(password, res.rows[0].password, (err, match) => {
          if (match) {
            const token = jwt.sign(
              { userID: res.rows[0].id },
              process.env.SECRET
            );
            response.send({ message: "You are logged in!", token: token });
          } else {
            response.send({ message: "Invalid Password!!" });
          }
        });
      } else {
        response.send({ message: "No email found!!" });
      }
    });
  });

  // router.get('/test', function (req, res) {
  // console.log('test')
  //   //const { authorization} = req.headers;
  //   //const [, token] = authorization.split(" ");
  //    // extracting the payload  example {userId: 1}
  //   //const payload = jwt.verify(token, process.env.SECRET);
  //   //console.log(payload)
  //   // dbHelpers
  //   // .getUserById(payload.userID)
  //   //   .then(result => {
  //   //   console.log(result)
  //   // })
  // })
  return router;
};
