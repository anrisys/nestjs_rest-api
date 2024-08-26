# Post API Spec

## Get All Posts

Endpoint: GET /api/posts \
Description: Retrieve all posts. \
Security: No authentication required.

Request Body:

```json
    None
```

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "content": "This is the first post",
      "authorId": 1,
      "createdAt": "2024-08-20T10:00:00Z",
      "updatedAt": "2024-08-20T11:00:00Z"
    },
    {
      "id": 2,
      "content": "This is another post",
      "authorId": 2,
      "createdAt": "2024-08-20T12:00:00Z",
      "updatedAt": "2024-08-20T13:00:00Z"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Something went wrong. Try again later"
}
```

## Get Post by Id

Endpoint: GET /api/posts/:postId \
Description: Retrieve a specific post by its ID.\
Security: No authentication required.

Request Params:

- postId: Required, integer, must be a valid post ID.

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "content": "This is the first post",
      "authorId": 1,
      "createdAt": "2024-08-20T10:00:00Z",
      "updatedAt": "2024-08-20T11:00:00Z"
    },
    {
      "id": 2,
      "content": "This is another post",
      "authorId": 2,
      "createdAt": "2024-08-20T12:00:00Z",
      "updatedAt": "2024-08-20T13:00:00Z"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Post not found"
}
```

## Create a Post

Endpoint: POST /api/posts \
Description: Create a new post. \
Security: Requires authentication (JWT). \
Validation: Validate post content.

Request:

- Headers: Authorization: Bearer JWT_TOKEN
- Body:

```json
{
  "content": "This is my new post"
}
```

Response Body (Success):

```json
{
  "data": [
    {
      "message": "Post successfully created",
      "postId": 1
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Invalid content"
}
```

## Update a Post

Endpoint: PUT /api/posts/:postId \
Description: Update a post. \
Security: Requires authentication (JWT), and the user must be the post author. \
Validation: Validate post content. \

Request:

- Headers: Authorization: Bearer JWT_TOKEN
- URL Parameters: postId
- Body:

```json
{
  "content": "This is my updated post"
}
```

Response Body (Success):

```json
{
  "data": [
    {
      "message": "Post successfully created",
      "postId": 1
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "You are not allowed to update this post"
}
```

## Delete a Post

Endpoint: DELETE /api/posts/:postId \
Description: Delete a post. \
Security: Requires authentication (JWT), and the user must be the post author.

Request:

- Headers: Authorization: Bearer JWT_TOKEN
- URL Parameters: postId

Response Body (Success):

```json
{
  "data": [
    {
      "message": "Post successfully deleted"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "You are not allowed to delete this post"
}
```
