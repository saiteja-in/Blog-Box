import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const filePickerRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showModal,setShowModal] = useState(false)
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(imageFileUploadProgress,imageFileUploadError)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(file,imageFileUrl)
  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
        // console.log("upload is"+progress+"%")
      },
      (error) => {
        setImageFileUploadError(error);
        setImageFileUploadProgress(0);
        setFile(null);
        setImageFileUrl(null);
        toast.error("File size must be less than 2MB");
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
    // console.log("uploading image")
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (Object.keys(formData).length === 0) {
      return;
    }
    if (imageFileUploading) {
      return;
    }
    try {
      dispatch(updateStart());
      console.log(currentUser._id);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success && data.message) {
        toast.error(data.message);
        return;
      }

      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false)
    try {
      dispatch(deleteUserStart())
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
        },
      })
      const data=await res.json()
      if(!res.ok){
        toast.error(data.message)
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      toast.error(error.message)
      dispatch(deleteUserFailure(error.message))
    }
  };
  const handleSignout=async()=>{
    try {
      const res=await fetch('/api/user/signout',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
      })
      const data=await res.json()
      if(!res.ok){
        toast.error(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-4 text-center py-4 text-3xl font-bold">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative self-center rounded-full overflow-hidden w-32 h-32 cursor-pointer shadow-md"
            onClick={() => filePickerRef.current.click()}
            style={{ zIndex: 1 }}

          >
            {imageFileUploadProgress > 0 && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: "rgba(62, 152, 199,${imageFileUploadProgress/100})",
                  },
                  text: {
                    fill: "#fff",
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className="rounded-full w-full h-full border-4 border-[#b40cde]"
              style={{ position: 'relative', zIndex: 0 }}
            />
          </div>
          <TextInput
            type="text"
            id="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            onChange={handleChange}
            // className='mt-4 w-full'

            // onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            type="email"
            id="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            onChange={handleChange}
            // className='mt-4 w-full'
            // onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            // className='mt-4 w-full'
            // onChange={(e) => setName(e.target.value)}
          />
          <Button gradientDuoTone="purpleToPink" outline type="submit">
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between">
          <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
          <span onClick={handleSignout} className="cursor-pointer">Sign out</span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
         <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
};

export default DashProfile;

// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if request.resource.size < 2 * 1024 * 1024 &&
//                         request.resource.contentType.matches('image/.*');
//     }
//   }
// }
