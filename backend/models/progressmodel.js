const mongoose=require("mongoose");

const problemProgressSchema=new mongoose.Schema({
    slug:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    topic:{
        type:String
    },
    difficulty:{
        type:String
    },
    status:{
        type:String,
        enum:["attempted","solved"],
        default:"attempted"
    },
    attempts:{
        type:Number,
        default:1
    },
    timeSpent:{
        type:Number,
        default:0
    },
    solvedAt:{
        type:Date
    }
});

const progressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    completedProblems:[
        {
            type:String
        }
    ],
    problemHistory:[
        problemProgressSchema
    ]
},{timestamps:true});

module.exports=mongoose.model("Progress",progressSchema);