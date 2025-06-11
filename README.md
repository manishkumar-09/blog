# blog# 📝 Blog API Backend

A modular and secure **Node.js + Express** backend for a full-featured blog application. It includes user authentication, blog CRUD, comment system, Google OAuth, image uploads, and security measures like rate limiting.

---

## 🚀 Features

- ✅ User Registration and Login (JWT-based)
- 🔒 Password hashing with `bcrypt`
- 🖼️ Profile and Blog image upload with `multer`
- ✍️ Create, Edit, Delete, Search Blogs
- 👍 Like/Dislike Blogs
- 💬 Add Comments on Blogs
- 🧾 Joi validation for data integrity
- 🛡️ Rate limiting to prevent DDoS
- ✉️ Password reset via `nodemailer`
- 🗂️ Organized using MVC architecture

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT + bcrypt + Google OAuth
- **File Uploads:** Multer
- **Validation:** Joi
- **Security:** express-rate-limit, input validation

---

## 🛠️ Installation

```bash
git clone https://github.com/manishkumar-09/blog.git
cd blog
npm install
```

# Environment Variables

Create a .env file in the root with:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_for_nodemailer
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id

# Development (with nodemon)

npm run dev

# Production

npm start

# API Endpoints

👤 User Routes /user
POST /user/create
➤ Register a new user with profile picture upload

POST /user/login
➤ Login with email and password

POST /user/resetpassword
➤ Request password reset via email

POST /user/reset/:id/:token
➤ Reset password using secure token

🔐 Google OAuth (Optional)
POST /user/auth/google
➤ Login/signup using Google OAuth token (Firebase-style)

📝 Blog Routes /blog
🔐 All routes require JWT authentication

POST /blog/create
➤ Create a new blog post with image upload

GET /blog/list
➤ Get all blogs of the authenticated user

POST /blog/search
➤ Search blogs by keyword

PATCH /blog/edit/:id
➤ Edit blog post by ID

DELETE /blog/delete/:id
➤ Delete blog post by ID

POST /blog/details/:id/:user
➤ Get blog details by blog ID and user ID

POST /blog/like/
➤ Like a blog post

POST /blog/dislike/
➤ Dislike a blog post

💬 Comment Routes /comment
POST /comment/add
➤ Add a comment to a blog post

# Security

JWT Authentication on protected routes

Rate limiting using express-rate-limit

Input validation via joi

Passwords hashed with bcrypt

# License

This project is licensed under the ISC License.

# Author

Manish Kumar
