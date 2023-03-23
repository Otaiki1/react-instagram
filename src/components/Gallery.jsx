import { useLiveQuery } from 'dexie-react-hooks'
import getPhotoUrl from 'get-photo-url'
import { useState, CSSProperties } from 'react'
import { db } from '../dexie'
import Modal from './Modal';
import ClipLoader from "react-spinners/ClipLoader";


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

  const removeAllPhotos = () => {
    db.gallery.clear()
  }

  const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <input type="file" accept="image/*" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <i className="add-photo-button fas fa-plus-square" />
      </label>
      <button onClick={removeAllPhotos} className="delete-all">
        <i className="fas fa-trash"></i>
      </button>


      <section className="gallery">

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
      {!allPhotos && <div>
          <ClipLoader
        color="blue"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
          </div>}
      {allPhotos ?( allPhotos.length ==0 ? <h1 className='modal-text'>NO IMAGES IN GALLERY, CLICK THE + ICON TO ADD IMAGE</h1>: "" ): ""}
    </div>
  )
}

export default Gallery;