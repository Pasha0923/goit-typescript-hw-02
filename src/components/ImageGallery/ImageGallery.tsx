import { IModal, IPicture } from "../../App.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
interface ImageGalleryProps {
  images: IPicture[] | null;
  openModal: (image: IModal) => void;
}
const ImageGallery = ({ images, openModal }: ImageGalleryProps) => {
  return (
    <ul className={css.list}>
      {images !== null &&
        Array.isArray(images) &&
        images.map((image) => (
          <li className={css.list} key={image.id}>
            <ImageCard image={image} onImageClick={openModal} />
          </li>
        ))}
    </ul>
  );
};
export default ImageGallery;
