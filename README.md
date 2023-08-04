# Todo List CRUD - Rabobank at Home Challenge

### Junior Software Engineer - Celeste Gambardella
```
Build a backend app that exposes a simple HTTP API for a ToDo list.
```

------

## Task Requirements

<b>The app shall implement:</b>  

- [ ] CRUD operations
- [ ]  List of all ToDo items
- [ ] List of completed
- [ ] List of deleted
- [ ] All the unit tests for the functionalities listed above
- [ ] The code must be published on a git repository (github, gitlab, etc.)  

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
      user     : 'root',
      password : 'password'
      });

      db_server.connect((err) => {
         if (err) {
            console.log("Database Server Connection Failed !!!", err);
         } else {
            console.log("connected to MySQL Server");
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

3. Go to [Todo List App Connection](http://localhost:8080/) on port 8000 and you should see further instructions regarding how to use the application.
  
   - Below you can also find the application user manual.

------

# Todo List - User Manual
1. 

   