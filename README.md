# 🎬 Netflix Clone

Welcome to the Netflix Clone! This project is built using **ReactJS** and **SCSS**, featuring movies and tv.
The data is fetched from the TMDB API, with authentication and session management included.

**This clone is made for learning purposes and credits go to Netflix for design and TMDB for their data.**

## ✨ Features

- **Categories**:
  - Movies
  - TVs (Episodes)
- **User Interactions**:
  - Add ratings
  - Add to watchlist
  - Add to favorites
  - CRUD operations for these actions
- **Profile Management**:
  - Manage multiple user profiles (accounts)
- **Custom Slider**: Implemented using pure JavaScript logic.
- **Infinite Scrolling**: Seamless browsing of movies and TV shows without any external dependencies.

## Utilized Libraries

- **react-render-if-visible**: Enhanced website performance by selectively rendering components only when they are visible within the viewport.
- **react-loading-skeleton**: Elevated user experience by incorporating loading skeletons during data fetching, providing visual feedback to users.
- **react-hot-toast**: Streamlined user interaction by presenting informative messages and notifications, ensuring smooth communication with the user.

## 🎥 Review

- **Live link :** https://netflix-react-clone.000webhostapp.com/

## 🛠️ Built With

- **ReactJS**
- **SCSS**
- **TMDB API** for data
- **Vite** for project bundling and development server

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

```
 git clone https://github.com/NemishGorasiya/Netflix-React-Clone.git
```

```
cd Netflix-React-Clone
```

2. **Install dependencies**

```
   npm install
```

OR

```
yarn install
```

3. **Setting Up TMDB API**

Obtain an API key from <a href="https://www.themoviedb.org/" aria-describedby="TMDB website link" target="_blank">TMDB</a>.

Create a .env file in the root of the project and add your TMDB API key:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
```

4. **Running the Project**

To start the development server, run:

Using npm:

```
npm run dev
```

OR

Using yarn:

```
yarn dev
```

The application should now be running on http://localhost:3000.

5. **Building for Production**

To create a production build, run:

Using npm:

```
npm run build
```

OR

Using yarn:

```
yarn build
```

<div align="center">
⭐ Show your support by starring this repository! ⭐
</div>
