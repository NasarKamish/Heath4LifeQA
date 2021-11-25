# In the root of the API folder 
## Create config folder
  - ### Create a db.js file (KnexJS/Postgres config details)
    ```
      module.exports = { 
        DATA: ~postgres database name (Example: h4l-db)~,
        USER: ~postgres user name (Example/Default: postgres)~,
        PASS: ~postgres user password~,
        PORT: ~postgres local port (Default: 5432)~,
        HOST: ~postgres host (Default: localhost )~
      }
    ```
  - ### Create a default.json file (Bcrypt secret)
    ```
      {
        "jwtSecret": "secret"
      }
    ```
  - ### Create mailer.js file for sending mails
    ```
      module.exports = {
        USER: ~email address~,
        PASS: ~email password~,
        HOST: ~email host name~,
        PORT: ~email host port~
      }
    ```