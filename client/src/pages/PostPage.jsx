import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Spinner.css";
import { Button } from "flowbite-react";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

const PostPage = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPosts] = useState(null);
  const [recentPosts,setRecentPosts]=useState(null)
  const [error, setError] = useState(null);
  

  useEffect(() => {
    console.log(postSlug);
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts[0]);
          setLoading(false);
          setError(false);

        }
        // console.log(data.posts[0]);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=2`);
        const data = await res.json();
        console.log(currentUser);
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="final__spinner-2"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <main className=" dark:bg-black p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className='text-5xl mt-6 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <button  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>{post && post.category}</span>

                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    ></path>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
      </Link>
      <img
  src={post && post.image}
  alt={post && post.title}
  className="mt-7 p-3 max-h-[500px] max-w-[500px] w-full h-auto object-contain mx-auto"
/>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-4xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        
      ></div>
      {/* <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div> */}
      <CommentSection postId={post._id}/>

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
