import { Button } from "flowbite-react";
import React from "react";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const OAuth = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const handleGoogleClick = async () => {
    const auth=getAuth(app);
    const provider=new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
        const resultsFromGoogle=await signInWithPopup(auth,provider);
        console.log(resultsFromGoogle);
        const res=await fetch('/api/auth/google',{
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoURL:resultsFromGoogle.user.photoURL,
            }),
        })
        const data=await res.json();
        console.log(data);
        if(res.ok){
            dispatch(signInSuccess(data.user));
            console.log(data)
            toast.success('Logged in successfully');
            toast.success('Redirecting to Home Page');
            setTimeout(()=>{
                navigate('/');
            },2000);
        }

    } catch (error) {
        toast.error('Something went wrong');
        console.log(error);
    }

    
  };
  return (
    <div>
        <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Button
        type="button"
        className="mt-4 w-full"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleClick}
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
        </svg>
        Continue with Google
      </Button>
    </div>
  );
};

export default OAuth;
