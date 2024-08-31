import React from 'react'
import { FaGithub } from 'react-icons/fa'

const AboutProject = () => {
  return (
    <div className="pb-3">

        <div className="flex flex-row justify-center items-center gap-2">
        <div>More Details About the Project</div>
        <a href="https://github.com/saiteja-in/Blog-Box" target="_blank" rel="noopener noreferrer"><FaGithub size={40}/></a>
      </div>
</div>
  )
}

export default AboutProject
