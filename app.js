const express = require('express');
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./data/database');

const authRoutes = require('./routes/auth.routes');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');



const app = express();
const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => 'my-secret',
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(doubleCsrfProtection);
app.use(addCsrfTokenMiddleware);

app.use(authRoutes);


db.connectToDatabase().then(() => {
    app.listen(3000);
}).catch(err => {
    console.log("Failed to connect to database!");
    console.log(err);
});
