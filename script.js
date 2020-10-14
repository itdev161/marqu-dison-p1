const express = require('express');      //Import Express
const Joi = require ('joi');            //Import Joi
const app = express();                 //Create Express App on the app variable

app.use(express.json());             // used with json file


// Port Environment Variable
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));