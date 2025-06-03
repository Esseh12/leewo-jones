### Routes

# Documents at

`http://localhost:10000/docs/index.html`

Remember to create a .env file in the backend root and fill it up with the content of the .env.example

- to run the exucatable
  `./bin/leewo`

  BASE
  /api/v1

1. GET / -- index route shows featured adn new arrivals
2. GET /health -- health route for checking if server is still running fine
3. GET /categories/<:name:> -- category detail page - return photos of a <:name:> category
4. POST /auth/signup -- for signing up user expects `email` and `password`.
5. POST /auth/login -- for logging in user. expects `email` and `password`.
6. GET /profile -- for testing the auth middleware for protected routes
