import { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Experience from './components/Experience'
import SystemDesign from './components/SystemDesign'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const ringRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)

    const animateRing = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.12
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.12
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y })
      animRef.current = requestAnimationFrame(animateRing)
    }
    animRef.current = requestAnimationFrame(animateRing)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [cursorPos.x, cursorPos.y])

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    reveals.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleMouseEvent = (isHovered: boolean) => setHovered(isHovered)

  return (
    <>
      <CustomCursor pos={cursorPos} ringPos={ringPos} hovered={hovered} />
      <Nav onHover={handleMouseEvent} />
      <main>
        <Hero onHover={handleMouseEvent} />
        <Experience />
        <SystemDesign />
        <Projects onHover={handleMouseEvent} />
        <Skills />
        <Achievements />
        <Brands />
        <Contact onHover={handleMouseEvent} />
      </main>
    </>
  )
}

export default App
