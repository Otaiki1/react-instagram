import { useLiveQuery } from 'dexie-react-hooks'
import getPhotoUrl from 'get-photo-url'
import { useState } from 'react'
import { db } from '../dexie'
import Modal from './Modal'

const Gallery = () => {
  const allPhotos = useLiveQuery(() => db.gallery.toArray(), [])
  const [showModal, setShowModal] = useState(false);

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl('#addPhotoInput'),
    })
  }

  const removePhoto = (id) => {
    db.gallery.delete(id)
    setShowModal(false)
  }


  return (
    <div>
      <input type="file" accept="image/*" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <i className="add-photo-button fas fa-plus-square" />
      </label>

      <section className="gallery">
        
        {!allPhotos && <p>Loading...</p>}
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="" />
            <button className="delete-button" onClick={() => setShowModal(true)}>
              Delete
            </button>
            {showModal && <Modal cancelHandler={() => setShowModal(false)} confirmHandler={() => removePhoto(photo.id)} />}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Gallery
