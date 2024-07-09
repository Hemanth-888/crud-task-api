const mongoose=require('mongoose');
//so basically we are providing validation for mongo DB
const TaskListSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    }
});

const TaskList=mongoose.model('TaskList',TaskListSchema);

module.exports=TaskList;