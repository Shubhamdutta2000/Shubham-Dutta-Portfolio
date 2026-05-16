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

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith('#')) return
        e.preventDefault()
        setMenuOpen(false)
        const id = href.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <a href="#hero" className={styles.logo}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                onClick={(e) => handleScroll(e, '#hero')}>
                <span className={styles.firstName}>Shubham</span>
                <span className={styles.lastName}>Dutta</span>
            </a>

            <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
                {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className={styles.link}
                        onMouseEnter={() => onHover(true)}
                        onMouseLeave={() => onHover(false)}
                        onClick={(e) => handleScroll(e, l.href)}>
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
