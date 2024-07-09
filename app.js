const express=require('express');
//from node modules it will load express library to here by above line
const app=express();
const mongoose=require('./database/mongoose')
//were exporting mongoose and importing it here
// so were creating express app that runs in port 3000 with success console msg
/*app.listen(3000,function(){
    console.log("hello express server 3000");
});*/
app.listen(3000,()=>{
    console.log("hello express server 3000 great work pal");
});

//instaed of running node api.js run nodemon api.js