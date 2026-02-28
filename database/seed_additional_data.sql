USE job_portal;

-- Seed Users
-- recruiters
INSERT IGNORE INTO users (email, password, full_name, role_id, is_active, is_approved) VALUES 
('r1@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Sarah Connor', 2, 1, 1),
('r2@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'John Smith', 2, 1, 1),
('r3@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Emily Chen', 2, 1, 1),
('r4@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Michael Davis', 2, 1, 1);

-- candidates
INSERT IGNORE INTO users (email, password, full_name, role_id, is_active, is_approved) VALUES 
('c1@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Alice Walker', 1, 1, 1),
('c2@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Bob Martin', 1, 1, 1),
('c3@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Charlie Brown', 1, 1, 1),
('c4@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Diana Prince', 1, 1, 1),
('c5@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Evan Wright', 1, 1, 1),
('c6@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Fiona Gallagher', 1, 1, 1),
('c7@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'George Taylor', 1, 1, 1),
('c8@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Hannah Abbott', 1, 1, 1),
('c9@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Ian Somerhalder', 1, 1, 1),
('c10@portal.com', '$2a$10$wT8vFpL8v5F0H4Hl.e5Ovu7pE7gU.rVjUaB/qjQY2vVwM5mP4XkOq', 'Jane Doe', 1, 1, 1);

-- Recruiter Profiles
INSERT IGNORE INTO recruiter_profiles (user_id, company_id, position, bio)
SELECT id, 1, 'Tech Recruiter', 'Hiring the best.' FROM users WHERE email = 'r1@portal.com';
INSERT IGNORE INTO recruiter_profiles (user_id, company_id, position, bio)
SELECT id, 2, 'Senior Recruiter', 'Building teams.' FROM users WHERE email = 'r2@portal.com';
INSERT IGNORE INTO recruiter_profiles (user_id, company_id, position, bio)
SELECT id, 3, 'HR Manager', 'People first.' FROM users WHERE email = 'r3@portal.com';
INSERT IGNORE INTO recruiter_profiles (user_id, company_id, position, bio)
SELECT id, 4, 'Staffing Specialist', 'Finding unicorns.' FROM users WHERE email = 'r4@portal.com';

-- Candidate Profiles
INSERT IGNORE INTO candidate_profiles (user_id, headline, summary, experience_years, location)
SELECT id, 'Software Engineer', 'Passionate about coding.', 3, 'New York, NY' FROM users WHERE email LIKE 'c%@portal.com';

-- Now insert 35 new jobs posted by these recruiters
SET @r1 = (SELECT id FROM users WHERE email = 'r1@portal.com');
SET @r2 = (SELECT id FROM users WHERE email = 'r2@portal.com');
SET @r3 = (SELECT id FROM users WHERE email = 'r3@portal.com');
SET @r4 = (SELECT id FROM users WHERE email = 'r4@portal.com');

INSERT INTO jobs (title, description, requirements, location, job_type, experience_level, salary_min, salary_max, currency, deadline, is_active, company_id, posted_by, created_at) VALUES
('Principal Software Engineer', 'Lead our core architecture team. You will be responsible for system design and evaluating new technologies.', '10+ years of experience in distributed systems. Expert in Java and Go.', 'Remote', 'REMOTE', 'LEAD', 180000, 250000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Frontend Architect', 'Drive frontend engineering strategy. We use React, Next.js, and heavily rely on WebGL.', '7+ years frontend experience. Deep knowledge of browser internals.', 'San Francisco, CA', 'FULL_TIME', 'LEAD', 160000, 220000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Backend Developer (Node.js)', 'Join our payments team building robust APIs.', '3+ years Node.js. Experience with payment gateways is a plus.', 'Austin, TX', 'FULL_TIME', 'MID', 110000, 150000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Data Engineer', 'Build ETL pipelines for our ML team.', 'Python, Airflow, Spark experience required.', 'Seattle, WA', 'FULL_TIME', 'MID', 130000, 180000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('Security Engineer', 'Protect our users data and infrastructure.', 'Experience with pen testing, cloud security, and compliance.', 'Remote', 'REMOTE', 'SENIOR', 150000, 200000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('UI/UX Designer', 'Design delightful experiences for our mobile app.', 'Figma expert. Strong portfolio required.', 'New York, NY', 'FULL_TIME', 'MID', 100000, 140000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Product Manager', 'Lead the product vision for our developer tools.', 'Prior experience as a software engineer is preferred. Strong communication.', 'San Francisco, CA', 'FULL_TIME', 'SENIOR', 140000, 190000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Ruby on Rails Developer', 'Maintain and scale our core monolithic application.', '5+ years Ruby on Rails. Solid understanding of active record.', 'Remote', 'REMOTE', 'SENIOR', 130000, 170000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('Cloud Infrastructure Engineer', 'Manage our AWS infrastructure using Terraform.', 'AWS certifications preferred. Terraform expertise is a must.', 'Seattle, WA', 'FULL_TIME', 'MID', 120000, 160000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Machine Learning Scientist', 'Research and implement novel recommendation algorithms.', 'Ph.D. in Computer Science or related field. Published papers are a plus.', 'Mountain View, CA', 'FULL_TIME', 'SENIOR', 170000, 240000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('React Native Developer', 'Build cross platform mobile apps.', '3+ years React Native. Native iOS/Android experience is helpful.', 'Austin, TX', 'FULL_TIME', 'MID', 115000, 155000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Technical Support Engineer', 'Help our enterprise customers troubleshoot complex API issues.', 'Strong scripting skills and experience with REST APIs.', 'Remote', 'REMOTE', 'ENTRY', 70000, 95000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('Q/A Automation Engineer', 'Develop automated test suites for our web platform.', 'Cypress or Selenium experience. Python scripting.', 'Denver, CO', 'FULL_TIME', 'MID', 90000, 120000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Database Administrator', 'Optimize and scale our PostgreSQL clusters.', '5+ years DBA experience. Knowledge of high availability setups.', 'Chicago, IL', 'FULL_TIME', 'SENIOR', 135000, 175000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Sales Engineer', 'Partner with our sales team to close enterprise deals.', 'Technical background with strong presentation skills.', 'San Francisco, CA', 'FULL_TIME', 'MID', 120000, 160000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Rust Developer', 'Build high performance system components.', 'Experience with Rust or modern C++. Strong computer science fundamentals.', 'Remote', 'REMOTE', 'SENIOR', 160000, 210000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('iOS Engineer', 'Develop features for our flagship iOS application.', 'Swift, SwiftUI, and Combine experience.', 'Cupertino, CA', 'FULL_TIME', 'MID', 130000, 180000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Android Engineer', 'Develop features for our flagship Android application.', 'Kotlin, Jetpack Compose, and Coroutines experience.', 'Mountain View, CA', 'FULL_TIME', 'MID', 130000, 180000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Go Developer', 'Build scalable microservices for our backend.', '3+ years Go experience. Knowledge of gRPC.', 'New York, NY', 'FULL_TIME', 'MID', 125000, 170000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Data Analyst', 'Provide actionable insights to our product team.', 'SQL, Tableau/Looker, and Python experience.', 'Seattle, WA', 'FULL_TIME', 'ENTRY', 80000, 110000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('Network Engineer', 'Manage our global network infrastructure.', 'CCNA/CCNP preferred. BGP and OSPF experience.', 'Dallas, TX', 'FULL_TIME', 'SENIOR', 110000, 150000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Site Reliability Engineer', 'Ensure our platform is highly available and performant.', 'Experience with Kubernetes, Prometheus, and Grafana.', 'Remote', 'REMOTE', 'MID', 140000, 190000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Vue.js Developer', 'Build modern frontend applications using Vue 3.', 'Vue.js, Nuxt, and Tailwind CSS experience.', 'Toronto, Canada', 'FULL_TIME', 'MID', 95000, 130000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Python Backend Engineer', 'Develop REST APIs and background workers using FastAPI and Celery.', 'Python, FastAPI, Redis, and PostgreSQL experience.', 'London, UK', 'FULL_TIME', 'MID', 100000, 140000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('C++ Game Developer', 'Work on the core engine of our new AAA title.', 'Strong C++ and 3D math skills. Unreal Engine experience is a plus.', 'Los Angeles, CA', 'FULL_TIME', 'SENIOR', 140000, 190000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Technical Writer', 'Create amazing documentation for our API.', 'Experience writing documentation for developers. Markdown, OpenAPI.', 'Remote', 'REMOTE', 'MID', 80000, 110000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Blockchain Engineer', 'Develop smart contracts and decentralized applications.', 'Solidity, Web3.js, and general understanding of EVM.', 'Miami, FL', 'FULL_TIME', 'MID', 150000, 200000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('AI/Prompt Engineer', 'Design, test, and refine prompts for large language models.', 'Experience with OpenAI APIs, LangChain, and prompt engineering techniques.', 'San Francisco, CA', 'FULL_TIME', 'ENTRY', 100000, 140000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('Hardware Engineer', 'Design circuits and PCBs for our IoT devices.', 'Altium Designer, embedded systems, and hardware prototyping.', 'Shenzhen, China', 'FULL_TIME', 'MID', 90000, 130000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('Marketing Automation Specialist', 'Manage our email marketing and CRM platforms.', 'Experience with HubSpot, Marketo, or Salesforce.', 'Chicago, IL', 'FULL_TIME', 'MID', 75000, 105000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('Finance Analyst', 'Support standard financial reporting and planning.', 'Excel wizardry, financial modeling, and SQL.', 'New York, NY', 'FULL_TIME', 'ENTRY', 70000, 95000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Customer Success Manager', 'Ensure our key clients get the most out of our product.', 'Strong communication and ability to navigate enterprise organizations.', 'Remote', 'REMOTE', 'MID', 85000, 120000, 'USD', '2026-06-01', true, 4, @r4, NOW()),
('AR/VR Developer', 'Build immersive experiences for the Vision Pro and Meta Quest.', 'Unity or Unreal Engine experience. C# or C++.', 'Seattle, WA', 'FULL_TIME', 'MID', 130000, 175000, 'USD', '2026-06-01', true, 1, @r1, NOW()),
('ERP Consultant', 'Implement and customize SAP for enterprise clients.', 'SAP certification and implementation experience.', 'Dallas, TX', 'FULL_TIME', 'SENIOR', 140000, 190000, 'USD', '2026-06-01', true, 2, @r2, NOW()),
('E-commerce Specialist', 'Optimize listings and run campaigns on Amazon and Shopify.', 'Experience with Amazon Seller Central and paid ads.', 'Remote', 'REMOTE', 'ENTRY', 60000, 85000, 'USD', '2026-06-01', true, 3, @r3, NOW()),
('Flutter Developer', 'Build amazing cross platform apps quickly.', 'Dart and Flutter experience. Firebase knowledge.', 'Berlin, Germany', 'FULL_TIME', 'MID', 90000, 125000, 'USD', '2026-06-01', true, 4, @r4, NOW());
