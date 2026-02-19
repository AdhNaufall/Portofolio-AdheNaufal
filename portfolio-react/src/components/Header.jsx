import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        const id = href.slice(2)
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="nav-container">
        <Link to="/" className="logo">Adhe Naufal Portfolio</Link>
        <nav>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {navItems.map(item => (
              <li key={item.label}>
                <a href={item.href} onClick={e => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/cv/AdheNaufal-CV.pdf" download="AdheNaufal-CV.pdf">Download CV</a>
            </li>
          </ul>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </nav>
      </div>
    </header>
  )
}
