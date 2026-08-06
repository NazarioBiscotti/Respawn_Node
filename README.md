# 🎮 RESPawn

RESPawn is a gaming-focused content platform where users can discover gaming trends, explore games, save posts and follow their favorite titles.

The platform combines a personalized feed system with IGDB game data to create a dynamic discovery experience.

## 🚀 Features

🔐 Authentication with JWT + bcrypt  
📰 Gaming content feed  
⭐ Save posts system  
🎮 Follow games system  
🔎 Game search and details via IGDB API  
🧠 Personalized “For You” ranking system  
📄 Post detail pages with related content  
👤 User profile with saved content  

## 🧠 Key Concepts

This project focuses on building a product-like full-stack architecture:

- JWT authentication and protected routes
- PostgreSQL as persistent data storage
- Separation between frontend state and backend logic
- Custom feed ranking based on user preferences
- API integration with external gaming services
- Reusable React components and custom hooks

## 🛠 Tech Stack

**Frontend**
- React
- React Router
- React Query
- JavaScript (ES6+)
- Tailwind CSS
- Vite

**Backend**
- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt

**External API**
- IGDB API

## 🧩 Data Model

The application uses four main tables:

```
users
profiles
saved_posts
followed_games
```

User-related data is stored in PostgreSQL and protected through JWT authentication.

## ⚙️ Architecture Overview

```
AuthContext → manages authentication state and user session

routes/ → Express API endpoints

middleware/ → JWT route protection

context/ → global React state

hooks/ → reusable application logic

utils/ → feed ranking and scoring logic

components/ → reusable UI components
```

## 🧠 Feed Ranking System

The “For You” section ranks content based on user interests.

Current signals:

- followed games
- related game content
- content relevance score

The goal is to create a lightweight recommendation system similar to real content platforms.

## 🎯 Project Goal

The goal of RESPawn was to simulate a real-world product workflow:

- authentication
- persistent user data
- external API integration
- dynamic content feed
- personalized ranking logic
- full-stack communication

## 📌 Status

Project completed (MVP stage – portfolio ready)

## 👤 Author

Nazario Biscotti
