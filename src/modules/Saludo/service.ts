import fetch from 'node-fetch';
import { config } from '../../Server/config';

export class SaludoService {
  #host: string;
  constructor(host: string) {
    this.#host = host;
  }

  getSaludo = async (name: string) => {
    const responseSaludo = await fetch(`${this.#host}${name}`);
    const response = await responseSaludo.json();
    return response;
  };
}

export const saludoService = new SaludoService(config.apiSAludo);
