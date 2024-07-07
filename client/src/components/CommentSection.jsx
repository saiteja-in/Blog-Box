import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [a, setA] = useState(false);
  console.log(comments);
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (comment.length > 200) {
      return;
    }
    try {
      setCommentError(null);
      const res = await fetch("/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setA((prev)=>!prev)
        console.log(data);
        setCommentError(null);
      }
      if (!res.ok) {
        setCommentError("Dont be a dick, add a comment and submit");
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(()=>{
    const getComments=async()=>{
      try {
        const res=await fetch(`/api/comment/getPostComments/${postId}`)
        if(res.ok){
          const data=await res.json();
          setComments(data)
        }else{
          console.log("failed to fetch comments")
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  },[a,postId])
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-400 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={currentUser.profilePicture}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-s text-cyan-500 hover-underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment "
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between mt-5 items-center">
            <p className="text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length===0 ?(<p className="text-sm my-5">No Comments Yet, Be the first one to Comment</p>):(
        <>
       <div className="text-sm my-5 flex gap-1 items-center">
        <p>Comments</p>
        <div className="border border-gray-400 py-1 px-2 rounded-sm">
        <p>{comments.length}</p>
        </div>  
      </div>
      {comments.map(comment=>(<Comment key={comment._id} comment={comment}/>))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
