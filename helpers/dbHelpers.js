const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = pool => {
  //get all users
  const getUsers = ( ) => {
    console.log("getUser dbhelpers");
    const query = {
      text: "SELECT * FROM users ORDER BY id ASC"
    };
    return pool.query(query);
  };
  //get user by id
  const getUserById = id => {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id]
    };
    return pool.query(query);
  };
  //update user
  const updateUser = (first_name, last_name, email, password, age, bio, height, image_url, location, weight, id) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    const query = {
      text: "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, age= $5, bio= $6, height= $7, image_url= $8, location= $9, weight= $10 WHERE id = $11",
      values:  [first_name,last_name,email,hashPassword, age, bio, height, image_url, location, weight, id]
    };
    return pool.query(query);
  };
  const addUser = (firstName, lastName, email, password) => {
    // console.log("requested email", request.body.email);
    //---------
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email]
    };
    return pool.query(query).then(result => {
      //console.log(result.rows[0].id)
      if (result.rowCount === 0) {
        const hashPassword = bcrypt.hashSync(password, 10);
        //  const userId = result.rows[0].id;
        // console.log('>>>>',result.rows)

        const insertQuery = {
          text:
            "INSERT INTO users (first_name,last_name, email,password) VALUES ($1, $2, $3, $4) RETURNING id",
          values: [firstName, lastName, email, hashPassword]
        };
        return pool.query(insertQuery);
      } else {
        return { message: "Email Aready in Use!" };
      }
    });
  };
  //login user
  const loginUser = (email) => {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email]
    };
    return pool.query(query);
  };
  //get all users
  const getRecipes = ( ) => {
    const query = {
      text: "SELECT * FROM users ORDER BY id ASC"
    };
    return pool.query(query);
  };

  return {
    getUsers,
    getUserById,
    updateUser,
    addUser,
    loginUser,
  
  };
};
