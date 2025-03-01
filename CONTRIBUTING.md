# Contributing

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Standards and Guidelines](#standards-and-guidelines)
- [Questions](#questions)

## Getting Started

Thank you for your interest in contributing to DevUnity. This guide outlines the process for setting up the project and submitting contributions. DevUnity is primarily written in TypeScript. The backend is built using Node.js and MongoDB. Prettier is used for code formatting.

## How to Contribute

### Prerequisites

To contribute, ensure you have the following installed:

- A stable internet connection
- A text editor (such as VS Code or Neovim)
- Git
- Node.js (version 22.5.1 LTS)
- MongoDB (or MongoDB Atlas)
- Docker (if applicable)
- Firebase (if working on authentication-related features)

#### Node.js and npm

If using `nvm` (or `nvm-windows` on Windows), run:

```sh
nvm install 22.5.1
nvm use 22.5.1
```

Alternatively, download and install Node.js from the official website.

## Frontend Setup

### Setting Up Environment Variables

1. Duplicate `/frontend/.env.example` and rename it to `.env`.

### Installation

1. Navigate to the `/frontend` directory and install dependencies:

   ```sh
   npm install
   ```

2. Start the frontend locally:

   ```sh
   npm run dev
   ```

### Optional Configurations

#### TinyMCE (for room descriptions)

1. Create a TinyMCE account and obtain an API key.
2. Approve the domains `http://localhost:5173` and `https://devunity.netlify.app`.
3. Add the key to `/frontend/.env`:

   ```sh
   VITE_TINYMCE_API_SECRET=your-api-key
   ```

#### Judge0.ce & RapidAPI (for code execution)

1. Create a RapidAPI account.
2. Subscribe to [Judge0.ce](https://rapidapi.com/judge0-official/api/judge0-ce/).
3. Obtain the required API keys and add them to `/frontend/.env`:

   ```sh
   VITE_JUDGE_CE_API_KEY=your-api-key
   VITE_JUDGE_CE_HOST=judge0-ce.p.rapidapi.com
   VITE_JUDGE_CE_BASE_URL=https://judge0-ce.p.rapidapi.com
   ```

## Backend Setup

### Setting Up Environment Variables

1. Duplicate `/backend/.env.example` and rename it to `.env`.
2. Ensure MongoDB is running locally or update `MONGO_URI` if using MongoDB Atlas.
3. Generate a `JWT_SECRET` using:

   ```sh
   openssl rand -base64 32
   ```

4. (Optional) Configure email service in `.env`:

   ```sh
   SMTP_MAIL=your-email@example.com
   SMTP_PASS=your-app-password
   SMTP_HOST=smtp.example.com
   ```

5. (Optional) Configure Cloudinary for file uploads:

   ```sh
   CLOUDINARY_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Installation

1. Navigate to `/backend` and install dependencies:

   ```sh
   npm install
   ```

2. Start the backend locally:

   ```sh
   npm run dev
   ```

## Standards and Guidelines

### Pull Request Naming Guidelines

DevUnity follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for pull request titles and commit messages. Use the following prefixes:

- `feat`: A new feature
- `impr`: Improvement to an existing feature
- `fix`: A bug fix
- `style`: Code formatting changes (e.g., white space, semi-colons)
- `refactor`: Code changes that improve readability or structure without changing behavior
- `chore`: Other changes that do not fit the above categories

## Questions

For any questions, you can:

- Open an issue on [GitHub](https://github.com/m4dd0c/DevUnity/issues)
- Start a discussion on [GitHub Discussions](https://github.com/m4dd0c/DevUnity/discussions)

Thank you for contributing!

