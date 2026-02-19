import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tools = [
  { img: 'ISO_C++_Logo.svg.png', label: 'C++' },
  { img: '2945099.webp', label: 'Python' },
  { img: 'javascript-logo-javascript-icon-transparent-free-png.webp', label: 'JavaScript' },
  { img: 'mysql-5-logo-svg-vector.svg', label: 'MySQL' },
  { img: 'figma-logo-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.webp', label: 'Figma' },
  { img: 'HTML5_logo_and_wordmark.svg.png', label: 'HTML' },
  { img: 'CSS3_logo_and_wordmark.svg.png', label: 'CSS' },
]

const skills = [
  { icon: 'fas fa-pencil-ruler', title: 'UI Design', desc: 'Creating an attractive and consistent interface' },
  { icon: 'fas fa-users', title: 'UX Research', desc: 'Understanding user needs through in-depth research' },
  { icon: 'fas fa-sitemap', title: 'Wireframing', desc: 'Creating an optimal application structure and flow' },
  { icon: 'fas fa-palette', title: 'Visual Design', desc: 'Developing a strong visual identity' },
  { icon: 'fas fa-mobile-alt', title: 'Responsive Design', desc: 'Creating optimal designs across all devices' },
  { icon: 'fas fa-code', title: 'Frontend Basics', desc: 'Understanding HTML, CSS, and JavaScript for collaboration' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Skills</h2>
        </motion.div>

        {/* Tools */}
        <div className="skills-category">
          <motion.h3
            className="category-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tools &amp; Software
          </motion.h3>
          <motion.div
            className="tools-grid"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {tools.map(t => (
              <motion.div key={t.label} className="tool-item" variants={item}>
                <img src={`/img/${t.img}`} alt={t.label} className="tool-logo" />
                <span>{t.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* General Skills */}
        <div className="skills-category">
          <motion.h3
            className="category-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            General Skills
          </motion.h3>
          <motion.div
            className="skills-grid"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {skills.map(s => (
              <motion.div key={s.title} className="skill-card" variants={item}>
                <i className={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
