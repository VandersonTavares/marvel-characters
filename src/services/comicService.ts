// src/services/characterService.ts
import axios from "axios";
import CryptoJS from "crypto-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

interface Comic {
  id: number;
  name: string;
  description: string;
}

const getComic = async (characterId: number): Promise<Comic[]> => {
  const ts = new Date().getTime().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + API_KEY).toString();

  const params = new URLSearchParams({
    apikey: API_KEY,
    ts: ts,
    hash: hash,
  }).toString();

  try {
    const response = await axios.get(`${BASE_URL}/characters/${characterId}/comics?${params}`);
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export { getComic };
