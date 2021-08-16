const express = require('express');
const app = express();
const axios = require("axios")
//Port Number Gotten from local .env file
const port = 8080;

//Start of normal express/node boiler plate template
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const routes = require("./routes")
const handlers =  require("./handlers")

app.get("/", async function(req, res) {
    try{
        const data = await axios.get("http://127.0.0.1:8000")
        res.json(data.data)
    } catch (err){
        console.log(err)
    }

})

app.listen(port, console.log(`Library Managment system is listening on port ${port}`));