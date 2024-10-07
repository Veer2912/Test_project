# Test_project
this is a simple project that i made while learning react and node. I have used tailwindcss for the styling, sequelize to connect with MYSQL database.


For setting the project in your Local system clone this repo and then open seperate terminals for both frontend and backend directory:

next:   in both terminals run comaands: npm init -y
next:   run npm i in both terminals
next:   In backend directory create a .env file in following format:
         DB_NAME=db_name
         DB_USER=DB_username
         DB_PASSWORD=your_password
         DB_HOST=localhost
         JWT_SECRET=your_jwt_secret
         PORT=5000
       
next:   in terminal for frontend directory run command:  npm start
next:   In terminal for backend run command: npm run build
        then run command:  npm start

Once both the servers are up and ready you cna visit your browser where the application is running.
