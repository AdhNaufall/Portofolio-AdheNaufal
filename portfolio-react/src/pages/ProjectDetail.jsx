import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projectsData } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projectsData[id]

  if (!project) {
    return (
      <div className="project-detail-container" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2>Project not found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <div className="background-animation">
        {[1,2,3,4,5,6,7,8].map(n => <div key={n} className={`floating-shape shape-${n}`} />)}
      </div>
      <div className="particles-container">
        {[1,2,3,4,5,6,7,8,9,10].map(n => <div key={n} className={`particle particle-${n}`} />)}
      </div>

      <motion.main
        className="project-detail-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="project-header">
          <h1>{project.detailTitle}</h1>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        <Gallery project={project} />

        <div className="project-content">
          <section className="project-section">
            <h2>Project Overview</h2>
            <p>{project.overview}</p>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                Live Demo
              </a>
            )}
          </section>

          <section className="project-section">
            <h2>Main Features</h2>
            <ul className="feature-list">
              {project.features.map(f => (
                <li key={f.title}>
                  <i className={f.icon} />
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="project-navigation">
          {project.prev ? (
            <Link to={`/projects/${project.prev}`} className="nav-button prev">
              <i className="fas fa-arrow-left" /> Previous Project
            </Link>
          ) : (
            <span />
          )}
          {project.next ? (
            <Link to={`/projects/${project.next}`} className="nav-button next">
              Next Project <i className="fas fa-arrow-right" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </motion.main>
    </>
  )
}

function Gallery({ project }) {
  const [mainSrc, setMainSrc] = useState(`/img/${project.mainImage}`)

  return (
    <div className="project-gallery">
      <div className="gallery-main">
        <img src={mainSrc} alt={project.detailTitle} className="main-image" />
      </div>
      <div className="gallery-thumbnails">
        {project.thumbnails.map((thumb, i) => (
          <img
            key={i}
            src={`/img/${thumb}`}
            alt={`${project.detailTitle} ${i + 1}`}
            onClick={() => setMainSrc(`/img/${thumb}`)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  )
}
