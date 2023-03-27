const dotenv = require('dotenv');
dotenv.config();

class Settings {
  #usernameTestUser;
  #passwordTestUser;
  constructor(env) {
    this.#usernameTestUser = env.USER_TEST_USERNAME;
    this.#passwordTestUser = env.USER_TEST_PASSWORD;
  }

  get testUserData() {
    if (this.#usernameTestUser === undefined) throw new Error('undefined USER_TEST_USERNAME in .env');
    if (this.#passwordTestUser === undefined) throw new Error('undefined USER_TEST_PASSWORD in .env');
    console.log(this.#usernameTestUser, this.#passwordTestUser);
    return {
      username: this.#usernameTestUser,
      password: this.#passwordTestUser,
    };
  }
}
const { testUserData } = new Settings(process.env);

module.exports = testUserData;
