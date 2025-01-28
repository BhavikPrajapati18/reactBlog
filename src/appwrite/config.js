import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class AppwriteService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrlId)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, userId, slug }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("AppwriteService -> createPost -> error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, userId, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
          status,
        }
      );
    } catch (error) {
      console.log("AppwriteService -> deletePost -> error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppwriteService -> deletePost -> error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppwriteService -> getPost -> error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return result;
    } catch (error) {
      console.log("AppwriteService -> getPosts -> error", error);
      return false;
    }
  }

  // File methods storage

  async createFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("AppwriteService -> createFile -> error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("AppwriteService -> deleteFile -> error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new AppwriteService();

export default service;
