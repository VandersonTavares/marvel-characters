// src/services/characterService.ts
import axios from "axios";
import CryptoJS from "crypto-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

interface Character {
  id: number;
  name: string;
  description: string;
}

const getCharacters = async (offset: number): Promise<Character[]> => {
  const ts = new Date().getTime().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + API_KEY).toString();

  const params = new URLSearchParams({
    apikey: API_KEY,
    ts: ts,
    hash: hash,
    offset: offset.toString(),
  }).toString();

  try {
    const response = await axios.get(`${BASE_URL}/characters?${params}`);
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

const getDetailedCharacter = async (id: number): Promise<Character> => {
  const ts = new Date().getTime().toString();
  const hash = CryptoJS.MD5(ts + PRIVATE_KEY + API_KEY).toString();

  const params = new URLSearchParams({
    apikey: API_KEY,
    ts: ts,
    hash: hash,
  }).toString();

  try {
    const response = await axios.get(`${BASE_URL}/characters/${id}?${params}`);
    return response.data.data.results[0];
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};

export { getCharacters, getDetailedCharacter };
