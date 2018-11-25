const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

const api = require('./routes/api');
const port = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.json()); 

app.use(cors())
app.use('/api', api);

 app.get('*', (req, res) => {
   res.send('hiii');
 });

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});


