# 273 Lab 1

# Dropbox

## Server 2

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
Fetch user files - GET - localhost:3000/files

```

```
Star a file  - PUT - localhost:3000/files/star

```




---
## Client 2

* React.js
* Semantic 
* React Redux
* 
