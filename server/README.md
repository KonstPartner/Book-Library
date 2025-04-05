# API Installation Guide (DEV mode)

## Prerequisites
Before proceeding, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/downloads) (for cloning the repository)
- [Docker](https://www.docker.com/) (for running applications)

## Installation Steps

### 1. Clone the repository
If you haven't already, navigate to your working directory and clone the project:
```sh
git clone https://github.com/KonstPartner/Book-Library.git
```

### 2. Navigate to the project folder
Go to the project directory:

```sh
cd Book-Library
```

### 3. Import database data (if not already done)

#### Environment Configuration for root Project (if not already done)
1. Create a `.env` file in the `Book-Library` folder *(or replace it if it already exists)*.

2. Fill the `.env` file based on `.env.sample` in the `Book-Library` folder or use the default values:
```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin_password
POSTGRES_DB=db

REDIS_PASSWORD=redis_password

PORT=4000
JWT_SECRET=588e747c703e4305eb33f7839df8fb1406eef28088a3a034921b9ebc7dba3c1e
```

#

1. Download the database backup file [book-library_pg_data.tar.gz](https://drive.google.com/file/d/1E0hW3a8vFNCz5_L1WRdxfFKWxFfLUo3m/view?usp=sharing).

2. Start root project containers to trigger creation of database volume:
```sh
docker compose up -d --build

docker compose down
```

3. Open **Docker Desktop**, go to the **Volumes** tab, locate the newly created **book-library_pg_data** volume and click on it.
4. Click **Import** and select the downloaded database file **book-library_pg_data.tar.gz**.
5. Click **Import** and wait for the process to **complete**.

### 4. Navigate to the server folder
Enter the `server` folder:
```sh
cd ./server
```

### 5. Environment Configuration for API dev
1. Create a `.env` file in the `server` folder *(or replace it if it already exists)*.

2. Fill the `.env` file based on `.env.sample` in the `server` folder or use the default values:
```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin_password
POSTGRES_DB=db

REDIS_PASSWORD=redis_password

PORT=4000
JWT_SECRET=588e747c703e4305eb33f7839df8fb1406eef28088a3a034921b9ebc7dba3c1e
```

### 6. Install project dependencies
Run the following command to install all necessary Node.js dependencies:
```sh
npm install
```

## Running the Application

### 1.  Start Postgres DB, Adminer, Redis and Redis Insight
Start the container:
```sh
docker compose up -d
```

### 2. Start the API service
Finally, start the API server:
```sh
npm run dev
```

### 3. Verify the setup
Once the server is running, you can verify the installation by checking:
- API logs for any errors
- The running Docker container with `docker ps`
- The API response at the expected endpoint (e.g., `http://localhost:4000`)

Your API should now be up and running! 🚀

## Stop the Application

### 1.  Stop Postgres DB, Adminer, Redis and Redis Insight
Stop and delete the container:
```sh
docker compose down
```

### 2. Stop the API service
To stop the server, in the terminal you started server press:
```sh
Ctrl + C
```

After following these steps, the API service will be fully stopped.
