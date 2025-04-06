# App Installation Guide (DEV mode)

## Requirements

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/downloads) (for cloning the repository)

## Installation & Setup

Follow these steps to set up and run the project locally:

```bash
# If you haven't already, navigate to your working directory and clone the project
git clone https://github.com/KonstPartner/Book-Library.git

# Navigate to the frontend directory
cd Book-Library/client

# Install dependencies
npm install
```

## Environment Variables (if not already done)

1. Create a `.env.local` file in the root of the `client` folder _(or replace it if it already exists)_.
1. Fill it with the required environment variables based on `.env.local.sample` or use the default values:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

The application should now be accessible at `http://localhost:3000`.

## Additional Notes

- Ensure the backend API is running before using the application.

## Stop the Application

### To stop the app, in the terminal you started client press:

```sh
Ctrl + C
```

After following step, the app will be fully stopped.
