import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector: string, options?: gsap.TweenVars) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ...options,
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [selector, options])

  return containerRef
}

export { gsap, ScrollTrigger }