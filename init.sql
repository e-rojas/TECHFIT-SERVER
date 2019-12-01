DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS user_workouts CASCADE;
DROP TABLE IF EXISTS user_recipes CASCADE;
DROP TABLE IF EXISTS food_categories CASCADE;
DROP TABLE IF EXISTS drinks_tracking CASCADE;
DROP TABLE IF EXISTS drinks CASCADE;
DROP TABLE IF EXISTS drink_info CASCADE;
DROP TABLE IF EXISTS calendar CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY  NOT NULL,
  first_name VARCHAR(30)  NOT NULL,
  last_name VARCHAR(30)  NOT NULL,
  email VARCHAR(30)  NOT NULL,
  password VARCHAR(250)  NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  age INT,
  weight INT,
  height INT,
  Location VARCHAR(50),
  bio VARCHAR(250),
  image_url TEXT 
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  recipe_title VARCHAR(250) NOT NULL,
  recipe_description TEXT,
  prep_time INT,
  servings INT,
  source_url TEXT,
  photo_url TEXT 
);

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  difficulty INTEGER,
  workout_description VARCHAR(500) NOT NULL,
  image_url TEXT,
  video_url TEXT 
);

CREATE TABLE user_workouts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  workout_id INT REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE user_recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE food_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250) NOT NULL,
  recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE calendar (
  id SERIAL PRIMARY KEY NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE drinks_tracking (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  date_id INT REFERENCES calendar(id) ON DELETE CASCADE,
  water_count INT DEFAULT 0,
  coffee_count INT DEFAULT 0,
  soda_count INT DEFAULT 0,
  other_count INT DEFAULT 0
);

INSERT INTO users (first_name, last_name, email, password)
  VALUES ('Jerry','Jones', 'jerry@example.com','test123'), ('Sam','Diaz', 'sam@example.com','test123');

INSERT INTO recipes (recipe_title, recipe_description, prep_time, servings, photo_url, source_url)
  VALUES ('Cheeseburger', 'Meat between two pieces of bread otherwise known as a bun or a roll, with cheese on top of the meat, sometimes served with lettuce tomatoe and other garnishes', 20, 6, 'https://www.simplyrecipes.com/wp-content/uploads/2019/04/Stovetop-Cheeseburgers-hero1v2.jpg', 'https://www.foodrepublic.com/recipes/all-american-cheeseburger-recipe/' );

INSERT INTO workouts (name, difficulty, workout_description, image_url, video_url)
  VALUES ('Calf Raises', 3, 'The standing calf raise exercise targets your calf muscles, particularly the larger, outermost muscle that is responsible for the shape and size of your calves. Do 3 sets of 15 reps, increasing or decreasing on personal level of difficulty', 'https://experiencelife.com/wp-content/uploads/2019/02/Calf-Raise-1280x720.jpg', 'https://www.youtube.com/embed/TtfwCeVhdQM'), ('Seated Leg Raise', 5, 'Keeping your focus on your lower body, it’s time for some floor work. Not only do seated single-leg raises work your core, they can also help stabilize your knees after an injury. 20 to 30 reps per leg', 'https://www.weightwatchers.com/us/sites/default/files/styles/wwvs_image_original/public/legextension_600x400.png?itok=G-o5BLE9', 'https://www.youtube.com/embed/fAhHS10FDPU?start=17&end=27'), ('Chair Dips', 5, 'Chair dips are also called tricep dips because they work the tricep muscles on the back of the upper arms. In fact, some experts explain that chair dips are the most effective workout for this muscle. The triceps are important in everyday movement that involves extending the elbow and forearm.', 'https://cdn-xi3mbccdkztvoept8hl.netdna-ssl.com/wp-content/uploads/watermarked/Chair_Tricep_Dip_M_WorkoutLabs.png', 'https://www.youtube.com/embed/HCf97NPYeGY'), ('Push Ups', 5, 'a push-up is an exercise done laying with face, palms and toes facing down, keeping legs and back straight, extending arms straight to push body up and back down again. An example of a push-up is a great exercise that works the chest, shoulder and arm muscles.', 'https://i.stack.imgur.com/caIab.jpg', 'https://www.youtube.com/embed/8-myW5h97gs'), ('Squats', 3, 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.', 'https://www.journalmenu.com/wp-content/uploads/2017/11/air-squat-training-description-and-execution.jpg', 'https://www.youtube.com/embed/C_VtOYc6j5c'), ('Sit Ups', 3, 'Exercise performed from a supine position by raising the torso to a sitting position and returning to the original position without using the arms or lifting the feet', 'https://3i133rqau023qjc1k3txdvr1-wpengine.netdna-ssl.com/wp-content/uploads/2014/08/Full-Sit-Up_Exercise.jpg', 'https://www.youtube.com/embed/_M2Etme-tfE'), ('Stair Climbing', 3, 'Stair climbing is the climbing of a flight of stairs. It is often described as a "low-impact" exercise, often for people who have recently started trying to get in shape.', 'https://amp.thenational.ae/image/policy:1.609165:1572937599/lf16-health-stairs.jpg?f=16x9&w=1200&$p$f$w=1910f84', 'https://www.youtube.com/embed/Y1-uwSGuD5w?start=35&end=50'), ('Plank', 5, 'The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.', 'https://cdn.lifehack.org/wp-content/uploads/2017/08/11072609/plank.jpg', 'https://www.youtube.com/embed/2yQ8RHE9dCo'), ('Wall Sits', 7, 'A wall sit is an exercise done to strengthen the quadriceps muscles. It is characterized by the two right angles formed by the body, one at the hips and one at the knees. ... Then, keeping their back against the wall, they lower their hips until their knees form right angles.', 'https://citizenjournal.net/wp-content/uploads/2018/07/wall-sit-298x300.jpg', 'https://www.youtube.com/embed/DpwLOM4P-y0'), ('Bicycle Crunch', 9, 'Lie flat on the floor with your lower back pressed to the ground (pull your navel in to also target your deep abs). Put your hands behind your head, then bring your knees in towards your chest and lift your shoulder blades off the ground, but be sure not to pull on your neck.', 'https://media1.popsugar-assets.com/files/thumbor/PS7px-zLs6TeYKGt6-r-c6tNHig/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/01/05/028/n/1922398/9f869e895152330b_Bicycle1.JPG', 'https://www.youtube.com/embed/eBZ4rdDjLFM');

INSERT INTO user_workouts (user_id, workout_id)
  VALUES (1, 1);

INSERT INTO user_recipes (user_id, recipe_id)
  VALUES (1, 1);

INSERT INTO food_categories (name, recipe_id)
  VALUES ('sandwich', 1);

INSERT INTO calendar (date)
  VALUES ('2019-11-25'), ('2019-11-24');
  
INSERT INTO drinks_tracking (user_id, date_id, water_count, coffee_count, soda_count)
  VALUES (1, 1, 3, 6, 2), (1, 2,  3,  5, 1);
