import './ImageGalleryItem.css'

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
    return (
        <li className="gallery-item" key={id} >
            <img className="gallery-item-image" src={webformatURL} alt={tags} srcSet={ largeImageURL } />
        </li>
    )
}