-- ========================================
-- SEED DATA for Job Portal
-- ========================================

USE job_portal;

-- ---- Companies ----
INSERT INTO companies (name, description, website, location, industry, company_size, founded_year, logo_url, created_at) VALUES
('Google', 'A multinational technology company specializing in Internet-related services and products.', 'https://google.com', 'Mountain View, CA', 'Technology', '10000+', 2004, NULL, NOW()),
('Microsoft', 'A leading global technology company developing software, hardware, and cloud services.', 'https://microsoft.com', 'Redmond, WA', 'Technology', '10000+', 1975, NULL, NOW()),
('Amazon', 'A global e-commerce and cloud computing giant powering the modern internet.', 'https://amazon.com', 'Seattle, WA', 'E-commerce / Cloud', '10000+', 1994, NULL, NOW()),
('Meta', 'Building the future of social connection through apps and virtual reality.', 'https://meta.com', 'Menlo Park, CA', 'Social Media / Tech', '10000+', 2004, NULL, NOW()),
('Netflix', 'A streaming entertainment service offering TV series, documentaries, and films.', 'https://netflix.com', 'Los Gatos, CA', 'Entertainment', '5000-10000', 1997, NULL, NOW()),
('Stripe', 'Financial infrastructure platform for the internet economy.', 'https://stripe.com', 'San Francisco, CA', 'Fintech', '1000-5000', 2010, NULL, NOW()),
('Spotify', 'Digital music, podcast, and video service giving access to millions of songs.', 'https://spotify.com', 'Stockholm, Sweden', 'Music / Tech', '5000-10000', 2006, NULL, NOW()),
('Airbnb', 'An online marketplace for lodging, homestays, and tourism experiences.', 'https://airbnb.com', 'San Francisco, CA', 'Travel / Hospitality', '5000-10000', 2008, NULL, NOW()),
('Slack', 'A business communication platform offering messaging, file sharing, and integrations.', 'https://slack.com', 'San Francisco, CA', 'SaaS / Communication', '1000-5000', 2013, NULL, NOW()),
('Shopify', 'A leading e-commerce platform enabling merchants to build online stores.', 'https://shopify.com', 'Ottawa, Canada', 'E-commerce / SaaS', '5000-10000', 2006, NULL, NOW());

-- ---- Skills ----
INSERT IGNORE INTO skills (name) VALUES
('Java'), ('Python'), ('JavaScript'), ('TypeScript'), ('React'), ('Angular'), ('Vue.js'), ('Node.js'),
('Spring Boot'), ('Django'), ('FastAPI'), ('Express.js'), ('PostgreSQL'), ('MySQL'), ('MongoDB'),
('Redis'), ('Docker'), ('Kubernetes'), ('AWS'), ('Azure'), ('GCP'), ('Git'), ('CI/CD'),
('GraphQL'), ('REST API'), ('Microservices'), ('Machine Learning'), ('Data Science'),
('TensorFlow'), ('PyTorch'), ('Figma'), ('UI/UX Design'), ('Agile'), ('Scrum'),
('Product Management'), ('DevOps'), ('Linux'), ('Terraform'), ('Kafka'), ('RabbitMQ'),
('Elasticsearch'), ('Swift'), ('Kotlin'), ('Flutter'), ('React Native'), ('Go'), ('Rust'),
('C++'), ('C#'), ('.NET'), ('SQL'), ('NoSQL'), ('HTML'), ('CSS'), ('Tailwind CSS'),
('Next.js'), ('Svelte'), ('Ruby on Rails'), ('PHP'), ('Laravel'), ('Blockchain'), ('Web3');

-- ---- Recruiter Profiles (link recruiter user to companies) ----
UPDATE recruiter_profiles SET company_id = 1, position = 'Senior Technical Recruiter', bio = 'Connecting top talent with amazing opportunities at leading tech companies.' WHERE user_id = 3;

-- ---- Jobs ----
INSERT INTO jobs (title, description, requirements, location, job_type, experience_level, salary_min, salary_max, currency, deadline, is_active, company_id, posted_by, created_at) VALUES
('Senior Full Stack Engineer', 'We are looking for a Senior Full Stack Engineer to join our core platform team. You will design and implement scalable web applications, mentor junior engineers, and drive technical decisions that impact millions of users worldwide.\n\nResponsibilities:\n• Design and build robust, scalable web applications\n• Collaborate with product managers and designers\n• Write clean, testable, and maintainable code\n• Participate in code reviews and architectural discussions\n• Mentor junior team members', 'Requirements:\n• 5+ years of experience in full stack development\n• Strong proficiency in React, TypeScript, and Node.js\n• Experience with cloud services (AWS/GCP/Azure)\n• Understanding of microservices architecture\n• Excellent communication skills', 'Mountain View, CA', 'FULL_TIME', 'SENIOR', 150000, 220000, 'USD', '2026-04-15', true, 1, 3, DATE_SUB(NOW(), INTERVAL 2 DAY)),

('Machine Learning Engineer', 'Join our AI team to build next-generation ML models that power search, recommendations, and content understanding. Work with petabyte-scale data and cutting-edge research.\n\nResponsibilities:\n• Develop and deploy ML models at scale\n• Design experiments and analyze results\n• Collaborate with research scientists\n• Optimize model performance and inference latency', 'Requirements:\n• MS/PhD in Computer Science or related field\n• 3+ years of ML engineering experience\n• Proficiency in Python, TensorFlow/PyTorch\n• Experience with large-scale distributed systems\n• Strong mathematical foundations', 'Mountain View, CA', 'FULL_TIME', 'SENIOR', 180000, 280000, 'USD', '2026-05-01', true, 1, 3, DATE_SUB(NOW(), INTERVAL 5 DAY)),

('Frontend Developer', 'Build beautiful, responsive user interfaces for our cloud products used by millions of developers worldwide. Join a team that values craftsmanship and user experience.\n\nResponsibilities:\n• Build responsive web applications with React/TypeScript\n• Implement pixel-perfect designs from Figma\n• Optimize performance and accessibility\n• Write unit and integration tests', 'Requirements:\n• 3+ years of frontend development experience\n• Expert in React, TypeScript, HTML/CSS\n• Experience with state management (Redux, Zustand)\n• Knowledge of accessibility standards\n• Portfolio of previous work', 'Redmond, WA', 'FULL_TIME', 'MID', 120000, 170000, 'USD', '2026-04-20', true, 2, 3, DATE_SUB(NOW(), INTERVAL 1 DAY)),

('Cloud Solutions Architect', 'Design and implement cloud infrastructure solutions for enterprise customers. Help organizations modernize their technology stack and migrate to the cloud.\n\nResponsibilities:\n• Design cloud architecture solutions\n• Lead technical discussions with customers\n• Create reference architectures and best practices\n• Mentor team members on cloud technologies', 'Requirements:\n• 7+ years in software engineering or architecture\n• Deep knowledge of AWS/Azure/GCP\n• Experience with containerization (Docker, K8s)\n• Strong presentation and communication skills\n• Cloud certifications preferred', 'Seattle, WA', 'FULL_TIME', 'LEAD', 160000, 240000, 'USD', '2026-05-10', true, 3, 3, DATE_SUB(NOW(), INTERVAL 3 DAY)),

('Data Scientist', 'Analyze large-scale user behavior data to drive content recommendations and improve the viewing experience for 200M+ subscribers worldwide.\n\nResponsibilities:\n• Build predictive models and recommendation systems\n• Design and analyze A/B experiments\n• Create dashboards and data visualizations\n• Present insights to stakeholders', 'Requirements:\n• MS in Statistics, Math, or Computer Science\n• 3+ years of data science experience\n• Proficiency in Python, SQL, and R\n• Experience with recommendation systems\n• Strong statistical analysis skills', 'Los Gatos, CA', 'FULL_TIME', 'MID', 140000, 200000, 'USD', '2026-04-25', true, 5, 3, DATE_SUB(NOW(), INTERVAL 4 DAY)),

('Backend Engineer - Payments', 'Build and scale the payment infrastructure that powers millions of transactions daily. Work on critical financial systems with high reliability requirements.\n\nResponsibilities:\n• Design and implement payment APIs\n• Ensure system reliability and compliance\n• Optimize transaction processing pipelines\n• Build monitoring and alerting systems', 'Requirements:\n• 4+ years of backend development\n• Strong knowledge of Java or Ruby\n• Experience with financial systems\n• Understanding of PCI compliance\n• Database optimization skills', 'San Francisco, CA', 'FULL_TIME', 'MID', 145000, 210000, 'USD', '2026-05-05', true, 6, 3, DATE_SUB(NOW(), INTERVAL 6 DAY)),

('Mobile Developer (React Native)', 'Create engaging mobile experiences for our music streaming app used by 500M+ users. Work on features like offline playback, social sharing, and personalized playlists.\n\nResponsibilities:\n• Develop cross-platform mobile features\n• Optimize app performance and battery usage\n• Implement smooth animations and transitions\n• Collaborate with backend and design teams', 'Requirements:\n• 3+ years of React Native development\n• Experience with iOS and Android platforms\n• Knowledge of audio/video streaming\n• Strong UI/UX sensibility\n• Published apps in app stores', 'Stockholm, Sweden', 'FULL_TIME', 'MID', 110000, 160000, 'USD', '2026-04-30', true, 7, 3, DATE_SUB(NOW(), INTERVAL 7 DAY)),

('DevOps Engineer', 'Build and maintain our cloud infrastructure and CI/CD pipelines. Help us scale to support millions of hosts and guests worldwide.\n\nResponsibilities:\n• Manage Kubernetes clusters and cloud infra\n• Build and optimize CI/CD pipelines\n• Implement monitoring and incident response\n• Automate infrastructure provisioning', 'Requirements:\n• 4+ years of DevOps/SRE experience\n• Expert in Kubernetes, Docker, Terraform\n• Experience with AWS or GCP\n• Strong scripting skills (Python, Bash)\n• On-call experience', 'San Francisco, CA', 'FULL_TIME', 'MID', 130000, 190000, 'USD', '2026-05-15', true, 8, 3, DATE_SUB(NOW(), INTERVAL 8 DAY)),

('Product Designer (UX)', 'Design intuitive and delightful user experiences for our communication platform used by millions of teams worldwide.\n\nResponsibilities:\n• Create wireframes, prototypes, and high-fidelity designs\n• Conduct user research and usability testing\n• Define design systems and component libraries\n• Collaborate closely with engineers and PMs', 'Requirements:\n• 4+ years of product design experience\n• Expert in Figma and design tools\n• Strong portfolio showcasing UX work\n• Understanding of accessibility guidelines\n• Experience with design systems', 'San Francisco, CA', 'FULL_TIME', 'MID', 125000, 175000, 'USD', '2026-04-28', true, 9, 3, DATE_SUB(NOW(), INTERVAL 9 DAY)),

('E-commerce Platform Engineer', 'Help build the commerce platform that powers millions of online stores. Work on checkout, payments, and merchant tools.\n\nResponsibilities:\n• Build scalable e-commerce features\n• Optimize checkout conversion rates\n• Implement payment integrations\n• Design APIs for merchant ecosystem', 'Requirements:\n• 3+ years of full stack experience\n• Proficiency in Ruby on Rails or Node.js\n• Experience with e-commerce systems\n• Knowledge of payment gateways\n• Performance optimization skills', 'Ottawa, Canada', 'FULL_TIME', 'MID', 120000, 170000, 'USD', '2026-05-20', true, 10, 3, DATE_SUB(NOW(), INTERVAL 10 DAY)),

('AI Research Intern', 'Join our research team for a summer internship working on Large Language Models and multimodal AI systems.\n\nResponsibilities:\n• Conduct research under senior scientists\n• Implement and evaluate ML models\n• Write research papers\n• Present findings to the team', 'Requirements:\n• Enrolled in MS/PhD program\n• Strong foundation in ML/DL\n• Python and PyTorch proficiency\n• Published research is a plus', 'Menlo Park, CA', 'INTERNSHIP', 'ENTRY', 8000, 12000, 'USD', '2026-03-31', true, 4, 3, DATE_SUB(NOW(), INTERVAL 3 DAY)),

('Remote Python Developer', 'Work from anywhere on our backend services built with Django and FastAPI. Flexible schedule, async-first culture.\n\nResponsibilities:\n• Develop RESTful APIs with Python\n• Write comprehensive tests\n• Participate in async code reviews\n• Document APIs and architecture', 'Requirements:\n• 2+ years Python experience\n• Django and/or FastAPI knowledge\n• PostgreSQL proficiency\n• Good async communication skills', 'Remote', 'REMOTE', 'MID', 90000, 140000, 'USD', '2026-04-30', true, 6, 3, DATE_SUB(NOW(), INTERVAL 2 DAY)),

('Junior Software Engineer', 'Start your career at one of the world''s top tech companies. Structured mentorship, learning budget, and meaningful projects from day one.\n\nResponsibilities:\n• Write clean, tested code\n• Learn from senior engineers\n• Contribute to real products\n• Participate in design reviews', 'Requirements:\n• BS in Computer Science or equivalent\n• Proficiency in at least one language\n• Understanding of data structures/algorithms\n• Eagerness to learn and grow', 'Redmond, WA', 'FULL_TIME', 'ENTRY', 95000, 130000, 'USD', '2026-05-01', true, 2, 3, DATE_SUB(NOW(), INTERVAL 1 DAY)),

('Part-Time UI Developer', 'Looking for a talented UI developer to work part-time on our design system and component library. 20 hours/week, flexible schedule.\n\nResponsibilities:\n• Build reusable UI components in React\n• Maintain the design system\n• Ensure cross-browser compatibility\n• Write Storybook documentation', 'Requirements:\n• 2+ years of frontend experience\n• React and CSS expertise\n• Figma to code workflow\n• Attention to visual detail', 'Remote', 'PART_TIME', 'MID', 50000, 75000, 'USD', '2026-04-15', true, 9, 3, DATE_SUB(NOW(), INTERVAL 5 DAY)),

('Contract Data Engineer', 'Join us for a 6-month contract to build our next-generation data pipeline infrastructure.\n\nResponsibilities:\n• Design and build ETL pipelines\n• Work with Spark, Airflow, and Kafka\n• Optimize data warehouse queries\n• Build data quality monitoring', 'Requirements:\n• 4+ years data engineering experience\n• Expert in Spark and Airflow\n• SQL and Python proficiency\n• Experience with cloud data services', 'Seattle, WA', 'CONTRACT', 'SENIOR', 160000, 200000, 'USD', '2026-04-20', true, 3, 3, DATE_SUB(NOW(), INTERVAL 6 DAY));

-- ---- Job Skills ----
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Senior Full Stack Engineer' AND s.name IN ('React', 'TypeScript', 'Node.js', 'AWS', 'Microservices', 'Docker');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Machine Learning Engineer' AND s.name IN ('Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Frontend Developer' AND s.name IN ('React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Figma');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Cloud Solutions Architect' AND s.name IN ('AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Data Scientist' AND s.name IN ('Python', 'SQL', 'Machine Learning', 'Data Science');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Backend Engineer - Payments' AND s.name IN ('Java', 'Spring Boot', 'PostgreSQL', 'REST API', 'Microservices');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title LIKE 'Mobile Developer%' AND s.name IN ('React Native', 'JavaScript', 'TypeScript', 'Flutter');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'DevOps Engineer' AND s.name IN ('Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Linux', 'DevOps');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Product Designer (UX)' AND s.name IN ('Figma', 'UI/UX Design');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'E-commerce Platform Engineer' AND s.name IN ('Ruby on Rails', 'Node.js', 'React', 'PostgreSQL', 'REST API');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'AI Research Intern' AND s.name IN ('Python', 'PyTorch', 'Machine Learning', 'TensorFlow');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Remote Python Developer' AND s.name IN ('Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST API');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Junior Software Engineer' AND s.name IN ('Java', 'Python', 'JavaScript', 'Git');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Part-Time UI Developer' AND s.name IN ('React', 'CSS', 'Tailwind CSS', 'Figma', 'JavaScript');
INSERT INTO job_skills (job_id, skill_id) SELECT j.id, s.id FROM jobs j, skills s WHERE j.title = 'Contract Data Engineer' AND s.name IN ('Python', 'SQL', 'Kafka', 'AWS', 'DevOps');

-- ---- Job Applications (candidate@test.com = user id 2) ----
INSERT INTO job_applications (job_id, candidate_id, cover_letter, status, applied_at) VALUES
((SELECT id FROM jobs WHERE title = 'Senior Full Stack Engineer'), 2, 'I am excited to apply for this role. With 6 years of experience in React, Node.js, and cloud technologies, I believe I can make a significant contribution to your team.', 'REVIEWED', DATE_SUB(NOW(), INTERVAL 1 DAY)),
((SELECT id FROM jobs WHERE title = 'Frontend Developer'), 2, 'As a passionate frontend developer with extensive React and TypeScript experience, I would love to bring my skills to Microsoft.', 'SHORTLISTED', DATE_SUB(NOW(), INTERVAL 3 DAY)),
((SELECT id FROM jobs WHERE title = 'Remote Python Developer'), 2, 'I am very interested in this remote Python position. I have been working with Django for 3 years and would love to contribute to Stripe.', 'PENDING', DATE_SUB(NOW(), INTERVAL 1 DAY)),
((SELECT id FROM jobs WHERE title = 'DevOps Engineer'), 2, 'DevOps is my passion. I have managed K8s clusters at scale and built CI/CD pipelines that reduced deployment time by 80%.', 'REJECTED', DATE_SUB(NOW(), INTERVAL 5 DAY));

-- ---- Saved Jobs ----
INSERT INTO saved_jobs (user_id, job_id, saved_at) VALUES
(2, (SELECT id FROM jobs WHERE title = 'Machine Learning Engineer'), NOW()),
(2, (SELECT id FROM jobs WHERE title = 'Data Scientist'), NOW()),
(2, (SELECT id FROM jobs WHERE title = 'Mobile Developer (React Native)'), NOW());

-- ---- Notifications ----
INSERT INTO notifications (user_id, title, message, type, is_read, created_at) VALUES
(2, 'Application Reviewed', 'Your application for Senior Full Stack Engineer at Google has been reviewed.', 'APPLICATION_UPDATE', false, DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(2, 'Shortlisted!', 'Congratulations! You have been shortlisted for Frontend Developer at Microsoft.', 'APPLICATION_UPDATE', false, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'Application Rejected', 'Unfortunately, your application for DevOps Engineer at Airbnb was not selected.', 'APPLICATION_UPDATE', true, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(2, 'New Jobs Match', '5 new jobs match your skills in React and TypeScript. Check them out!', 'JOB_ALERT', false, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 'Profile Tip', 'Complete your profile to increase visibility. Add a headline and at least 5 skills.', 'SYSTEM', true, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(3, 'Account Approved', 'Your recruiter account has been approved. You can now post jobs!', 'SYSTEM', true, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'New Applicant', 'You have received a new application for Senior Full Stack Engineer.', 'APPLICATION_UPDATE', false, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ---- Update candidate profile with more data ----
UPDATE candidate_profiles SET
  headline = 'Full Stack Developer | React & Node.js | Cloud Enthusiast',
  summary = 'Passionate software engineer with 5+ years of experience building scalable web applications. I specialize in React, TypeScript, and Node.js, with extensive experience in cloud infrastructure (AWS/GCP). Open to senior engineering roles at innovative tech companies.',
  experience_years = 5,
  phone = '+1 (555) 123-4567',
  location = 'San Francisco, CA',
  linkedin_url = 'https://linkedin.com/in/testcandidate',
  github_url = 'https://github.com/testcandidate',
  portfolio_url = 'https://testcandidate.dev'
WHERE user_id = 2;

-- ---- Add skills to candidate profile ----
INSERT IGNORE INTO candidate_skills (candidate_profile_id, skill_id)
SELECT cp.id, s.id FROM candidate_profiles cp, skills s
WHERE cp.user_id = 2 AND s.name IN ('React', 'TypeScript', 'Node.js', 'JavaScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Git', 'CI/CD');
