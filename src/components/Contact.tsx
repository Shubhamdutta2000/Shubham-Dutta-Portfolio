import styles from './Contact.module.css'

interface Props { onHover: (h: boolean) => void }

const LINKS = [
    { label: '✉ shubhamduttanovember@gmail.com', href: 'mailto:shubhamduttanovember@gmail.com', id: 'contact-email' },
    { label: '↗ LinkedIn', href: 'https://linkedin.com/in/shubham--dutta', id: 'contact-linkedin' },
    { label: '↗ GitHub', href: 'https://github.com/Shubhamdutta2000', id: 'contact-github' },
    { label: '📞 +91 93307 15811', href: 'tel:+919330715811', id: 'contact-phone' },
]

export default function Contact({ onHover }: Props) {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.inner}>
                <div className="section-label" style={{ justifyContent: 'center' }}>06 — Contact</div>
                <h2 className={`${styles.title} reveal`}>
                    Let's build<br />
                    <span className={styles.titleAccent}>something.</span>
                </h2>
                <p className={styles.sub}>
                    Open to senior full-stack, AI/cloud engineering, or platform roles.<br />
                    Always up for interesting system design conversations.
                </p>

                <div className={styles.links}>
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            id={l.id}
                            href={l.href}
                            target={l.href.startsWith('http') ? '_blank' : undefined}
                            rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                            className={styles.link}
                            onMouseEnter={() => onHover(true)}
                            onMouseLeave={() => onHover(false)}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className={styles.footer}>
                    B.Tech CSE · University of Engineering &amp; Management, Kolkata · GPA 9.3 · 2019–2023
                </div>
            </div>
        </section>
    )
}
