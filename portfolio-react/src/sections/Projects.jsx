import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projectsList } from '../data/projects'
import ImageSlider from '../components/ImageSlider'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My Project
        </motion.h2>
        <motion.div
          className="projects-grid"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projectsList.map(project => (
            <motion.div key={project.id} className="project-card" variants={card}>
              <div className="project-image">
                <ImageSlider images={project.sliderImages} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.shortDesc}</p>
                <Link to={`/projects/${project.id}`} className="project-link">
                  Look Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
