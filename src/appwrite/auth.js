import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrlId)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      localStorage.setItem("session", JSON.stringify(session));
      return session;
    } catch (error) {
      throw error;
    }
  }

  async userAcitve() {
    try {
      const storedSession = localStorage.getItem("session");
      if (storedSession) {
        return JSON.parse(storedSession); // ✅ Return stored session
      }
      return await this.account.get();
    } catch (error) {
      console.log("userActive : ", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      localStorage.removeItem("session"); // ✅ Clear session on logout
    } catch (error) {
      console.log("Logout : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
