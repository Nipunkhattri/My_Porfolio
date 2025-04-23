"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BriefcaseIcon, ChevronRight } from "lucide-react"

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "Envint",
    period: "Dec 2024 - Mar 2025",
    location: "Remote - Noida, IN",
    description:
      "Developed RESTful APIs and scalable backend services for financial reporting software, streamlining report generation and eliminating manual processes.",
    achievements: [
      "Developed RESTful APIs (NodeJS) for a financial reporting software, streamlining report generation and eliminating manual Excel-based processes.",
      "Designed scalable backend services using Node.js and DynamoDB to generate and download annual reports in various formats, handling multiple question types (text, number, table, ratio) and data consolidation.",
      "Designed a RAG pipeline using LangChain and Pinecone to automate the generation of peer benchmarking reports from PDFs, improving data retrieval and accuracy.",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "AI Software Developer Intern",
    company: "The Mango Jelly",
    period: "Oct 2024 - Dec 2024",
    location: "Remote - Noida, IN",
    description:
      "Developed Multi-Modal RAG systems and AI agents for processing NLP queries and efficiently retrieving insights from various data sources.",
    achievements: [
      "Developed a Multi-Modal Retrieval-Augmented Generation (RAG) system that integrates various data modalities and generates insights from multiple sources (Images, Tables, Text) in PDF.",
      "Built an AI agent using Workflow to process NLP queries and efficiently retrieve Hubspot CRM insights.",
      "Designed a web crawler to extract the content of the company website and weekly updates for market analysis.",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "SDE Intern",
    company: "Base Tech",
    period: "Feb 2024 - July 2024",
    location: "Remote - Noida, IN",
    description:
      "Implemented Generative AI solutions and built interactive web applications with React and Flask for enhanced learning experiences.",
    achievements: [
      "Implemented Generative AI to automatically generate flashcards and quizzes from PDFs, enhancing the learning experience with interactive content.",
      "Used React js and Redux Toolkit to build dynamic and interactive flashcard and quiz pages, allowing seamless user engagement.",
      "Designed and developed multiple API endpoints using Flask, integrating PostgreSQL for robust database management and scalability.",
    ],
    color: "from-orange-500 to-red-500",
  },
]

export default function ExperienceOrbit() {
  const [activeExperience, setActiveExperience] = useState(experiences[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleExperienceChange = (experience: (typeof experiences)[0]) => {
    if (experience.title === activeExperience.title || isAnimating) return
    setIsAnimating(true)
    setActiveExperience(experience)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.title}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExperienceChange(experience)}
            className={`cursor-pointer rounded-xl p-6 transition-all duration-300 hoverable
              ${
                activeExperience.title === experience.title
                  ? "bg-gradient-to-r " + experience.color + " text-white shadow-lg"
                  : "bg-background/50 border border-border hover:border-primary/50"
              }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className={`p-2 rounded-full ${
                  activeExperience.title === experience.title ? "bg-white/20" : "bg-primary/10"
                }`}
              >
                <BriefcaseIcon className="h-5 w-5" />
              </div>
              <div className="font-medium">{experience.period}</div>
            </div>
            <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
            <p className={activeExperience.title === experience.title ? "text-white/80" : "text-muted-foreground"}>
              {experience.company}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperience.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-full bg-gradient-to-r ${activeExperience.color}`}>
                <BriefcaseIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{activeExperience.title}</h3>
                <p className="text-muted-foreground">
                  {activeExperience.company} • {activeExperience.period}
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{activeExperience.description}</p>

            <div className="space-y-4">
              <h4 className="font-medium text-lg">Key Achievements:</h4>
              {activeExperience.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <p>{achievement}</p>
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
