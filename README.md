# Comedify

Comedify is a [Next.js](https://nextjs.org/) application equipped with a conversational AI chatbot named ComicBot and a jokes/bits library. The app is perfect for those in comedy who want to test out their bits or simply have a humorous conversation with a chatbot. This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and connected to a Firebase Firestore database.

## Features

- **ComicBot**: An AI conversational chatbot for humor and entertainment.
- **Jokes & Bits Library**: A collection of jokes and comedic bits that you can add to or read from.

## Getting Started

### Prerequisites

- Node.js
- Firebase account

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/njwright92/comedify.git
    ```
2. Navigate to the project directory
    ```bash
    cd comedify
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Set up your Firebase Firestore and add your Firebase config to `firebase.js`.

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000 with your browser to see the result.

How to Use
ComicBot: Navigate to the ComicBot section to start a conversation with the chatbot.
Jokes & Bits: Go to the Jokes & Bits section to add or view jokes.
API
ComicBot communicates with a backend API hosted on Hugging Face.
Jokes & Bits Library utilizes Firebase Firestore for storage.
Technologies
Next.js
React
Node.js
Firebase Firestore
Axios
Express
Deploy
For deployment, you can use platforms like Vercel.

For more details, check Next.js deployment documentation.

bash
