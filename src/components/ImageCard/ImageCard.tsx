import { IModal, IPicture } from "../../App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: IPicture;
  onImageClick: (image: IModal) => void;
}
const ImageCard = ({
  image: { urls, likes, description, user },
  onImageClick,
}: ImageCardProps) => {
  const ImageData = {
    imgAuthor: user.name,
    imgLikes: likes,
    srcImgModal: urls.regular,
    imgDescription: description,
  };
  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src={urls.small}
        alt={description}
        onClick={() => onImageClick(ImageData)}
      />
    </div>
  );
};
export default ImageCard;
