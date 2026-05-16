import styles from './Projects.module.css'

interface Props { onHover: (h: boolean) => void }

interface Project {
    num: string
    title: string
    tag: string
    desc: string
    chips: string[]
    github?: string
    live?: string
    badge?: string
    badgeType: 'hackathon' | 'personal' | 'client' | 'ai'
}

const PROJECTS: Project[] = [
    {
        num: '01',
        title: 'TechFund',
        tag: 'Decentralised Crowdfunding Platform',
        desc: 'Blockchain-powered ecosystem connecting contributors and innovators. Built during Design Heist Hackathon — decentralised fundraising with smart contracts on Ethereum. Secured 2nd place among 1000+ participants at BVCOE New Delhi.',
        chips: ['Next.js', 'Solidity', 'Moralis', 'Web3.js', 'Material UI', 'Ethereum'],
        github: 'https://github.com/Shubhamdutta2000/HackOverFlow_TechFund_Decentralised_Crowdfunding',
        badge: '🏆 Runner-up · 1000+ teams',
        badgeType: 'hackathon',
    },
    {
        num: '02',
        title: 'EasyJaber',
        tag: 'Real-Time Vaccination Logistics Platform',
        desc: "Covid vaccination strategy platform using mobile vans powered by real-time logistics data and modular decision-making framework. Proposed to IIIT Pune Hackathon 2021, ranked Top 10 out of 1600+ teams.",
        chips: ['React.js', 'Node.js', 'Real-time Logistics', 'Maps API', 'MongoDB'],
        github: 'https://github.com/Shubhamdutta2000/TheCleverWorld_fullstack_hack21',
        badge: '🎯 Top 10 · 1600+ teams',
        badgeType: 'hackathon',
    },
    {
        num: '03',
        title: 'Interview Intelligence Platform',
        tag: 'Real-Time AI Interview Analytics · Client Product',
        desc: 'Live transcription, collaborative notes, and transcript analytics for interviews. Built on FastAPI + AWS Lambda + DynamoDB with WebSocket sync, LangGraph orchestration, and a React 18 frontend with TanStack Query. Delivered as a client-facing product.',
        chips: ['FastAPI', 'AWS Lambda', 'DynamoDB', 'LangGraph', 'WebSockets', 'React 19'],
        badge: 'Client Product · AWS',
        badgeType: 'client',
    },
    {
        num: '04',
        title: 'Multi-LLM AI SaaS',
        tag: 'Internal AI Product · LangGraph Orchestration',
        desc: 'Production-grade multi-LLM orchestration platform built as an independent internal product. Integrates OpenAI, Anthropic, and Gemini with LangGraph stateful pipelines, token metering, per-model billing (Stripe), LangSmith observability, and AI email marketing automation.',
        chips: ['LangGraph', 'OpenAI', 'Anthropic', 'Gemini', 'FastAPI', 'Stripe', 'LangSmith'],
        badge: 'AI Product · Internal SaaS',
        badgeType: 'ai',
    },
    {
        num: '05',
        title: 'Pavica Beauty Natural',
        tag: 'E-Commerce · Beauty & Wellness Brand',
        desc: 'Full Shopify storefront for a beauty/wellness brand — custom domain routing, deployment configuration, performance optimisation, Stripe payment system, responsive storefront experience, and ongoing hosting management.',
        chips: ['Shopify', 'React', 'Payments', 'Performance Opt.', 'Domain Routing'],
        live: 'https://pavicabeautynatural.com/',
        badge: 'Client Work',
        badgeType: 'client',
    },
    {
        num: '06',
        title: 'IEMSecure',
        tag: 'Online Plagiarism Detection Software',
        desc: 'Production plagiarism checker combining web scraping with Selenium, NLP-based comparison, and a full-stack interface. Containerised with Docker. Built during IEMLABS internship in collaboration with NLP and DevOps teams.',
        chips: ['React', 'Node.js', 'FastAPI', 'MongoDB', 'Selenium', 'Docker', 'NLP'],
        live: 'https://www.iemsecure.com/',
        badge: 'Platform',
        badgeType: 'personal',
    },
    {
        num: '07',
        title: 'eShop',
        tag: 'Full-Stack E-Commerce Platform',
        desc: 'A feature-rich e-commerce application with product management, shopping cart functionality, user authentication, and a responsive frontend built with modern web technologies.',
        chips: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Auth'],
        github: 'https://github.com/Shubhamdutta2000/eShop-ecommerce-site',
        badge: 'Personal Project',
        badgeType: 'personal',
    },
]

export default function Projects({ onHover }: Props) {
    return (
        <section id="projects" className={styles.section}>
            <div className="section-label">03 — Projects</div>
            <h2 className="section-title reveal">What I've <em>shipped</em></h2>

            <div className={styles.grid}>
                {PROJECTS.map((p) => (
                    <article
                        key={p.num}
                        className={`${styles.card} reveal`}
                        onMouseEnter={() => onHover(true)}
                        onMouseLeave={() => onHover(false)}
                    >
                        {p.badge && (
                            <span className={`${styles.badge} ${styles[p.badgeType]}`}>{p.badge}</span>
                        )}
                        <div className={styles.num}>{p.num}</div>
                        <h3 className={styles.title}>{p.title}</h3>
                        <div className={styles.tag}>{p.tag}</div>
                        <p className={styles.desc}>{p.desc}</p>
                        <div className={styles.chips}>
                            {p.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                        </div>
                        <div className={styles.links}>
                            {p.github && (
                                <a href={p.github} target="_blank" rel="noreferrer" className={styles.link}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    GitHub
                                </a>
                            )}
                            {p.live && (
                                <a href={p.live} target="_blank" rel="noreferrer" className={styles.link}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Live Site
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
