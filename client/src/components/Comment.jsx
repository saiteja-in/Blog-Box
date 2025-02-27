import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";
const Comment = ({ comment, onLike,onEdit,onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent,setEditedContent]=useState(comment.content)
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        // console.log(comment,comment.userId);
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setUser(data);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [comment]);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content)
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span className="text-gray-500 ">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
          <Textarea
          className='mb-2'
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex gap-2 flex-row-reverse">
          <Button onClick={()=>setIsEditing(false)} gradientDuoTone='purpleToPink' className='rounded-full'>
            Cancel
          </Button>
          <Button onClick={handleSave} type="button" gradientDuoTone='purpleToPink' className='rounded-full'>
            Save
          </Button>
          </div>
          </>
        ):(
          <>
          <p className="text-gray-400 text-base">{comment.content}</p>
        <div className="pt-2 gap-2 text-xs flex items-center">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-sm text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
              <button
                type="button"
                onClick={handleEdit}
                className="text-sm text-gray-500 hover:text-blue-500"
                >
                edit
              </button>
              <button
                type="button"
                onClick={()=>onDelete(comment._id)}
                className="text-sm text-gray-500 hover:text-blue-500"
                >
                delete
              </button>
                </>
            )}
        </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Comment;
