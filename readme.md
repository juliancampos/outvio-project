
# Outvio - test task

Project developed to validate knowledge on recruitment process.


## API Documentation

#### Return a message saying the route was accessed, and validate how many requests were accepted.
#### If exced the requests limit number, this route returns blocked.

```http
  GET /public
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

```http
  GET /private
```
| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization` | `bearer` | **mandatory**. Token created to access the private route |

```http
  POST /login
```
| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username` | `string` | **mandatory**. The user name that will be used to create a token |


#### Retorna um item



## Environment Variables

To run this project, you need to set the following variables on .env

`PORT`
```
   Port used to run a project
```

`IP_QUANTITY_REQUESTS`
```
   Define how many requests will be accepted until block the requests by ip
```

`IP_PERIOD_TIME`
```
   Define the period time the requests can be executed by ip
```

`USER_QUANTITY_REQUESTS`
```
   Define how many requests will be accepted until block the requests by user
```

`USER_PERIOD_TIME`
```
   Define the period time the requests can be executed by use
```

`TOKEN_SECRET`
```
   Define the token secret will be used to cripto data
```

`TOKEN_EXPIRE_TIME`
```
   Define the time expiration of token
```

## Deploy
### A project inside a docker container
type on root:

```bash
  docker-compose up -d
```

### A project on local machine

type on root:
```bash
  docker-compose build redis-service
  docker-compose up -d redis-service
```

enter on folder api:
```bash
   cd api
```

type on folder api:
```bash
  npm install
  npm start
```

## Curl comands

### GET
### /public route
```
curl --request GET \
  --url http://localhost:3001/public
```

### /private route
```
curl --request GET \
  --url 'http://localhost:3001/private?Authorization=teste_token' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGlhbi5jYW1wb3MiLCJpYXQiOjE2Njk5MjE2NzYsImV4cCI6MTY2OTkyMTczNn0.kre1FiCLfN6YvquKw8dXW3ULL5wSq19TqvZxFxrngas'
```


### POST
### /login route
```
curl --request POST \
  --url 'http://localhost:3001/login?Authorization=teste_token' \
  --header 'Authorization: Bearer ' \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "julian.campos"
}'
```
## Libraries

[Nodejs](https://nodejs.org/en/)
- Core of application

[Docker](https://www.docker.com)
- used to run application on containers

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- used to create token

[redis](Redishttps://redis.io)
- used like a cache to store data to future validations

[winston](https://www.npmjs.com/package/winston)
- used on log information about running system

[express](https://expressjs.com/)
- framework used to create routes

[dotenv](https://www.npmjs.com/package/dotenv)
- used to normalize environment variables to be used on system