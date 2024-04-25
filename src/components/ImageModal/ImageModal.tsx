import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { IModal } from "../../App.types";
Modal.setAppElement("#root");
interface ImageModalProps extends IModal{
  onClose: () => void;
  modalIsOpen: boolean;
  // imgLikes: number;
  // imgAuthor: string;
  // srcImgModal: string;
  // imgDescription: string;
}

const ImageModal = ({
  onClose,
  modalIsOpen,
  imgLikes,
  imgAuthor,
  srcImgModal,
  imgDescription,
}: ImageModalProps) => {
  return (
    <Modal
      className={css.modal}
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
    >
      <div className={css.wrapper}>
        {
          <img
            className={css.image}
            src={srcImgModal}
            alt={imgDescription}
            onClick={onClose}
          />
        }
        <p className={css.description}>{imgDescription}</p>
        <p className={css.text}>
          Author: <span className={css.span}>{imgAuthor}</span>
        </p>
        <p className={css.text}>
          Likes: <span className={css.span}>{imgLikes}</span>
        </p>
      </div>
    </Modal>
  );
};
export default ImageModal;
