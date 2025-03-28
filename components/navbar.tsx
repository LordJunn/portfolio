"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { MoonIcon, SunIcon, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#work" className="text-sm font-medium hover:text-primary">
            Work
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Resume
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
          <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="rounded-full" onClick={toggleTheme}>
            {mounted && (theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />)}
          </Button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2 bg-background">
          <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="rounded-full" onClick={toggleTheme}>
            {mounted && (theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />)}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="rounded-full"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeMobileMenu}></div>

          {/* Side Panel */}
          <div className="relative ml-auto w-[75%] min-w-[250px] max-w-[350px] bg-background shadow-xl h-full border-l">
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close Menu"
                  className="rounded-full"
                  onClick={closeMobileMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link href="/#work" className="text-xl font-medium py-2 hover:text-primary" onClick={closeMobileMenu}>
                  Work
                </Link>
                <Link href="/#about" className="text-xl font-medium py-2 hover:text-primary" onClick={closeMobileMenu}>
                  About
                </Link>
                <Link href="/blog" className="text-xl font-medium py-2 hover:text-primary" onClick={closeMobileMenu}>
                  Blog
                </Link>
                <Link href="#" className="text-xl font-medium py-2 hover:text-primary" onClick={closeMobileMenu}>
                  Resume
                </Link>
                <Link
                  href="/#contact"
                  className="text-xl font-medium py-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-auto text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Portfolio</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

