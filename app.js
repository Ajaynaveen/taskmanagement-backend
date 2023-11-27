const express=require('express');
const app=express();
const cors=require('cors')

const bodyparser=require('body-parser')
const Userroutes=require('./routes/userroutes');
const Taskroutes = require('./routes/taskroutes'); 
const middlewares=require('./utils/middleware')


const corsOptions = {
  origin: 'https://bright-crumble-cd5c4c.netlify.app',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyparser.json())
app.use(middlewares.requestlogger)
app.use('/api/users',Userroutes);
app.use('/api/tasks', Taskroutes);
module.exports=app;

