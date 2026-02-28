USE job_portal;

-- Update all jobs currency to INR and convert salaries (approx 83x conversion rate)
UPDATE jobs SET currency = 'INR',
  salary_min = salary_min * 83,
  salary_max = salary_max * 83;
