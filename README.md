<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <a href="#getting-started">Getting started</a>
      <ol>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run-database-server">Run database server</a></li>
        <li><a href="#run-backend-server">Run backend server</a></li>
        <li><a href="#run-frontend-server">Run frontend server</a></li>
      </ol>
  </ul>
</details>

## Getting started

### Installation

- Node.js (22.14.0) <br> [Install Node.js]
- Docker Desktop

### Run database server

```bash
docker run --name postgres-db -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres-db -d postgres:latest
```

### Run backend server

- Move to backend folder

```
cd backend
```

- Create `.env` file and input environment variables

```
HOST=
PORT=
CLIENT_ORIGIN=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=

JWT_SECRET=
JWT_EXPIRES_IN=
```

- Install NPM packages

```
npm install
```

- Run development server

```
npm run dev
```

### Run frontend server

- Open new terminal (Press `` Ctrl + Shift + ` ``)

- Move to frontend folder

```
cd frontend
```

- Create `.env` file and input environment variables

```
NEXT_PUBLIC_API_URL=
```

- Install NPM packages

```
npm install
```

- Run development server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Install Node.js]: https://nodejs.org/en/download
