# Deploying Server Locally

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Run the server: `npm start`

## Optional

Might need to install SQLite and migrate database if not already installed.

1. To migrate database: `npx prisma migrate dev`
