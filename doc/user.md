# User API Spec

## Register User

Endpoint: POST /api/users/register \
Description: Create a new user. \
Security: No authentication required. \
Validation: Use schema validation (Zod or Joi) to validate input data.

Request Body:

```json
{
  "name": "newuser",
  "email": "newuser@example.com",
  "password": "user123"
}
```

Response Body (Success):

```json
{
  "message": "User successfully registered"
}
```

Response Body (Failed):

```json
{
  "errors": "Email already registered"
}
```

## Login User

Endpoint: POST /api/users/login \
Description: Authenticate the user and return a JWT token. \
Security: No authentication required. \
Validation: Validate email and password format.

Request Body:

```json
{
  "email": "newuser@example.com",
  "password": "user123"
}
```

Response Body (Success):

```json
{
  "message" : "Successfully login"
  "data": {
    "name": "user",
    "token": "generated_token"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Email or password is wrong"
}
```
