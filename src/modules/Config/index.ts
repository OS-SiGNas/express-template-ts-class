import dotenv from 'dotenv'

class Config {
  #secretKey: string
  #port: number
  #dbURI: string
  #debug: boolean

  constructor () {
    dotenv.config()
    const { NODE_ENV, PORT, JWT_SECRET, MONGO_URI_HEADER, MONGO_PASS, MONGO_CLUSTER } = process.env
    this.#debug = NODE_ENV === 'dev'
    this.#port = Number(PORT)
    this.#secretKey = String(JWT_SECRET)
    this.#dbURI = `${MONGO_URI_HEADER}${MONGO_PASS}${MONGO_CLUSTER}`
  }

  public getJwtSecretKey (): string {
    return this.#secretKey
  }

  public getDbUri (): string {
    return this.#dbURI
  }

  public getPort (): number {
    return this.#port
  }

  public getEnvironment (): boolean {
    return this.#debug
  }
}

export const config: Config = new Config()
