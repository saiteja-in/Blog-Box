// import React from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Github, Linkedin, Award, Book, Code, Cpu, Database, Globe } from 'lucide-react';

// const About = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const skills = [
//     { category: 'Languages', icon: <Code size={20} />, items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript','Rust'] },
//     { category: 'Frameworks', icon: <Globe size={20} />, items: ['React', 'Next.js', 'Express.js', 'TailwindCSS'] },
//     { category: 'Tools', icon: <Cpu size={20} />, items: ['Git', 'Docker', 'AWS', 'Kubernetes'] },
//     { category: 'Databases', icon: <Database size={20} />, items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] }
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         <header className="mb-12">
//           <motion.h1 
//             className="text-3xl sm:text-4xl font-extrabold"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Vurukonda Sai Teja
//           </motion.h1>
//         </header>

//         <motion.section className="mb-16" {...fadeInUp}>
//           <h2 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//             Full Stack Developer
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
//             Blockchain Enthusiast | Cinephile
//           </p>
//           <div className="flex space-x-4">
//             {[
//               { icon: Mail, href: "mailto:vurukondasaiteja13@gmail.com" },
//               { icon: Github, href: "https://github.com/saiteja-in" },
//               { icon: Linkedin, href: "https://www.linkedin.com/in/vurukonda-sai-teja-279131201/" }
//             ].map((item, index) => (
//               <motion.a 
//                 key={index}
//                 href={item.href}
//                 className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors duration-300"
//                 whileHover={{ scale: 1.2, rotate: 5 }}
//               >
//                 {React.createElement(item.icon, { size: 24 })}
//               </motion.a>
//             ))}
//           </div>
//         </motion.section>

//         <motion.section className="mb-16" {...fadeInUp}>
//           <h3 className="text-2xl font-semibold mb-6 flex items-center">
//             <Code className="mr-2" /> Skills
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {skills.map(({ category, icon, items }) => (
//               <motion.div 
//                 key={category}
//                 className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg"
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <h4 className="text-lg font-medium mb-3 flex items-center">
//                   {icon}
//                   <span className="ml-2">{category}</span>
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {items.map((skill) => (
//                     <motion.span
//                       key={skill}
//                       className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm shadow"
//                       whileHover={{ scale: 1.05, backgroundColor: '#93c5fd' }}
//                     >
//                       {skill}
//                     </motion.span>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <motion.section className="mb-16" {...fadeInUp}>
//           <h3 className="text-2xl font-semibold mb-6 flex items-center">
//             <Award className="mr-2" /> Achievements
//           </h3>
//           <div className="space-y-4">
//             {[
//               { title: 'Hackathon Champion', description: '1st prize in YUKTHI Hackathon by BVRIT College' },
//               { title: 'Competitive Programming', description: 'Finalist in OctCoder: Code under the stars' },
//             ].map((achievement, index) => (
//               <motion.div 
//                 key={index}
//                 className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
//                 <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <motion.section className="mb-16" {...fadeInUp}>
//           <h3 className="text-2xl font-semibold mb-6 flex items-center">
//             <Book className="mr-2" /> Education
//           </h3>
//           <div className="space-y-6">
//             {[
//               { 
//                 school: 'VNR VJIET',
//                 degree: 'B.Tech in Computer Science and Business Systems',
//                 period: '2022 - 2026',
//                 score: 'CPI: 9.1'
//               },
//               {
//                 school: 'Sri Chaitanya Jr College',
//                 degree: 'Intermediate (MPC)',
//                 period: '2020 - 2022',
//                 score: 'Percentage: 98.1%'
//               }
//             ].map((edu, index) => (
//               <motion.div 
//                 key={index}
//                 className="border-l-4 border-blue-500 pl-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg shadow-lg"
//                 whileHover={{ x: 5 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <h4 className="text-lg font-semibold">{edu.school}</h4>
//                 <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-500">{edu.period} | {edu.score}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// };

// export default About;
// import React from 'react'

// const About = () => {
//   return (
//     <div>
//       hi there
//     </div>
//   )
// }

// export default About
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Terminal, Medal, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const skills = {
    'Languages': ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'R'],
    'Frameworks': ['React', 'Next.js', 'Express.js', 'Bootstrap', 'jQuery', 'Framer Motion'],
    'Tools': ['Git', 'GitHub', 'VSCode', 'Linux', 'Postman', 'Docker'],
    'Libraries': ['Mongoose', 'Node', 'Prisma', 'OpenCV', 'MATLAB', 'TensorFlow']
  };

  const projects = [
    {
      title: 'Obscenity Content Blocker',
      tech: ['Python', 'React', 'Docker', 'TensorFlow'],
      description: 'Advanced web extension using CNN and MobileNetV2 architecture that blocked obscene content, reducing inappropriate content by 95% and enhancing user experience for 5000+ users.'
    },
    {
      title: 'GameBoxd',
      tech: ['TypeScript', 'React', 'Chakra UI'],
      description: 'A web application clone of the RAWG API for discovering and exploring video games, offering features such as game details and search functionality.'
    },
    {
      title: 'Stock Signal Generator',
      tech: ['R', 'Quantmod', 'TTR'],
      description: 'Application that generates Buy and Sell signals using MACD, RSI, and Stochastic indicators.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
        <motion.header 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Vurukonda Sai Teja
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 tracking-wide">
              Full Stack Developer | Blockchain Enthusiast | Cinephile
            </p>
          </div>
          
          <div className="flex justify-center space-x-8">
            {[
              { icon: Mail, href: "mailto:vurukondasaiteja13@gmail.com", label: "Email" },
              { icon: Github, href: "https://github.com/saiteja-in", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/vurukonda-sai-teja-279131201/", label: "LinkedIn" }
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </motion.a>
            ))}
          </div>
        </motion.header>

        <nav className="mb-16">
          <motion.div 
            className="flex justify-center space-x-6 text-base sm:text-lg"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {['about', 'projects', 'skills', 'education'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-2xl capitalize transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                variants={item}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        </nav>

        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'about' && (
            <motion.section variants={container} initial="hidden" animate="show">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                  I'm a Computer Science and Business Systems undergraduate at VNR VJIET with a strong academic background 
                  (CPI: 9.1). I've demonstrated excellence in competitive programming and have achieved significant 
                  rankings in national-level examinations like JEE Advanced (AIR 13,023) and TS EAMCET (Rank 5493).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Terminal className="w-6 h-6 mr-3" /> Coding Profiles
                    </h3>
                    <div className="space-y-3">
                      {['Codeforces', 'LeetCode', 'CodeChef'].map((platform) => (
                        <span 
                          key={platform}
                          className="inline-block mr-2 px-4 py-2 text-base bg-white dark:bg-gray-800 rounded-full shadow-sm"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Medal className="w-6 h-6 mr-3" /> Achievements
                    </h3>
                    <ul className="space-y-3 text-base text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span> YUKTHI Hackathon Champion
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span> OctCoder Finalist
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span> Inter-college Badminton Champion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'projects' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-4 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                    {project.title}
                    <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 text-base bg-blue-100 dark:bg-blue-900/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {Object.entries(skills).map(([category, items]) => (
                <motion.div 
                  key={category} 
                  variants={item}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-6">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 text-base bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div 
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[
                {
                  institution: 'VNR VJIET',
                  degree: 'B.Tech in Computer Science and Business Systems',
                  period: '2022 - 2026',
                  score: 'CPI: 9.1'
                },
                {
                  institution: 'Sri Chaitanya Jr College',
                  degree: 'Intermediate (MPC)',
                  period: '2020 - 2022',
                  score: 'Percentage: 98.1%'
                },
                {
                  institution: 'New Little Flower High School',
                  degree: 'Matriculation',
                  period: '2019 - 2020',
                  score: 'GPA: 9.8'
                }
              ].map((edu, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{edu.institution}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{edu.degree}</p>
                      <p className="text-base text-gray-500">{edu.period}</p>
                    </div>
                    <span className="px-4 py-2 text-base bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      {edu.score}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;