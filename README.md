# Student API + Next.js Frontend

A full-stack student management app built with Next.js, TypeScript, Tailwind CSS, and MongoDB. The frontend displays students in a table and provides a form for creating and updating student records. The backend is implemented with Next.js API routes that perform CRUD operations against a MongoDB collection.

This was built as a school project to practice connecting a React-style frontend to API routes and persistent database storage.

## Features

- View all students in a responsive table
- Add a new student
- Select an existing student and update their information
- Delete a student with browser confirmation
- API routes for create, read, update, and delete operations
- MongoDB connection helper with development connection caching
- Basic server-side payload validation
- Tailwind CSS styling

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MongoDB Node Driver
- Tailwind CSS
- ESLint

## Project Structure

```text
app/
  page.tsx                  # Main student table and page state
  StudentForm.tsx           # Create/update form
  api/
    studentAPI.ts           # Frontend fetch helpers
    students/
      route.ts              # GET all students, POST new student
      [id]/
        route.ts            # GET, PUT, DELETE one student
lib/
  mongodb.ts                # MongoDB connection setup
```

## Data Model

Student records use this shape:

```ts
{
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}
```

MongoDB adds `_id` automatically. The frontend uses that `_id` for update and delete actions.

## Environment Variables

Create `.env.local` in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=student_api
MONGODB_COLLECTION=students
```

`MONGODB_DB` and `MONGODB_COLLECTION` are optional. If they are not provided, the app defaults to:

```text
student_api
students
```

## API Endpoints

```text
GET    /api/students       # Return all students
POST   /api/students       # Create a student
GET    /api/students/:id   # Return one student
PUT    /api/students/:id   # Update one student
DELETE /api/students/:id   # Delete one student
```

Invalid student payloads return `400`. Missing or invalid IDs return `404`.

## How To Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # Start the local Next.js server
npm run build    # Build the production app
npm run start    # Run the built app
npm run lint     # Run ESLint
```

## How The App Works

1. On page load, the frontend requests `GET /api/students`.
2. The returned student records are rendered in a table.
3. Submitting the form sends either a `POST` request for a new student or a `PUT` request for the selected student.
4. Clicking `Update` loads that student's data into the form.
5. Clicking `Delete` asks for confirmation, sends a `DELETE` request, and reloads the table.

## Notes

- A working MongoDB connection is required for the app to run beyond the UI shell.
- This project uses direct API routes inside the Next.js app instead of a separate Express server.
- Authentication is not included; the focus is CRUD behavior and database connectivity.

## What I Practiced

- Building full-stack behavior inside a Next.js app
- Creating REST-style API routes
- Connecting to MongoDB from server-side code
- Validating request payloads
- Managing create/update form state
- Refreshing UI data after database mutations
