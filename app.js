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
app.get('/TaskList',(req,res)=>{//create taskList
   TaskList.find({})//tasklist do not have any data now so it shows empty array in localhost server
   .then((lists)=>{
    res.status(200).send(lists);
    
   })//so were sending response back in json format
   .catch((error)=>{
    console.log(error);
    res.status(500);

   }
   );
});

//Endpoint to get one tasklistId:https://localhost:3000/TaskList/668e65259c56b33345b89746(booklist id)
app.get(//Tasklist get-Update for one tasklist
    '/TaskList/:TaskListId',(req,res)=>{
        let TaskListId=req.params.TaskListId;
        TaskList.find({_id:TaskListId})
        .then((TaskList)=>{// it fetches id of particular object and get data by tasklist parameter.
            res.status(200).send(TaskList)
        })
        .catch((error)=>{console.log(error)});
    }
);
//Route or endpoint for creating  a Tasklist
app.post('/TaskList',(req,res)=>{
   // console.log("hello i am inside post method");
   console.log(req.body);

   let taskListObj={'title':req.body.title};//create item shopping list and grocerry lista we can save them and we can GET them by postman
   TaskList(taskListObj).save()
   .then((lists)=>{
    res.status(201).send(lists);
    
   })
   .catch((error)=>{
    console.log(error);
    res.status(500);

   }
   );

})

//for updating tasklist below code refer
//if u want to update only one of the tasklist use app.patch for updating or replacing all use app.put

app.put('/TaskList/:TaskListId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.TaskListId},{ $set: req.body})
    .then((TaskList)=>{// were doing a full update to single tasklist
        res.status(200).send(TaskList)//PUT is full update of object
    })//in postman we update book list title to book list updated.
    .catch((error)=>{console.log(error)});

});
//PATCH is partial update of one field
app.patch('/TaskList/:TaskListId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.TaskListId},{ $set: req.body})
    .then((TaskList)=>{// were doing a full update to single tasklist
        res.status(200).send(TaskList)
    })
    .catch((error)=>{console.log(error)});

});

//delete a task list by id
app.delete('/TaskList/:TaskListId',(req,res)=>{
    TaskList.findByIdAndDelete(req.params.TaskListId)//if we write findByIdAnd UPdate we write id before req.params
    .then((TaskList)=>{// were doing a full update to single tasklist
        res.status(201).send(TaskList)
    })
    .catch((error)=>{console.log(error)});

});
//https://www.restapitutorial.com/introduction/httpmethods
app.listen(3000,()=>{
    console.log("hello express server 3000 great work pal");
});

//instaed of running node api.js run nodemon api.js