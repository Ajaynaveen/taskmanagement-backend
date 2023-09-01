const mongoose=require('mongoose');
const config=require('./utils/config');
const app=require('./app');
console.log('connectiong to mongodb ajay');
mongoose.connect(config.MONGO_URI)
.then(()=>{
     console.log("connected to mongodb");
     app.listen(config.PORT,()=>{
        console.log(`server running on Port ${config.PORT}`);

     })
})
.catch((error)=>{
    console.error('Error connecting to mongodb',error)
})