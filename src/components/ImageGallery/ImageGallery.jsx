import './ImageGallery.css'

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({ photos, openModal }) => {
    return (
        <ul className="gallery" onClick={openModal}>
            {photos.length > 0 && photos.map(({ webformatURL, tags, id, largeImageURL}) => <ImageGalleryItem key={ id } webformatURL={ webformatURL } tags={ tags } largeImageURL={largeImageURL} />)}   
        </ul>
    )
}