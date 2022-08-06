const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const tasksRouter = require('./routes/tasks.router');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended : true}));
app.use(express.static('server/public'));

app.use('/tasks', tasksRouter);

app.listen(PORT, function() {
  console.log('listening on port', PORT)
});
