import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Code2, Wrench, Server } from "lucide-react"

const skillCategories = [
  {
    name: "Frameworks",
    icon: <Server className="h-5 w-5 text-primary" />,
    skills: ["React JS", "Redux Toolkit", "Node JS", "Flask", "FastAPI", "LlamaIndex", "RAG", "AI Agents"],
  },
  {
    name: "Databases",
    icon: <Database className="h-5 w-5 text-primary" />,
    skills: ["MongoDB", "PostgreSQL", "Vector Databases (ChromaDB, Pinecone)"],
  },
  {
    name: "Languages",
    icon: <Code2 className="h-5 w-5 text-primary" />,
    skills: ["C++", "Python", "HTML", "CSS", "JavaScript", "SQL"],
  },
  {
    name: "Tools & Others",
    icon: <Wrench className="h-5 w-5 text-primary" />,
    skills: ["GitHub", "Postman", "Material UI", "AWS (EC2, S3)", "Docker", "Selenium", "ChatGPT"],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto px-4 py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1 text-sm rounded-full">
            Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive set of technical skills acquired through professional experience and continuous learning.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Skills</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-3">
                    {category.icon}
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="py-1.5 px-3 text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="frameworks" className="mt-0">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-3">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Frameworks</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {skillCategories[0].skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1.5 px-3 text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="mt-0">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-3">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Languages</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {skillCategories[2].skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1.5 px-3 text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="databases" className="mt-0">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Databases</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {skillCategories[1].skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1.5 px-3 text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-border flex items-center gap-3">
                <Wrench className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Tools & Others</h3>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {skillCategories[3].skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-1.5 px-3 text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
