![logo](public/logo.png)

# 🥗 Nutrimate – Intelligent Recipe Recommendation System

Nutrimate is an AI-powered web application that recommends recipes based on ingredients, nutritional preferences, and user input. It leverages advanced machine learning techniques, GPT-3.5, Gemini Vision, and a modular architecture to deliver fast, accurate, and personalized recipe recommendations.

---

## 🚀 Features

- 🔍 **Multi-Input Search**
  - Text-based search
  - Image-based ingredient recognition (Gemini Vision)
  - Nutrient-based filtering and diet customization

- 🧠 **AI-Powered Intelligence**
  - Recipe parsing with OpenAI GPT-3.5
  - Ingredient detection from images using Gemini Vision API
  - Hybrid ML model (TF-IDF + FastText + CNN + SHAP)

- 📊 **Nutritional Insights**
  - Custom dietary filters (vegan, keto, etc.)
  - Macronutrient and calorie tracking

- 🧾 **User Search History**
  - Personalized experience with search logs
  - Managed securely using Appwrite Authentication

- 📱 **Modern Frontend**
  - Built with Next.js and Tailwind CSS
  - Mobile responsive and accessible UI

---

## 🛠️ Tech Stack

| Layer         | Technology                             |
|---------------|-----------------------------------------|
| Frontend      | Next.js, Tailwind CSS, SWR       |
| Backend       | Flask (Python), REST API                |
| AI Services   | OpenAI GPT-3.5, Gemini Vision API        |
| Authentication| Appwrite (JWT, OAuth)                   |
| Database      | MongoDB Atlas                           |
| Deployment    | Vercel (Frontend), Hugging Face Spaces (Backend) |

---

## 🧱 Architecture Overview

The project follows a modular microservices architecture:

- **Frontend**: React components organized into pages, layouts, features
- **Backend**: Flask app divided into services (recommendation, analysis, user)
- **AI Adapters**: GPT-3.5 for text parsing, Gemini Vision for image analysis
- **Data Layer**: MongoDB with collections for recipes, users, feedback, and history

---

## 📦 API Endpoints

| Endpoint                        | Description                                 |
|---------------------------------|---------------------------------------------|
| `/api/recommend`               | Main recommendation engine                  |
| `/api/analyze-food-image`      | Ingredient recognition via image upload     |
| `/api/extract-recipe-attributes` | Recipe parsing with GPT-3.5               |
| `/api/user/history`            | Fetch or update search history              |
| `/api/user/preferences`        | Manage dietary filters and preferences      |

