This README is designed to help you or other developers set up and
understand the architecture of your Movie Management System,
specifically highlighting the **3-items-per-page** pagination logic and
the **Admin/Client** dual-interface.

**🎬 MovieCounter - MERN Stack Project**

A full-stack movie management application built with the **MERN** stack
(MongoDB, Express, React, Node.js). The application features a curated
client-side experience with strictly limited pagination and a robust
Admin Dashboard for content management.

**🚀 Key Features**

-   **Curated Pagination**: Displays exactly **3 movies per page** on
    the Home screen to ensure a focused user experience.

-   **Dynamic Sorting**: Sort movies by Rating, Release Date, Duration,
    or Alphabetical order.

-   **Live Search**: Debounced search functionality to find movies by
    title or description.

-   **Admin Dashboard**: A secure interface for Admins to Create, Read,
    Update, and Delete (CRUD) movie records.

-   **Uniform UI**: Cards are designed with fixed aspect ratios
    (\$2:3\$) and truncated text to maintain a perfect grid layout
    regardless of content length.

**🛠️ Tech Stack**

**Frontend:**

-   React.js (Context API for state management)

-   Material UI (MUI) for responsive design

-   Axios for API communication

**Backend:**

-   Node.js & Express

-   MongoDB with Mongoose ODM

-   JWT Authentication (Ready for integration)

**🏗️ Architecture & Pagination Logic**

The project uses a synchronized pagination logic between the Frontend
and Backend.

**How 3 Per Page Works:**

1.  **Frontend**: The Home.jsx component passes a limit: 3 parameter to
    the fetchMovies context function.

2.  **API**: Axios sends a request to /api/movies/sorted?page=1&limit=3.

3.  Backend: The controller calculates the offset using the formula:

\$\$\\text{skip} = (\\text{page} - 1) \\times \\text{limit}\$\$

4.  **Database**: Mongoose applies .skip(skip).limit(limit) to the query
