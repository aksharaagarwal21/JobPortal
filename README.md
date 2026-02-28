# 🚀 Premium Full-Stack Job Portal

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A modern, high-performance Job Portal application featuring a stunning **Obsidian & Orchid** premium UI theme. This platform connects Candidates, Recruiters, and Administrators through dedicated role-based dashboards and secure RESTful APIs.

## ✨ Features

### 🎨 Obsidian & Orchid Premium UI
The frontend features a completely bespoke design system designed to wow users:
* **Deep Space Aesthetics:** Built on tailored "Obsidian" surface colors (slate/zinc blends) that feel infinitely deep.
* **Vibrant Accents:** "Orchid" primary colors featuring dynamic Fuchsia-to-Violet gradients.
* **Advanced Glassmorphism:** Frosted glass cards (`backdrop-blur-xl`), subtle inner borders, and deep realistic shadows.
* **Micro-Interactions:** Smooth hover states, glowing borders on focus, and tactile button presses.

### 👥 Role-Based Portals
* **👨‍💻 Candidates:** Search jobs, apply with one click, manage profiles, track application statuses, and save jobs for later.
* **🏢 Recruiters:** Post new job listings, review applicants, update application statuses (Shortlisted, Hired, Rejected), and manage company profiles.
* **👑 Administrators:** Oversee the entire platform, manage user accounts, and view system-wide analytics.

### 🛡️ Robust Backend
* Secure JWT (JSON Web Token) Authentication.
* Passwords hashed securely using BCrypt.
* Advanced JPA search specifications for filtering jobs by keyword, location, type, and experience level.
* Complex relational mapping for Jobs, Skills, Companies, and Applications.

---

## 🛠️ Technology Stack

**Frontend:**
* React (Vite)
* Tailwind CSS (Custom Configuration)
* React Router DOM
* Axios (API Client)
* React Hot Toast (Notifications)
* React Icons

**Backend:**
* Java 17
* Spring Boot 3.2.x
* Spring Security & JWT
* Spring Data JPA (Hibernate)
* Maven

**Database:**
* MySQL 8.0 Community Edition

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Java Development Kit (JDK)](https://adoptium.net/) (v17)
* [MySQL Workbench / Server](https://dev.mysql.com/downloads/) (v8.0+)

### 1. Database Setup
1. Open MySQL Workbench.
2. Run the provided database scripts located in the `database/` folder in this order:
   * First: `schema.sql` (Creates the `job_portal` database and all tables)
   * Second: `seed_data.sql` (Inserts default skills, companies, and roles)
   * Third: `seed_jobs.sql` & `seed_additional_data.sql` (Bulk inserts 60+ sample jobs, candidates, and recruiters)

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Verify your MySQL credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YourMySQLPassword
   ```
3. Run the Spring Boot application (Windows):
   ```bash
   .\mvnw.cmd clean spring-boot:run
   ```
   *(The API will start running on `http://localhost:8080`)*

### 3. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173/`

---

## 🔐 Default Test Accounts

Use these accounts to explore the different dashboards. **The password for ALL accounts is: `password123`** (except admin).

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@jobportal.com` | `admin123` |
| **Candidate** | `c1@portal.com` | `password123` |
| **Candidate** | `c2@portal.com` | `password123` |
| **Recruiter** | `r1@portal.com` | `password123` |
| **Recruiter** | `r2@portal.com` | `password123` |

*(There are candidates up to `c10` and recruiters up to `r4` available for testing).*

---
*Built with ❤️ using React & Spring Boot.*
