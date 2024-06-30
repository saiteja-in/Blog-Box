import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import { Input } from 'flowbite-react';

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [publishError,setPublishError]=useState(null)
  const [publishLoading,setPublishLoading]=useState(false)
  const [imageUploadError, setImageUploadError] = useState(null);
  const navigate=useNavigate()

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            100 * (snapshot.bytesTransferred / snapshot.totalBytes);
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: url });
          });
        }
      );
    } catch (error) {
      setImageUploadError("image upload error");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        setPublishLoading(true)
        const res=await fetch('/api/post/create-post',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify(formData)
        })
        const data=await res.json()
        console.log(data)
        if(!res.ok){
            setPublishError(data.message)
            setPublishLoading(false)
            return;
        }
        if(res.ok){
            setPublishError(null)
            setPublishLoading(false)
            toast.success("Post published successfully")
            setTimeout(() => {
                navigate(`/posts/${data.slug}`)
            }, 1000)
        }
        
    } catch (error) {
        setPublishError("Something went wrong")
        setPublishLoading(false)
    }
  };
 
  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-3xl text-center my-7 font-bold">Create a Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              id="title"
              label="Title"
              placeholder="Title"
              className="flex-1"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Select id="category" label="Category" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="uncategorized">select a category</option>
              <option value="movies">Movies</option>
              <option value="tvshows">TV Shows</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-9 h-9">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
           {formData.image && (
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={formData.image}
                alt="upload"
                className="w-full h-full"
              />
            </div>
          )} 
          <ReactQuill
            theme="snow"
            placeholder="Write something"
            className="h-72 mb-11"
            required
            id="content"
            onChange={(value)=>{setFormData({...formData, content: value})}}
          />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={publishLoading}>
            {publishLoading ? "Publishing..." : "Publish"}
          </Button>
          {publishError && (
            <Alert className="mt-4" color="failure">{publishError}</Alert>
          )}
        </form>
      </div>
    </div>
  );
};
export default CreatePost;
