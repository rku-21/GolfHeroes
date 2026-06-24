import mongoose from "mongoose";

const scoreSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    score:{
        type:Number,
        min:1,
        max:45,
        required:true,
    },
    playedOn:{
        type:Date,
        required:true,
    },
},{
    timestamps:true,

}
);

scoreSchema.index({user:1,playedOn:1},{unique:true});

const Score=mongoose.model("Score",scoreSchema);

export default Score;