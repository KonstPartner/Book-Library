# API Installation Guide

## Prerequisites
Before proceeding, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/downloads)

## Installation Steps

### 1. Clone the repository
If you haven't already, navigate to your working directory and clone the project:
```sh
git clone https://github.com/KonstPartner/Book-Library.git
```

### 2. Navigate to the project folder
Go to the project directory and then enter the `server` folder:
```sh
cd Book-Library/server
```

### 3. Import database data
1. Download the database backup file [server_books_pg_data.tar.gz](https://drive.google.com/file/d/1MUENNWBGdlRk_leHYaBkwMWc-xZjlDj-/view?usp=sharing)

1. Open **Docker**, go to the **Volumes** tab, and click **Create**.

1. Enter the volume name as `server_books_pg_data` and create it.

1. Open the newly created **server_books_pg_data** volume and click **Import**.

1. In the **Location -> Local file** field, select the downloaded database file **server_books_pg_data.tar.gz**.

1. Click **Import** and wait for the process to **complete**.

### 4. Environment Configuration
1. Create a `.env` file in the root of the `server` folder *(or replace it if it already exists)*.

2. Fill the `.env` file based on `.env.sample` in the `server` folder or use the default values:
```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin_password
POSTGRES_DB=db

PORT=3000
```

### 5. Install project dependencies
Run the following command to install all necessary Node.js dependencies:
```sh
npm install
```

## Running the Application

### 1.  Start Postgres DB and Adminer
Start the container:
```sh
docker compose up -d
```

### 2. Start the API service
Finally, start the API server:
```sh
npm start
```

### 3. Verify the setup
Once the server is running, you can verify the installation by checking:
- API logs for any errors
- The running Docker container with `docker ps`
- The API response at the expected endpoint (e.g., `http://localhost:3000`)

Your API should now be up and running! 🚀

## Stop the Application

### 1.  Stop Postgres DB and Adminer
Stop and delete the container:
```sh
docker compose down
```

### 2. Stop the API service
To stop the server, press:
```sh
Ctrl + C
```

After following these steps, the API service will be fully stopped.
