const requestlogger=(request,response,next)=>{
    console.log("method:",request.method);
    console.log("path:",request.path)
    console.log("body:",request.body)
    console.log("headers:",request.headers)
    console.log("---------------")
    next();
}
module.exports={
    requestlogger
}