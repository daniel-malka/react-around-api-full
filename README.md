React Around API Full
Welcome to React Around API Full! This repository contains the backend code for the React Around project, a full-stack web application built with React.js, Node.js, and MongoDB. The React Around application allows users to share and explore interesting locations by uploading and viewing images with geolocation data.

Table of Contents:

Getting Started
Features
Prerequisites
Usage
API Endpoints
Contributing
License

Getting Started
To access the React Around frontend, visit:
http://around-dan-usa.mooo.com
To communicate with the backend API, use the following URL:
http://api.around-dan-usa.mooo.com

Or clone the repository:
git clone https://github.com/daniel-malka/react-around-api-full.git
Install the dependencies:

cd react-around-api-full
npm install
Set up environment variables:

npm run start in frontend folder app will run on: http://localhost:3000.

npm run dev in backend folder server will run on http://localhost:3001.

Features

User authentication and authorization using JWT (JSON Web Tokens).
Secure password hashing and storage using bcrypt.
Image uploading and storage using the Cloudinary service.
Geolocation tagging for images using the Mapbox API.
CRUD (Create, Read, Update, Delete) operations for user profiles and image data.
Server-side validation and error handling.
Error logging using Winston and centralized error handling middleware.
Prerequisites
Before you begin, ensure that you have the following dependencies installed:

Node.js (version 12 or later)
MongoDB (version 4 or later)
Cloudinary account (for image storage)

Usage
To interact with the API, you can use a tool like Postman or cURL to send requests to the defined API endpoints. Refer to the API Endpoints section below for more details on the available routes.

Make sure to include the appropriate HTTP methods and endpoints to interact with the API.

API Endpoints
The following API endpoints are available:

POST /signup: User registration
POST /signin: User login
GET /users/me: Get current user profile
PATCH /users/me: Update current user profile
GET /cards: Get all image cards
POST /cards: Create a new image card
DELETE /cards/:cardId: Delete a specific image card
PUT /cards/:cardId/likes: Like/unlike an image card
PATCH /cards/:cardId: Update an image card
Contributing
Contributions to this project are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

Before contributing, please review the Contributing Guidelines for more information.

License
This project is licensed under the MIT License.

Feel free to modify and customize this README file to suit your needs. Remember to include any additional sections or information specific to your project. Good luck with your development!
