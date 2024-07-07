import React, { useEffect, useState } from 'react'
import moment from 'moment'
const Comment = ({comment}) => {
    const [user,setUser]=useState({});
    useEffect(()=>{
        const getUser=async()=>{
            try {
                // console.log(comment,comment.userId);
                const res=await fetch(`/api/user/${comment.userId}`)
                const data=await res.json();
                if(res.ok){
                    // console.log(data);
                    setUser(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
      </div>
      <div className='flex-1'>
      <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`:'Anonymous User'}</span>
        <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
      </div>
      <p>{comment.content}</p>
      </div>
      
    </div>
  )
}

export default Comment
