# Contributing

### **Table of Contents**

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Prerequisites](#prerequisites)
  - [Frontend set-up](#frontend-set-up)
  - [Backend set-up](#backend-set-up)
- [Standards and Guidelines](#standards-and-guidelines)
- [Questions](#questions)

## Getting Started

When contributing to DevUnity, it's good to know our best practices, tips, and tricks. First, DevUnity is written in ~~JavaScript~~ TypeScript (in order of language usage within the project); thus, we assume you are comfortable with these languages or have basic knowledge of them. Our backend is in NodeJS and we use MongoDB to store our user data. Furthermore, we use Prettier to format our code.

# How to Contribute

## Prerequisites

This contribution guide is for cases in which you need to test the functionality of your changes, or if you need to take screenshots of your changes. You will need a computer with a stable internet connection, a text editor, Git, and NodeJS with version 20.16.0. There are some additional requirements depending on what you're looking to contribute, such as Firebase for authentication, and Mongo and Docker for the backend. Read the below sections to understand how to set up each of these tools.

### NodeJS and NPM

Currently, the project is using version 22.5.1 LTS.

If you use nvm (if you use Windows, use nvm-windows) then you can run nvm install and nvm use (you might need to specify the exact version eg: nvm install 22.5.1 then nvm use 22.5.1) to use the version of Node.js.

Alternatively, you can navigate to the NodeJS website to download it from there.

## Frontend set-up

How to setup frontend locally

### Setting up environment variables

1. duplicate `/frontend/.env.example` and renamed one from `.env.example` to `.env`

### Installation

1. navigate to `/frontend` then `npm install`
2. run locally `npm run dev`

### TinyMCE (optional)

A TinyMCE account is required to use TinyMCE editor for room description. You can skip this if you don't think you will need it (you can always set it up later)

1. Create a TinyMCE account if you already haven't done so.
2. Get the API SECRET KEY
3. Approve Domain (add <http://localhost:5173> and <https://devunity.netlify.app>)
4. Add value for `VITE_TINYMCE_API_SECRET=` in `/frontend/.env`

### RapidAPI & Judge0.ce (optional)

If you're contributing to room it is required to test code execution; for that you need to have judge0.ce access.
DevUnity uses rapid-api for judge0.ce management
Hence you'll need RapidAPI account

You can skip this if you don't think you will need it (you can always set it up later)

1. Create a RapidAPI account if you already haven't done so.
2. visit [Judge0_RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce/) and select the basic plan.
3. Goto `Submissions` in sidebar and select any endpoint.
4. Copy headers

```
      'x-rapidapi-key': 'some-token',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
```

5. Add key value to `/frontend/.env`

```
      VITE_JUDGE_CE_API_KEY = some-token
      VITE_JUDGE_CE_HOST = judge0-ce.p.rapidapi.com
      VITE_JUDGE_CE_BASE_URL = https://judge0-ce.p.rapidapi.com
```

## Backend set-up

How to setup backend locally

### Setting up environment variables

1. Duplicate `/backend/.env.example` and renamed one from `.env.example` to `.env`

2. MongoDB; Make sure you have installed and running mongodb.
   If you use mongodb atlas then don't forget to change url in `.env` `MONGO_URI=`

3. Generate `JWT_SECRET=` using `openssl rand -base64 32` (window users can use git bash)

4. If you think you'll need Email service to be working then add

   ```
        # SMTP
        SMTP_MAIL="" # eg: address@service.tld
        SMTP_PASS="" # eg: app-password; refer to:
        SMTP_HOST="" # eg: smtp.gmail.com
   ```

5. If you think you'll need Cloudinary service to be working then add

   ```
       #cloudinary variables; refer to:
       CLOUDINARY_NAME=""
       CLOUDINARY_API_KEY=""
       CLOUDINARY_API_SECRET=""

   ```

### Installation

1. navigate to `/backend` then `npm install`
2. run locally `npm run dev`

## Standards and Guidelines

Below is a set of general guidelines for different types of changes.

### Pull Request Naming Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our pull request titles (and commit messages on the master branch). Please follow the guidelines below when naming pull requests.

For types, we use the following:

- `feat`: A new feature
- `impr`: An improvement to an existing feature
- `fix`: A bug fix
- `style`: Changes that do not affect the meaning of the code (white space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature, but makes the code easier to read, understand, or improve
- `chore`: Other changes that don't apply to any of the above

## Questions

If you have any questions, comments, concerns, or problems let me know on [GitHub](https://github.com/m4dd0c) in the `#development` channel, or ask a question on DevUnity's [GitHub discussions](https://github.com/m4dd0c/DevUnity/discussions) and a contributor will be happy to assist you.
