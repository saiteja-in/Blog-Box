import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    content:{type:String,required:true},
    image:{type:String,default:"https://img.freepik.com/free-photo/business-women-signature-document_1388-90.jpg?t=st=1719760590~exp=1719764190~hmac=891adf567e986590d72cc1a81cbc4da7a65f279df8696dadfea8086cf602ae3e&w=996"},
    category:{type:String,default:"uncategorized"},
    slug:{type:String,required:true,unique:true},
    isAdmin:{type:Boolean,default:false},
},{timestamps:true});

const Post= mongoose.model("Post",PostSchema);
export default Post;