import fetch from 'node-fetch';

export class PokemonService {
  getPokemonByName = async (name: string): Promise<Response> => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;
    // const options = { method: 'GET' };
    const response = await fetch(endpoint);
    return await response.json();
  };
}

export const pokemonService = new PokemonService();
