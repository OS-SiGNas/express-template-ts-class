import { get } from "mongoose";
import fetch from "node-fetch";

export const getPokemonByName = async (name: string) => {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const options = { method: "GET" };
  try {
    const response = await fetch(endpoint, options);
    const dataPokemon = await response.json();
    return dataPokemon;
  } catch (error) {
    return error;
  }
};
