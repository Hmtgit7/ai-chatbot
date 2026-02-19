# 🤖 AI Chatbot – Full Stack App

A simple yet powerful AI chatbot application built for the **Invictus Global Tech** backend assignment. Features a NestJS API with OpenAI integration and a modern Next.js frontend.

🔗 **Live Demo:** [ai-chatbot-nine-kappa-81.vercel.app](https://ai-chatbot-nine-kappa-81.vercel.app/)  
📦 **Repository:** [github.com/Hmtgit7/ai-chatbot](https://github.com/Hmtgit7/ai-chatbot)

---

## ✨ Features

- 💬 **Multi-chat Sessions** — Create and manage multiple chat conversations with full history
- 🤖 **AI-powered Responses** — Uses OpenAI with a custom knowledge base
- 📚 **Knowledge Base Management** — Full CRUD operations for pricing, FAQs, and custom entries
- 🎨 **Modern UI** — Responsive design with dark/light theme support
- ⚡ **Real-time Chat** — Fast, interactive chat experience

---

## 🛠️ Tech Stack

### Backend

| Technology | Role |
|---|---|
| NestJS | Framework |
| TypeScript | Language |
| MongoDB | Database |
| OpenAI API | AI integration |

### Frontend

| Technology | Role |
|---|---|
| Next.js | Framework |
| React | UI library |
| Tailwind CSS | Styling |
| Shadcn/ui | UI components |

### Package Manager

- **pnpm** — Fast, disk space efficient package manager

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)
- [OpenAI API key](https://platform.openai.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Hmtgit7/ai-chatbot.git
cd ai-chatbot
```

### 2. Install Dependencies

```bash
# Install dependencies for both backend and frontend
pnpm install
```

### 3. Configure Backend Environment

```bash
# Copy the example env file
cp backend/.env.example backend/.env
```

Add your credentials to `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo  # or gpt-4
```

### 4. Configure Frontend Environment

```bash
# Copy the example env file
cp frontend/.env.example frontend/.env.local
```

Add your API URL to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Run the Development Server

```bash
# Start both backend and frontend
pnpm dev
```

The application will be available at:

- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Frontend:** [http://localhost:3000](http://localhost:3000) (or as configured)

---

## 📦 Building for Production

```bash
# Build both applications
pnpm build

# Start production servers
pnpm start
```

---

## 📁 Project Structure

```
ai-chatbot/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── chat/        # Chat endpoints & logic
│   │   ├── knowledge/   # Knowledge base CRUD
│   │   └── openai/      # OpenAI service integration
│   └── .env             # Backend environment config
├── frontend/             # Next.js application
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   └── .env.local       # Frontend environment config
└── pnpm-workspace.yaml  # Monorepo configuration
```

---

## 🎯 Key Features Explained

### Multi-chat Sessions

Create multiple chat sessions to organize different conversations. Each session maintains its own history and context.

### Custom Knowledge Base

The chatbot can reference a custom knowledge base for domain-specific answers. Add, update, or delete knowledge entries through the API to keep responses accurate and up-to-date.

### OpenAI Integration

Leverages OpenAI's powerful language models to generate intelligent, context-aware responses based on chat history and the knowledge base.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📝 License

This project is licensed under the **MIT License** — free to use for personal or commercial purposes.

---

## 👨‍💻 Author

**Hemant Gehlod**

- GitHub: [@Hmtgit7](https://github.com/Hmtgit7)

---

## 🙏 Acknowledgments

Built for the **Invictus Global Tech** backend assignment.

[NestJS](https://nestjs.com) · [Next.js](https://nextjs.org) · [OpenAI](https://openai.com) · [MongoDB](https://www.mongodb.com) · [Shadcn/ui](https://ui.shadcn.com)

---

<div align="center">Made with ❤️ using NestJS and Next.js</div>