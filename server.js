const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());
//body parser middleware - enable json handling
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userRoute = require('./src/routes/user');
var newsletterRoute = require('./src/routes/newsletter');

// base path
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// routes
app.use('/user', userRoute);
app.use('/newsletter', newsletterRoute);


app.listen(port, () => console.log(`Reddit Newsletter by Vedant Singhania app listening on port ${port}!`))