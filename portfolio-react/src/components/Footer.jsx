export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/adhe-naufal-putra-p-b98b92385/" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin" />
          </a>
          <a href="https://github.com/AdhNaufall" target="_blank" rel="noreferrer">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.instagram.com/adhnaufall/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram" />
          </a>
        </div>
        <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Adhe Naufal Putra Purnomo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
