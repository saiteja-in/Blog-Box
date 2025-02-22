import React, { useEffect, useState } from "react";
import TextGenerate from "../components/UI/TextGenerate";
import { useSelector } from "react-redux";
import { HoverEffect } from "../components/UI/CardHoverEffect";
import { LampContainer } from "../components/UI/lamp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {FaGithub} from "react-icons/fa"
import { TypewriterEffect, TypewriterEffectSmooth } from "../components/UI/TypeWriter";
import AboutProject from "./AboutProject";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recentPosts, setRecentPosts] = useState([]);
  const words = "Everything is a copy of a copy of a copy - Narrator"

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecentPosts();
  }, []);
  const wordss = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "my",
    },
    
    {
      text: "Blog",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-black">
      {/* <div className="p-10 text-center">
        <TextGenerate words={words} />
      </div> */}
      <div className="flex justify-center p-2">
      <TypewriterEffectSmooth words={wordss} />
      </div>
      <div className="dark:bg-black">
        {/* <div className="text-center text-xl">
          <div className="text-3xl text-pink-400 pt-6">Recent Posts</div>
        </div> */}
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect
            items={recentPosts.length > 0 ? recentPosts : projects}
          />
        </div>

        <div className="flex justify-center pb-9">
          <Link to="/search" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-3 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-white">View All Posts</span>
            </span>
          </Link>
        </div>
            {/* <AboutProject /> */}

        </div>
    </div>
  );
};

export const projects = [
  {
    title: "Stripe",
    content:
      "A technology company that builds economic infrastructure for the internet.",
    image: "https://stripe.com",
  },
  {
    title: "Netflix",
    content:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    image: "https://netflix.com",
  },
  {
    title: "Google",
    content:
      "A multinational technology company that specializes in Internet-related services and products.",
    image: "https://google.com",
  },
  {
    title: "Meta",
    content:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    image: "https://meta.com",
  },
  {
    title: "Amazon",
    content:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    image: "https://amazon.com",
  },
  {
    title: "Microsoft",
    content:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    image: "https://microsoft.com",
  },
];

export default Home;
