const mongoose=require('mongoose');
//so basically we are providing validation for mongo DB
const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    },
    _taskListId:{//it acts like a foreign key private field
        type:mongoose.Types.ObjectId,
        required:true
    },
    completed:{//boolean field
        type:Boolean,
        default:false,
        required:true
    }
});

const Task=mongoose.model('Task',TaskSchema);
//always export model not schema
module.exports=Task;