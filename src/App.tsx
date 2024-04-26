import { useState, useEffect } from "react";
import requestImages from "./services/api";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import { IData, IModal, IPicture } from "./App.types";
import toast from "react-hot-toast";

function App() {
  const [page, setPage] = useState<number>(1); // Стан для зберігання поточної сторінки результатів
  const [images, setImages] = useState<IPicture[]>([]); // Стан для зберігання списку зображень
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // Стан для відображення завантаження основного контенту
  const [isloading, setIsLoading] = useState<boolean>(false); // Стан для відображення завантаження індикатору завантаження
  const [searchQuery, setSearchQuery] = useState<string>(""); // Стан для зберігання поточного пошукового запиту
  const [isError, setIsError] = useState<boolean>(false); //Стан для відображення помилки
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Стан для відображення/приховування модального вікна
  const [selectedImage, setSelectedImage] = useState<IModal>({
    imgLikes: 0,
    imgAuthor: "",
    srcImgModal: "",
    imgDescription: "",
  }); // Стан для зберігання вибраного зображення для модального вікна
  useEffect(() => {
    if (searchQuery === "") return;

    async function fetchPicturesByQuery() {
      try {
        setLoadingMore(false);
        setIsLoading(true);
        setIsError(false);
        setModalIsOpen(false);

        const data: IData = await requestImages(searchQuery, page);
        console.log(data.results);

        const noquery = () =>
          toast.error("Sorry, there are no images matching your search query", {
            duration: 4000,
            icon: "🥺",
          });
        if (data.total === 0) {
          noquery();
          return;
        }

        if (data.total_pages > page) {
          setLoadingMore(true);
        }

        setImages((prevState) => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPicturesByQuery();
  }, [searchQuery, page]);
  // Функція приймає строку з пошуковим запитом і встановлюємо її в state
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleImageClick = (image: IModal) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery images={images} openModal={handleImageClick} />
      {isloading && <Loader />}
      {loadingMore && <LoadMoreBtn loadMore={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          onClose={closeModal}
          {...selectedImage}
        />
      )}
    </>
  );
}

export default App;
