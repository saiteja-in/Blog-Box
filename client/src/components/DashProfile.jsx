import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

const DashProfile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      {console.log(currentUser)}
      <h1 className='my-t text-center py-4 text-3xl font-bold'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='self-center rounded-full overflow-hidden w-32 h-32 cursor-pointer shadow-md'>
        <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-4 border-[#b40cde]
         ' />
        </div>
        <TextInput
          type='text'
          id='username'
          defaultValue={currentUser.username}
          placeholder='Username'
          // className='mt-4 w-full'
          
          // onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          type='email'
          defaultValue={currentUser.email}
          placeholder='Email'
          // className='mt-4 w-full'
          // onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          type='password'
          placeholder='Password'
          // className='mt-4 w-full'
          // onChange={(e) => setName(e.target.value)}
        />
        <Button gradientDuoTone='purpleToPink' outline type='submit'>
          Update
        </Button>
        <div className='text-red-500 flex justify-between'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign out</span>
        </div>

      </form>
    </div>
  )
}

export default DashProfile
