import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(!!isClickable)
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, position.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, position.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [position])

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-10 h-10 rounded-full border-2 transition-all duration-150"
        style={{
          borderColor: isPointer ? '#831449' : 'rgba(131,20,73,0.5)',
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
        }}
      />
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#831449]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
    </>
  )
}
