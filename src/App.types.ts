export type IData = {
  total: number;
  total_pages: number;
  results: IPicture[];
};

export type IPicture = {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
  user: {
    name: string;
  };
};

export type IModal = {
  imgLikes: number;
  imgAuthor: string;
  srcImgModal: string;
  imgDescription: string;
};
