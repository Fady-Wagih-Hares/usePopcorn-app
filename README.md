
```markdown
<div align="center">

# 🍿 usePopcorn

**A feature-rich movie search and personal watchlist application built with React.**

Search any movie, explore detailed information, rate it with an interactive star system, and build your personal watched-movies collection — all persisted in your browser.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**usePopcorn** is a React single-page application that lets users search for movies via the [OMDb API](https://www.omdbapi.com/), view detailed information about each movie (poster, plot, cast, director, genres, ratings), rate movies with an interactive star rating component, and maintain a personal watched-movies list with computed statistics.

The watched list is automatically persisted in `localStorage`, so your data survives page refreshes and browser restarts.

---

## Features

### 🔍 Movie Search
- Real-time search powered by the **OMDb API**
- **Debounced fetching** (requests wait until the user stops typing) and validation (fires only after typing **3+ characters**)
- **AbortController** integration cancels in-flight requests when the user types a new query, preventing race conditions
- Displays movie poster, title, and release year in the search results

### 🎬 Movie Details
- Fetches comprehensive movie data by IMDb ID: **title, year, poster, runtime, IMDb rating, plot, release date, actors, director, and genres**
- Dynamically updates the browser tab title to reflect the currently viewed movie (e.g., `Movie: Inception`)
- Clean-up effect restores the original page title (`usePopcorn`) when the details view is closed

### ⭐ Interactive Star Rating
- Fully reusable `StarRating` component with configurable props:
  - `maxRating` — number of stars (default: 5)
  - `color` — star color (default: `#fcc419`)
  - `size` — star size in pixels (default: 48)
  - `messages` — array of labels mapped to each rating level
  - `defaultRating` — pre-selected rating value
  - `onSetRating` — callback to lift the rating value to parent components
- **Hover preview** — stars highlight on mouse-over to preview the rating before clicking
- **PropTypes** validation for type safety
- Uses **react-icons** (`FaStar` / `CiStar`) for filled and empty star icons

### 📋 Watched Movies List
- Add rated movies to your personal watchlist
- **Duplicate prevention** — if a movie is already watched, the component displays the user's previous rating instead of showing the rating form again
- **Delete** any movie from the watchlist with a single click
- **Computed summary statistics** displayed at the top:
  - Total number of watched movies
  - Average IMDb rating
  - Average user rating
  - Average runtime (minutes)

### 💾 LocalStorage Persistence
- Watched movies are automatically saved to `localStorage` via a dedicated custom hook
- Data is restored on app initialization using a **lazy initializer** in `useState`
- Synced on every watched list change via a `useEffect`

### ⌨️ Keyboard Shortcuts
- **Enter** — focuses the search input and clears the current query for a new search
- **Escape** — closes the movie details panel and returns to the summary view

### 🖼️ Fallback Poster
- If a movie has no poster (`N/A`), a **placeholder image** is displayed
- An `onError` handler on `<img>` provides a secondary fallback if the poster URL fails to load

### 📱 Fully Responsive
- Adapts seamlessly across desktop, tablet, and mobile viewports
- Four breakpoint tiers: desktop (default), tablet (≤900px), mobile (≤768px), small mobile (≤500px)

### 🧩 Collapsible Panels
- Both the search results box and the watched movies box can be **toggled open/closed** independently with a `+`/`–` button

### ⏳ Loading & Error States
- A **Loader** component is displayed while data is being fetched
- An **ErrorMessage** component renders user-friendly error messages (e.g., `Movie Not Found!`, network errors)

### 🔢 Rating Decision Counter
- A hidden `useRef` counter tracks how many times a user changed their rating before adding a movie, stored as `countRatingDecisions` on the watched movie object

---

## Demo

| Search Movies | Movie Details & Rating | Watched Summary |
|:---:|:---:|:---:|
| <img src="https://via.placeholder.com/300x200?text=Search+Screenshot" alt="Search Movies Demo" /> | <img src="https://via.placeholder.com/300x200?text=Details+Screenshot" alt="Movie Details Demo" /> | <img src="https://via.placeholder.com/300x200?text=Summary+Screenshot" alt="Watched Summary Demo" /> |

*(Note: Replace the placeholder image URLs above with actual paths to your screenshots, e.g., `./public/assets/demo-search.png`)*

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2 | UI library (functional components, hooks) |
| **Vite** | 5.0 | Build tool & dev server |
| **react-icons** | 5.7 | Star rating icons (`FaStar`, `CiStar`) |
| **prop-types** | 15.8 | Runtime prop type validation |
| **sweetalert2** | 11.26 | Alert dialogs (available, currently commented out) |
| **ESLint** | 8.x | Code linting with React hooks plugin |
| **OMDb API** | — | External movie data provider |

---

## Project Structure

```text
usepopcorn/
├── public/
│   ├── assets/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── movies/
│   │   │   │   ├── Movie.jsx            # Single movie card in search results
│   │   │   │   ├── MovieDetails.jsx      # Full movie details & rating panel
│   │   │   │   ├── MovieList.jsx         # Search results list with loading/error states
│   │   │   │   └── Search.jsx            # Search input with Enter key focus
│   │   │   └── watched/
│   │   │       ├── MoviesSummary.jsx      # Watched list statistics summary
│   │   │       └── MoviesWatched.jsx      # Watched movies list with delete
│   │   ├── layout/
│   │   │   ├── Logo.jsx                  # App logo (🍿 usePopcorn)
│   │   │   ├── Main.jsx                  # Main content wrapper
│   │   │   ├── NumResult.jsx             # Search results counter
│   │   │   └── SearchBar.jsx             # Top navigation bar
│   │   └── ui/
│   │       ├── Box.jsx                   # Collapsible panel container
│   │       ├── ErrorMessage.jsx          # Error display component
│   │       ├── Loader.jsx                # Loading indicator
│   │       ├── Star.jsx                  # Individual star icon
│   │       └── StarRating.jsx            # Reusable star rating component
│   ├── custom_hooks/
│   │   ├── useKeyPress.js                # Global keyboard event listener
│   │   ├── useLocalStorageState.js        # State synced with localStorage
│   │   └── useMovies.js                  # Movie search with fetch & abort
│   ├── App.jsx                           # Root application component
│   ├── index.css                         # Global styles & responsive breakpoints
│   └── main.jsx                          # React entry point (StrictMode)
├── config.js                             # App-wide constants (default poster URL)
├── .env                                  # API key (VITE_API_KEY) — git-ignored
├── .env.example                          # Example environment variables template
├── .gitignore
├── eslint.config.js
├── index.html                            # HTML shell
├── LICENSE                               # MIT License
├── package.json
├── vite.config.js
└── README.md

```

---

## Getting Started

### Prerequisites

* **Node.js** ≥ 18.x
* **npm** ≥ 9.x
* An **OMDb API key** — get one free at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)

### Installation

1. **Clone the repository**
```bash
git clone [https://github.com/Fady-Wagih-Hares/usePopcorn-app.git](https://github.com/Fady-Wagih-Hares/usePopcorn-app.git)
cd usePopcorn-app

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure environment variables**
Copy the `.env.example` file to create a new `.env` file in the project root:
```bash
cp .env.example .env

```


Then open `.env` and add your API key:
```env
VITE_API_KEY=your_omdb_api_key_here

```


4. **Start the development server**
```bash
npm run dev

```


The app will be available at `http://localhost:5173` (default Vite port).

### Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| **dev** | `npm run dev` | Start Vite dev server with HMR |
| **build** | `npm run build` | Build production bundle to `dist/` |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint across the project |

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_KEY` | ✅ Yes | Your OMDb API key used to fetch movie data |

---

## Architecture & Design Patterns

### Component Composition

The app favors **component composition** over prop drilling. Layout components like `SearchBar`, `Main`, and `Box` accept `children` props, allowing flexible, declarative content injection without deeply passing props through the tree.

### Custom Hooks for Reusability

All reusable stateful logic is extracted into **custom hooks**:

* `useMovies` — encapsulates the entire search-fetch-abort lifecycle
* `useLocalStorageState` — a drop-in `useState` replacement that auto-syncs with `localStorage`
* `useKeyPress` — a declarative way to bind global keyboard shortcuts with automatic cleanup

### AbortController for Race Conditions

The `useMovies` hook creates a new `AbortController` on every query change. When the query changes before a response arrives, the previous request is **aborted** in the effect's cleanup function, preventing stale data from overriding fresh results.

### Refs for Non-Render Data

* The `Search` component uses `useRef` to declaratively access the input DOM element for programmatic focus
* `MovieDetails` uses `useRef` to track the number of rating decisions without triggering re-renders

### Effect Cleanup

All side effects that register event listeners or modify the document title include proper **cleanup functions** to prevent memory leaks and stale behavior on unmount or re-render.

---

## Components

### Layout Components

| Component | File | Description |
| --- | --- | --- |
| `SearchBar` | `layout/SearchBar.jsx` | Top navigation bar — renders children in a responsive grid |
| `Logo` | `layout/Logo.jsx` | App branding with 🍿 emoji and "usePopcorn" title |
| `NumResult` | `layout/NumResult.jsx` | Displays the count of search results found |
| `Main` | `layout/Main.jsx` | Semantic `<main>` wrapper for the two-panel layout |

### UI Components

| Component | File | Description |
| --- | --- | --- |
| `Box` | `ui/Box.jsx` | Collapsible container with toggle button (`+`/`–`) |
| `StarRating` | `ui/StarRating.jsx` | Configurable star rating with hover preview & PropTypes |
| `Star` | `ui/Star.jsx` | Single star icon with click/hover handlers |
| `Loader` | `ui/Loader.jsx` | "Loading..." text indicator |
| `ErrorMessage` | `ui/ErrorMessage.jsx` | Error display with ❌ emoji prefix |

### Feature Components

| Component | File | Description |
| --- | --- | --- |
| `Search` | `features/movies/Search.jsx` | Controlled search input with `useRef` focus & Enter key binding |
| `MovieList` | `features/movies/MovieList.jsx` | Orchestrates loading, error, and movie list rendering |
| `Movie` | `features/movies/Movie.jsx` | Individual movie card with poster fallback handling |
| `MovieDetails` | `features/movies/MovieDetails.jsx` | Full movie detail view with rating form, Escape key close, and dynamic page title |
| `MoviesSummary` | `features/watched/MoviesSummary.jsx` | Aggregate stats panel (count, avg ratings, avg runtime) |
| `MoviesWatched` | `features/watched/MoviesWatched.jsx` | Watched list with per-movie delete button |

---

## Custom Hooks

### `useMovies(query, callback)`

Handles the complete movie search lifecycle.

| Parameter | Type | Description |
| --- | --- | --- |
| `query` | `string` | Search query string |
| `callback` | `function` | Optional callback invoked before each fetch |

**Returns:** `{ movies, isLoading, errorMessage }`

**Key behaviors:**

* Skips fetch if query is shorter than 3 characters
* Creates an `AbortController` per request cycle
* Cleans up (aborts) the previous request on re-render
* Differentiates between abort errors and real errors

---

### `useLocalStorageState(initialState, key)`

A `useState` replacement that persists state to `localStorage`.

| Parameter | Type | Description |
| --- | --- | --- |
| `initialState` | `any` | Fallback value if nothing is stored |
| `key` | `string` | The `localStorage` key to read/write |

**Returns:** `[value, setValue]` — same API as `useState`

**Key behaviors:**

* Uses a **lazy initializer** to read from `localStorage` only on mount
* Syncs to `localStorage` via `useEffect` on every state change

---

### `useKeyPress(key, action)`

Registers a global `keydown` event listener for a specific key.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | The `event.code` to listen for (case-insensitive) |
| `action` | `function` | Callback to invoke on key press |

**Key behaviors:**

* Automatically cleans up the event listener on unmount or dependency change
* Case-insensitive key matching

---

## Keyboard Shortcuts

| Key | Context | Action |
| --- | --- | --- |
| `Enter` | Anywhere | Focuses the search input and clears the query |
| `Escape` | Movie details open | Closes the movie details panel |

---

## Responsive Design

The app uses **CSS media queries** with four breakpoint tiers:

| Breakpoint | Target | Layout Changes |
| --- | --- | --- |
| **Default** | Desktop (>900px) | Two-column side-by-side layout |
| **≤ 900px** | Tablet | Columns stack vertically, boxes expand to 80% width |
| **≤ 768px** | Mobile | Navbar switches to 2-column grid, search spans full width, boxes go 100% |
| **≤ 500px** | Small mobile | Reduced padding, smaller logo, poster goes full-width, summary wraps |

### Design System

| Token | Value |
| --- | --- |
| Primary | `#6741d9` |
| Primary Light | `#7950f2` |
| Text | `#dee2e6` |
| Text Dark | `#adb5bd` |
| Background 100 | `#343a40` |
| Background 500 | `#2b3035` |
| Background 900 | `#212529` |
| Accent Red | `#fa5252` |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👤 Author

**Fady Wagih**

Built as a capstone project from [Jonas Schmedtmann's The Ultimate React Course 2025: React, Next.js, Redux & More
](https://www.udemy.com/course/the-ultimate-react-course/?couponCode=CP260817G2).

> Original course design and API © Jonas Schmedtmann. Used for learning and portfolio purposes. Not for resale or re-teaching.

---

## License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
