"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Code, Star } from "lucide-react"

const achievements = [
  {
    title: "Regional Finalist",
    description: "Top 20 in the 2022-23 Imagine Cup hackathon showcasing exceptional innovation and talent.",
    icon: <Trophy className="h-10 w-10 text-white" />,
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "CodeChef & LeetCode",
    description: "Maximum Rated 1603, CodeChef (3 Star) and 200+ Problems on LeetCode.",
    icon: <Code className="h-10 w-10 text-white" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "CodeForces",
    description: "Maximum Rated 1071, CodeForces (newbie) at Codeforces.",
    icon: <Star className="h-10 w-10 text-white" />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Hackathon Winner",
    description: "Secured 1st Position at the Wienova hackathon organized by IEEE Delhi.",
    icon: <Award className="h-10 w-10 text-white" />,
    color: "from-blue-500 to-cyan-500",
  },
]

export default function AchievementCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
    >
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.title}
          variants={item}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="rounded-2xl overflow-hidden border border-border bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hoverable"
        >
          <div className={`h-24 bg-gradient-to-r ${achievement.color} relative overflow-hidden`}>
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white/20 p-4 rounded-full">
              {achievement.icon}
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>
          <div className="p-6 pt-8">
            <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
            <p className="text-muted-foreground">{achievement.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
