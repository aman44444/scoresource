#  ScoreSource — Live Sports Scores & News App

**ScoreSource** is a modern web application that provides **real-time sports scores** and **latest sports news** across multiple sports — all in one place.


---

##  Features

*  **Live Scores**

  * Real-time match data for:

    * Cricket 
    * Football 
    * Tennis 

* 📰 **Latest Sports News**

  * Displays recent sports news articles
  * Keeps users updated with ongoing matches and key events

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

##  Key Learnings

* Integrating multiple APIs using RapidAPI
* Efficient data fetching in React applications
* Building scalable and reusable component architecture
* Creating responsive UI with Tailwind CSS
