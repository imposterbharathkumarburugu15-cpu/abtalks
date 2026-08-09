import { Challenge, TrackType } from '../types';

export const TRACK_OPTIONS: TrackType[] = [
  'AI / ML',
  'Full-Stack Web',
  'Backend Systems',
  'Mobile Apps'
];

export const CHALLENGES: Record<number, Challenge> = {
  1: {
    day: 1,
    title: "CLI Personal Portfolio",
    track: "AI / ML",
    description: "Build an interactive command-line terminal portfolio displaying your skills, GitHub projects, and contact info.",
    durationMinutes: 30,
    difficulty: "Beginner",
    shipMinimum: [
      "Display colorful ASCII art heading",
      "Interactive prompt menu for Projects / Experience",
      "Valid contact command or clickable social links"
    ],
    hint: {
      title: "CLI Styling Tip",
      content: "Use Node.js chalk or Python colorama to format text with ANSI codes.",
      codeSnippet: "console.log(chalk.bold.purple('🚀 Bharath Portfolio v1.0'));"
    },
    conceptsCovered: ["CLI Parsing", "ANSI Colors", "Node/Python Input"]
  },
  2: {
    day: 2,
    title: "Markdown README Generator",
    track: "AI / ML",
    description: "Generate production-grade open source README files with badges, license tags, and formatted section templates.",
    durationMinutes: 35,
    difficulty: "Beginner",
    shipMinimum: [
      "Accept repository name & description",
      "Include shields.io status badges",
      "Export formatted README.md output"
    ],
    conceptsCovered: ["File I/O", "Markdown AST", "Shields.io"]
  },
  3: {
    day: 3,
    title: "JSON Data Cleaner Script",
    track: "AI / ML",
    description: "Script to parse raw dirty JSON dataset, remove null entries, format timestamps, and export clean CSV.",
    durationMinutes: 40,
    difficulty: "Beginner",
    shipMinimum: [
      "Filter duplicate records",
      "Sanitize ISO datetime strings",
      "Write cleaned output to disk"
    ],
    conceptsCovered: ["Data Wrangling", "JSON/CSV Parser", "Regex"]
  },
  4: {
    day: 4,
    title: "GitHub Profile Analyzer",
    track: "AI / ML",
    description: "Fetch public repository metrics and render a breakdown of top languages, commit frequency, and star counts.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    shipMinimum: [
      "Accept GitHub username input",
      "Calculate language percentage breakdown",
      "Display repository activity breakdown"
    ],
    conceptsCovered: ["GitHub REST API", "Aggregations", "Chart Render"]
  },
  5: {
    day: 5,
    title: "Simple Web Scraper & Alert",
    track: "AI / ML",
    description: "Scrape product prices or tech news headlines and dispatch a clean summary notification when prices change.",
    durationMinutes: 40,
    difficulty: "Intermediate",
    shipMinimum: [
      "Parse HTML elements cleanly",
      "Extract structured title & price values",
      "Compare with saved baseline threshold"
    ],
    conceptsCovered: ["Cheerio/BeautifulSoup", "DOM Parsing", "State diffing"]
  },
  6: {
    day: 6,
    title: "SQLite Fast Notes Engine",
    track: "AI / ML",
    description: "Lightweight local SQL database engine storing tagged quick notes with instant full-text search capability.",
    durationMinutes: 50,
    difficulty: "Intermediate",
    shipMinimum: [
      "CRUD operations via SQL queries",
      "Full-text search by keyword",
      "Tag-based note filtering"
    ],
    conceptsCovered: ["SQLite Schema", "Indexing", "Parameterized Queries"]
  },
  7: {
    day: 7,
    title: "JWT Token Authenticator",
    track: "AI / ML",
    description: "Build token generation, password hashing with bcrypt, and middleware access authorization.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    shipMinimum: [
      "Sign JWT tokens with expiry",
      "Verify authorization header middleware",
      "Password hashing using salt rounds"
    ],
    conceptsCovered: ["Cryptography", "Bcrypt", "Bearer Token Auth"]
  },
  8: {
    day: 8,
    title: "CSV Matrix Math Engine",
    track: "AI / ML",
    description: "Parse numerical datasets and compute mean, median, variance, and correlation matrix from scratch.",
    durationMinutes: 40,
    difficulty: "Intermediate",
    shipMinimum: [
      "Compute column summary statistics",
      "Calculate Pearson correlation coefficient",
      "Handle missing matrix values safely"
    ],
    conceptsCovered: ["NumPy concepts", "Linear Algebra", "Statistical Formulas"]
  },
  9: {
    day: 9,
    title: "Interactive SQL Explorer",
    track: "AI / ML",
    description: "Browser-based SQL query runner with syntax highlighting and instant tabular result previews.",
    durationMinutes: 50,
    difficulty: "Intermediate",
    shipMinimum: [
      "Execute SELECT, WHERE, and JOIN queries",
      "Render clean data table grid",
      "Export query output to JSON/CSV"
    ],
    conceptsCovered: ["SQL Querying", "Relational Views", "Client DB"]
  },
  10: {
    day: 10,
    title: "React Developer Dashboard",
    track: "AI / ML",
    description: "A dark-mode analytics console showing API response latency, request counts, and system metrics.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    shipMinimum: [
      "Real-time latency graph rendering",
      "Status badge indicators (200 OK / 500 ERR)",
      "Responsive metric grid layout"
    ],
    conceptsCovered: ["React State", "Component Modularization", "CSS Grids"]
  },
  11: {
    day: 11,
    title: "RESTful API Mock Engine",
    track: "AI / ML",
    description: "Express backend API endpoint serving dynamic JSON datasets with pagination, filtering, and sorting.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    shipMinimum: [
      "Express route handlers for GET / POST",
      "Support page & limit query parameters",
      "Standardized JSON error envelope"
    ],
    conceptsCovered: ["Express Routing", "Pagination", "Middleware Pipeline"]
  },
  12: {
    day: 12,
    title: "URL Shortener Engine",
    track: "AI / ML",
    description: "Turn long URLs into short, shareable links with click analytics and instant redirect mechanisms.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    shipMinimum: [
      "Accept valid HTTP/HTTPS URL input",
      "Generate collision-free short code hash",
      "Redirect short link to original destination URL"
    ],
    hint: {
      title: "Hash & Redirect Logic",
      content: "Use Base62 encoding or nanoid algorithms for clean 6-character short codes.",
      codeSnippet: "const shortCode = Math.random().toString(36).substring(2, 8);"
    },
    conceptsCovered: ["Base62 Encoding", "KV Storage", "302 Redirects"]
  },
  13: {
    day: 13,
    title: "Text Sentiment Classifier",
    track: "AI / ML",
    description: "Analyze customer review text and score sentiment polarity (Positive, Neutral, Negative) with word weights.",
    durationMinutes: 50,
    difficulty: "Intermediate",
    shipMinimum: [
      "Tokenize input text string",
      "Score sentiment polarity score",
      "Highlight key positive/negative triggers"
    ],
    conceptsCovered: ["NLP Tokenization", "AFINN Dictionary", "Score Normalization"]
  },
  14: {
    day: 14,
    title: "Vector Similarity Search",
    track: "AI / ML",
    description: "Calculate cosine similarity between text embeddings to retrieve top matching documents.",
    durationMinutes: 55,
    difficulty: "Advanced",
    shipMinimum: [
      "Compute dot product of 2 vector arrays",
      "Rank document relevance by similarity score",
      "Render top 3 relevant text matches"
    ],
    conceptsCovered: ["Cosine Similarity", "Vector Space", "K-NN Retrieval"]
  },
  15: {
    day: 15,
    title: "Rate Limiter Middleware",
    track: "AI / ML",
    description: "Implement a sliding-window counter rate limiter protecting API routes from traffic bursts.",
    durationMinutes: 50,
    difficulty: "Advanced",
    shipMinimum: [
      "Track IP request count in memory window",
      "Return 429 Too Many Requests response",
      "Include X-RateLimit-Reset headers"
    ],
    conceptsCovered: ["Sliding Window", "In-Memory KV", "HTTP Status 429"]
  }
};

// Generate template challenges for remaining days 16-60
const GENERIC_TITLES = [
  "RAG Document Search", "Prompt Engineering Pipeline", "Redis Cache Layer", "GraphQL API Server",
  "WebSocket Realtime Chat", "Dockerized Service Engine", "OAuth2 Flow Integrator", "Microservice Router",
  "Cron Job Scheduler", "PostgreSQL Migration Tool", "Image Resizer Pipeline", "JWT Token Refresh Server",
  "Linear Regression Engine", "K-Means Clustering Tool", "Neural Network From Scratch", "Speech to Text Pipeline",
  "BERT Classifier Runner", "LLM Context Window Buffer", "Fine-Tuning Data Format", "Prompt Guard Filter",
  "S3 File Uploader API", "Stripe Webhook Listener", "Kafka Event Producer", "ElasticSearch Indexer",
  "gRPC Microservice Client", "CI/CD GitHub Action", "Kubernetes Deployment Manifest", "Terraform Cloud Infra",
  "Distributed Lock Engine", "Load Balancer Algorithm", "Message Queue Worker", "Prometheus Metrics Exporter",
  "Grafana Latency Dashboard", "Serverless Edge Function", "WebAssembly Image Filter", "Canvas Game Physics",
  "WebRTC Video Peer Connection", "PWA Offline Cache", "IndexedDB Storage Sync", "Crypto Key Pair Signer",
  "WebAuthn Passkey Server", "OpenAPI Spec Validator", "Tree Shaking Bundler", "Virtual DOM Diff Algorithm",
  "CSS Engine Tokenizer"
];

for (let d = 16; d <= 60; d++) {
  const title = GENERIC_TITLES[(d - 16) % GENERIC_TITLES.length] + ` (Day ${d})`;
  CHALLENGES[d] = {
    day: d,
    title: title,
    track: "AI / ML",
    description: `Day ${d} of the 60-day challenge: Build a functional ${title.toLowerCase()} and submit public proof.`,
    durationMinutes: d % 2 === 0 ? 45 : 50,
    difficulty: d > 40 ? "Advanced" : "Intermediate",
    shipMinimum: [
      `Implement core ${title} algorithm`,
      "Validate input edge cases and error bounds",
      "Deploy code and record proof of work"
    ],
    conceptsCovered: ["Systems Architecture", "Production Readiness", "Public Proof"]
  };
}
