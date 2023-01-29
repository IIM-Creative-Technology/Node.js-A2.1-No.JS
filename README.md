# Pixel Chat Project

A simple Node.js application to chat and play together !

### Features

- User creation & connection
- User session
- Persistent storage using MongoDB Atlas
- Real-time chat & play using Websockets

### Dependencies

- `Cors` Version 2.8.5+
- `Express` Version 4.17.1+
- `Mongoose` Version 5.9.25+
- `Socket.io` Version 2.3.0+
- `Express` Version 4.17.1+
- `Express-session` Version 1.17.1+

## Installation

### Clone

Clone this repo to your local machine :
```shell
$ git clone https://github.com/IIM-Creative-Technology/Node.js-A2.1-No.JS.git
```

### Setup

Install dependencies

```shell
$ npm install
```

Start the server

```shell
$ npm run test
```

Open your browser and go to `http://localhost:3000`

## REST API

### User

#### Get all users

```http
GET /user
```

#### Get a specific user

```http
GET /user/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User's id |

#### Create a user

```http
POST /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `FirstName`    | `string` | **Required**. User's First name  |
| `LastName`    | `string` | **Required**. User's Last name  |
| `Password`   | `string` | **Required**. User's password |
| `Pseudo`   | `string` | **Required**. User's pseudo |

#### Update a user

```http
PUT /user/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User's id    |
| `FirstName`    | `string` | **Required**. User's First name  |
| `LastName`    | `string` | **Required**. User's Last name  |
| `Password`   | `string` | **Required**. User's password |
| `Pseudo`   | `string` | **Required**. User's pseudo |

#### Delete a user

```http
DELETE /user/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User's id    |

### Message

#### Get all messages

```http
GET /message
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `quantity`      | `Number` | **Optional**. How many message it return   |



#### Get a specific message

```http
GET /message/:id
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Message's id |

#### Create a message

```http
POST /message
```

| Parameter | Type     | Description                |
|:----------| :------- | :------------------------- |
| `body`    | `string` | **Required**. Message's content  |
| `author_id`    | `string` | **Required**. Message's author   |

#### Delete a message

```http
DELETE /message/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Message's id |

### Pixel Game

#### Get the entire grid

```http
GET /pixel
```

#### Update a specific pixel

```http
PUT /pixel
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x`       | `number` | **Required**. Pixel's x position |
| `y`       | `number` | **Required**. Pixel's y position |
| `color`   | `string` | **Required**. Pixel's color |

## License

This project has no license.

## Authors

- [**Félix Laviéville**](https://github.com/TuberculeP)
- [**Medhi Bellam**](https://github.com/ImDimeh)
- [**Thibaut François**](add your github link here)
- [**Mathis Noël**](add your github link here)
- [**Ryan Bardat**](add your github link here)
