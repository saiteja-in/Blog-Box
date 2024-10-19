import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Award, Book, Code, Cpu, Database, Globe } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const skills = [
    { category: 'Languages', icon: <Code size={20} />, items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript','Rust'] },
    { category: 'Frameworks', icon: <Globe size={20} />, items: ['React', 'Next.js', 'Express.js', 'TailwindCSS'] },
    { category: 'Tools', icon: <Cpu size={20} />, items: ['Git', 'Docker', 'AWS', 'Kubernetes'] },
    { category: 'Databases', icon: <Database size={20} />, items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <motion.h1 
            className="text-3xl sm:text-4xl font-extrabold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Vurukonda Sai Teja
          </motion.h1>
        </header>

        <motion.section className="mb-16" {...fadeInUp}>
          <h2 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Full Stack Developer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Blockchain Enthusiast | Cinephile
          </p>
          <div className="flex space-x-4">
            {[
              { icon: Mail, href: "mailto:vurukondasaiteja13@gmail.com" },
              { icon: Github, href: "https://github.com/saiteja-in" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/vurukonda-sai-teja-279131201/" }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {React.createElement(item.icon, { size: 24 })}
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16" {...fadeInUp}>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Code className="mr-2" /> Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map(({ category, icon, items }) => (
              <motion.div 
                key={category}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="text-lg font-medium mb-3 flex items-center">
                  {icon}
                  <span className="ml-2">{category}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm shadow"
                      whileHover={{ scale: 1.05, backgroundColor: '#93c5fd' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16" {...fadeInUp}>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Award className="mr-2" /> Achievements
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Hackathon Champion', description: '1st prize in YUKTHI Hackathon by BVRIT College' },
              { title: 'Competitive Programming', description: 'Finalist in OctCoder: Code under the stars' },
            ].map((achievement, index) => (
              <motion.div 
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16" {...fadeInUp}>
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Book className="mr-2" /> Education
          </h3>
          <div className="space-y-6">
            {[
              { 
                school: 'VNR VJIET',
                degree: 'B.Tech in Computer Science and Business Systems',
                period: '2022 - 2026',
                score: 'CPI: 9.1'
              },
              {
                school: 'Sri Chaitanya Jr College',
                degree: 'Intermediate (MPC)',
                period: '2020 - 2022',
                score: 'Percentage: 98.1%'
              }
            ].map((edu, index) => (
              <motion.div 
                key={index}
                className="border-l-4 border-blue-500 pl-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg shadow-lg"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="text-lg font-semibold">{edu.school}</h4>
                <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{edu.period} | {edu.score}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
