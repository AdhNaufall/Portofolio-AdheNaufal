import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
              As an active student at Binus University in my fifth semester who wants to enter and focus on UI/UX Design,
              I believe that every digital interaction should feel natural and have its own uniqueness. With this portfolio,
              I want to show my journey in creating experiences that are not only visually appealing, but also consider the user aspect.
            </p>
            <p>
              I am currently in a learning phase, where every project I undertake is an opportunity to deepen my understanding
              of Software Engineering, from conducting simple research and creating wireframes to building prototypes.
              I am highly motivated to continue honing my skills and understanding user-friendly design.
            </p>
            <p>
              I am very open to collaboration and constructive feedback. I want to continue testing new ideas and working
              enthusiastically to create digital solutions that have a positive impact. Let's connect and learn together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
