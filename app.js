const express=require('express');
const app=express();
const cors=require('cors')

const bodyparser=require('body-parser')
const Userroutes=require('./routes/userroutes');
const Taskroutes = require('./routes/taskroutes'); 
const middlewares=require('./utils/middleware')



app.use(cors());

app.use(bodyparser.json())
app.use(middlewares.requestlogger)
app.use('/api/users',Userroutes);
app.use('/api/tasks', Taskroutes);
module.exports=app;

