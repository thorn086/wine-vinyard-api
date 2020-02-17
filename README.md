# Wine Vinyard API

This RESTful API controls all interactions between the front end Wine Vinyard app and the database.

![Wine Vinyard Home Page]('./src/img/home.png)

## Technology

This API was built using Node, Express and Knex. The database was built using PostgreSQL.

## Client Repo

https://github.com/thorn086/wine-vinyard

## Live Site

https://wine-vinyard-app.now.sh/

# Using this API

## Add User
Adds user to database

## URL
```javascript
/api/users
```
* Method
```
POST
```
* Body Params\
  First name\
  Last name\
  User email\
  Password

* Success Response\
  Code: 201

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${API.API_ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  ```

***

## Login
Authenticates user login credentials

## URL
```javascript
/api/auth
```
* Method
```
POST
```
* Body Params\
  User email\
  Password

* Success Response\
  Code: 200\
  Content:
  ```
  {
    authToken: 'authToken',
    userId: 'userId'
  }
  ```

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${API.API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user_email, password }),
  })
  ```

***

## URL
```javascript
/api/wines
```
* Method
```
GET
```
* Body Params
  None

* Success Response\
  Code: 200\
  Content:
  ```
  {
    wines: 'wines'
  }
  ```

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${API.API_ENDPOINT}/wine`)
    .then((winesRes) => {
      if (!winesRes.ok) {
        throw new Error(winesRes.statusText)
      }
      return winesRes.json()
    })
  ```

***

## URL
```javascript
/api/wine
```
* Method
```
POST
```
* Body Params\
  winecat\
  date\
  company_name\
  name\
  content\
  rating

* Success Response\
  Code: 201

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${API.API_ENDPOINT}/wine`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    },
    body: JSON.stringify(createNewWine),
  })
  ```
***

## URL
```javascript
/api/wine/id
```
* Method
```
DELETE
```

* URL Params\
  ```
  wines=[wine item id]
  ```

* Body Params\
  None

* Success Response\
  Code: 204

* Error Response\
  Code: 404\
  Content:
  ```
  {
    error: `wine item doesn't exist`
  }
  ```

* Sample Call
  ```javascript
  fetch(`${API.API_ENDPOINT}/wine/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    },
  })
  ```