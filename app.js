const express=require('express');
//from node modules it will load express library to here by above line
const app=express();
const mongoose=require('./database/mongoose')
//were exporting mongoose and importing it here
// so were creating express app that runs in port 3000 with success console msg
const TaskList=require('./database/models/taskList');
const Task=require('./database/models/task');

//our backend app will catch request that will be coming from a json format
/*
CORS-cross origin request security
backend-https://localhost:3000
frontend-https://localhost:4200(we need to tell them some how to intreact b/w thses
 because express only accepts from backend server only)
 middleware is where we use to intercept a response so for express to allow 
 frontend request also we will use middle ware
 */
app.use(
    function(req,res,next){
        //websites you wish to allow connect
        res.setHeader('Access-Control-Allow-Origin','*');//includes url for frontend or backend

        //request methods and headers to allow
        res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers','Origin','X-Requested-With,Content-type','Accept');
        //set to true if you need the website to include cookies in the send request
        //to the api(ex:in case you use sessions)
        
        //request.setHeader('Access-Control-Allow-Credentials',true);

        next();//pass to next layer of middleware
//or we can install 3rd party library and use app.use(cors());


    }
);
//app.use(cors());
app.use(express.json());//body-parser(3rd party lib) also a middleware

//now we have to create RESTful api Web endpoints called routes
/*
TaskList -create,update,ReadTaskListByid,ReadAllTasklist
Task-create,update,ReadTaskByid,ReadAllTask
*/
//Routes for API endopoints for tasklist model
//get all task Lists
//http://localhost:3000/tasklists =>[{TaskList},{TaskList}]
app.get('/TaskList',(req,res)=>{
   TaskList.find({})//tasklist do not have any data now so it shows empty array in localhost server
   .then((lists)=>{res.send(lists)})//so were sending response back in json format
   .catch((error)=>{
    console.log(error)

   }
   );
});
//https://www.restapitutorial.com/introduction/httpmethods
app.listen(3000,()=>{
    console.log("hello express server 3000 great work pal");
});

//instaed of running node api.js run nodemon api.js