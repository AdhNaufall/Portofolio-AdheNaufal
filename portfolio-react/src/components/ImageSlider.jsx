import { useState } from 'react'

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = (e) => {
    e.preventDefault()
    setCurrent(i => (i > 0 ? i - 1 : images.length - 1))
  }

  const next = (e) => {
    e.preventDefault()
    setCurrent(i => (i < images.length - 1 ? i + 1 : 0))
  }

  return (
    <div className="experience-image-slider">
      <div className="slider-container">
        {images.map((img, i) => (
          <img
            key={i}
            src={`/img/${img}`}
            alt={`slide ${i + 1}`}
            className={`slider-image${i === current ? ' active' : ''}`}
            style={{ display: i === current ? 'block' : 'none', opacity: i === current ? 1 : 0 }}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="prev-button" onClick={prev}><i className="fas fa-chevron-left" /></button>
          <button className="next-button" onClick={next}><i className="fas fa-chevron-right" /></button>
        </>
      )}
    </div>
  )
}
