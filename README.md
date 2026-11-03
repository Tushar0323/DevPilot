# DevPilot

> **Turn an unfamiliar repository into a conversation.**

DevPilot is a developer workspace that lets you connect GitHub repositories, index their source code, and ask questions in natural language. Instead of searching through files one by one, you can ask DevPilot to explain an authentication flow, locate a service, trace a data path, or help diagnose a bug.

The application combines repository-aware retrieval with streamed AI responses and source citations, so answers stay anchored to the code you are exploring.

## What DevPilot does

- Connects to GitHub through OAuth
- Lists public and private repositories available to the signed-in user
- Indexes repository files for semantic search
- Stores embeddings in PostgreSQL with `pgvector`
- Creates repository-specific chat sessions
- Streams assistant responses over Server-Sent Events
- Displays citations for the files used to form an answer
- Supports light, dark, and system themes

## Product flow

```text
Sign in with GitHub
        ↓
Choose a repository
        ↓
Index the source tree
        ↓
Ask a codebase question
        ↓
Retrieve relevant files
        ↓
Stream an answer with citations
```

## Repository layout

```text
DevPilot/
├── backend/       Spring Boot API, OAuth, indexing, chat, persistence
├── frontend/      React + Vite application
├── docker-compose.yml
└── README.md
```

### Frontend structure

```text
frontend/src/
├── components/    Shared UI, dashboard, chat, and layout components
├── pages/         Route-level React pages
├── hooks/         React Query and application hooks
├── lib/           API client, router helpers, streaming, and utilities
├── App.jsx        React Router configuration
└── main.jsx       Application entry point
```

## Technology

| Area | Tools |
| --- | --- |
| Web client | React, Vite, React Router |
| UI | Tailwind CSS, shadcn-style components, Lucide |
| Data fetching | TanStack React Query |
| API | Spring Boot, Spring MVC |
| Authentication | Spring Security + GitHub OAuth 2.0 |
| Persistence | PostgreSQL, Spring Data JPA |
| Vector search | PostgreSQL `pgvector` |
| AI responses | OpenAI-compatible provider configuration |
| Streaming | Server-Sent Events |

## Requirements

Install the following before starting:

- Node.js 18 or newer
- Java 17 or newer
- Maven, or use the included Maven wrapper
- PostgreSQL with the `vector` extension
- A GitHub OAuth application
- Credentials for the configured chat and embedding providers

## Configuration

Copy the example environment files and fill in the values locally:

```powershell
Copy-Item frontend\.env.example frontend\.env
Copy-Item backend\.env.example backend\.env
```

### Frontend environment

`frontend/.env` controls the browser API origin and the Vite development proxy:

```dotenv
VITE_API_BASE_URL=
VITE_API_PROXY_TARGET=http://localhost:8080
```

Leave `VITE_API_BASE_URL` empty during local development to use the Vite proxy. Set it to the deployed backend origin when the frontend is hosted separately.

### Backend environment

At minimum, configure:

```dotenv
DB_URL=jdbc:postgresql://localhost:5432/devpilot
DB_USERNAME=postgres
DB_PASSWORD=change-me

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

FRONTEND_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Also provide the AI, encryption, and embedding variables listed in `backend/.env.example`.

Never commit `.env` files or real credentials. The repository-level `.gitignore` already excludes local environment files, dependencies, build output, logs, and common IDE artifacts.

## GitHub OAuth setup

Create a GitHub OAuth App and configure:

```text
Authorization callback URL:
http://localhost:8080/login/oauth2/code/github
```

The callback URL must match the backend server and the callback configured in GitHub. After authentication, Spring Boot redirects the browser to the `FRONTEND_URL` callback route.

## Database setup

Start PostgreSQL with `pgvector` available, then create the extension once:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

The backend uses JPA schema updates and initializes the vector store according to the configured application properties.

## Run locally

Start the backend in one terminal:

```powershell
Set-Location backend
.\mvnw.cmd spring-boot:run
```

Start the frontend in another:

```powershell
Set-Location frontend
npm install
npm run dev
```

Open the frontend URL shown by Vite, normally:

```text
http://localhost:3000
```

## Useful commands

### Frontend

```powershell
npm run dev       # Start the Vite development server
npm test          # Run frontend tests
npm run build     # Create a production bundle
npm run lint      # Check JavaScript and JSX
```

### Backend

```powershell
.\mvnw.cmd compile
.\mvnw.cmd test
```

## API areas

The React client communicates with these backend areas:

| Area | Purpose |
| --- | --- |
| `/api/auth` | Current user and logout |
| `/api/repos` | Repository listing, indexing, and status |
| `/api/chat/sessions` | Chat sessions and stored messages |
| `/api/chat/sessions/{id}/messages` | Stream a new assistant response |
| `/oauth2/authorization/github` | Begin GitHub authentication |

All authenticated API requests include the session cookie. The development proxy keeps browser requests same-origin while forwarding them to Spring Boot.

## Security notes

- Keep OAuth, database, AI, and encryption secrets outside source control.
- Use HTTPS for deployed frontend and backend origins.
- Set `CORS_ALLOWED_ORIGINS` to explicit trusted origins.
- Do not use wildcard origins with credentialed requests.
- Rotate credentials if they are ever exposed.

## Current development direction

DevPilot is designed around a small loop: connect, index, ask, verify. Future improvements can build on that foundation with multi-repository conversations, richer citation navigation, provider selection, team workspaces, and deployment automation.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
