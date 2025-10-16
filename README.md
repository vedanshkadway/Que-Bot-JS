# 🤖 QueBot — Document-based AI Chatbot (RAG System)

QueBot is a **Retrieval-Augmented Generation (RAG)** chatbot that allows users to **chat with their documents**.  
It can analyze uploaded files (like PDFs or text files) and answer questions contextually — powered by **Next.js**, **Express.js**, **Chroma**, and **BullMQ**.

---

## 🚀 Features

- 📂 Upload PDFs and documents for intelligent Q&A  
- 🧠 Uses **vector embeddings** for semantic document search  
- ⚡ Queue-based processing using **BullMQ** for large file handling  
- 🔒 Secure authentication with **Clerk Auth**  
- 💬 Real-time chat interface with **Next.js + ShadCN UI**  
- 🧰 Scalable backend architecture using **Express + Chroma DB**

---

## 🧱 Tech Stack

**Frontend:**
- Next.js 14
- React
- TailwindCSS
- ShadCN UI
- Acernity UI
- Clerk Auth

**Backend:**
- Node.js
- Express.js
- BullMQ (Redis Queue)
- Chroma (Vector Database)
- OpenAI / Gemini API (for text embeddings + response generation)

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A[User Uploads PDF] -->|API Request| B[Express Backend]
    B --> C[Job Queue (BullMQ + Redis)]
    C --> D[Worker Processes File]
    D --> E[Extract Text + Create Embeddings]
    E --> F[Store in Chroma Vector DB]
    F --> G[Chat Query → Retrieve Relevant Chunks]
    G --> H[Send Context + Query to LLM API]
    H --> I[Generate Answer]
    I --> J[Display Response on Next.js UI]
