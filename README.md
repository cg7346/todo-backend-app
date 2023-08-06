# Todo List CRUD - Rabobank at Home Challenge

### Junior Software Engineer - Celeste Gambardella
```
Build a backend app that exposes a simple HTTP API for a ToDo list.
```

------

## Task Requirements

<b>The app shall implement:</b>  

- [x] CRUD operations
- [x]  List of all ToDo items
- [x] List of completed
- [x] List of deleted
- [x] All the unit tests for the functionalities listed above
- [x] The code must be published on a git repository (github, gitlab, etc.)  

<b>Other optional requirements that give bonus points:</b>

- [ ] The project includes a docker compose definition; the app can run locally by using a simple `docker compose up` command or similar.

------

# Backend CRUD Todo List Configuration

## Prerequisites

1. MySQL installed

   NOTE: make sure you know your username and password for your local mysql instance

   If you do not know the username and password you can add execute the following sql queries in an IDE that supports sql

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
   
   flush privileges;
   ```

## Requirements
1. In the **`/config`** directory create a file called **`db.config.js`**:

   ```js
      'user strict';

      const mysql = require('mysql');

      //local mysql db connection
      const db_server = mysql.createConnection({
      host     : 'localhost',
      user     : 'PLACEHOLDER',
      password : 'PLACEHOLDER'
      });

      db_server.connect((err) => {
         if (err) {
            console.log("Database Server Connection Failed !!!", err);
         } else {
            console.log("Successfully connected to MySQL server!");
         }
      });

      module.exports = db_server;
   ```
   
   **NOTE:** replace `PLACEHOLDER` with your local db username and password

2. Run the following commands in the root directory:

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

3. Go to [Todo List App Connection](http://localhost:8000/) on port 8000 and you should see further instructions regarding how to use the application.
  
   - Below you can also find the application user manual.
   
4. Ability to make API calls using external tool (e.g. Postman). 

------

# Todo List - User Manual
### Prerequisites			

- MySQL installed
- **db.js** file configured

------

### Setup - Todo List		

1. Within the main root directory of the application you will need to do the following commands in terminal:
```bash
npm install
```
*this will install all the necessary packages needed to run the application*
```bash
npm start
```
*This starts the application and where you should see if the database server is connected to properly*
*If fails double check your **db.js** file has the correct user and password.*				

1. **Initialize the database by going to:** 

   ​	**GET /database** route - [localhost:8000/database](http://localhost:8000/database)

   This needs to be at the beginning of application otherwise when using the todo list the database call will fail.

2. **Creation of Tasks table within database by going to:**

   **GET /database/createTable** route - [localhost:8000/database/createTable](http://localhost:8000/database/createTable)

This Initializes the table in the database where all the tasks for the todo list are stored.

------

### Instructions - Todo List

Within this application a todo task can be created, the user can  view all pending tasks, completed tasks, and deleted tasks, they can  edit tasks, and permanently deleted tasks. A Task can have the following statuses: 			

- **0**: pending tasks

- **1**: completed tasks

- **-1**: deleted tasks

This is done because we do not want to accually delete a task from the database but rather just change the status of the task. 

------

#### The Todo list contains the following API calls:

#### **CREATE a Todo task**

**POST /todo**

> To create a task in the Todo list you need to send a **POST** request to **localhost:8000/todo** Within the POST request the body must contain a task as such:
> 
>```json
>{
> 	"task": "My First Todo"
> }
> ```
>
> By default the task will assign an **id** and **status** of 0 **pending**. 		

#### **GET all pending Todo tasks**

> **GET /todo**
>  ​To get all tasks in the Todo list you need to send a **GET** request to [localhost:8000/todo](http://localhost:8000/todo). Nothing should be within the body of the request. By default, any new todo created will be shown in this list. 		

#### **UPDATE a Todo task**

> **PATCH /todo/:id**
>
> To update a task in the Todo list you need to send a **PATCH** request to **localhost:8000/todo/\*:id\***. When sending request you need specify the todo **ID** in the parameters. For example:
> ```http
>localhost:8000/todo/1
> ```
> 
> Within the PATCH request the body must contain a task as such:

> **COMPLETE Todo**
>
> ```json
> {
> 	"task": "My First Todo",
> 	"status": 1
> }
> ```
> *Above is an example of marking a todo as completed*.

> **DELETE Todo**
>
> ```json
> {
> 	"task": "My First Todo",
> 	"status": -1
> }
> ```
>
> *Above is an example of marking a todo as deleted*. You can also edit the task name here. 		

#### **GET all completed Todo tasks**

> **GET /todo/completed**
>
> To get all tasks in the Todo list that have been completed you need to send a **GET** request to [localhost:8000/todo/completed](http://localhost:8000/todo/completed). Nothing should be within the body of the request.

> **In order to see a todo within this list:**
>
> 1. The todo needs to be created with a **POST** request
>
> 2. Edited to be marked as completed with a **PATCH** request with a **status** of **1** in the body of the request.
>
>    ​	*Follow above instructions on how todo so*

#### **GET all deleted Todo tasks**

> **GET /todo/deleted**
>
> To get all tasks in the Todo list that have been deleted you need to send a **GET** request to [localhost:8000/todo/deleted](http://localhost:8000/todo/deleted). Nothing should be within the body of the request.

> **In order to see a todo within this list:**
> 
>1. The todo needs to be created with a **POST** request
> 
>2. Edited to be marked as completed with a **PATCH** request with a **status** of **-1** in the body of the request.
> 
>  ​	*Follow above instructions on how todo so*	

#### **Permanently delete a Todo task**

> **DELETE /todo/:id**
>
> There is also the ability to permanently delete a todo task but this should not be used as this would get rid of the task completely from  the database. This is used only for testing purposes. To delete a task permanently in the Todo list you need to send a **DELETE** request to **localhost:8000/todo/:id**\.
> When sending request you need specify the todo **ID** in the parameters. For example:

> ```http
> localhost:8000/todo/1
> ```

------

### Testing - Todo List

- To run all the tests for the application the server must being running as instructed in the Setup (Step 1).

- Once the server is running open a new terminal and run the following command to run all the db and todo list tests:

```bash
npm test	
```
