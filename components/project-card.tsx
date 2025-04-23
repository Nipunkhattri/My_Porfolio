import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  githubLink?: string
}

export default function ProjectCard({ title, description, image, tags, link, githubLink }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubLink && (
            <Link href={githubLink} className="bg-background/80 p-2 rounded-full hover:bg-primary/20 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
          )}
          <Link href={link} className="bg-background/80 p-2 rounded-full hover:bg-primary/20 transition-colors">
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
