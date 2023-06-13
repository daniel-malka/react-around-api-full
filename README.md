# React Around API Full

Welcome to the React Around API Full repository! This project is a full-stack web application built with React, Node.js, and MongoDB, which allows users to share and view images with other users. This repository contains the backend code for the application.

## Installation

The app is running on VM on "https://around-dan.chickenkiller.com"

The vm server is currently off

To run this project locally, you need to have Node.js and MongoDB and Git installed on your machine.

1. Clone backend repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the dependencies.
4. modify the url of react-around-api-full/frontend/src/utils/Auth.js and /Api.js to BASE_URL
5.in case you cloned the frontend repo, go to /frontend and Run `npm run start` to start the app.
6. Open a new Terminal, go to /backend and Run `npm run dev` to activate the server using nodemon.
7. The Homepage is availabe "https://around-dan.chickenkiller.com" or locally on `http://localhost:3000`;
8. The server will start running on `http://localhost:3001`.

## API Endpoints

The API exposes the following endpoints:

- `GET /users` - returns a list of all registered users.
- `GET /users/:userId` - returns the user with the specified `userId`.
- `POST /users` - creates a new user with the given name, email, and password.
- `PATCH /users/me` - updates the user's name and about.
- `PATCH /users/me/avatar` - updates the user's avatar image.
- `GET /cards` - returns a list of all cards.
- `POST /cards` - creates a new card with the given image link and description.
- `DELETE /cards/:cardId` - deletes a card that was created by the same user.
- `PUT /cards/:cardId/likes` - adds a like to the card with the specified `cardId`.
- `DELETE /cards/:cardId/likes` - removes a like from the card with the specified `cardId`.

## Technologies

This project is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- cors

  The server is using the following technologies:

- Google Cloud
- ssh keygen
- Nginx
- pm2
- certbot
- logs | Winston | Celabrate | Joi

## Contributing

We welcome contributions to this project! To contribute, please fork this repository, create a new branch with your changes, and submit a pull request.

## License

This project is licensed under the Practicum 100 - Masters school By Yandex.
