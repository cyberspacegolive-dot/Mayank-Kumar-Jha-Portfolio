"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Menu,
  X,
  Calendar,
  MapPin,
  Award,
  Code,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    let ticking = false
    const updateScrollY = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", updateScrollY, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollY)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let animationFrame: number
    const updateMousePosition = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const animatedElements = document.querySelectorAll(".animate-on-scroll")

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" },
    )

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    sections.forEach((section) => sectionObserver.observe(section))
    animatedElements.forEach((element) => animationObserver.observe(element))

    return () => {
      sectionObserver.disconnect()
      animationObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setSparkles(newSparkles)
    }
    generateSparkles()
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/mayankkumarjah", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mayankkumarjah", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/mayankkumarjah", label: "Twitter" },
    { icon: Mail, href: "mailto:mayank@dreemlab.com", label: "Email" },
  ]

  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
    Backend: ["Node.js", "Python", "Express.js", "FastAPI", "PostgreSQL", "MongoDB"],
    "Cloud & DevOps": ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    "Tools & Others": ["Git", "Figma", "Prisma", "GraphQL", "Redis", "Elasticsearch"],
  }

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indian Institute of Technology (IIT)",
      year: "2018-2022",
      location: "Delhi, India",
      description: "Specialized in Software Engineering and Data Structures. Graduated with First Class Honors.",
    },
    {
      degree: "Full Stack Web Development Certification",
      institution: "freeCodeCamp",
      year: "2020",
      location: "Online",
      description: "Comprehensive certification covering modern web development technologies and best practices.",
    },
  ]

  const experience = [
    {
      title: "Founder & CEO",
      company: "Dreemlab",
      period: "2022 - Present",
      location: "Remote",
      description:
        "Founded and leading a tech services company specializing in web development, mobile apps, and digital transformation. Built a team of 8+ developers and delivered 50+ projects.",
      achievements: [
        "Scaled company to $500K+ ARR",
        "Built partnerships with 20+ clients",
        "Developed proprietary development framework",
      ],
    },
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - 2022",
      location: "Bangalore, India",
      description:
        "Led development of enterprise web applications using React, Node.js, and AWS. Mentored junior developers and implemented best practices.",
      achievements: [
        "Reduced application load time by 60%",
        "Led team of 5 developers",
        "Implemented microservices architecture",
      ],
    },
    {
      title: "Software Development Intern",
      company: "StartupXYZ",
      period: "2020 - 2021",
      location: "Mumbai, India",
      description:
        "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with design and product teams.",
      achievements: [
        "Built 3 major features from scratch",
        "Improved code coverage to 85%",
        "Optimized database queries",
      ],
    },
  ]

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-SA-2023-MKJ",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2022",
      credentialId: "GCP-PD-2022-MKJ",
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      year: "2021",
      credentialId: "MDB-DEV-2021-MKJ",
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      year: "2021",
      credentialId: "META-REACT-2021-MKJ",
    },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and order processing.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      github: "https://github.com/mayankkumarjah/ecommerce-platform",
      live: "https://ecommerce-demo.dreemlab.com",
      image: "/modern-ecommerce-interface.png",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration features, and advanced analytics dashboard.",
      tech: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Vercel"],
      github: "https://github.com/mayankkumarjah/task-manager",
      live: "https://taskmanager.dreemlab.com",
      image: "/task-management-dashboard.png",
    },
    {
      title: "AI Content Generator",
      description:
        "AI-powered content generation tool using OpenAI API. Features include blog post generation, social media content, and SEO optimization.",
      tech: ["Python", "FastAPI", "OpenAI API", "React", "Docker"],
      github: "https://github.com/mayankkumarjah/ai-content-generator",
      live: "https://ai-content.dreemlab.com",
      image: "/ai-content-generation-interface.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden gpu-accelerated">
      <div
        className="cursor-dot"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white professional-glow">Mayank Kumar Jah</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white hover-scale professional-glow animate-fade-in-scale stagger-${index + 1} ${
                      activeSection === item.id ? "text-white border-b-2 border-white" : "text-white/70"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <Link href="/dreemlab">
                  <Button
                    size="sm"
                    className="ml-6 bg-white text-black hover:bg-white/90 font-semibold px-6 py-2 relative overflow-hidden group animate-fade-in-scale stagger-8 transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center">
                      My Company
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover-scale transition-transform professional-glow text-white hover:text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 animate-fade-in-scale">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-white animate-slide-in-left professional-glow stagger-${index + 1} ${
                    activeSection === item.id ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/dreemlab" className="block px-3 py-2">
                <Button className="w-full bg-white text-black hover:bg-white/90 font-semibold animate-slide-in-left stagger-8 transition-all duration-300">
                  <span className="flex items-center justify-center">
                    My Company <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle opacity-20"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-full animate-float-slow" />
          <div className="absolute top-40 right-20 w-16 h-16 border border-white/10 rotate-45 animate-float-reverse" />
          <div className="absolute bottom-40 left-20 w-12 h-12 border border-white/10 rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rotate-12 animate-float-slow" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Profile Picture Section */}
              <div className="relative animate-fade-in-up">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Animated border rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow" />
                  <div className="absolute inset-2 rounded-full border border-white/10 animate-spin-reverse" />

                  {/* Profile image container */}
                  <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm">
                    <img
                      src="/software-developer-headshot.png"
                      alt="Mayank Kumar Jah - Full Stack Developer"
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating elements around profile */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full animate-float-reverse" />
                  <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary/30 rotate-45 animate-float-slow" />
                </div>
              </div>

              {/* Content Section */}
              <div className="text-center lg:text-left space-y-8 flex-1">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-balance animate-fade-in-up professional-glow text-gradient leading-tight">
                    Mayank Kumar Jah
                  </h1>
                  <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground text-balance animate-fade-in-up professional-glow stagger-2 font-light">
                    Full-Stack Developer & Tech Entrepreneur
                  </p>
                  <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-pretty animate-fade-in-up stagger-3 leading-relaxed">
                    Crafting digital experiences with modern technologies. Founder of Dreemlab, passionate about
                    innovation and clean code.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up stagger-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-full border border-border/30 bg-white/5 backdrop-blur-sm hover-glow transition-all duration-300 hover-lift professional-glow animate-fade-in-scale stagger-${index + 4} group`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up stagger-6">
                  <Button
                    size="lg"
                    asChild
                    className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-4 hover-lift group transition-all duration-300"
                  >
                    <a href="#projects" className="flex items-center text-black">
                      View My Work
                      <ExternalLink className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="font-semibold px-8 py-4 bg-black/80 backdrop-blur-sm border-white/20 hover:bg-black/90 hover-lift group text-white"
                  >
                    <a href="#contact" className="flex items-center text-white">
                      Get In Touch
                      <Mail className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Link href="/dreemlab">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-4 relative overflow-hidden group hover-lift transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center text-black">
                        Visit Dreemlab
                        <ExternalLink className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float professional-glow">
          <div className="w-8 h-12 border-2 border-foreground/50 rounded-full flex justify-center hover-scale transition-transform cursor-pointer backdrop-blur-sm bg-white/5">
            <div className="w-1 h-4 bg-foreground/70 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section id="education" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Education</h2>
            <p className="text-xl text-muted-foreground text-pretty">My academic journey and continuous learning</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="p-6 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300 hover-scale">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors text-gradient">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-medium mb-1">{edu.institution}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center py-20 bg-muted/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance">Skills & Technologies</h2>
            <p className="text-xl text-muted-foreground text-pretty">Technologies I work with to bring ideas to life</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card
                key={category}
                className="p-6 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-5 w-5 text-primary hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-gradient">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`text-xs hover-scale transition-transform duration-200 cursor-default animate-fade-in-scale stagger-${skillIndex + 1}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance">Professional Experience</h2>
            <p className="text-xl text-muted-foreground text-pretty">My journey in the tech industry</p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card
                key={index}
                className="p-6 bg-transparent-white hover:shadow-lg transition-all duration-500 hover:scale-[1.02] animate-on-scroll opacity-0 translate-y-8"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold hover:text-primary transition-colors">{exp.title}</h3>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </p>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">Key Achievements:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="hover:text-foreground transition-colors">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="min-h-screen flex items-center justify-center py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance">Certifications</h2>
            <p className="text-xl text-muted-foreground text-pretty">Professional certifications and achievements</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 bg-transparent-white text-center hover:shadow-lg transition-all duration-500 hover:scale-105 animate-on-scroll opacity-0 translate-y-8"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 hover:bg-primary/20 transition-colors duration-300">
                  <Award className="h-8 w-8 text-primary hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{cert.name}</h3>
                <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mb-2">{cert.year}</p>
                <p className="text-xs text-muted-foreground font-mono">{cert.credentialId}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Featured Projects</h2>
            <p className="text-xl text-muted-foreground text-pretty">Some of my recent work and side projects</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 group professional-glow"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors text-gradient">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`text-xs hover-scale transition-transform duration-200 animate-fade-in-scale stagger-${techIndex + 1}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="hover-scale transition-transform duration-300 bg-transparent"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="hover-scale transition-transform duration-300 corporate-button"
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance">About Me</h2>
            <p className="text-xl text-muted-foreground text-pretty">Get to know me better</p>
          </div>

          <Card className="p-8 bg-transparent-white hover:shadow-lg transition-all duration-500 animate-on-scroll opacity-0 translate-y-8">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: "200ms" }}>
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden group">
                  <img
                    src="/software-developer-headshot.png"
                    alt="Mayank Kumar Jah"
                    className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: "400ms" }}>
                <h3 className="text-2xl font-semibold">Hello, I'm Mayank!</h3>
                <p className="text-muted-foreground">
                  I'm a passionate full-stack developer and entrepreneur with over 4 years of experience in building
                  scalable web applications and leading development teams. I founded Dreemlab to help businesses
                  transform their digital presence through innovative technology solutions.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or mentoring aspiring developers. I believe in writing clean, maintainable code and creating
                  user-centric applications that solve real-world problems.
                </p>
                <p className="text-muted-foreground">
                  I'm always excited to take on new challenges and collaborate with like-minded individuals who share a
                  passion for technology and innovation.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button asChild className="hover:scale-105 transition-transform duration-300">
                    <a href="#contact">Let's Connect</a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="hover:scale-105 transition-transform duration-300 bg-transparent"
                  >
                    <a href="/resume.pdf" target="_blank" rel="noreferrer">
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance">Get In Touch</h2>
            <p className="text-xl text-muted-foreground text-pretty">Let's discuss your next project or opportunity</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6 bg-transparent-white hover:shadow-lg transition-all duration-500 animate-on-scroll opacity-0 translate-y-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:mayank@dreemlab.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      mayank@dreemlab.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Delhi, India (Remote Available)</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border hover:bg-accent transition-all duration-300 hover:scale-110 hover:rotate-6"
                      aria-label={social.label}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            <Card
              className="p-6 bg-transparent-white hover:shadow-lg transition-all duration-500 animate-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button type="submit" className="w-full hover:scale-105 transition-transform duration-300">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
