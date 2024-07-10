import React from "react";
import TextGenerate from "../components/UI/TextGenerate";
import { useSelector } from "react-redux";


const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const words =currentUser ? (`Hey ${currentUser.username}, are you really that free that you are reading my blogs? Go get some shit done`):(`Welome to the Blog,sarle kani first login avvu`);
  return (
    <div className="min-h-screen p-10 text-center dark:bg-black">
      <TextGenerate words={words} />
    </div>
  );
};

export default Home;
