
import { useState, useEffect } from "react"
import "../../css/GalleryPhotos.css"

const GalleryPhotos = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/gallery/")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setImages(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching images:", error)
        setError("Failed to load images. Please try again later.")
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading-message">Loading images...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((item) => (
            <div className="gallery-box" key={item.gallery_id}>
              <img
                // src={item.image || "/placeholder.svg"}
                src={item.image_url}
                alt={`Gallery image ${item.gallery_id}`}
                className="gallery-image"
              />
            </div>
          ))
        ) : (
          <div className="no-images-message">No images found</div>
        )}
      </div>
    </div>
  )
}

export default GalleryPhotos

