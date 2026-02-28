USE job_portal;

-- Admin user: Kumar (kumar@gmail.com / kumar) - role_id 3 = ROLE_ADMIN
INSERT INTO users (email, password, full_name, role_id, is_active, is_approved)
VALUES ('kumar@gmail.com', '$2a$10$4L6KSV6gmaq4gRj0X9lju.8SQDuN.AphNg544Nq7jK1ecAblm/Rg.', 'Kumar', 3, TRUE, TRUE);

-- Candidate user: Kumar (kumarcandidate@gmail.com / kumar) - role_id 1 = ROLE_CANDIDATE
INSERT INTO users (email, password, full_name, role_id, is_active, is_approved)
VALUES ('kumarcandidate@gmail.com', '$2a$10$4L6KSV6gmaq4gRj0X9lju.8SQDuN.AphNg544Nq7jK1ecAblm/Rg.', 'Kumar', 1, TRUE, TRUE);

-- Create candidate profile for Kumar candidate
INSERT INTO candidate_profiles (user_id, headline, summary, experience_years, location)
SELECT id, 'Software Developer | Java & React', 'Passionate software developer looking for exciting opportunities.', 2, 'India'
FROM users WHERE email = 'kumarcandidate@gmail.com';

-- Add skills to Kumar's candidate profile
INSERT IGNORE INTO candidate_skills (candidate_profile_id, skill_id)
SELECT cp.id, s.id FROM candidate_profiles cp, skills s
WHERE cp.user_id = (SELECT id FROM users WHERE email = 'kumarcandidate@gmail.com')
AND s.name IN ('Java', 'React', 'Spring Boot', 'JavaScript', 'MySQL');
