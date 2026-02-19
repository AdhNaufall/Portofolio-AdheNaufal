import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contacts = [
  {
    href: 'https://www.linkedin.com/in/adhe-naufal-putra-p-b98b92385/',
    target: '_blank',
    iconClass: 'contact-card-icon linkedin',
    icon: 'fab fa-linkedin',
    title: 'LinkedIn',
    desc: 'Connect professionally',
    linkText: 'View Profile →',
  },
  {
    href: 'https://github.com/AdhNaufall',
    target: '_blank',
    iconClass: 'contact-card-icon github',
    icon: 'fab fa-github',
    title: 'GitHub',
    desc: 'Check out my code',
    linkText: 'View Repository →',
  },
  {
    href: 'https://www.instagram.com/adhnaufall/',
    target: '_blank',
    iconClass: 'contact-card-icon instagram',
    icon: 'fab fa-instagram',
    title: 'Instagram',
    desc: 'Follow my journey',
    linkText: 'Follow Me →',
  },
  {
    href: null,
    onClick: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adhenaufalpp@gmail.com', '_blank'),
    iconClass: 'contact-card-icon email',
    icon: 'fas fa-envelope',
    title: 'Email',
    desc: 'adhenaufalpp@gmail.com',
    linkText: 'Send Email →',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>

        <div className="contact-intro">
          <h3 className="contact-subtitle">Let's Connect!</h3>
          <p className="contact-description">
            I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
            Feel free to reach out through any of the platforms below!
          </p>
        </div>

        <motion.div
          className="contact-grid"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {contacts.map(c => (
            <motion.a
              key={c.title}
              href={c.href || '#'}
              target={c.target}
              rel={c.target ? 'noreferrer' : undefined}
              className="contact-card"
              variants={cardAnim}
              onClick={c.onClick ? (e) => { e.preventDefault(); c.onClick() } : undefined}
            >
              <div className={c.iconClass}>
                <i className={c.icon} />
              </div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
              <span className="contact-card-link">{c.linkText}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="cta-content">
            <h3>Ready to Start a Project?</h3>
            <p>Let's create something amazing together. I'm available for freelance work and collaboration.</p>
            <div className="cta-buttons">
              <a href="/cv/AdheNaufal-CV.pdf" download="AdheNaufal-CV.pdf" className="btn-primary">
                <i className="fas fa-download" /> Download CV
              </a>
              <a
                href="#projects"
                className="btn-secondary"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                <i className="fas fa-briefcase" /> View My Work
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
