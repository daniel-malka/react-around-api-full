React News-explorer
Welcome to the React News Explorer API frontend repository! This project is the frontend part of a full-stack web application built with React, Node.js, and MongoDB. It allows users to search articles by keywords using the "news-explorer API worldwide," save the articles, view their images, source, title, description, and surf to the article source page.

Installation
The app is running on a VM at "https://www.news-expo.mooo.com".

The server is running on a VM at "https://api.news-expo.mooo.com".

To run this project locally, you need to have Node.js, MongoDB, and Git installed on your machine.

Clone this repository to your local machine.
Navigate to the root directory of the project in your terminal.
Run npm install to install the dependencies.
Run npm run start to start the app.
The homepage will start running at http://localhost:3000.
API Endpoints
The API exposes the following endpoints:

POST /signup - returns a bearer token upon successful registration.
POST /signin - logs in a registered user.
GET /articles - returns a list of all articles of the logged-in user.
GET /users/me - returns the user with the specified userId.
POST /articles - saves the desired article.
DELETE /articles/:articleId - unsaves the article from the saved articles list.
Technologies
This project is built using the following technologies:

Node.js
Express.js
MongoDB
Mongoose
bcrypt
jsonwebtoken
cors
The server is using the following technologies:

Google Cloud
ssh keygen
Nginx
pm2
certbot
logs | Winston | Celebrate | Joi
Contributing
We welcome contributions to this project! To contribute, please fork this repository, create a new branch with your changes, and submit a pull request.

License
This project is licensed under the Practicum 100 - Masters School By Yandex.
