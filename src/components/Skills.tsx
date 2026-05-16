import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const SKILL_BARS = [
    {
        group: 'Frontend',
        color: 'var(--c1)',
        items: [
            { name: 'React / Next.js', level: 'Expert', pct: 95 },
            { name: 'TypeScript', level: 'Expert', pct: 92 },
            { name: 'MobX / Redux / TanStack', level: 'Advanced', pct: 88 },
            { name: 'WebSockets / Real-time', level: 'Advanced', pct: 85 },
        ],
    },
    {
        group: 'Backend',
        color: 'var(--c2)',
        items: [
            { name: 'FastAPI / Python', level: 'Expert', pct: 95 },
            { name: 'Node.js / Express', level: 'Advanced', pct: 85 },
            { name: 'Celery / RabbitMQ', level: 'Advanced', pct: 82 },
            { name: 'REST / WebSocket APIs', level: 'Expert', pct: 93 },
        ],
    },
    {
        group: 'AI / LLMs',
        color: 'var(--c3)',
        items: [
            { name: 'LangGraph / LangChain', level: 'Advanced', pct: 85 },
            { name: 'OpenAI / Anthropic / Gemini', level: 'Advanced', pct: 88 },
            { name: 'LLM Orchestration / Metering', level: 'Advanced', pct: 82 },
        ],
    },
    {
        group: 'Cloud / Infra',
        color: 'var(--c4)',
        items: [
            { name: 'AWS (Lambda, DynamoDB, API GW)', level: 'Advanced', pct: 80 },
            { name: 'Azure (ADF, Blob, Container Apps)', level: 'Advanced', pct: 85 },
            { name: 'Docker / Kubernetes / Terraform', level: 'Advanced', pct: 82 },
            { name: 'PostgreSQL / DynamoDB / Redis', level: 'Advanced', pct: 88 },
        ],
    },
]

const TECH_TAGS = [
    'JavaScript', 'TypeScript', 'Python', 'C++', 'Solidity',
    'React', 'Next.js', 'Vue.js', 'Tailwind', 'Material UI',
    'FastAPI', 'Django', 'Flask', 'Express',
    'LangGraph', 'OpenAI', 'Anthropic', 'Gemini',
    'AWS Lambda', 'Azure', 'Docker', 'k8s', 'Terraform',
    'PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis',
    'Stripe', 'Celery', 'RabbitMQ', 'Selenium', 'Databricks',
]

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    sectionRef.current!.querySelectorAll<HTMLElement>('.skillBarFill').forEach((el) => {
                        el.style.width = el.dataset.width + '%'
                    })
                    obs.disconnect()
                }
            },
            { threshold: 0.2 }
        )
        obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="skills" className={styles.section} ref={sectionRef}>
            <div className="section-label">04 — Skills</div>
            <h2 className="section-title reveal">Tech <em>arsenal</em></h2>

            <div className={styles.grid}>
                {SKILL_BARS.map((group) => (
                    <div key={group.group} className={`${styles.group} reveal`}>
                        <div className={styles.groupLabel} style={{ color: group.color }}>
                            {group.group}
                            <span className={styles.groupLine} />
                        </div>
                        <div className={styles.bars}>
                            {group.items.map((item) => (
                                <div key={item.name} className={styles.barItem}>
                                    <div className={styles.barTop}>
                                        <span className={styles.barName}>{item.name}</span>
                                        <span className={styles.barLevel}>{item.level}</span>
                                    </div>
                                    <div className={styles.barTrack}>
                                        <div
                                            className={`${styles.barFill} skillBarFill`}
                                            data-width={item.pct}
                                            style={{ background: group.color, width: 0, transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${styles.tagCloud} reveal`}>
                <div className={styles.tagCloudLabel}>All Technologies</div>
                <div className={styles.tags}>
                    {TECH_TAGS.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}
