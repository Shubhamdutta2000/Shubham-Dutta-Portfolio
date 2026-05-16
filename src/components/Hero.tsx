import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

interface Props { onHover: (h: boolean) => void }

const STATS = [
    { val: '4+', lbl: 'Years Experience' },
    { val: '30+', lbl: 'Core Migrations' },
    { val: '35%', lbl: 'Deploy Reliability' },
    { val: '100%', lbl: 'System Stability' },
]

export default function Hero({ onHover }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
        resize()
        window.addEventListener('resize', resize)

        const dots = Array.from({ length: 140 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.2 + 0.8,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            o: Math.random() * 0.4 + 0.1,
        }))

        let raf: number
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Grid
            ctx.strokeStyle = 'rgba(22,42,74,0.35)'
            ctx.lineWidth = 0.5
            for (let x = 0; x < canvas.width; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke() }
            for (let y = 0; y < canvas.height; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke() }

            // Glow orb
            const g = ctx.createRadialGradient(canvas.width * 0.25, canvas.height * 0.5, 0, canvas.width * 0.25, canvas.height * 0.5, 500)
            g.addColorStop(0, 'rgba(0,229,255,0.06)')
            g.addColorStop(1, 'transparent')
            ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height)

            const g2 = ctx.createRadialGradient(canvas.width * 0.7, canvas.height * 0.3, 0, canvas.width * 0.7, canvas.height * 0.3, 300)
            g2.addColorStop(0, 'rgba(168,85,247,0.04)')
            g2.addColorStop(1, 'transparent')
            ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Dots + connections
            dots.forEach((d) => {
                d.x += d.vx; d.y += d.vy
                if (d.x < 0 || d.x > canvas.width) d.vx *= -1
                if (d.y < 0 || d.y > canvas.height) d.vy *= -1
                ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0,229,255,${d.o})`; ctx.fill()
            })

            dots.forEach((a, i) => {
                dots.slice(i + 1).forEach((b) => {
                    const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 160) {
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
                        ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 160)})`; ctx.lineWidth = 0.5; ctx.stroke()
                    }
                })
            })
            raf = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])

    return (
        <section id="hero" className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.content}>
                <div className={styles.tag}>SDE II · Full-Stack + AI/Cloud</div>
                <h1 className={styles.name}>
                    <span>Shubham</span>
                    <span className={styles.nameOutline}>Dutta</span>
                </h1>
                <p className={styles.role}>
                    Building <span className={styles.highlight}>AI-powered SaaS</span> · Distributed Systems<br />
                    React · FastAPI · LLM Orchestration · AWS · Azure<br />
                </p>
                <div className={styles.actions}>
                    <a href="#system-design" className="btn-primary"
                        onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
                        Explore Architecture →
                    </a>
                    <a href="/Shubham_2026_Resume.pdf" target="_blank" className="btn-outline"
                        onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
                        Download Resume
                    </a>
                </div>
            </div>

            <div className={styles.stats}>
                {STATS.map((s) => (
                    <div key={s.lbl} className={styles.stat}>
                        <span className={styles.statVal}>{s.val}</span>
                        <span className={styles.statLbl}>{s.lbl}</span>
                    </div>
                ))}
            </div>

            <div className={styles.scrollHint}>
                <span className={styles.scrollLine} />
                Scroll to explore
            </div>
        </section>
    )
}
