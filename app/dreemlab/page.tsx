"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Code,
  Smartphone,
  Cloud,
  Zap,
  Star,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import Link from "next/link"

export default function DreemlabPage() {
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
    const animatedElements = document.querySelectorAll(".animate-on-scroll")

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

    animatedElements.forEach((element) => animationObserver.observe(element))

    return () => {
      animationObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setSparkles(newSparkles)
    }
    generateSparkles()
  }, [])

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, performant, and user-friendly solutions.",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Database Design"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android. React Native and Flutter expertise for seamless user experiences.",
      features: ["React Native", "Flutter", "iOS & Android", "App Store Deployment"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Cloud infrastructure setup and migration services. AWS, Google Cloud, and Azure expertise for scalable and secure deployments.",
      features: ["AWS & GCP", "DevOps & CI/CD", "Microservices", "Container Orchestration"],
    },
    {
      icon: Zap,
      title: "Digital Transformation",
      description:
        "End-to-end digital transformation consulting. Modernize legacy systems and optimize business processes with cutting-edge technology.",
      features: ["Legacy Modernization", "Process Automation", "System Integration", "Performance Optimization"],
    },
  ]

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "20+", label: "Happy Clients" },
    { number: "8+", label: "Team Members" },
    { number: "4+", label: "Years Experience" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      content:
        "Dreemlab transformed our outdated system into a modern, scalable platform. Their expertise and professionalism exceeded our expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "E-Commerce Plus",
      role: "CTO",
      content:
        "The team at Dreemlab delivered our e-commerce platform on time and within budget. The quality of work is exceptional.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "FinTech Solutions",
      role: "Product Manager",
      content:
        "Working with Dreemlab was a game-changer for our startup. They understood our vision and brought it to life perfectly.",
      rating: 5,
    },
  ]

  const team = [
    {
      name: "Mayank Kumar Jah",
      role: "Founder & CEO",
      image: "/software-developer-headshot.jpg",
      bio: "Full-stack developer with 4+ years of experience leading development teams and building scalable applications.",
    },
    {
      name: "Priya Sharma",
      role: "Lead Frontend Developer",
      image: "/placeholder.svg?key=team1",
      bio: "React specialist with expertise in creating beautiful, responsive user interfaces and seamless user experiences.",
    },
    {
      name: "Rahul Gupta",
      role: "Backend Architect",
      image: "/placeholder.svg?key=team2",
      bio: "Backend expert specializing in microservices architecture, API design, and cloud infrastructure.",
    },
    {
      name: "Anita Patel",
      role: "UI/UX Designer",
      image: "/placeholder.svg?key=team3",
      bio: "Creative designer focused on user-centered design principles and creating intuitive digital experiences.",
    },
  ]

  const caseStudies = [
    {
      title: "E-Commerce Platform Redesign",
      client: "RetailCorp",
      description:
        "Complete redesign and development of a multi-vendor e-commerce platform serving 10,000+ daily users.",
      results: ["300% increase in conversion rate", "50% reduction in page load time", "99.9% uptime achieved"],
      tech: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"],
    },
    {
      title: "FinTech Mobile App",
      client: "PayFlow",
      description:
        "Development of a secure mobile banking application with real-time transactions and advanced security features.",
      results: ["100,000+ downloads in first month", "4.8/5 app store rating", "Zero security incidents"],
      tech: ["React Native", "Python", "MongoDB", "Firebase", "Plaid API"],
    },
    {
      title: "Healthcare Management System",
      client: "MedTech Solutions",
      description:
        "Custom healthcare management system for hospitals with patient records, appointment scheduling, and billing.",
      results: ["40% reduction in administrative time", "Improved patient satisfaction", "HIPAA compliant"],
      tech: ["React", "Express.js", "MySQL", "Docker", "Azure"],
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

      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 hover-scale professional-glow"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </div>
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white professional-glow">Dreemlab</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        {/* Animated sparkles background */}
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

        {/* Floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-full animate-float-slow" />
          <div className="absolute top-40 right-20 w-16 h-16 border border-white/10 rotate-45 animate-float-reverse" />
          <div className="absolute bottom-40 left-20 w-12 h-12 border border-white/10 rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rotate-12 animate-float-slow" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className={`space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance animate-fade-in-up professional-glow text-gradient">
                Dreemlab
              </h1>
              <p className="text-2xl sm:text-3xl text-muted-foreground text-balance animate-fade-in-up stagger-2 professional-glow">
                Transforming Ideas into Digital Reality
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up stagger-3 leading-relaxed">
                We are a tech services company specializing in web development, mobile applications, and digital
                transformation. Our team of experts helps businesses leverage cutting-edge technology to achieve their
                goals.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up stagger-4">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center animate-fade-in-scale stagger-${index + 4} professional-glow`}>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-6">
              <Button
                size="lg"
                asChild
                className="bg-white text-black hover:bg-white/90 hover-lift group transition-all duration-300"
              >
                <a href="#services" className="flex items-center text-black">
                  Our Services
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="font-semibold bg-black/80 backdrop-blur-sm border-white/20 hover:bg-black/90 hover-lift group text-white"
              >
                <a href="#contact" className="flex items-center text-white">
                  Start Your Project
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Our Services</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow group"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300 hover-scale">
                    <service.icon className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 hover:text-primary transition-colors text-gradient">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-sm animate-fade-in-scale stagger-${i + 1}`}
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Case Studies</h2>
            <p className="text-xl text-muted-foreground text-pretty">Real results for real businesses</p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="p-8 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors text-gradient">
                      {study.title}
                    </h3>
                    <p className="text-primary font-medium mb-4">Client: {study.client}</p>
                    <p className="text-muted-foreground mb-6">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className={`text-xs hover-scale transition-transform duration-200 animate-fade-in-scale stagger-${techIndex + 1}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Key Results:</h4>
                    <div className="space-y-3">
                      {study.results.map((result, i) => (
                        <div key={i} className={`flex items-center gap-3 animate-fade-in-scale stagger-${i + 1}`}>
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-muted/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Our Team</h2>
            <p className="text-xl text-muted-foreground text-pretty">Meet the experts behind Dreemlab</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 glass-effect text-center hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow group"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground text-pretty">Don't just take our word for it</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 fill-primary text-primary animate-fade-in-scale stagger-${i + 1}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold hover:text-primary transition-colors">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Let's discuss how we can help transform your business
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow">
              <h3 className="text-2xl font-semibold mb-6 text-gradient">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 hover-scale transition-transform duration-300">
                  <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:hello@dreemlab.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@dreemlab.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 hover-scale transition-transform duration-300">
                  <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 hover-scale transition-transform duration-300">
                  <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/dreemlab", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/company/dreemlab", label: "LinkedIn" },
                    { icon: Twitter, href: "https://twitter.com/dreemlab", label: "Twitter" },
                  ].map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg border border-border hover:bg-accent transition-all duration-300 hover:scale-110 hover:rotate-6 animate-fade-in-scale stagger-${index + 1}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            <Card
              className="p-8 glass-effect hover-lift transition-all duration-500 animate-on-scroll opacity-0 translate-y-8 professional-glow"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gradient">Start Your Project</h3>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="project"
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:scale-105 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full hover:scale-105 transition-transform duration-300 corporate-button"
                >
                  Send Project Inquiry
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/20 bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary professional-glow">Dreemlab</h3>
              <p className="text-sm text-muted-foreground">Transforming Ideas into Digital Reality</p>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 Dreemlab. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
