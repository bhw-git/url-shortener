# 🚀 URL Shortener Web Application

A simple and lightweight **URL shortener** built using **Node.js**, **Express.js**, and **MongoDB**.
It allows users to shorten long URLs into compact, shareable links and redirect them back to the original URL.

---

## 🧩 Features

* 🔗 Shortens long URLs into unique short codes
* ↪️ Redirects short URLs back to their original links
* 🗃️ Uses MongoDB to store and retrieve URL mappings
* ⚙️ Built using Express.js and Mongoose

---

## 🏗️ Project Structure

```
url-shortener/
│
├── models/
│   └── Url.js             # Mongoose schema for URL documents
│
├── public/
│   └── index.html         # Frontend form for submitting URLs
│
├── .env                   # Environment variables (MONGO_URI)
├── server.js              # Main Express server file
├── package.json
└── README.md              # Documentation file
```

---

## ⚙️ Tech Stack

| Layer                     | Technology             |
| ------------------------- | ---------------------- |
| **Backend**               | Node.js, Express.js    |
| **Database**              | MongoDB (Mongoose ORM) |
| **Environment Variables** | dotenv                 |
| **Unique ID Generator**   | shortid                |

---

## 📥 Installation and Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

Create a `.env` file in the root folder and add your MongoDB connection string:

```
MONGO_URI=mongodb://127.0.0.1:27017/urlShortener
```

### 4️⃣ Start MongoDB

If you’re running MongoDB locally, make sure the **MongoDB service** is started:

```bash
mongod
```

### 5️⃣ Run the server

```bash
node server.js
```

The server will start on:

```
http://localhost:3000
```

---

## 🧠 How It Works

### 🔹 1. Shorten URL (POST `/shorten`)

* The user submits a long URL through the form in `index.html`.
* Server generates a unique code using `shortid`.
* Checks if the URL already exists in MongoDB:

  * If yes → returns the existing shortened URL.
  * If not → saves a new record and returns the new short URL.

#### Example Request:

```json
POST /shorten
{
  "longUrl": "https://www.example.com/very/long/link"
}
```

#### Example Response:

```json
{
  "_id": "6700b9e7c23bfc5a12345678",
  "urlCode": "Xy12Za",
  "longUrl": "https://www.example.com/very/long/link",
  "shortUrl": "http://localhost:3000/Xy12Za",
  "date": "2025-10-05T12:34:56.789Z"
}
```

---

### 🔹 2. Redirect to Original URL (GET `/:code`)

* Where **/:code** -> Is query parameter
* Replace **/:code** with the **urlCode** generated and stored in MongoDB
* When the user visits a short URL, for example:

  ```
  http://localhost:3000/Xy12Za
  ```
* The server extracts the code from the URL (`req.params.code`).
* Looks up the corresponding long URL in MongoDB.
* Redirects the user to the original long URL.

---

## 🧾 Database Schema (Url.js)

```js
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now },
});

export default mongoose.model("Url", urlSchema);
```

Each shortened URL is stored in MongoDB with:

| Field      | Type   | Description            |
| ---------- | ------ | ---------------------- |
| `urlCode`  | String | Unique short code      |
| `longUrl`  | String | Original long URL      |
| `shortUrl` | String | Complete short link    |
| `date`     | Date   | Timestamp when created |

---

## 🧭 API Endpoints

| Method          | Endpoint                                    | Description |
| --------------- | ------------------------------------------- | ----------- |
| `GET /`         | Renders the homepage (`index.html`)         |             |
| `POST /shorten` | Accepts long URL, returns a short URL       |             |
| `GET /:code`    | Redirects the user to the original long URL |             |

---

## 🧑‍💻 Example Workflow

1️⃣ User visits `http://localhost:3000`
2️⃣ Submits long URL → **POST /shorten**
3️⃣ Receives short link → `http://localhost:3000/a1b2C3`
4️⃣ Visiting that short link → Redirects to original long URL

---

