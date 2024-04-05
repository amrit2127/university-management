import mongoose, { mongo } from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    images:{
        type:[String],
        required:true,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"department",
        required:true,
    },
},
{timestamps:true}
);


const ProductModel=mongoose.model("product",ProductSchema);

export default ProductModel;