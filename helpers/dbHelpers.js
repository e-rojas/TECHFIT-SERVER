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
  //get all recipes
  const getRecipes = (userId) => {
    console.log('hh', userId)
    const query = {
      text: `select * from recipes join user_recipes on recipes.id = user_recipes.recipe_id where user_id=$1`,
      values: [userId]
    };
    return pool.query(query);
  };

  //add new recipe
  const addRecipe = (params) => {
    console.log(params)
    const query = {
      text: `with new_recipe as (INSERT INTO recipes (recipe_title, recipe_description, prep_time, servings, photo_url, source_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING id)
      INSERT INTO user_recipes (user_id, recipe_id)
      select $7, new_recipe.id from new_recipe`,
      values: [params.recipeTitle, params.recipeDescription, parseInt(params.prepTime), parseInt(params.servings), params.photoUrl, params.sourceUrl, params.userId]
    };
    return pool.query(query)
  }

  //show workouts in database
  const showWorkouts = () => {
    const query = {
      text: `select * from workouts`, 
    };
    return pool.query(query)
  } 


  //get all user workout
  const getWorkouts = (userId) => {
    const query = {
      text: `SELECT user_workouts.id, user_id, name, workout_description, difficulty, workouts.image_url, video_url
      FROM user_workouts
      JOIN workouts on workouts.id = workout_id
      JOIN users on users.id = user_id
      WHERE user_id = $1`, 
      values: [userId]
    };
    return pool.query(query)
  } 

  //add new user workout
  const addWorkout = (params) => {
    const query = {
      text: `INSERT INTO user_workouts (user_id, workout_id) VALUES ($1, $2) RETURNING id`, 
      values: [params.user_id, params.workout_id]
    };
    console.log("HELLO DEBUG")
    console.log(params)
    return pool.query(query)
  }

  //Generate workouts by id
  const generateWorkoutsById = id => {
    const query = {
      text: "SELECT * FROM workouts WHERE id = $1",
      values: [id]
    };
    return pool.query(query);
  };

  // get user saved recipes
  const getUserRecipes = (userId) => {
    const query = {
      text: `SELECT user_recipes.id, user_id, recipe_title, recipe_description, prep_time, servings, photo_url, source_url
      FROM user_recipes
      JOIN recipes on recipes.id = recipe_id
      JOIN users on users.id = user_id
      WHERE user_id = $1`, 
      values: [userId]
    };


    return pool.query(query)
  };


  const deleteRecipe = (id) => {
    console.log("deleteID", id)
    const query = {
      text: `DELETE from user_recipes
      WHERE id = $1`,
      values: [id]
  }
  return pool.query(query)
}


  





  return {
    getUsers,
    getUserById,
    updateUser,
    addUser,
    loginUser,
    getRecipes,
    addRecipe,
    getWorkouts,
    addWorkout,
    generateWorkoutsById,
    showWorkouts,
    getUserRecipes,
    deleteRecipe

  
  };
};
