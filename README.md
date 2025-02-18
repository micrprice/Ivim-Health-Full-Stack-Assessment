# Notes App

A simple web application that allows users to create, read, update, and delete (CRUD) notes. This project demonstrates a full-stack application built with modern web technologies.

## Project Overview

The Notes App is split into two parts:

- **Backend**: A RESTful API built with Node.js, Express, and TypeScript, using SQLite for data persistence. The backend supports full CRUD operations on notes and includes basic error handling and unit tests (using Jest).
- **Frontend**: A React application styled with Bootstrap that provides a responsive UI for interacting with the notes API. The frontend includes pages for listing notes, viewing note details, and creating/editing notes.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - SQLite (via better-sqlite3)
  - Jest & Supertest (for testing)
  
- **Frontend**:
  - React
  - React Router
  - Axios
  - Bootstrap

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm

### Running the Backend

1. Open a terminal and navigate to the `/backend` directory.
2. Install dependencies:

``` npm install ```

3. Start the backend server:

``` npm start ```

The backend server will run on http://localhost:5000 by default.

4. To run backend tests, execute:

```npm test```

### Running the Frontend
1. Open a terminal and navigate to the /frontend directory.
2. Install dependencies:

``` npm install ```

3. Start the frontend application:

``` npm start ```

## Additional Information
- The backend uses SQLite for data persistence. The database file is created in the ``/data`` directory when the backend is started.
- The frontend communicates with the backend API using Axios.
- Both applications include basic error handling and are designed to be responsive.
- This project took me about 15 hours to complete.