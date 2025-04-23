import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon } from "lucide-react"

// Update the experiences array with Nipun's work experience
const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "Envint",
    period: "Dec 2024 - Mar 2025",
    description: "Worked remotely from Noida, IN developing scalable solutions for financial reporting software.",
    achievements: [
      "Developed RESTful APIs (NodeJS) for a financial reporting software, streamlining report generation and eliminating manual Excel-based processes.",
      "Designed scalable backend services using Node.js and DynamoDB to generate and download annual reports in various formats, handling multiple question types (text, number, table, ratio) and data consolidation.",
      "Designed a RAG pipeline using LangChain and Pinecone to automate the generation of peer benchmarking reports from PDFs, improving data retrieval and accuracy.",
    ],
  },
  {
    title: "AI Software Developer Intern",
    company: "The Mango Jelly",
    period: "Oct 2024 - Dec 2024",
    description: "Worked remotely from Noida, IN developing AI solutions and integrations.",
    achievements: [
      "Developed a Multi-Modal Retrieval-Augmented Generation (RAG) system that integrates various data modalities and generates insights from multiple sources (Images, Tables, Text) in PDF.",
      "Built an AI agent using Workflow to process NLP queries and efficiently retrieve Hubspot CRM insights.",
      "Designed a web crawler to extract the content of the company website and weekly updates for market analysis.",
    ],
  },
  {
    title: "SDE Intern",
    company: "Base Tech",
    period: "Feb 2024 - July 2024",
    description: "Worked remotely from Noida, IN developing web applications and AI integrations.",
    achievements: [
      "Implemented Generative AI to automatically generate flashcards and quizzes from PDFs, enhancing the learning experience with interactive content.",
      "Used React js and Redux Toolkit to build dynamic and interactive flashcard and quiz pages, allowing seamless user engagement.",
      "Designed and developed multiple API endpoints using Flask, integrating PostgreSQL for robust database management and scalability.",
    ],
  },
]

export default function ExperienceTimeline() {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent md:before:mx-auto md:before:left-0 md:before:right-0 md:space-y-12">
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} md:gap-6`}
        >
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-primary/10 border border-primary/20 shadow-md md:order-1 z-10">
            <BriefcaseIcon className="w-5 h-5 text-primary" />
          </div>

          <Card className={`flex-grow md:max-w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <h3 className="font-bold text-xl">{experience.title}</h3>
                <Badge variant="outline" className="w-fit">
                  {experience.period}
                </Badge>
              </div>
              <div className="text-primary font-medium mb-4">{experience.company}</div>
              <p className="text-muted-foreground mb-4">{experience.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium">Key Achievements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
