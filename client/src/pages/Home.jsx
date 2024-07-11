import React, { useEffect, useState } from "react";
import TextGenerate from "../components/UI/TextGenerate";
import { useSelector } from "react-redux";
import { HoverEffect } from "../components/UI/CardHoverEffect";



const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recentPosts,setRecentPosts]=useState(null)
  // const words =currentUser ? (`Hey ${currentUser.username}, are you really that free that you are reading my blogs? Go get some shit done`):(`Welome to the Blog,sarle kani first login avvu`);
  const words =currentUser ? (`Everything is a copy of a copy of a copy`):(`Welome to the Blog,sarle kani first login avvu`);
  const ww="Everything is a copy of a copy of a copy"
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        console.log(data.posts);
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <>
    <div className="min-h-screen  dark:bg-black">

    <div className=" p-10 text-center">
      <TextGenerate words={words} />
    </div>
    <div className="dark:bg-black ">
    <div className="text-center text-5xl ">
      <div className="text-5xl text-blue-500 pt-4">Recent Posts</div>
    </div>

    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
    </div>
  </div>
    </>
  );
};
export const projects = [
  {
    title: "Stripe",
    description:
    "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
    "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
    "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
    "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

export default Home;
