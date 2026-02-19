import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experiences } from '../data/experience'
import ImageSlider from '../components/ImageSlider'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <i className="fas fa-briefcase" /> Experience
        </motion.h2>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="experience-item"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="experience-content">
        <div className="experience-info">
          <div className="experience-date">{exp.date}</div>
          <h3 className="experience-title">
            <i className={exp.icon} /> {exp.title}
          </h3>
          <div className="experience-company">{exp.company}</div>
          <p>{exp.description}</p>
        </div>
        <ImageSlider images={exp.images} />
      </div>
    </motion.div>
  )
}
