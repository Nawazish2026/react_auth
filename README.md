Movie Discovery Platform

A modern, responsive movie browsing application built using React and Vite. This project leverages real-time data from The Movie Database (TMDB) API and provides secure user authentication via Firebase.

🌟 Features

Secure Authentication: User signup and login powered by Firebase Authentication.

Dynamic Content Categories: Displays movie listings organized into distinct categories using TMDB data, such as:

Trending Now

Classic Dramas

New Releases

TMDB API Integration: Fetches and displays dynamic movie data, including posters, titles, and summaries.

Responsive UI: Developed using React components for a seamless experience across desktop and mobile devices.

Modern Tooling: Built with Vite for a fast development server and optimized production builds.

🛠 Technology Stack

Frontend Framework: React

Build Tool: Vite

Authentication & Backend Service: Firebase (Auth)

Data Source: TMDB (The Movie Database) API

Languages: JavaScript (or TypeScript, if used)

🚀 Getting Started

Prerequisites

Node.js (LTS version recommended)

A Firebase project configured for Authentication

A TMDB API Key

Installation

Clone the Repository:

git clone [https://github.com/Nawazish2026/eJournal.git](https://github.com/Nawazish2026/eJournal.git)
cd eJournal 


Install Dependencies:

npm install


Configure Environment Variables:
Create a .env file in the root directory and add your keys:

VITE_FIREBASE_API_KEY="YOUR_FIREBASE_KEY"
VITE_TMDB_API_KEY="YOUR_TMDB_KEY"
# Add other necessary Firebase config variables here


Run the Application:

npm run dev


📝 Project Structure & Development

The application architecture focuses on component reusability and clean separation of concerns:

src/components/: Houses reusable UI elements (e.g., MovieCard, Header).

src/pages/: Contains the main application views (e.g., LoginPage, Dashboard).

src/services/: Includes logic for API calls to TMDB and Firebase Authentication handlers.

Expanding the ESLint Configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.
