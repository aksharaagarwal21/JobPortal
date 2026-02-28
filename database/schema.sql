-- =============================================
-- Job Portal Database Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS job_portal;
USE job_portal;

-- ----------------------------
-- Roles table
-- ----------------------------
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO roles (name) VALUES ('ROLE_CANDIDATE'), ('ROLE_RECRUITER'), ('ROLE_ADMIN');

-- ----------------------------
-- Users table
-- ----------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role_id BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_users_email (email),
    INDEX idx_users_role (role_id)
) ENGINE=InnoDB;

-- ----------------------------
-- Companies table
-- ----------------------------
CREATE TABLE companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    website VARCHAR(300),
    logo_url VARCHAR(500),
    location VARCHAR(200),
    industry VARCHAR(100),
    company_size VARCHAR(50),
    founded_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_companies_name (name)
) ENGINE=InnoDB;

-- ----------------------------
-- Candidate Profiles
-- ----------------------------
CREATE TABLE candidate_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    headline VARCHAR(200),
    summary TEXT,
    experience_years INT DEFAULT 0,
    phone VARCHAR(20),
    location VARCHAR(200),
    resume_url VARCHAR(500),
    linkedin_url VARCHAR(300),
    github_url VARCHAR(300),
    portfolio_url VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------
-- Recruiter Profiles
-- ----------------------------
CREATE TABLE recruiter_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_id BIGINT,
    position VARCHAR(100),
    phone VARCHAR(20),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------
-- Skills table
-- ----------------------------
CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    INDEX idx_skills_name (name)
) ENGINE=InnoDB;

-- ----------------------------
-- Candidate Skills (many-to-many)
-- ----------------------------
CREATE TABLE candidate_skills (
    candidate_profile_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (candidate_profile_id, skill_id),
    FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------
-- Jobs table
-- ----------------------------
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(200),
    job_type ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE') NOT NULL DEFAULT 'FULL_TIME',
    experience_level ENUM('ENTRY', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE') NOT NULL DEFAULT 'ENTRY',
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'INR',
    is_active BOOLEAN DEFAULT TRUE,
    company_id BIGINT,
    posted_by BIGINT NOT NULL,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_jobs_title (title),
    INDEX idx_jobs_location (location),
    INDEX idx_jobs_type (job_type),
    INDEX idx_jobs_level (experience_level),
    INDEX idx_jobs_active (is_active),
    INDEX idx_jobs_created (created_at),
    FULLTEXT INDEX ft_jobs_search (title, description)
) ENGINE=InnoDB;

-- ----------------------------
-- Job Skills (many-to-many)
-- ----------------------------
CREATE TABLE job_skills (
    job_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (job_id, skill_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------
-- Job Applications
-- ----------------------------
CREATE TABLE job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    candidate_id BIGINT NOT NULL,
    status ENUM('PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED') DEFAULT 'PENDING',
    cover_letter TEXT,
    resume_url VARCHAR(500),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_job_candidate (job_id, candidate_id),
    INDEX idx_applications_status (status)
) ENGINE=InnoDB;

-- ----------------------------
-- Saved Jobs
-- ----------------------------
CREATE TABLE saved_jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    job_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY uk_saved_job (user_id, job_id)
) ENGINE=InnoDB;

-- ----------------------------
-- Notifications
-- ----------------------------
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (is_read)
) ENGINE=InnoDB;

-- ----------------------------
-- Default Admin User (password: admin123)
-- BCrypt hash of 'admin123'
-- ----------------------------
INSERT INTO users (email, password, full_name, role_id, is_active, is_approved)
VALUES ('admin@jobportal.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System Admin', 3, TRUE, TRUE);
