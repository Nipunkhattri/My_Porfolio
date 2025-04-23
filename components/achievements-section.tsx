import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award, Code, Star } from "lucide-react"

const achievements = [
  {
    title: "Regional Finalist",
    description: "Top 20 in the 2022-23 Imagine Cup hackathon showcasing exceptional innovation and talent.",
    icon: <Trophy className="h-10 w-10 text-primary" />,
  },
  {
    title: "CodeChef & LeetCode",
    description: "Maximum Rated 1603, CodeChef (3 Star) and 200+ Problems on LeetCode.",
    icon: <Code className="h-10 w-10 text-primary" />,
  },
  {
    title: "CodeForces",
    description: "Maximum Rated 1071, CodeForces (newbie) at Codeforces.",
    icon: <Star className="h-10 w-10 text-primary" />,
  },
  {
    title: "Hackathon Winner",
    description: "Secured 1st Position at the Wienova hackathon organized by IEEE Delhi.",
    icon: <Award className="h-10 w-10 text-primary" />,
  },
]

export default function AchievementsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1 text-sm rounded-full">
            Recognition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Achievements</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Highlights of my technical accomplishments and recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
