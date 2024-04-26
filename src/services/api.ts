import axios from "axios";
const ACCESS_KEY = "JRCgPyKqek-3xDn3ZMJlEUM77lu4GANVfaWzKoflQJA";
import { IData } from "../App.types";

async function requestImages(query: string, page: number): Promise<IData> {
  const { data } = await axios.get<IData>(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  console.log(data);
  console.log(data.results);
  return data;
}

export default requestImages;
