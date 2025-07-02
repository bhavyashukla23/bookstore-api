# 📚 Bookstore REST API

A Node.js + Express RESTful API for managing books with file-based storage and JWT authentication.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bhavyashukla23/bookstore-fs-rest-api.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm start
```

> The server runs at: `http://localhost:3000`

---

## 🧪 How to Test with Postman

### ✅ 1. Register a User

```http
POST /auth/register
```
**Body:**
```json
{
  "email": "abc@example.com",
  "password": "abc123"
}
```

---

### ✅ 2. Login and Get Token

```http
POST /auth/login
```
**Body:**
```json
{
  "email": "abc@example.com",
  "password": "abc123"
}
```

**Response:**
```json
{ "token": "your_jwt_token" }
```

Copy this token for future requests.

---

### ✅ 3. Add Authorization in Postman

For all `/books` requests:
- Go to the **Authorization** tab
- Type: `Bearer Token`
- Value: `your_jwt_token`

---

## 📘 API Documentation

### 🔐 Auth Routes

#### `POST /auth/register`
Register a new user  
**Body:**
```json
{ "email": "user@example.com", "password": "yourpassword" }
```

#### `POST /auth/login`
Login and receive JWT token  
**Body:**
```json
{ "email": "user@example.com", "password": "yourpassword" }
```

---

### 📚 Book Routes (Require Authorization)

#### `GET /books`
Get all books  
Optional query params:
- `genre=Fantasy` → Filter by genre
- `page=1&limit=5` → Pagination

#### `GET /books/:id`
Get a specific book by ID

#### `POST /books`
Add a new book  
**Body:**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "publishedYear": 2020
}
```

#### `PUT /books/:id`
Update a book (only if added by current user)  
**Body:**
```json
{
  "title": "Updated Title"
}
```

#### `DELETE /books/:id`
Delete a book (only if added by current user)

---

## 📝 Notes

- All book IDs are auto-generated UUIDs
- Only the creator of a book can update or delete it
- Data is stored in `data/users.json` and `data/books.json`

---

## 📦 Dependencies

- `express`
- `jsonwebtoken`
- `bcryptjs`
- `uuid`
- `fs/promises`

---

