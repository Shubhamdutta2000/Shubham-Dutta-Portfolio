import { useState } from 'react'
import styles from './Experience.module.css'

interface Job {
    id: string
    company: string
    period: string
    title: string
    location: string
    bullets: string[]
    chips: string[]
}

const JOBS: Job[] = [
    {
        id: 'finarb2',
        company: 'Finarb Analytics',
        period: 'SDE-II · Nov 2024–Present',
        title: 'Software Development Engineer II',
        location: 'Finarb Analytics Consulting · Kolkata, India',
        bullets: [
            'Migrated <strong>30+ PostgreSQL stored procedures</strong> into Entity Framework Core + LINQ, improving API performance by <strong>40%</strong>',
            'Automated test generation and <strong>Azure DevOps CI/CD</strong> workflows, boosting deployment reliability by <strong>35%</strong>',
            'Built production-grade <strong>multi-LLM orchestration pipelines</strong> integrating OpenAI, Anthropic, and Gemini with retry handling, token metering, and LangSmith observability — shipped as a standalone internal AI product',
            'Engineered <strong>real-time interview intelligence platform</strong> (AWS Lambda, API Gateway, DynamoDB) — supporting live transcription, collaborative notes, and analytics as a client-facing product',
            'Built <strong>React 18/19 + TypeScript</strong> frontends with WebSocket sync, TanStack Query caching, and collaborative workflows',
            'Designed <strong>token-based billing & usage metering</strong> with per-model LLM pricing, Stripe integration, and real-time tracking',
            'Contributed to <strong>AI email marketing automation</strong> platform with workflow orchestration, AI content generation, and distributed campaign pipelines',
            'Containerised cloud-native services on <strong>Azure Container Apps</strong>, PostgreSQL, Redis, Blob Storage, with full CI/CD',
        ],
        chips: ['LangGraph', 'OpenAI', 'Anthropic', 'Gemini', 'AWS Lambda', 'DynamoDB', 'FastAPI', 'React 18/19', 'WebSockets', 'Stripe', 'Azure Container Apps', 'Redis'],
    },
    {
        id: 'finarb1',
        company: 'Finarb Analytics',
        period: 'SDE-I · Jun 2022–Oct 2024',
        title: 'Software Development Engineer I',
        location: 'Finarb Analytics Consulting · Kolkata, India',
        bullets: [
            'Developed <strong>scalable frontend systems</strong> with React, TypeScript, and MobX using centralized Root State architecture for enterprise SaaS',
            'Built <strong>FastAPI + Celery + PostgreSQL</strong> backend with repository-pattern and async background job processing',
            'Integrated <strong>Azure Data Factory APIs</strong> and Azure Blob Storage pipelines for enterprise ETL workflows',
            'Automated cloud infrastructure provisioning with <strong>Terraform</strong> across Azure environments',
            'Led <strong>pharma client project</strong> — API development and transformation queries in Databricks for critical data pipelines',
            'Developed <strong>in-house scaffolding system</strong> for React and FastAPI apps, reducing development timelines by <strong>15%</strong>',
        ],
        chips: ['React', 'TypeScript', 'MobX', 'FastAPI', 'Celery', 'PostgreSQL', 'Azure Data Factory', 'Databricks', 'Terraform'],
    },
    {
        id: 'consultant',
        company: 'Software Consultant',
        period: 'Aug–Dec 2025 · Remote',
        title: 'Full Stack & E-Commerce Engineer',
        location: 'Software Consultant · Remote',
        bullets: [
            'Built <strong>scalable Shopify e-commerce platforms</strong> with third-party integrations for multiple brands',
            'Engineered a <strong>full-stack social media platform</strong> with real-time messaging, notifications, media feeds, auth workflows, and search',
            'Developed and deployed <strong>Pavica Beauty Natural</strong> — managing hosting, domain routing, deployment, performance, payments, and responsive storefront',
        ],
        chips: ['Shopify', 'React', 'Node.js', 'WebSockets', 'Payment Systems'],
    },
    {
        id: 'iemlabs',
        company: 'IEMLABS',
        period: 'Intern · Apr 2021–May 2022',
        title: 'Full Stack Developer Intern',
        location: 'IEMLABS · Kolkata, India',
        bullets: [
            'Built <strong>IEMSecure</strong> — Online Plagiarism Checker using React, Node.js, MongoDB, FastAPI, Selenium (web scraping), containerised with Docker',
            'Collaborated with <strong>NLP and DevOps teams</strong> to improve scraping accuracy and deployment workflows',
            'Conducted <strong>technical interviews</strong> and mentored trainees on MERN stack and blockchain fundamentals',
            'Worked as a <strong>Full Stack Trainer</strong> — teaching MERN, WAMP stack, and Blockchain development',
        ],
        chips: ['React', 'Node.js', 'MongoDB', 'FastAPI', 'Selenium', 'Docker', 'Blockchain'],
    },
    {
        id: 'quordnet',
        company: 'Quordnet Academy',
        period: 'Intern · Sep 2020–Mar 2021',
        title: 'Full Stack Developer Intern',
        location: 'Quordnet Academy · Remote',
        bullets: [
            'Built <strong>React.js frontend interfaces</strong> and REST APIs using Node.js, Express.js, MongoDB',
            'Implemented <strong>authentication, CRUD workflows</strong>, and collaborative frontend features',
        ],
        chips: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    },
    {
        id: 'hackclub',
        company: 'Hack Club UEMK',
        period: 'Founding Member · Jun 2020–Jun 2021',
        title: 'Founding Member & Web Developer',
        location: 'Hack Club UEMK · Kolkata, India',
        bullets: [
            'Founding member of the <strong>Hack Club chapter at UEMK</strong>, building the technical community from the ground up',
            'Developed and maintained the <strong>official web presence</strong> and internal tools for member management',
            'Organized <strong>technical workshops</strong> and mentored 50+ students on web development fundamentals',
        ],
        chips: ['Web Development', 'Community Building', 'Leadership', 'Mentorship'],
    },
]

export default function Experience() {
    const [active, setActive] = useState(JOBS[0].id)
    const current = JOBS.find((j) => j.id === active)!

    return (
        <section id="experience" className={styles.section}>
            <div className="section-label">01 — Experience</div>
            <h2 className="section-title reveal">Where I've <em>built</em></h2>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    {JOBS.map((j) => (
                        <button
                            key={j.id}
                            className={`${styles.tab} ${active === j.id ? styles.tabActive : ''}`}
                            onClick={() => setActive(j.id)}
                        >
                            <span className={styles.tabCompany}>{j.company}</span>
                            <span className={styles.tabPeriod}>{j.period}</span>
                        </button>
                    ))}
                </aside>

                <div className={styles.panel} key={current.id}>
                    <div className={styles.panelHeader}>
                        <div className={styles.jobTitle}>{current.title}</div>
                        <div className={styles.jobCompany}>{current.location}</div>
                        <div className={styles.jobPeriod}>{current.period.toUpperCase()}</div>
                    </div>
                    <ul className={styles.bullets}>
                        {current.bullets.map((b, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                        ))}
                    </ul>
                    <div className={styles.chips}>
                        {current.chips.map((c) => (
                            <span key={c} className="chip">{c}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
