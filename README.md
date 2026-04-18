#  ScoreSource — Live Sports Scores & News App

**ScoreSource** is a modern web application that provides **real-time sports scores**, **latest sports news**, and **derived trending topics/players** — all in one place.

---

## 📸 Screenshots

### Home Page
![Home Page](./app/public/Screenshot%20(80).png)


##  Features

* 🔴 **Live Scores**

  * Real-time match data for:

    * Cricket 🏏
    * Football ⚽
    * Tennis 🎾

* 📰 **Latest Sports News**

  * Fetches and displays recent sports news articles
  * Keeps users updated with ongoing matches and events

* 🔥 **Trending Players**

  * Identifies trending players based on:

    * Frequency of mentions in news articles
    * Recent match coverage
  * Provides a **data-driven alternative** to social media trends

* 📊 **Match Details View**

  * View detailed information for each match

* 📱 **Responsive UI**

  * Fully optimized for mobile and desktop devices

---

##  Tech Stack

### Frontend

* React.js
* Next.js (App Router)
* TypeScript
* Tailwind CSS

### APIs

* RapidAPI

  * Sports Data API (Cricket, Football, Tennis)
  * News API (latest sports updates)

---

##  Architecture Overview

* Component-based architecture using React
* Separate modules for each sport (Cricket, Football, Tennis)
* Centralized API service layer for RapidAPI requests
* Data processing layer for extracting trending topics from news
* Reusable UI components (cards, match views)

---

##  Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/aman44444/scoresource.git
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables:

```env
NEXT_PUBLIC_RAPIDAPI_KEY=your_key
```

4. Run the development server:

```bash
npm run dev
```

---

## Key Learnings

* Handling multiple APIs
* Designing a **scalable data-fetching layer** in React
* Building a **derived data system** (trending from news instead of direct APIs)
* Managing async state and UI updates for live data
* Creating reusable and maintainable component architecture
* Optimizing performance for frequent data updates

