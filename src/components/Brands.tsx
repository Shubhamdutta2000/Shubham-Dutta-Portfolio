import styles from './Brands.module.css'

const BRANDS = [
    { name: 'BD', icon: '◈' },
    { name: 'Frazier Healthcare', icon: '▲' },
    { name: 'Finarb Analytics', icon: '⚡' },
    { name: 'Pharma / Enterprise Clients', icon: '⬢' },
]

export default function Brands() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.label}>Brands I've Worked With</div>
                <div className={styles.grid}>
                    {BRANDS.map((brand) => (
                        <div key={brand.name} className={styles.brand}>
                            {/* If you have logo files, swap the icon for an <img src="..." /> tag */}
                            <span className={styles.brandIcon}>{brand.icon}</span>
                            <span>{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
