import styles from './Achievements.module.css'

const ACHIEVEMENTS = [
    {
        icon: '🥈',
        rank: '#2',
        event: 'Design Heist Hackathon',
        desc: 'Runner-up among <strong>1000+ participants</strong> at BVCOE New Delhi for building TechFund — a decentralised crowdfunding platform using Next.js, Moralis, and Web3.',
    },
    {
        icon: '🎯',
        rank: 'Top 10',
        event: 'IIIT Pune Hackathon 2021',
        desc: 'Ranked Top 10 out of <strong>1600+ teams</strong> for EasyJaber — a real-time logistics-driven mobile vaccination strategy platform proposed to IIITP.',
    },
    {
        icon: '⚡',
        rank: 'Lead',
        event: 'Ureckon — Technical Team Lead',
        desc: 'Led the web team and co-ordinated <strong>Debugger</strong>, a major coding event — managing technical execution, team collaboration, and full event infrastructure.',
    },
]

export default function Achievements() {
    return (
        <section id="achievements" className={styles.section}>
            <div className="section-label">05 — Achievements</div>
            <h2 className="section-title reveal">Wins that <em>matter</em></h2>

            <div className={styles.grid}>
                {ACHIEVEMENTS.map((a) => (
                    <article key={a.event} className={`${styles.card} reveal`}>
                        <span className={styles.icon}>{a.icon}</span>
                        <div className={styles.rank}>{a.rank}</div>
                        <div className={styles.event}>{a.event}</div>
                        <p className={styles.desc} dangerouslySetInnerHTML={{ __html: a.desc }} />
                    </article>
                ))}
            </div>
        </section>
    )
}
