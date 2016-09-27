# a simple twitter service

## User Story:
As part of enhancing our internal services which are available to our employees, we would like to build a Twitter like solution for our employees, where employees can tweet and have followers.

## High Level Requirements :
* We have 10K employees
* Employees can follow their colleagues, post (or tweet) messages to their followers
* Use corporate LDAP for user Management
* On an average, every employee will send approximately 10 messages a day to their followers
* On the home page we need to show 100 most recent tweets.
* Optionally you can support pagination.
* You are welcome to assume unspecified requirements to make it better for the customers
* Come prepared with High level Architecture and Design.
* You are expected to explain the rationale for your choice of technologies and architectural patterns


## Programming Problem:
In the above exercise, please build a RESTful service
* /feed : To list 100 recent tweets for the logged in user
* In memory database is sufficient. Optionally, you are welcome to use a persistent data store of your choice.
* You are encouraged but not required to take advantage of a service code-generation framework of your choice when performing this exercise


## Dependencies:
* mongodb
* nodejs
* ldap server

## Installation:
1. npm install --registry https://registry.npmjs.com/
2. npm start // server will start at localhost:3000
3. npm test // run unit test

## Sample commands:

### [postman collection](https://www.getpostman.com/collections/8564cc46ad27462f9abe)

### curl
1. create user
curl -XPOST http://localhost:3000/users -d 'email=euler@gmail.com&name=euler'
curl -XPOST http://localhost:3000/users -d 'email=kaile@gmail.com&name=kaile'

2. list user -- user id is available in response
curl http://localhost:3000/users

3. ldap auth
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "euler",
  "password": "password"
}' "http://localhost:3000/login"

4. add new feed -- please replace the user id
curl -X POST -H "Content-Type: application/json" -d '{
  "body": "hello world",
  "user": "{userid}"
}' "http://localhost:3000/feeds"

5. get all feeds for a user
curl -X GET -H "Content-Type: application/json" -H "uid: {{your_uid}}" "http://localhost:3000/tweet"

6. update user with followers -- please replace the user id
curl -X PUT -H "Content-Type: application/json" -d '{
  "followIds": ["{usrid1}", "{userid2}"]
}' "http://localhost:3000/users/{userid}"


