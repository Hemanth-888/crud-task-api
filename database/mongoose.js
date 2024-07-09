const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
//allows me to do all kinds of promises in this app and allow to do async operations
mongoose.connect('mongodb://localhost:27017/taskmanagerdb')
//,{useNewUrlParser:true,useunifiedzTopolgy:true})
//promise ius amde to mongoose if true then() will work and else Catch block runs
.then(()=>{console.log("DB connected !#")})
.catch((error)=>{console.log("error occured while DB connection",error)});
//now we can export this mongoose so we can use it somewhere

module.exports=mongoose;

//npm install -g nodemon --save-dev  if any change occurs we dont have to restart server all tht time