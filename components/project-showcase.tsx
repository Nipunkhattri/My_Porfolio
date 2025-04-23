"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
// import hirexai from "../public/hirexai.png"

const projects = [
  {
    id: 1,
    title:"HirexAI (AI proctored Interview Platform)",
    description:
      "HireXAI is an AI-powered recruitment platform that streamlines interview scheduling and assessments. It uses real-time proctoring with object and multi-face detection via YOLO and eye tracking. Recruiters get detailed performance analysis and a leaderboard to make data-driven hiring decisions.",
    image: "/hirexai.png",
    tags: ["FastAPI", "LlamaIndex", "MongoDB", "YOLO-v8","OpenAI", "Smtp-Email"],
    link: "https://hirexai-flax.vercel.app/",
    githubLink: "https://github.com/Nipunkhattri/HirexAI",
  },
  {
    id: 2,
    title: "ChatTube (YouTube Chatbot)",
    description:
      "ChatTube is an AI-powered platform that lets users input a YouTube link, preprocess the video, and query its content using natural language. It leverages Generative AI, llamaIndex, and ChromaDB to deliver accurate, context-aware answers. With features like subtitle support for deaf users and a dynamic React + Flask-based interface, ChatTube enhances video accessibility and productivity through a RAG-based query pipeline.",
    image: "/chattube.png",
    tags: ["Flask", "ReactJS", "sqllite", "flask-sqlalchemy", "generative-ai", "llama-index", "chromadb"],
    link: "https://www.loom.com/share/a1a0cc68f49b4f59a5e6547ad21df038?sid=9ad4e158-933f-47ad-b66a-780abf7eb50e",
    githubLink: "https://github.com/Nipunkhattri/ChatTube",
  },
  // {
  //   id: 3,
  //   title: "LawyerAI (Know Your Rights)",
  //   description:
  //     "Platform that uses Generative AI to automatically create flashcards and quizzes from PDFs, enhancing the learning experience.",
  //   image: "/placeholder.svg?height=600&width=800",
  //   tags: ["React", "Redux", "Flask", "PostgreSQL", "AI"],
  //   link: "#",
  //   githubLink: "#",
  // }
]

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const currentProject = projects[currentIndex]

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      // Swipe left
      handleNext()
    } else if (touchEndX.current - touchStartX.current > 100) {
      // Swipe right
      handlePrevious()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-background/80 backdrop-blur-sm hoverable"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-background/80 backdrop-blur-sm hoverable"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <AnimatePresence initial={false} mode="wait" custom={direction} onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto md:h-[500px] overflow-hidden">
                <img
                  src={currentProject.image || "/placeholder.svg"}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-background"></div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{currentProject.title}</h3>
                <p className="text-muted-foreground mb-6">{currentProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button className="hoverable" onClick={() => window.open(currentProject.link, "_blank")}>
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="hoverable" onClick={() => window.open(currentProject.githubLink, "_blank")}>
                    <Github className="mr-2 h-4 w-4" /> Source Code
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}
