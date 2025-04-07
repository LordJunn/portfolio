"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Hero() {
  const [greeting, setGreeting] = useState("Hello")
  const greetings = ["Hello", "Halo", "哈喽"]
  const currentGreetingIndex = useRef(0)
  const isDeleting = useRef(false)

  // Adjustable speeds (in milliseconds)
  const [typingSpeed, setTypingSpeed] = useState({
    typing: 150, // Time between adding characters
    deleting: 75, // Time between removing characters
    pauseBeforeDelete: 1500, // Pause time after completing a word
    pauseBeforeType: 500, // Pause time after deleting a word
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeEffect = () => {
      const currentGreeting = greetings[currentGreetingIndex.current]

      if (isDeleting.current) {
        // Deleting text
        if (greeting.length > 0) {
          setGreeting((prev) => prev.slice(0, -1))
          timeout = setTimeout(typeEffect, typingSpeed.deleting) // Faster when deleting
        } else {
          // Finished deleting
          isDeleting.current = false
          currentGreetingIndex.current = (currentGreetingIndex.current + 1) % greetings.length
          timeout = setTimeout(typeEffect, typingSpeed.pauseBeforeType)
        }
      } else {
        // Typing text
        if (greeting.length < currentGreeting.length) {
          setGreeting((prev) => currentGreeting.slice(0, prev.length + 1))

          // Randomize typing speed slightly to make it look more human
          const randomVariation = Math.random() * 50 - 25 // ±25ms variation
          timeout = setTimeout(typeEffect, typingSpeed.typing + randomVariation)
        } else {
          // Finished typing
          isDeleting.current = true
          timeout = setTimeout(typeEffect, typingSpeed.pauseBeforeDelete)
        }
      }
    }

    timeout = setTimeout(typeEffect, 1000) // Initial delay

    return () => clearTimeout(timeout)
  }, [greeting, typingSpeed])

  return (
    <section className="py-20 md:py-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl md:text-8xl font-bold">
          <span id="greeting" className="inline-block min-w-[180px]">
            {greeting}
          </span>{" "}
          <span className="inline-block animate-wave origin-bottom-right">👋</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          I'm a developer passionate about creating beautiful and functional web experiences.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link href="https://github.com/LordJunn/" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/junn-kit-735485245/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:ljunnkit5@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

