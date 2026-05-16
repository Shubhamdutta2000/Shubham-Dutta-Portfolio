import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

interface Props { onHover: (h: boolean) => void }

const NAV_LINKS = [
    { href: '#experience', label: 'Experience' },
    { href: '#system-design', label: 'Architecture' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#achievements', label: 'Achievements' },
]

export default function Nav({ onHover }: Props) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <span className={styles.firstName}>Shubham</span>
                <span className={styles.lastName}>Dutta</span>
            </div>

            <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
                {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className={styles.link}
                        onMouseEnter={() => onHover(true)}
                        onMouseLeave={() => onHover(false)}
                        onClick={() => setMenuOpen(false)}>
                        {l.label}
                    </a>
                ))}
                <a href="mailto:shubhamduttanovember@gmail.com" className={styles.cta}
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}>
                    Get in touch →
                </a>
            </div>

            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu">
                <span className={menuOpen ? styles.open : ''} />
                <span className={menuOpen ? styles.open : ''} />
                <span className={menuOpen ? styles.open : ''} />
            </button>
        </nav>
    )
}
