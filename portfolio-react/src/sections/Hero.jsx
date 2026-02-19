import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Hello, I'm Adhe Naufal Putra Purnomo</h1>
          <p className="tagline">
            A software engineer exploring the art of intuitive design, one pixel at a time.
          </p>
          <div className="hero-buttons">
            <a href="/cv/AdheNaufal-CV.pdf" download="AdheNaufal-CV.pdf" className="btn-primary">
              Download CV
            </a>
            <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-secondary">
              View Portfolio
            </a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-secondary">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
