# 273 Lab 2 - Kafka and MongoDB

## 🚀 Migrating previous Lab 1 MySQL Database structure to MongoDB

## 💀 Client and Server should communicate via Kafka Streams

# Dropbox

## How to run the application

Please follow these 2 steps.

### Step 1. Start Kafka Broker 

```
// on your terminal
$ cd kafka_2.11-0.11.0.1


// start zookeper
$ bin/zookeeper-server-start.sh config/zookeeper.properties


// start kafka server
$ bin/kafka-server-start.sh config/server.properties


// create 2 topics
// request_topic and response_topic
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic request_topic
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic


// see the topics that has been created
$ bin/kafka-topics.sh --list --zookeeper localhost:2181

```

### Step 2. Start 3 servers
Kafka Backend Server
```
$ cd kafka-back-end
$ yarn install

$ yarn start
```


Express.js Backend Server 
```
$ cd server
$ yarn install

// MySQL database
// In most case, you need to create a database manually.
// Please change the db config accordingly, for example: username, password, db name,
$ sequelize db:migrate

$ yarn start
```

React.js Client Server
```
$ cd client
$ yarn install

$ yarn start
// open localhost:3001

```


## Testing

Server

Please take a look at /server/app.js

and uncomment this line
```
const sequelize = new Sequelize(config.database, config.username, config.password, config);
```
Don't forget to comment the other one.

```
yarn test
```

On Kafka Backend

Change the environment to test
```
// Line: 23, change this value from 'development' to 'test'
const appEnv = 'test';

// then run Kafka Backend
yarn start
```


## Server

### User Model

| Field         | Data type     |
| --------------|:-------------:|
| firstname     | String        |
| lastname      | String        |
| email         | String        |
| password      | String        |



### End Points

### Authorization
#### Sign Up
```
POST - localhost:3000/authseq/signup
```
| Field         |      |
| --------------|:-------------:|
| firstname     | required        |
| lastname      | required        |
| email         | required, unique        |
| password      | required        |


#### Sign In
```
POST - localhost:3000/authseq/signin
```
| Field         |      |
| --------------|:-------------:|
| email         | required        |
| password      | required        |

Return token, email, and _id

#### User's About 
```
GET - localhost:3000/users/about
```
```
PUT - localhost:3000/users/about
```
| Field         |      |
| --------------|:-------------:|
| overview     | optional        |
| work      | optional        |
| education         | optional        |
| contact_info     | optional        |
| life_events     | optional        |


#### User's Interest
```
GET - localhost:3000/users/interest
```
```
PUT - localhost:3000/users/interest
```
| Field         |      |
| --------------|:-------------:|
| music     | optional        |
| shows      | optional        |
| sports         | optional        |
| fav_teams     | optional        |
| life_events     | optional        |


### Uploading a File
**Need user authentication**
```
Upload a file - POST - localhost:3000/uploads

```

Upload single file at a time.

Will upload to './public/uploads/<user@email.com>'

### Files
**Need user authentication**
```
Fetch user files - GET - localhost:3000/files/root

```

```
Star a file  - PUT - localhost:3000/files/star

```

### Folders
**Need user authentication**
```
Fetch user files - GET - localhost:3000/folders/root

```

```
Star a file  - PUT - localhost:3000/folders/star

```



---
## Client

* React.js
* React Semantic UI
* React Redux
* React Router Dom
* Axios


