# User Routes Documentation

## Register User

### Endpoint
`POST /user/register`

### Description
Registers a new user.

### Request Body
- `email` (string, required): User's email address.
- `fullname.firstname` (string, required): User's first name (minimum 3 characters).
- `fullname.lastname` (string, optional): User's last name (minimum 3 characters).
- `password` (string, required): User's password (minimum 6 characters).

### Response
- `201 Created`: Returns the authentication token and user details.
- `400 Bad Request`: Returns validation errors if any required fields are missing or invalid.

### Example
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### Endpoint 

`POST /user/login`

### Request Body
- `email` (string, required): User's email address.
- `password` (string, required): User's password (minimum 6 characters).

### Response
- `201 Logged in`: Returns the authentication token and user details.
- `400 Error at user end`: Returns validation errors if any required fields are missing or invalid.

### Example
```json
{
  "email": "user@example.com",
  
  "password": "password123"
}
```
### Description

Retrieves a valid JWT token in the authorization header;

### HTTP Method

`GET`


### Endpoint 

`/users/profile`

### Authentication

Requires a valid JWT token in the Authorization header:

`Authorization: Bearer<token>`

### Example Response

_`user` (object):
  _`fullname` (object).
    _`firstname` (string): User's first name (minimum: 3 characters).
    _`lastname` (string): User's last name (minimum: 3 characters)
    _`email` (string): User's email (must be a valid email)



### Endpoint

`/users/logout` 

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:

 
