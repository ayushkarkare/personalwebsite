"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Moon, Sun, Github, Youtube, Mail, ExternalLink, Download, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Personal data - edit these to customize your site
const YOU = {
  name: "Ayush Karkare",
  tagline: "Aerospace student • Builder • Cinematography enjoyer",
  bio: "I design and build things that fly... In my free time I like taking photos and making videos.",
  email: "you@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  socials: {
    github: "https://github.com/yourhandle",
    youtube: "https://youtube.com/@yourchannel",
    linkedin: "https://www.linkedin.com/in/yourhandle/",
  },
  resumeUrl: "/resume.pdf", // Add your resume file to the public folder
  skills: ["Python", "React", "TypeScript", "Aero", "CAD"],
  social: [
    { platform: "GitHub", url: "https://github.com/yourhandle" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/yourhandle/" },
    { platform: "YouTube", url: "https://youtube.com/@yourchannel" },
  ],
}

type Media =
  | { type: "video"; id: string; title?: string; tags?: string[] }
  | { type: "photo"; src: string; title?: string; tags?: string[] }

const CREATIVE_MEDIA: Media[] = [
  { type: "video", id: "dQw4w9WgXcQ", title: "Sample Video", tags: ["travel"] },
  { type: "photo", src: "/majestic-mountain-vista.png", title: "Mountains", tags: ["outdoors"] },
  { type: "photo", src: "/sunset-cityscape.png", title: "City Lights", tags: ["urban"] },
  { type: "video", id: "jNQXAC9IVRw", title: "Another Video", tags: ["tech"] },
  { type: "photo", src: "/forest-path.png", title: "Forest Path", tags: ["nature", "outdoors"] },
  { type: "photo", src: "/placeholder-bhxyx.png", title: "Architecture", tags: ["urban"] },
]

const PROJECTS = [
  {
    title: "BrewTrack",
    year: 2025,
    description: "AI analytics for cafés.",
    tags: ["Python", "LLM"],
    link: "#",
    github: "https://github.com/yourhandle/brewtrack",
    demo: "https://brewtrack.com",
  },
  {
    title: "Flight Club Glider",
    year: 2025,
    description: "Glider for Red Bull Flugtag.",
    tags: ["Aero", "CAD"],
    link: "#",
    github: "https://github.com/yourhandle/flightclubglider",
  },
  {
    title: "Portfolio Website",
    year: 2024,
    description: "Personal website with command palette.",
    tags: ["React", "TypeScript"],
    link: "#",
    github: "https://github.com/yourhandle/yourportfolio",
  },
  {
    title: "Weather Station",
    year: 2024,
    description: "IoT weather monitoring system.",
    tags: ["Arduino", "Python"],
    link: "#",
    github: "https://github.com/yourhandle/weatherstation",
  },
]

const EXPERIENCE = [
  {
    role: "Flight Test Engineering Intern",
    company: "Boeing @ Edwards AFB",
    period: "Summer 2025",
    bullets: ["Supported avionics testing.", "Automated telemetry report checks."],
  },
  {
    role: "Research Assistant",
    company: "University Aerospace Lab",
    period: "2024 - Present",
    bullets: ["Developed flight control algorithms.", "Published research on autonomous systems."],
  },
]

type SearchItem = {
  id: string
  type: "section" | "project" | "experience" | "creative" | "command"
  title: string
  description?: string
  keywords: string[]
  action: () => void
}

function GradientFX() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "#2563eb", // Ford Bronco blue - deeper baby blue
        }}
      />
    </div>
  )
}

function BlurVeil() {
  return <div className="fixed inset-0 -z-10 bg-white/60 dark:bg-black/40 pointer-events-none" />
}

function CommandPalette({
  open,
  onClose,
  onToggleTheme,
  items,
  onProjectFilter,
}: {
  open: boolean
  onClose: () => void
  onToggleTheme: () => void
  items: SearchItem[]
  onProjectFilter: (tag: string) => void
}) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recents, setRecents] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("command-palette-recents")
    if (stored) {
      setRecents(JSON.parse(stored))
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (!query) return items.slice(0, 6)

    return items
      .filter((item) => {
        const searchText = `${item.title} ${item.description || ""} ${item.keywords.join(" ")}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      .slice(0, 6)
  }, [query, items])

  const executeItem = (item: SearchItem) => {
    item.action()
    const newRecents = [item.id, ...recents.filter((id) => id !== item.id)].slice(0, 4)
    setRecents(newRecents)
    localStorage.setItem("command-palette-recents", JSON.stringify(newRecents))
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          executeItem(filteredItems[selectedIndex])
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, filteredItems, selectedIndex, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[20vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md mx-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <Input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-sm bg-transparent"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 transition-colors ${
                index === selectedIndex ? "bg-zinc-100 dark:bg-zinc-800" : ""
              }`}
              onClick={() => executeItem(item)}
            >
              <div className="font-medium text-sm">{item.title}</div>
              {item.description && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{item.description}</div>
              )}
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-3 py-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">No results found</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function ProjectFilters({
  tags,
  active,
  onPick,
}: {
  tags: string[]
  active: string
  onPick: (tag: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={active === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onPick(tag)}
          className={`rounded-xl ${
            active === tag
              ? "bg-blue-600 text-white border-0"
              : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
          }`}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-16 first:pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">{title}</h2>
        {children}
      </div>
    </section>
  )
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeProjectTag, setActiveProjectTag] = useState("All")

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = (stored as "light" | "dark") || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const projectTags = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))]
  const filteredProjects =
    activeProjectTag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeProjectTag))

  const searchItems: SearchItem[] = [
    {
      id: "about",
      type: "section",
      title: "Go to About",
      keywords: ["about", "bio", "intro"],
      action: () => scrollToSection("about"),
    },
    {
      id: "creative",
      type: "section",
      title: "Go to Creative",
      keywords: ["creative", "photos", "videos", "gallery"],
      action: () => scrollToSection("creative"),
    },
    {
      id: "projects",
      type: "section",
      title: "Go to Projects",
      keywords: ["projects", "work", "code"],
      action: () => scrollToSection("projects"),
    },
    {
      id: "experience",
      type: "section",
      title: "Go to Experience",
      keywords: ["experience", "work", "jobs", "career"],
      action: () => scrollToSection("experience"),
    },
    {
      id: "contact",
      type: "section",
      title: "Go to Contact",
      keywords: ["contact", "email", "phone", "reach"],
      action: () => scrollToSection("contact"),
    },
    {
      id: "resume",
      type: "section",
      title: "Go to Resume",
      keywords: ["resume", "cv", "download"],
      action: () => scrollToSection("resume"),
    },
    {
      id: "toggle-theme",
      type: "command",
      title: "Toggle Theme",
      keywords: ["theme", "dark", "light", "mode"],
      action: toggleTheme,
    },
    ...PROJECTS.map((project) => ({
      id: `project-${project.title}`,
      type: "project" as const,
      title: project.title,
      description: project.description,
      keywords: [...project.tags, project.title.toLowerCase()],
      action: () => scrollToSection("projects"),
    })),
    ...EXPERIENCE.map((exp, i) => ({
      id: `experience-${i}`,
      type: "experience" as const,
      title: exp.role,
      description: `${exp.company} • ${exp.period}`,
      keywords: [exp.role.toLowerCase(), exp.company.toLowerCase()],
      action: () => scrollToSection("experience"),
    })),
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <GradientFX />
      <BlurVeil />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl text-blue-600 dark:text-blue-400">{getInitials(YOU.name)}</div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("creative")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Creative
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("resume")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Resume
              </button>
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaletteOpen(true)}
                className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
              >
                <Search className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">
                  ⌘K
                </kbd>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Sun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <Section id="about" title="About">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">{YOU.name}</h2>
            <p className="text-lg leading-relaxed">{YOU.bio}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/professional-headshot.png"
                alt={`${YOU.name} headshot`}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border-4 border-blue-200 dark:border-blue-800 shadow-lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects">
        <ProjectFilters tags={projectTags} active={activeProjectTag} onPick={setActiveProjectTag} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-950/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex space-x-2">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Creative Section */}
      <Section id="creative" title="Creative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_MEDIA.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
            >
              {item.type === "video" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${item.id}`}
                  title={item.title || "Video"}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              ) : (
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title || "Photo"}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              {item.title && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-white/20 text-white border-white/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Experience">
        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-6">
                <div className="w-3 h-3 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
                {index < EXPERIENCE.length - 1 && <div className="w-px h-16 bg-zinc-200 dark:bg-zinc-800 mt-2"></div>}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 mb-3">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
                <ul className="space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="text-zinc-700 dark:text-zinc-300">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href={`mailto:${YOU.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {YOU.email}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href={`tel:${YOU.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {YOU.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400">{YOU.location}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex space-x-4">
              {YOU.social.map((link) => (
                <Button
                  key={link.platform}
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    {link.platform}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="resume" title="Resume">
        <div className="max-w-3xl">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Download my resume to learn more about my background, skills, and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <a href={YOU.resumeUrl} download className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-xl bg-transparent">
              <a href={YOU.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>View Online</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-zinc-600 dark:text-zinc-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {YOU.name}
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={YOU.socials.github}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={YOU.socials.youtube}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${YOU.email}`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onToggleTheme={toggleTheme}
            items={searchItems}
            onProjectFilter={setActiveProjectTag}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
