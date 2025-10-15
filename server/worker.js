/* eslint-disable */
import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "langchain/document";
dotenv.config();
const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    console.log("Job :", job.data);
    const fileInfo = job.data;
    console.log(fileInfo.path);

    /*
    Path: data.path
    read the pdf from path
    chunk the pdf
    call the openai embedding model for every chunk 
    store it in quadrant dbs
    */

    //Load the PDF
    const loader = new PDFLoader(fileInfo.path);
    const docs = await loader.load();
    console.log("PDF Loaded");

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001", // Or another suitable Gemini embedding model
      apiKey: process.env.GOOGLE_API_KEY,
    });
    console.log(docs[0]);
    console.log("Embedding model loaded suceessfully");

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.Index("quebot");
    console.log("Pinecone Loaded Successfully");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    console.log("Recusive Spit commpleted");
    console.log("Recursive Split completed");
    const splitDocs = await splitter.splitDocuments(docs[0]);
    console.log("docs splitted");

    await PineconeStore.fromDocuments(docs[0]["pageContent"], embeddings, {
      pineconeIndex,
    });
  },
  {
    concurrency: 10,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

export default worker;
