import fetch from 'node-fetch';
import { config } from '../Config';

export class SaludoService {
  #host: string;
  constructor(host: string) {
    this.#host = host;
  }

  getSaludo = async (endpoint: string) => {
    //http://localhost:5555/hola/Alfredo
    const responseSaludo = await fetch(`${this.#host}${endpoint}`);
    const response = await responseSaludo.json();
    return response;
  };
}

console.log(config.getApiSAludo());
export const saludoService = new SaludoService(config.getApiSAludo());
