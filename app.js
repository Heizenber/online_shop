const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./data/database');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const checkAuthStatus = require('./middlewares/check-auth');

const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');


const app = express();

const sessionConfig = createSessionConfig.createSessionConfig();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressSession(sessionConfig))

app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);



app.use(errorHandlerMiddleware);

db.connectToDatabase().then(() => {
    app.listen(3000);
}).catch(err => {
    console.log("Failed to connect to database!");
    console.log(err);
});
