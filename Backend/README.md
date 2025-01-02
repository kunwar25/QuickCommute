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

## Register Captain

### Endpoint
`POST /captains/register`

### Description
Registers a new captain.

### Request Body
- `email` (string, required): Captain's email address.
- `fullname.firstname` (string, required): Captain's first name (minimum 3 characters).
- `fullname.lastname` (string, required): Captain's last name (minimum 3 characters).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle.color` (string, required): Vehicle color (minimum 3 characters).
- `vehicle.plate` (string, required): Vehicle plate number (minimum 3 characters).
- `vehicle.capacity` (number, required): Vehicle capacity (minimum 1).
- `vehicle.vehicleType` (string, required): Vehicle type (must be one of 'car', 'motorcycle', 'auto').

### Response
- `201 Created`: Returns the authentication token and captain details.
- `400 Bad Request`: Returns validation errors if any required fields are missing or invalid.

### Example
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
## Login Captain

### Endpoint
`POST /captains/login`

### Description
Logs in an existing captain.

### Request Body
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password (minimum 6 characters).

### Response
- `200 OK`: Returns the authentication token and captain details.
- `400 Bad Request`: Returns validation errors if any required fields are missing or invalid.
- `401 Unauthorized`: Returns if the email or password is incorrect.

### Example
```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```
##  Captain profile

Authenticate the captain with the auth middleware 
and then after authenticating provide the user with 
all information leaving password

## Captain logout

After this logout is performed with the help of token either present in the authorization header or 
in the cookie





