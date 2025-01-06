    API Documentation


User Service Endpoints

1. Register a New User
Endpoint: POST /api/users/register
Description: Registers a new user in the system.
  Request Body:
                {
    "username": "string",
    "password": "string"
                 }
   Responses:
              201 Created: User successfully registered.
             {
    "id": 1,
    "username": "testuser",
    "created_at": "2023-01-01T00:00:00Z"
              }

2. Authenticate a User
Endpoint: POST /api/users/login
Description: Authenticates a user and returns a JWT token.
  Request Body:
                {
    "username": "string",
    "password": "string"
                }
   Responses:
            200 OK: Authentication successful.
             {
    "token": "your_jwt_token"
              }

3. Retrieve User Details
Endpoint: GET /api/users/:id
Description: Retrieves details of a specific user by ID.
  Parameters:
    id: User ID.
  Responses:
            200 OK: User details retrieved.
                 {
    "id": 1,
    "username": "testuser",
    "created_at": "2023-01-01T00:00:00Z"
                  }
             404 Not Found: User not found.


4. Edit User Profile
Endpoint: PUT /api/users/:id
Description: Updates the user's password or other profile details.
    Parameters:
      id: User ID.
  Request Body:
              {
    "password": "new_password"
              }
   Responses:
          200 OK: User details updated successfully.
             {
    "id": 1,
    "username": "testuser",
    "created_at": "2023-01-01T00:00:00Z"
            }
           404 Not Found: User not found.

5. Delete User
Endpoint: DELETE /api/users/:id
Description: Deletes a specific user by ID.
    Parameters:
      id: User ID.
    Responses:
            200 OK: User deleted successfully.
             {
    "message": "User deleted successfully"
              }
             404 Not Found: User not found.


Blog Service Endpoints

1. Create a New Blog Post
Endpoint: POST /api/blogs
Description: Creates a new blog post.
    Request Body:
                 {
    "title": "string",
    "content": "string",
    "author_id": 1
                  }

    Responses:
            201 Created: Blog post created successfully
              {
    "id": 1,
    "title": "My First Blog",
    "content": "This is my first blog post.",
    "author_id": 1,
    "created_at": "2023-01-01T00:00:00Z"
              }

   
2. List All Blog Posts
   
Endpoint: GET /api/blogs
Description: Retrieves a paginated list of all blog posts.
Query Parameters:
page: Page number (default is 1).
limit: Number of posts per page (default is 10).
    Responses:
            200 OK: List of blog posts retrieved.
            [
    {
        "id": 1,
        "title": "My First Blog",
        ...
    },
    ...
              ]


3. Fetch a Specific Blog Post
Endpoint: GET /api/blogs/:id
Description: Retrieves a specific blog post by ID.
Parameters:
id: Blog post ID.
      Responses:
                200 OK: Blog post retrieved successfully.

                  {
    "id": 1,
    ...
                    }
     
4. Edit an Existing Blog Post
Endpoint: PUT /api/blogs/:id
Description: Updates an existing blog post by ID.
Parameters:
id: Blog post ID.
      Request Body:

                  {
                    "title": "Updated Title",
                    "content": "Updated content."
                  }
      Responses:
                200 OK: Blog post updated successfully.

              {
                ...
                }

5. Delete a Specific Blog Post
Endpoint: DELETE /api/blogs/:id
Description: Deletes a specific blog post by ID.
      Responses:
                200 OK: Blog post deleted successfully.
                  {
                        ...
                  }
   



Comment Service Endpoints


1. Add a Comment to a Blog Post
   
Endpoint: POST /api/comments
Description:** Adds a comment to a specific blog post.
      Request Body:
                  {
                    "content": "This is a comment.",
                    "author_id": 1,
                    "blog_post_id": 1
                  }
      Responses:
                201 Created: Comment added successfully.
                {
                  ...
                }

2. List Comments for a Specific Blog Post

Endpoint: GET /api/comments?post_id=<id>
Description: Retrieves all comments for a specific blog post.
Query Parameters:
post_id: The ID of the blog post for which comments are being retrieved.
      Responses:
              200 OK: List of comments retrieved successfully.
[
    {
        ...
    },
    ...
]





Trade-offs and Design Decisions


Trade-offs:

1)  Service Decomposition:
The application is divided into three distinct services (User, Blog, Comment). This design promotes separation of concerns and allows for independent scaling and deployment of each service but introduces complexity in communication between services.
2)  Database Choice:
PostgreSQL was chosen for its robustness and support for complex queries and relationships, particularly with foreign keys in the comment and blog services. However, this choice may lead to increased setup complexity compared to simpler databases like SQLite.
3)  JWT Authentication:
Using JWT for authentication allows stateless sessions, which simplifies scaling but requires careful management of token expiration and revocation.
4)  Dockerization:
Each service is containerized using Docker, which simplifies deployment and environment consistency but adds overhead in terms of resource usage compared to running services directly on the host machine.
   


Design Decisions:


1)  RESTful API Design:
The API follows RESTful principles, making it intuitive for developers to understand how to interact with the services based on standard HTTP methods (GET, POST, PUT, DELETE).
2)  Environment Management:
Environment variables are managed using .env files for both local development and production environments, allowing for flexible configuration without hardcoding sensitive information in the codebase.
3)  Error Handling:
A centralized error handling middleware is implemented to manage errors gracefully across all services, providing consistent error responses to the client.
4)  Documentation:
Comprehensive API documentation is provided to facilitate ease of use and integration by other developers or teams who may use the API in their applications.



This documentation provides clear instructions on how to use each endpoint, along with insights into design choices made during development. Feel free to modify or expand upon any sections to better fit your project’s specifics! If you have any further questions or need additional assistance, let me know!
