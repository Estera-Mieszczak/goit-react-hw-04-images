
import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import css from "./App.module.css";
import { useToggle } from '../hooks/useToggle';


const apiEndpoint = 'https://pixabay.com/api/?key=42651602-8bf55650de46c7437c76ae15b'

export const App = () => {
  const [ photos, setPhotos ] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchPhoto, setSearchPhoto] = useState('')
  // const [clicked, setClicked] = useState(false)
  const [alt, setAlt] = useState()
  const [src, setSrc] = useState()
  const [id, setId] = useState('')
  const { isOpen, open, close } = useToggle()

  useEffect(() => {
    setCurrentPage(1);
    setPhotos([]);
    setIsLoading(false);
  }, [])

  const handleCurrentPageUpdate = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage +1 )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setPhotos([]);
   
    setIsLoading(true);
    getInitialData();
    handleCurrentPageUpdate();
    form.reset()
  }

  const handleChange = (event) => {
    const { value } = event.target

    setSearchPhoto(value);
    setCurrentPage(1)
  }

  const handleClick = () => { 
    handleCurrentPageUpdate()
    getInitialData()
  }

  const handleOpen = event => {
    open();
    const alt = event.target.tags;
    const src = event.target.getAttribute('srcSet');
    const imageId = event.target.id;
    setAlt(alt);
    setSrc(src);
    setId(imageId);
  };

  // const handleClose = event => {
  //   setClicked(false)
  // }

  const getInitialData = async () => {
    try {
      const response = await fetch(`${apiEndpoint}&page=${currentPage}&per_page=12&q=${searchPhoto}`)
      const photos = await response.json()
      setPhotos((prev) => [...prev, ...photos.hits]) 
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={css.App}>
      <Searchbar handleSubmit={handleSubmit} handleChange={handleChange} />
      {isOpen && (
        <Modal alt={alt} src={src} id={id} handleClose={close} />
      )}
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} openModal={handleOpen} />}
      {(currentPage > 1 && isLoading === false) ? <Button handleClick={handleClick} /> : <></>}
      
    </div>  
  );
};
