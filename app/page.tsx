"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ChevronRight, Menu, X, ArrowDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import InteractiveSkills from "@/components/interactive-skills"
import ProjectShowcase from "@/components/project-showcase"
import ExperienceOrbit from "@/components/experience-orbit"
import ContactForm from "@/components/contact-form"
import AchievementCards from "@/components/achievement-cards"
import img from "../public/test.jpeg"

// Dynamically import the particle background to avoid SSR issues
const ParticleBackground = dynamic(() => import("@/components/particle-background"), {
  ssr: false,
})

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHovered, setCursorHovered] = useState(false)

  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const achievementsRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).classList.contains("hoverable")
      ) {
        setCursorHovered(true)
      } else {
        setCursorHovered(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: aboutRef, id: "about" },
        { ref: skillsRef, id: "skills" },
        { ref: experienceRef, id: "experience" },
        { ref: projectsRef, id: "projects" },
        { ref: achievementsRef, id: "achievements" },
        { ref: contactRef, id: "contact" },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "smooth",
      })
      setMenuOpen(false)
    }
  }

  const navItems = [
    { name: "About", ref: aboutRef },
    { name: "Skills", ref: skillsRef },
    { name: "Experience", ref: experienceRef },
    { name: "Projects", ref: projectsRef },
    { name: "Achievements", ref: achievementsRef },
    { name: "Contact", ref: contactRef },
  ]

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: cursorHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      >
        {cursorHovered && <div className="w-2 h-2 bg-primary rounded-full"></div>}
      </motion.div>

      {/* Particle Background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-md" : "py-6"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            <span className="text-primary">Nipun</span>Khatri
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.ref)}
                className={`relative px-1 py-2 hoverable ${activeSection === item.name.toLowerCase() ? "text-primary" : "text-foreground"
                  }`}
              >
                {item.name}
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden text-foreground hoverable"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-md pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.ref)}
                  className={`flex items-center justify-between p-4 border-b border-border ${activeSection === item.name.toLowerCase() ? "text-primary" : "text-foreground"
                    }`}
                >
                  <span className="text-xl font-medium">{item.name}</span>
                  <ChevronRight size={20} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden"
      >
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-[800px] h-[800px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl animate-pulse"></div>
          </div>
        </motion.div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                Software Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block">
                Hi, I'm <span className="text-primary">Nipun Khatri</span>
              </span>
              {/* <span className="block mt-2 text-2xl md:text-2xl text-muted-foreground">Building AI-powered solutions that shape the future of the web</span> */}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Software Developer specialized in building scalable and intelligent web applications using Generative AI, Machine Learning, and RESTful APIs. Passionate about enhancing user experience and driving platform efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden hoverable"
                onClick={() => scrollToSection(projectsRef)}
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden hoverable"
                onClick={() => scrollToSection(contactRef)}
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-6 justify-center mt-12"
            >
              <Link
                href="https://github.com/Nipunkhattri"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hoverable"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/nipun-khatri-80b168224/"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hoverable"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="mailto:nipunkhattri321@gmail.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hoverable"
              >
                <Mail size={24} />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="min-h-screen flex items-center py-20 relative overflow-hidden" id="about">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto md:ml-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/10 blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl"></div>
                <img
                  src={img.src}
                  alt="Nipun Khatri"
                  width={400}
                  height={200}
                  className="rounded-2xl object-cover w-full h-full p-2"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-background p-4 rounded-xl shadow-lg border border-border"
                >
                  <div className="text-4xl font-bold">
                    1<span className="text-primary">+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                  About Me
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Crafting Digital Experiences with Code
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-6"
              >
                I'm a Software Developer with expertise in developing scalable solutions using Generative AI,
                Machine Learning, and RESTful APIs. I focus on improving user engagement and platform efficiency through
                innovative technology solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-8"
              >
                My journey in software development began with a curiosity about how technology can solve real-world
                problems. Today, I am specialized in building applications that leverage the power of AI and machine
                learning to create intuitive and efficient user experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Noida, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>nipunkhattri321@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>+91-6386457174</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Available for Work</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="/Nipun_Resume.pdf" download>
                  <Button className="hoverable">
                    Download Resume
                  </Button>
                </a>              
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="min-h-screen py-20 relative overflow-hidden" id="skills">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                My Expertise
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Technical Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              A comprehensive set of technical skills acquired through professional experience and continuous learning.
            </motion.p>
          </div>

          <InteractiveSkills />
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="min-h-screen py-20 relative overflow-hidden" id="experience">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                Career Path
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Work Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              My professional journey through various roles and companies.
            </motion.p>
          </div>

          <ExperienceOrbit />
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="min-h-screen py-20 relative overflow-hidden" id="projects">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                My Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              A selection of my most significant work that demonstrates my capabilities.
            </motion.p>
          </div>

          <ProjectShowcase />

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="hoverable">
              View All Projects <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div> */}
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="min-h-screen py-20 relative overflow-hidden" id="achievements">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                Recognition
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Achievements
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              Highlights of my technical accomplishments and recognition.
            </motion.p>
          </div>

          <AchievementCards />
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="min-h-screen py-20 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                  Get In Touch
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Let's Work Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-8"
              >
                Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and
                collaborations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-300">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">nipunkhattri321@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-300">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-muted-foreground">https://www.linkedin.com/in/nipun-khatri-80b168224/</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-300">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-muted-foreground">https://github.com/Nipunkhattri</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-bold text-xl">
              <span className="text-primary">Nipun</span>Khatri
            </div>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Nipun Khatri. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="https://github.com/Nipunkhattri" className="text-muted-foreground hover:text-primary transition-colors hoverable">
                <Github className="h-5 w-5" href="https://github.com/Nipunkhattri" />
              </Link>
              <Link href="https://www.linkedin.com/in/nipun-khatri-80b168224/" className="text-muted-foreground hover:text-primary transition-colors hoverable">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="nipunkhattri321@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hoverable">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
