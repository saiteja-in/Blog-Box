import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <>
    <div className=" min-h-screen dark:bg-black">
      <div className="text-4xl flex justify-center py-10">
        Bruhh This is my Project !!
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>more here</div>
        <a href="https://github.com/saiteja-in" target="_blank" rel="noopener noreferrer"><FaGithub size={40}/></a>
      </div>
      
{/*      
      <div className="absolute bottom-0 right-0 p-4">
        <p>More projects to come...</p>

      </div> */}
    </div>
    </>
  );
};

export default Projects;
