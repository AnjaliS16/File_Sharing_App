require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');


const corsOptions = {

    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
     "optionsSuccessStatus": 204
 }

app.use(cors(corsOptions))


app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.static('public'));

const sequelize = require('./config/db');


app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));




app.use((req, res, next) => {

    const filePath = req.url.split('?')[0];
    const fullPath = path.join(__dirname, 'frontend', filePath);

    res.sendFile(fullPath, (err) => {
        if (err) {
            console.error(`Error sending file: ${fullPath}`);
            next(err);
        }
    });
})


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        });
    })
    .catch((err) => {
        console.log('error while connecting database:', err);
    })
