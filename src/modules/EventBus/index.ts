export class Emmiter {
  #events: object;

  constructor() {
    //Objeto plano Js que almacena arrays.
    //cada array tiene funcinones como valores
    this.#events = {};
  }
  on(type,Listener) {}
  if ( !this.#events[type] ) {}
  emit() {}
}
