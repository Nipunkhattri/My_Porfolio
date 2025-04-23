"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Code2, Wrench, Server } from "lucide-react"

const skillCategories = [
  {
    name: "Frameworks",
    icon: <Server className="h-6 w-6" />,
    color: "from-purple-500 to-blue-500",
    skills: ["React JS", "Redux Toolkit", "Node JS", "Flask", "FastAPI", "LlamaIndex", "RAG", "AI Agents"],
  },
  {
    name: "Databases",
    icon: <Database className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    skills: ["MongoDB", "PostgreSQL", "Vector Databases (ChromaDB, Pinecone)"],
  },
  {
    name: "Languages",
    icon: <Code2 className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    skills: ["C++", "Python", "HTML", "CSS", "JavaScript", "SQL"],
  },
  {
    name: "Tools & Others",
    icon: <Wrench className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: ["GitHub", "Postman", "Material UI", "AWS (EC2, S3)", "Docker", "Selenium", "ChatGPT"],
  },
]

export default function InteractiveSkills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCategoryChange = (category: (typeof skillCategories)[0]) => {
    if (category.name === activeCategory.name || isAnimating) return
    setIsAnimating(true)
    setActiveCategory(category)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {skillCategories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(category)}
            className={`cursor-pointer rounded-xl p-6 text-center transition-all duration-300 hoverable
              ${activeCategory.name === category.name ? "bg-gradient-to-r " + category.color + " text-white shadow-lg" : "bg-background/50 border border-border hover:border-primary/50"}`}
          >
            <div className="flex justify-center mb-3">
              <div
                className={`p-3 rounded-full ${activeCategory.name === category.name ? "bg-white/20" : "bg-primary/10"}`}
              >
                {category.icon}
              </div>
            </div>
            <h3 className="font-medium">{category.name}</h3>
          </motion.div>
        ))}
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${activeCategory.color}`}>{activeCategory.icon}</div>
              {activeCategory.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 + 0.2 }}
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeCategory.color}`}
                  ></motion.div>
                  <div className="flex-1">
                    <div className="font-medium">{skill}</div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 40 + 60}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-1 mt-2 rounded-full bg-gradient-to-r ${activeCategory.color}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
